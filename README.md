# wfun

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

Wrap your plain JS functions into different functions, based on common patterns for plugins and middlewares.

The concept is that you want to write the business logic one way, but reuse it in multiple environment.

## Installation

Run the install command:

    npm install --save wfun

## About
It is common when you want to handle messages in a network environment, you will receive an object that contains request/input data and another object that contains response callback function (even if it is a property like ```res.send(...)``` or a ```msg.payload```).
But there are tons of code (really cool packages) not designed to receive its expected argument that way.
We have to wrap them into functions and map the request object properties and/or a callback to arguments and then call the actual business logic.

## Usage examples

#### Wrap 'endsWith' function from Lodash package

Incoming request object:
```javascript
{
    payload: { string: 'someString', target: 'S', position: '5' }
    // ... pattern, additional toolkit related properties, etc.
}
```

```javascript
const wfun = require('wfun')

const { endsWith } = require('lodash')

const wrappedFunction = wfun(endsWith, {
    argsPath: 'payload',
    map: [ 'string', 'target', 'position' ]
})

// wrappedFunction --> (msg, cb) => cb(null, _.endsWith(msg.payload.string, msg.payload.target, msg.payload.position))
```

## Notes

Although this library can be used alone, it is one of the artifacts of a proof-of-concept project, which is focusing to seperate the business logic implementation from the infrastructure logic to keep it as independent/adaptive/pure as possible.

If you are interested please also check the repositories listed below which can be used together to achieve the greater goal:

- [pluginizer](https://github.com/bersilius/pluginizer) - A tool to create plugins or middlewares for different Javascript tools, frameworks, servers.
- [npac](https://github.com/tombenke/npac) - A lightweight Ports and Adapters Container for applications running on Node.js platform.

[npm-badge]: https://badge.fury.io/js/wfun.svg
[npm-url]: https://badge.fury.io/js/wfun
[travis-badge]: https://api.travis-ci.org/bersilius/wfun.svg
[travis-url]: https://travis-ci.org/bersilius/wfun
[Coveralls]: https://coveralls.io/github/bersilius/wfun?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/bersilius/wfun/badge.svg?branch=master
