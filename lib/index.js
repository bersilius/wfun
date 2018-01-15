// const _ = require('lodash')

const wrapper = require('./wrapper')
const { spiceLogic } = require('./utils')

module.exports = (fn, options) => {
    if (options.payloadType === 'array') {
        return wrapper.array(spiceLogic(fn, options), options)
    } else {
        return wrapper.object(spiceLogic(fn, options), options)
    }
}
