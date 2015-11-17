import assert                            from 'assert'
import { _regex, deserialize, serialize } from '../src/header.js'

describe('header', () => {
  describe('#serialize', () => {
    it('serializes the header obj', () => {
      const str = serialize({version: 1.0, contentLength: 53, command: 'insert'})
      assert(str == 'SIP/1.0 53\ncommand insert\n\n')
    })
  })

  describe('#deserialize', () => {
    it('doesnt match returns false and old buffer', () => {
      const [ header, buff ] = deserialize('blablabla')
      assert(header == false)
      assert(buff == 'blablabla')
    })

    it('matches returns header and body', () => {
      const headerOld                = { version: 1.0, contentLength: 53, command: 'insert' }
      const body                     = 'blablabla'
      const head                     = serialize(headerOld)
      const [ header, buff ]         = deserialize(head + body)
      assert(JSON.stringify(header) == JSON.stringify(headerOld))
      assert(buff == body)
    })
  })

  describe('#regex', () => {
    it('matches string', () => {
      var match = _regex().exec("SIP/1.0 423\ncommand insert\n\n")
      assert(match[1], '1.0')
      assert(match[2], '423')
      assert(match[3], 'insert')
    })

    it('dosnt match string', () => {
      var match = _regex().exec('SIP/1.0 ')
      assert(!match)
    })
  })
})
