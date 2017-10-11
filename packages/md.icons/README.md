# md.icons

Material icons for React.

## Install

```bash
npm install md.icons
```

## Usage

```js
import * as Icons from 'md.icons'

<Icons.Check />
<Icons.ThumbUp size={20} />
```

## Props

### `size: number | string`

Set `width` and `height` prop.

### `align: string`

Align icon to text.

```js
<Button>
  <Icons.Comment align="center" />
  Comment
</Button>
```

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
