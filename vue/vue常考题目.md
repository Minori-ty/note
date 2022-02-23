# vue2响应式原理

vue2是通过Object.defineProperty()对属性的读取和修改进行拦截

对数组是用

```js
Object.defineProperty(data, "count", {
	get() {},
    set() {}
})
```

但是对于新增属性或者直接用下标修改数组，没有办法做到响应式

## 解决办法

使用this.$set Vue.set 和this.$delete Vue.delete，以及数组的splice对数据进行修改，可以做到响应式

