import msgpack                                         from 'msgpack-lite'
import semanticTag, { peer, direction, spatial, time } from 'semantic-tag'

export function validate(obj) {
  if(obj) {
    if (obj.topics) {
      obj.topics.forEach(val => semanticTag(val) )
    }
    if (obj.believers) {
      obj.believers.forEach(val => peer(val) )
    }
    if (obj.peer)
      peer(obj.peer)
    if (obj.recipients) {
      obj.recipients.forEach(val => peer(val) )
    }
    if (obj.locations) {
      obj.locations.forEach(val => spatial(val) )
    }
    if (obj.times) {
      obj.times.forEach(val => time(val) )
    }
    if (obj.directions) {
      obj.directions.forEach(val => direction(val) )
    }
  }
}

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
