## How to Align

a. Using `inline-flex` wrapper and [strut](https://www.w3.org/TR/CSS22/visudet.html#strut) hack. (Perfect.)

```js
<button>
  <span style={{display: 'inline-flex', alignItems: 'center'}}>
    {'\u200b'/* ZWSP(zero-width space) */}
    <Icons.Heart text />
  </span>
  Like
</button>

// This is how `center` prop works:
<button>
  <Icons.Heart text center />
  Like
</button>
```

b. Using `flex` or `inline-flex` container. (Perfect.)

```js
<button style={{display: 'flex', alignItems: 'center'}}>
  <Icons.Heart text />
  Like
</button>
```

c. Using `vertical-align: middle`. (Perfect, but requires extra tag to wrap text.)

```js
<button>
  <Icons.Heart text style={{verticalAlign: 'middle'}} />
  <span style={{verticalAlign: 'middle'}}>Like</span>
</button>
```

d. Using `top` offset hack. (Acceptable, font-specific offset.)

```js
<button>
  <Icons.Heart text style={{verticalAlign: 'middle', position: 'relative', top: '-.1em'}} />
  Like
</button>

// top = (xHeight/2 - capHeight/2) / unitsPerEm ≈ .5em/2 - .7em/2
// query font metrics: https://opentype.js.org/font-inspector.html
```
