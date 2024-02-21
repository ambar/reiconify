# vite-plugin-reiconify

Vite plugin for [reiconify](https://github.com/ambar/reiconify).

## Usage

Add plugin to `vite.config.js`:

```js
import react from '@vitejs/plugin-react'
import reiconify from 'vite-plugin-reiconify'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    react(),
    // for web
    reiconify(),
    // for React Native
    // reiconify({native: true}),
  ],
}
```

Import icons:

```js
/// <reference types="vite/client" />

// types for web
/// <reference types="vite-plugin-reiconify/client" />

// types for React Native
/// <reference types="vite-plugin-reiconify/native" />

// top-level import
import AlarmIcon from './icons/alarm.svg?react'

// glob import
const svgIcons = import.meta.glob('./icons/**/*.svg', {
  eager: true,
  import: 'default',
  query: 'react',
})

// load with url or raw text
import checkUrl from './icons/check.svg'
import checkSVG from './icons/check.svg?raw'
import CheckIcon from './icons/check.svg?react'
```
