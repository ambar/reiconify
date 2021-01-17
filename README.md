# reiconify

Convert SVG icons to React components.

## Features

- Custom component templates, includes base class.
- Export both ES modules and CommonJS modules.
- Provide `center` prop for aligning icon with text，see [how it works](http://ambar.li/reiconify/md.icons/#/Align).
- Provide dev tool for generating static icon site.
- Generate unique IDs for SVG elements if needed.
- Format codes with [Prettier](https://github.com/prettier/prettier)

## Install

```
npm install reiconify-cli --save-dev
```

## CLI Options

```
reiconify [options] [files]

Options:
  --version  Show version number                                       [boolean]
  --src      Build JSX source files                   [boolean] [default: false]
  --src-dir  JSX output directory                      [string] [default: "src"]
  --es       Build ES module files                    [boolean] [default: false]
  --es-dir   ES output directory                        [string] [default: "es"]
  --cjs      Build CommonJS files                     [boolean] [default: false]
  --cjs-dir  CommonJS output directory                 [string] [default: "cjs"]
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
  baseClassName: 'Icon',
  baseDefaultProps: {
    viewBox: '0 0 24 24',
  },
  svgoPlugins: [
    {
      removeAttrs: {attrs: ['fill', 'svg:(viewBox)']},
    },
  ],
}
```

## CLI Usage

Add npm scripts:

```json
{
  "name": "my-icons",
  "main": "cjs/index.js",
  "module": "es/index.js",
  "files": ["src", "es", "cjs"],
  "scripts": {
    "start": "reiconify --serve",
    "build": "reiconify --src --es --cjs icons/*.svg"
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

## API Usage

```js
import {transform} from 'reiconify'

const code = transform(svg)
```
