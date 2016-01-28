function _getBody(buffer, headerLength, index) {
  const  indexBody  = headerLength + 1 + index
  return buffer.slice(indexBody)
}

const INSERT = 'insert'
const EXPOSE = 'expose'

function _regex() {
  const singleSemver  = '(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)'
  const contentLength = '([1-9][0-9]*)'
  const firstLine     = `SIP/(${singleSemver}) ${contentLength}\n`

  const secondLine    = `command (${INSERT}|${EXPOSE})`
  const end           = '\n'
  return new RegExp(firstLine + secondLine + end, 'g')
}

function deserialize(buffer) {
  const match = _regex().exec(buffer)
  if(!match)
    return [ false, buffer ]
  let  [matched, version, contentLength, command] = match
  version          = parseFloat(version)
  contentLength    = parseInt(contentLength)
  const  header    = { version, contentLength, command }
  const  bufferNew = _getBody(buffer, matched.length, match.index)
  return [ header, bufferNew ]
}

function serialize(header) {
  let version = header.version
  if (header.version % 1 === 0)
    version = header.version + '.0'
  return `SIP/${version} ${header.contentLength}\ncommand ${header.command}\n\n`
}

module.exports = { deserialize, serialize, _regex, INSERT, EXPOSE }
