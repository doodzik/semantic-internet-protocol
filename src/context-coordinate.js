var interest = require('./interest')

module.exports = function validate(obj) {
  if(obj.infoMetaInformation !== 'string')
    throw new Error('infoMetaInformation needs to be a string')
  interest(obj.contextCoordinate)
}

