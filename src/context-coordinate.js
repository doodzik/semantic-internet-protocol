import interest, { dependencies as deps } from './interest'

export const dependencies = deps.concat(interest)

export default {
  "id":          "#/contextCoordinate",
  "$schema":     "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type":        "object",
  "required":    ["infoMetaInformation", "contextCoordinate"],
  "properties":  {
    "contextCoordinate": { "$ref": "#/interest" },
    "infoMetaInformation": "string"
  }
}

