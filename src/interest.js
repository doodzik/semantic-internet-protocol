var { semanticTag, peer, direction, spatial, time } = require('./semantic-tag')

function validate(obj) {
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

function deserialize(buffer) {
  var obj = JSON.parse(buffer)
  validate(obj)
  return obj
}

function serialize(obj) {
  validate(obj)
  var buffer = JSON.stringify(obj)
  return buffer
}

module.exports = { deserialize, serialize, validate }
