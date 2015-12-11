import msgpack           from 'msgpack-lite'
import contextCoordinate from './context-coordinate'

export function validate(obj) {
  if (typeof obj.vocabulary !== 'string') {
    throw new Error('vocabulary requeired')
  }
  if (typeof obj.infoContent !== 'string') {
    throw new Error('vocabulary requeired')
  }
  if (obj.contextCoordinates) {
    obj.contextCoordinates.forEach(val => contextCoordinate(val) )
  }
}

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

export default { deserialize, serialize }
