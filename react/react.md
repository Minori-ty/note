```jsx
export default function Function() {
    console.log(this)
    let count = 0
    function show() {
        count++
        console.log(count)
    }

    const f = true
    return (
        <div>
            <h1 onClick={show}>home</h1>
            <h2>{count}</h2>
        </div>
    )
}
```

# props

```
```

# ref

```jsx
const node = React.createRef()
<h1 ref={node> props:{props.name}</h1>
node.current.value


<h1 ref={(x) => console.log(x)}> props:{props.name}</h1>
```

