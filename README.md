# semantic-internet-protocol
[![Build Status](https://travis-ci.org/doodzik/semantic-internet-protocol.svg?branch=master)](https://travis-ci.org/doodzik/semantic-internet-protocol)

This Repo contains the spec for the semantic-internet-protocol and serialize/deserialize functions.
It is written in [JSON-Schema](http://json-schema.org)
You can find the spec in the source directory

# installation

```bash
$ npm install semantic-internet-protocol
```

# usage

```javascript
import { header, knowledge, interest } from 'semantic-internet-protocol'
```

# API

### \# header.serialize({ version: Float, command: INTEREST|EXPOSE,
#contentLength: Int }) -> string

### \# header.deserialize(string) -> object

### knowledge.serialize(Object) -> msgpack string

### knowledge.deserialize(msgpack string) -> object

### interest.serialize(Object) -> msgpack string

### interest.deserialize(msgpack string) -> object
