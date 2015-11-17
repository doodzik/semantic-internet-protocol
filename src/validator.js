import { Validator } from 'jsonschema'

export function validatorWithDependencies (schema, deps) {
  var v = new Validator()
  deps.forEach(dep => v.addSchema(dep, dep.id))
  return obj => { v.validate(obj, schema) }
}
