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
            use: {
              loader: 'reiconify-loader',
              // whether to use React Native
              // options: {
              //   native: true,
              // },
            },
          },
          // optional fallback
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
// types for web
/// <reference types="reiconify-loader/client" />

// types for React Native
/// <reference types="reiconify-loader/native" />

// import React icon
import AlarmIcon from './icons/alarm.svg?react'

// load with url
import checkUrl from './icons/check.svg'
```
