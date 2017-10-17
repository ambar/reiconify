# reiconify

Convert SVG icons to React components.

## Install

```
npm install reiconify --save-dev
```

## CLI Options

```
reiconify [options] [files]

Options:
  --version  Show version number                                       [boolean]
  --src      Build JSX source files                   [boolean] [default: false]
  --es       Build ES module files                    [boolean] [default: false]
  --cjs      Build CommonJS files                     [boolean] [default: false]
  --serve    Serve source icons                       [boolean] [default: false]
  --static   Build static site                        [boolean] [default: false]
  -h         Show help                                                 [boolean]
```

## Configuration File

Add `reiconify.config.js`(optional) to your project:

```js
module.exports = {
  template: Function,
  baseTemplate: Function,
  filenameTemplate: Function,
  defaultProps: {},
  baseDefaultProps: {
    defaultClassName: 'Icon',
    viewBox: '0 0 24 24',
  },
  baseMapProps: {
    text: {size: '1.2em'},
    gray: {fill: 'gray'},
  },
  svgoPlugins: [
    {
      removeAttrs: {attrs: ['fill', 'svg:(viewBox)']},
    },
  ],
}
```

## Usage

Add npm scripts:

```json
{
  "name": "my-icons",
  "main": "cjs/index.js",
  "module": "es/index.js",
  "files": ["src", "es", "cjs"],
  "scripts": {
    "start": "reiconify --serve",
    "build": "reiconify --src --es --cjs icons/*.svg",
  }
}
```

Structure SVG files:

```
icons
├── check.svg
├── thumb-up.svg
└── ...
```

Build icons:

```
npm run build
```

Import icons:

```js
import * as Icons from 'my-icons'

<Icons.Check />
<Icons.ThumbUp size={20} fill={'#rgb'} />
```
