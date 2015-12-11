import interest from './interest'

export default function validate(obj) {
  if(obj.infoMetaInformation !== 'string')
    throw new Error('infoMetaInformation needs to be a string')
  interest(obj.contextCoordinate)
}

