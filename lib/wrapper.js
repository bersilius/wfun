const _ = require('lodash')

const utils = require('./utils')

const extractArgsByMap = (msg, options) => _.reduce(
    options.map,
    (accu, path) => [ ...accu, _.property(`${options.argsPath}${path}`)(msg) ],
    []
)

module.exports.object = (fn, options) => {
    options.argsPath = utils.resolveArgsPath(options.argsPath)

    if (options.isAsync) {
        if (!options.map) {
            options.map = _.initial(utils.getParamNames(fn))
        }

        if (options.pre && !options.post) {
            return (msg, cb) => fn(...extractArgsByMap(options.pre(msg), options), cb)
        }

        if (!options.pre && options.post) {
            return (msg, cb) => fn(...extractArgsByMap(msg, options), options.post(cb))
        }

        if (options.pre && options.post) {
            return (msg, cb) => fn(...extractArgsByMap(options.pre(msg), options), options.post(cb))
        }

        return (msg, cb) => fn(...extractArgsByMap(msg, options), cb)
    } else {
        if (!options.map) {
            options.map = utils.getParamNames(fn)
        }

        if (options.pre && !options.post) {
            return (msg, cb) => cb(null, fn(...extractArgsByMap(options.pre(msg), options)))
        }

        if (!options.pre && options.post) {
            return (msg, cb) => options.post(cb)(null, fn(...extractArgsByMap(msg, options)))
        }

        if (options.pre && options.post) {
            return (msg, cb) => options.post(cb)(null, fn(...extractArgsByMap(options.pre(msg), options)))
        }

        return (msg, cb) => cb(null, fn(...extractArgsByMap(msg, options)))
    }
}

module.exports.array = (fn, options) => {
    if (options.isAsync) {
        if (options.pre && !options.post) {
            return (msg, cb) => fn(..._.property(options.argsPath)(options.pre(msg)), cb)
        }

        if (!options.pre && options.post) {
            return (msg, cb) => fn(..._.property(options.argsPath)(msg), options.post(cb))
        }

        if (options.pre && options.post) {
            return (msg, cb) => fn(..._.property(options.argsPath)(options.pre(msg)), options.post(cb))
        }

        return (msg, cb) => fn(..._.property(options.argsPath)(msg), cb)
    } else {
        if (options.pre && !options.post) {
            return (msg, cb) => cb(null, fn(..._.property(options.argsPath)(options.pre(msg))))
        }

        if (!options.pre && options.post) {
            return (msg, cb) => options.post(cb)(null, fn(..._.property(options.argsPath)(msg)))
        }

        if (options.pre && options.post) {
            return (msg, cb) => options.post(cb)(null, fn(..._.property(options.argsPath)(options.pre(msg))))
        }

        return (msg, cb) => cb(null, fn(..._.property(options.argsPath)(msg)))
    }
}
