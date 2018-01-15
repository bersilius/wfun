const _ = require('lodash')
const expect = require('chai').expect

const utils = require('./utils')

describe('utils', () => {
    const init = () => 'intialValue'

    expect(init()).eql('intialValue')

    it('getParamNames', done => {
        const expectedParamNames = ['a', 'b', 'c', 'a1', 'b1', 'c1']

        const testFunction = (a, b = init(), c, a1, b1, c1) => {
            return b
        }

        expect(testFunction('a', undefined, 'c', 'a1', 'b1', 'c1')).eql('intialValue')
        expect(testFunction('a', null, 'c', 'a1', 'b1', 'c1')).eql(null)

        const paramNames = utils.getParamNames(testFunction)

        expect(_.size(_.intersection(expectedParamNames, paramNames))).eql(6)
        
        done()
    })

    it('spiceLogic', done => {
        const testFunction = context => (/* a, b */) => {
            return context
        }

        expect(testFunction({ success: true })(/* a, b */)).eql({ success: true })

        done()
    })

    it('resolveArgsPath', done => {
        expect(utils.resolveArgsPath(null)).eql('')
        expect(utils.resolveArgsPath('')).eql('')
        expect(utils.resolveArgsPath('payload')).eql('payload.')

        done()
    })
})