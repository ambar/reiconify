# reiconify

Convert SVG icons to React components.

## Features

- Custom component templates, including base class/template.
- Export both ES modules and CommonJS modules.
- Provide `center` prop for aligning the icon with text, see also [react-inline-center](https://www.npmjs.com/package/react-inline-center).
- Provide dev tool for generating static icon site.
- Generate unique IDs for SVG elements if needed.
- Format codes with [Prettier](https://github.com/prettier/prettier)

## Install

```bash
npm install reiconify --save-dev
# optional serving icons
npm install reiconify-serve --save-dev
```

## CLI Options

```bash
# reiconify -h

reiconify [options] [files]

Options:
      --version     Show version number                                [boolean]
      --src         Whether to output JSX files       [boolean] [default: false]
      --src-dir     JSX output directory               [string] [default: "src"]
      --es          Whether to output ES module files [boolean] [default: false]
      --es-dir      ES output directory                 [string] [default: "es"]
      --cjs         Whether to output CommonJS files  [boolean] [default: false]
      --cjs-dir     CommonJS output directory          [string] [default: "cjs"]
      --svg         Whether to output optimized SVG files
                                                      [boolean] [default: false]
      --svg-dir     Optimized SVG output directory     [string] [default: "svg"]
      --svg-rename  Whether to rename optimized SVG files (based on filename
                    template)                          [boolean] [default: true]
  -h                Show help                                          [boolean]

# reiconify-serve -h

Options:
      --version  Show version number                                   [boolean]
      --src-dir  JSX output directory                  [string] [default: "src"]
      --build    Build static site                    [boolean] [default: false]
  -h             Show help                                             [boolean]
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
    "start": "reiconify-serve",
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

const code = transform(svg, {format: 'esm', baseName: 'base-icon'})
```

## Use with Vite

See [vite-plugin-reiconify](./packages/vite-plugin-reiconify/README.md)

## Use with webpack

See [reiconify-loader](./packages/reiconify-loader/README.md)
