import msgpack                                     from 'msgpack-lite'
import { validatorWithDependencies } from './validator'
import contextCoordinate, { dependencies as deps } from './context-coordinate'

const knowledge = {
  "id":          "#/knowledge",
  "$schema":     "http://json-schema.org/draft-04/schema#",
  "description": "schema for knowledge",
  "type":        "object",
  "required":    ["vocabulary", "infoContent"],
  "properties":  {
    "vocabulary":  "string",
    "infoContent": "string",
    "contextCoordinates": {
      "type": "array",
      "items": {"$ref": "#/contextCoordinate"}
    }
  }
}

export default knowledge
export const dependencies = deps.concat(contextCoordinate)
export const validate = validatorWithDependencies(knowledge, dependencies)

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
