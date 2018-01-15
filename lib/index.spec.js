const _ = require('lodash')
const expect = require('chai').expect

const wfun = require('./index')

const starWarsNames = require('starwars-names')

describe('wfun - array', () => {
    const businessLogicSync = (a, b) => ({
        groupA: starWarsNames.random(a),
        groupB: starWarsNames.random(b)
    })
        
    it('wrap - sync', done => {
        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'array',
            argsPath: 'payload'
        })

        wrappedBusinessLogic({
            payload: [10000, 10000]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(2)
            expect(_.size(res.groupA)).eql(10000)
            expect(_.size(res.groupB)).eql(10000)

            done(err)
        })
    })
        
    it('wrap - sync - pre', done => {
        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'array',
            argsPath: 'payload',
            pre: msg => {
                msg.payload = _.reverse(msg.payload)
                return msg
            }
        })

        wrappedBusinessLogic({
            payload: [5000, 10000]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(2)
            expect(_.size(res.groupA)).eql(10000)
            expect(_.size(res.groupB)).eql(5000)

            done(err)
        })
    })
        
    it('wrap - sync - post', done => {
        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'array',
            argsPath: 'payload',
            post: cb => (err, res) => {
                cb(null, { payload: _.size(_.concat(res.groupA, res.groupB)) })
            }
        })

        wrappedBusinessLogic({
            payload: [5000, 10000]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res.payload).eql(15000)

            done(err)
        })
    })
        
    it('wrap - sync - pre-post', done => {
        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'array',
            argsPath: 'payload',
            pre: msg => {
                msg.payload = _.reverse(msg.payload)
                return msg
            },
            post: cb => (err, res) => {
                cb(null, { payload: _.size(_.concat(res.groupA, res.groupB)) })
            }
        })

        wrappedBusinessLogic({
            payload: [5000, 10000]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res.payload).eql(15000)

            done(err)
        })
    })

    const businessLogicAsync = (a, b, cb) => {
        setTimeout(() => cb(null, {
            groupA: starWarsNames.random(a),
            groupB: starWarsNames.random(b)
        }), 50)
    }

    it('wrap - async', done => {
        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'array',
            argsPath: 'payload',
            isAsync: true
        })

        wrappedBusinessLogic({
            payload: [3, 3]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(2)
            expect(_.size(res.groupA)).eql(3)
            expect(_.size(res.groupB)).eql(3)

            done(err)
        })
    })

    it('wrap - async - pre', done => {
        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'array',
            argsPath: 'payload',
            isAsync: true,
            pre: msg => {
                msg.payload = _.reverse(msg.payload)
                return msg
            }
        })

        wrappedBusinessLogic({
            payload: [3, 4]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(2)
            expect(_.size(res.groupA)).eql(4)
            expect(_.size(res.groupB)).eql(3)

            done(err)
        })
    })

    it('wrap - async - post', done => {
        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'array',
            argsPath: 'payload',
            isAsync: true,
            post: cb => (err, res) => {
                cb(null, { payload: _.size(_.concat(res.groupA, res.groupB)) })

            }
        })

        wrappedBusinessLogic({
            payload: [3, 4]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res.payload).eql(7)

            done(err)
        })
    })

    it('wrap - async - pre-post', done => {
        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'array',
            argsPath: 'payload',
            isAsync: true,
            pre: msg => {
                msg.payload = _.reverse(msg.payload)
                return msg
            },
            post: cb => (err, res) => {
                cb(null, { payload: _.size(_.concat(res.groupA, res.groupB)) })

            }
        })

        wrappedBusinessLogic({
            payload: [5, 10]
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res.payload).eql(15)

            done(err)
        })
    })
})


describe('wfun - object', () => {
    it('wrap - sync - match argument names', done => {
        const businessLogicNoMapSync = (a, b) => ({
            groupA: starWarsNames.random(a),
            groupB: starWarsNames.random(b)
        })

        const wrappedBusinessLogic = wfun(businessLogicNoMapSync, {
            payloadType: 'object',
            argsPath: 'payload'
        })

        wrappedBusinessLogic({
            payload: {
                a: 10000,
                b: 10000
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(2)
            expect(_.size(res.groupA)).eql(10000)
            expect(_.size(res.groupB)).eql(10000)

            done(err)
        })
    })

    it('wrap - async - match argument names', done => {
        const businessLogicNoMapAsync = (a, b, cb) => {
            setTimeout(() => cb(null, {
                groupA: starWarsNames.random(a),
                groupB: starWarsNames.random(b)
            }), 50)
        }

        const wrappedBusinessLogic = wfun(businessLogicNoMapAsync, {
            payloadType: 'object',
            argsPath: 'payload',
            isAsync: true
        })

        wrappedBusinessLogic({
            payload: {
                a: 3,
                b: 3
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(2)
            expect(_.size(res.groupA)).eql(3)
            expect(_.size(res.groupB)).eql(3)

            done(err)
        })
    })
        
    const businessLogicSync = (a, b, c) => ({
        groupA: starWarsNames.random(a),
        groupB: starWarsNames.random(b),
        groupC: starWarsNames.random(c)
    })

    it('wrap - map', done => {
        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'object',
            argsPath: 'payload',
            map: [ 'first', 'second', 'third' ]
        })

        wrappedBusinessLogic({
            payload: {
                first: 3,
                second: 5,
                third: 8
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(3)
            expect(_.size(res.groupA)).eql(3)
            expect(_.size(res.groupB)).eql(5)
            expect(_.size(res.groupC)).eql(8)

            done(err)
        })
    })

    it('wrap - map (deep)', done => {
        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'object',
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ]
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(3)
            expect(_.size(res.groupA)).eql(3)
            expect(_.size(res.groupB)).eql(5)
            expect(_.size(res.groupC)).eql(8)

            done(err)
        })
    })

    it('wrap - sync - pre', done => {
        const msgPreModifier = msg => {
            msg.payload.first.amount++
            msg.payload.second.amount++
            msg.payload.third.amount++

            return msg
        }

        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'object',
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            pre: msgPreModifier
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(3)
            expect(_.size(res.groupA)).eql(4)
            expect(_.size(res.groupB)).eql(6)
            expect(_.size(res.groupC)).eql(9)

            done(err)
        })
    })

    it('wrap - sync - post', done => {
        const resultPostModifier = cb => (err, res) => {
            const modifiedResult = _.map(res, group => _.size(group))
            
            cb(err, modifiedResult)
        }

        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'object',
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            post: resultPostModifier
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res).eql([ 3, 5, 8 ])

            done(err)
        })
    })

    it('wrap - sync - pre-post', done => {
        const msgPreModifier = msg => {
            msg.payload.first.amount++
            msg.payload.second.amount++
            msg.payload.third.amount++

            return msg
        }

        const resultPostModifier = cb => (err, res) => {
            const modifiedResult = _.map(res, group => _.size(group))
            
            cb(err, modifiedResult)
        }

        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'object',
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            pre: msgPreModifier,
            post: resultPostModifier
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res).eql([ 4, 6, 9 ])

            done(err)
        })
    })

    const businessLogicAsync = (a, b, c, cb) => {
        setTimeout(() => cb(null, {
            groupA: starWarsNames.random(a),
            groupB: starWarsNames.random(b),
            groupC: starWarsNames.random(c)
        }), 50)
    }

    it('wrap - async - pre', done => {
        const msgPreModifier = msg => {
            msg.payload.first.amount++
            msg.payload.second.amount++
            msg.payload.third.amount++

            return msg
        }

        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'object',
            isAsync: true,
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            pre: msgPreModifier
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(3)
            expect(_.size(res.groupA)).eql(4)
            expect(_.size(res.groupB)).eql(6)
            expect(_.size(res.groupC)).eql(9)

            done(err)
        })
    })

    it('wrap - async - post', done => {
        const resultPostModifier = cb => (err, res) => {
            const modifiedResult = _.map(res, group => _.size(group))
            
            cb(err, modifiedResult)
        }

        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'object',
            isAsync: true,
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            post: resultPostModifier
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res).eql([ 3, 5, 8 ])

            done(err)
        })
    })

    it('wrap - async - pre-post', done => {
        const msgPreModifier = msg => {
            msg.payload.first.amount++
            msg.payload.second.amount++
            msg.payload.third.amount++

            return msg
        }

        const resultPostModifier = cb => (err, res) => {
            const modifiedResult = _.map(res, group => _.size(group))
            
            cb(err, modifiedResult)
        }

        const wrappedBusinessLogic = wfun(businessLogicAsync, {
            payloadType: 'object',
            isAsync: true,
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            pre: msgPreModifier,
            post: resultPostModifier
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(res).eql([ 4, 6, 9 ])

            done(err)
        })
    })
})

describe('wfun - spiceLogic', () => {
    it('wrap - with curry', done => {
        const businessLogicSync = ({ addition }) => (a, b, c) => ({
            groupA: starWarsNames.random(a + addition),
            groupB: starWarsNames.random(b + addition),
            groupC: starWarsNames.random(c + addition)
        })

        const wrappedBusinessLogic = wfun(businessLogicSync, {
            payloadType: 'object',
            argsPath: 'payload',
            map: [ 'first.amount', 'second.amount', 'third.amount' ],
            curry: [ { addition: 1 } ]
        })

        wrappedBusinessLogic({
            payload: {
                first: { amount: 3 },
                second: { amount: 5 },
                third: { amount: 8 }
            }
        }, (err, res) => {
            // console.log(err, res)
            expect(err).eql(null)
            expect(_.size(res)).eql(3)
            expect(_.size(res.groupA)).eql(4)
            expect(_.size(res.groupB)).eql(6)
            expect(_.size(res.groupC)).eql(9)

            done(err)
        })
    })
})
