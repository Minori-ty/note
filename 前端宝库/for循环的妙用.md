```js
var arr = [7, 8, 9]
const q = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num)
        }, 2000)
    })
}
async function fn() {
    for (let i = 0; i < arr.length; i++) {
        const data = await q(arr[i])
        console.log(data)
    }
}
fn()
```

