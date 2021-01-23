# md.icons

Material design icons for React.

> [Demo](https://ambar.li/reiconify/md.icons/#/Browse)

## Install

```bash
npm install md.icons
```

## Usage

```js
import * as mdi from 'md.icons'

<mdi.Check />
<mdi.ThumbUp size={20} fill="gray" />
```

## Props

| Prop     | Type             | Default | Description                   |
| -------- | ---------------- | ------- | ----------------------------- |
| `size`   | `number, string` | `void`  | Set `width` and `height` prop |
| `center` | `boolean`        | `false` | Align icon to text            |
| `text`   | `boolean`        | `false` | Shortcut for `size="1.2em"`   |

## Development

Pull latest icons, if needed:

```
npm install material-design-icons --save-dev
npm run build
```

Preview:

```
npm start
```
