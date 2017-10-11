## How to Align

a. Using the magic `align=center`:

```js
<button>
  <Icons.Heart align="center" />
  ️️️text
</button>
```

b. Using `flex`:

```js
<button style={{display: 'flex', alignItems: 'center'}}>
  <Icons.Heart />
  ️️️text
</button>
```

c. Using `vertical-align`(requires extra tag):

```js
<button>
  <Icons.Heart align="middle" />
  ️️️<span style={{verticalAlign: 'middle'}}>text</span>
</button>
```
