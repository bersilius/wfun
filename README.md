# wfun

Wrap your plain JS functions into different functions, based on common patterns for plugins and middlewares.

The concept is that you want to write the business logic one way, but reuse it in multiple environment.

Note: This package is a part of a larger project. It is about how to run plain JS functions as a deployable container.
Anyway you may not find this package useful on its own or you may have to include it in your own plugin or middleware logic.

Please check also the following packages that contains this package:

[pfun]()
[cfun]()

## About
It is common when you want to handle messages in a network environment, you will receive an object that contains request/input data and another object that contains response callback function (even if it is a property like ```res.send(...)``` or a ```msg.payload```).
But there are tons of code (really cool packages) not designed to receive its expected argument that way.
We have to wrap them into functions to map the request object properties and/or a callback to arguments and then call the actual business logic.

Examples:

Request:
```
{
    payload: { string: 'someString', target: 'S', position: '5' }
}
```

Wrap 'endsWith' function from Lodash package
```javascript
const wfun = require('wfun')

const { endsWith } = require('lodash')

const wrappedFunction = wfun(endsWith, {
    argsPath: 'payload',
    map: [ 'string', 'target', 'position' ]
})

// (msg, cb) => cb(null, _.endsWith(msg.payload.string, msg.payload.target, msg.payload.position))

```

## Installation

Run the install command:

    npm install wfun

## Usage

```javascript
const wfun = require('wfun')

const businessLogic = require('')

const wrappedBusinessLogic = wfun()
```