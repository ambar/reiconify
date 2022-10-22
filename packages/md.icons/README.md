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
// magically aligned to text
<button>
  <mdi.ThumbUp center /> Like
</button>
```

## Props

| Prop     | Type               | Default | Description                                                                                                      |
| -------- | ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `size`   | `number \| string` | `void`  | Set `width` and `height` prop                                                                                    |
| `center` | `boolean`          | `false` | Align icon to text, magically, see also [react-inline-center](https://www.npmjs.com/package/react-inline-center) |
| `text`   | `boolean`          | `false` | Shortcut for `size="1.2em"`                                                                                      |

## Development

```
npm start
```
