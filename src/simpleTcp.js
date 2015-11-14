const R = require('ramda')
const debug = require('debug')('simpleTcp');
const assert = require('assert');
const net = require('net');

class MiddelwareDSL {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    debug('use %s', fn._name || fn.name || '-');
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    this.middleware.push(fn);
    return this;
  }

  onerror(err) {
    assert(err instanceof Error, `non-error thrown: ${err}`);

    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error();
    console.error(msg.replace(/^/gm, '  '));
    console.error();
  }
}

export class Client extends MiddelwareDSL {
  send(message, host = '127.0.0.1', port = 5442) {
    var socket = new net.Socket()
    socket.connect(port, host)
    socket.on('error', this.onerror)
    socket.on('connect', () => socket.write(this.assambleData(message, 'utf-8', this.onerror)))
  }

  assambleData(message) {
    let fn = x => x
    if (this.middleware.length > 0)
      fn = R.pipe(...this.middleware)
    var messageData = fn(message)
    return `${messageData.length}#${messageData}`
  }
}

export class Server extends MiddelwareDSL {
  constructor() {
    super()
    this.contentLength = null;
    this.buffer = '';
  }

  listen() {
    debug('listen');
    const server = net.createServer(this.callback());
    return server.listen.apply(server, arguments);
  }

  callback() {
    return (socket) => {
      socket.on('data', data => this.ondata(data.toString()))
      socket.on('error', this.onerror)
      socket.on('close', () => console.log('Connection closed'))
    };
  }

  ondata(data) {
    let middelware = R.pipe(...this.middleware)
    this.buffer += data;

    if (this.contentLength == null) {
      var i = this.buffer.indexOf('#');
      //Check if the buffer has a #, if not, the end of the buffer string might be in the middle of a content length string
      if (i !== -1) {
        var rawContentLength = this.buffer.substring(0, i);
        this.contentLength = parseInt(rawContentLength);
        if (isNaN(this.contentLength)) {
          this.contentLength = null;
          this.buffer = '';
          var err = new Error('Invalid content length supplied ('+rawContentLength+') in: '+this.buffer);
          err.code = 'E_INVALID_CONTENT_LENGTH';
          throw err;
        }
        this.buffer = this.buffer.substring(i+1);
      }
    }

    if (this.contentLength != null) {
      if (this.buffer.length == this.contentLength) {
        middelware(this.buffer);
      } else if (this.buffer.length > this.contentLength) {
        var message = this.buffer.substring(0, this.contentLength);
        var rest = this.buffer.substring(this.contentLength);
        middelware(message);
        this.ondata(rest);
      }
    }
  }

  invokeMiddelware(data) {
    this.contentLength = null;
    this.buffer = '';
    R.pipe(...this.middleware)(data)
  }
}
