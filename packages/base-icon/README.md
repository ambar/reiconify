# base-icon

Base icon for [reiconify](https://github.com/ambar/reiconify).

## Usage

```js
import BaseIcon from 'base-icon'

<BaseIcon size={40} fill={'red'}>
  <path />
</BaseIcon>
```

## Props

| Prop     | Type             | Default | Description                   |
| -------- | ---------------- | ------- | ----------------------------- |
| `size`   | `number, string` | `void`  | Set `width` and `height` prop |
| `center` | `boolean`        | `false` | Align icon to text            |
| `text`   | `boolean`        | `false` | Shortcut for `size="1.2em"`   |
