const _ = require('lodash')

module.exports = ({
    getParamNames: fn => {
        let stack = 1
        const fnString = fn.toString()

        return _.chain(fnString)
            .slice(fnString.indexOf('(') + 1, fnString.length)
            .takeWhile(character => {
                if (character === '(') {
                    stack++
                }

                if (character === ')') {
                    stack--
                }

                return stack >= 1
            })
            .join('')
            .split(',')
            .map(arg => _.trim(arg))
            .map(arg => _.join(_.takeWhile(arg, character => (character !== ' ' && character !== '=')), ''))
            .valueOf()
    },
    spiceLogic: (logic, options) => {
        if (options.curry) {
            return logic(...options.curry)
        }

        return logic
    },
    resolveArgsPath: argsPath => {
        if (argsPath && argsPath.length !== 0 && _.last(argsPath) !== '.') {
            return `${argsPath}.`
        } else {
            return ''
        }
    }
})
