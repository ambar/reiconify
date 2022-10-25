# reiconify-loader

webpack loader for [reiconify](https://github.com/ambar/reiconify).

## Usage

Add plugin to `webpack.config.js`:

```js
/** @type {import('webpack').Configuration} */
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /react/,
            use: 'reiconify-loader',
          },
          {
            use: 'file-loader',
          },
        ],
      },
    ],
  },
}
```

Import icons:

```js
/// <reference types="reiconify-loader/client" />

// import React icon
import AlarmIcon from './icons/alarm.svg?react'

// load with url
import checkUrl from './icons/check.svg'
```
