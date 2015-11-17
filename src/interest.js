import msgpack                       from 'msgpack-lite'
import { validatorWithDependencies } from './validator'
import { default as name }           from './semantic-tag'
import { default as peer }           from './semantic-tag-peer'
import { default as spatial }        from './semantic-tag-spatial'
import { default as time }           from './semantic-tag-time'
import { default as direction }      from './semantic-tag-direction'

const interest = {
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
    "peer": {
      "type": "array",
      "items": {"$ref": "#/semanticTag/peer"}
    }, // TODO ist peer semantic tag optional oder wiederholend?
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

export default interest
export const dependencies = [ name, peer, spatial, time, direction ]
export const validate     = validatorWithDependencies(interest, dependencies)

export function serialize(buffer) {
  var obj = msgpack.decode(buffer)
  validate(obj)
  return obj
}

export function deserialize(obj) {
  validate(obj)
  var buffer = msgpack.encode(obj)
  return buffer
}
