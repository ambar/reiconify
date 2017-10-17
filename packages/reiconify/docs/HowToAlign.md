## How to Align

a. Using the magic `center` prop:

```js
<button>
  <Icons.Heart text center />
  Like
</button>
```

b. Using `flex`:

```js
<button style={{display: 'flex', alignItems: 'center'}}>
  <Icons.Heart text />
  Like
</button>
```

c. Using `vertical-align`(requires extra tag):

```js
<button>
  <Icons.Heart text style={{verticalAlign: 'middle'}} />
  ️️️<span style={{verticalAlign: 'middle'}}>Like</span>
</button>
```
