import msgpack                                         from 'msgpack-lite'
import { semanticTag, peer, direction, spatial, time } from 'semantic-tag'
import { validatorWithDependencies }                   from './validator'

export const interest = {
  "id":          "#/interest",
  "$schema":     "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type":        "object",
  "properties": {
    "topics": {
      "type": "array",
      "items": {"$ref": "#/semanticTag"}
    },
    "believers": {
      "type": "array",
      "items": {"$ref": "#/semanticTag/peer"}
    },
    "peer": { "$ref": "#/semanticTag/peer"},
    "recipients": {
      "type": "array",
      "items": {"$ref": "#/semanticTag/peer"}
    },
    "locations": {
      "type": "array",
      "items": {"$ref": "#/semanticTag/spatial"}
    },
    "times": {
      "type": "array",
      "items": {"$ref": "#/semanticTag/time"}
    },
    "direction": {
      "type": "array",
      "items": {"$ref": "#/semanticTag/direction"}
    }
  }
}

export const dependencies = [ semanticTag, peer, spatial, time, direction ]
export const validate     = validatorWithDependencies(interest, dependencies)

function serialize(buffer) {
  var obj = msgpack.decode(buffer)
  validate(obj)
  return obj
}

function deserialize(obj) {
  validate(obj)
  var buffer = msgpack.encode(obj)
  return buffer
}

export default { deserialize, serialize }
