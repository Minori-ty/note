# ES6

##  8种数据类型

you are so niubity

- U  undefind
- A  array
- S   string  symbol
- O  object
- N  null number
- B  boolean

## 解构赋值

常用于对函数重复调用时，多写步骤。

```javascript
const obj = {
  name: 'xanxus',
  age: 12,
  fn: function () {
    console.log(this)
  },
}

//普通调用
obj.fn()
obj.fn()

//解构赋值
let { fn } = obj
fn()
```

## 对象的简化写法

允许在对象中直接写变量名

```javascript
let name = '张三'
let fn = function(){
	console.log('xxx')
}

const obj = {
	name,
	fn,
	//旧写法
	oldFn: function(){
		console.log('旧写法')
	}
    //新写法
	newFn(){
		console.log('新写法')
	}
}
```

## 箭头函数

### this是静态的

this指向函数声明所在的作用域下的this值，不能修改

应用在不使用this的场景

```javascript
//以前用that代替this
let div = document.getElementsByTagName('div')[0]
    div.addEventListener('click', function () {
      that = this
      setTimeout(function () {
        that.style.background = 'skyblue'
      }, 100)
    })

//用箭头函数
let div = document.getElementsByTagName('div')[0]
div.addEventListener('click', function () {
  setTimeout(() => (this.style.background = 'skyblue'), 100)
})
```

适合场景：定时器，数组方法的回调

不适合的场景：dom事件回调，对象的方法

### 箭头函数不能成为构造函数

### 没有arguments变量

## 函数参数赋初始值

```
//与解构赋值相结合
function connect({host,username,password}){
	...
}
connect({
	host:'localhost',
	username:'root',
	password:'root'
})
```

## ...运算符

### 函数中的rest参数

函数传入的参数个数和具体值可从arguments和rest中获取。但是argument是一个对象，而rest是数组，用rest可以用数组的方法，增大了灵活性。

```javascript
//要使用扩展运算符的方式
function fn(a, b, ...args){
	xxx
	console.log(args)
}
fn('xx','xsx','yxy','ss')

```

reset参数必须放在最后

### 扩展运算符

```javascript
//声明一个数组
const arr = ['张三', '李四', '王五']
function fn(a){
    console.log(a)
}
fn(...arr)//'张三'
//...arr实际上是将数组转成逗号分隔的序列 '张三', '李四', '王五'，相当于fn('张三', '李四', '王五')

//对象合并
//...obj将对象转成..., ...的形式
let obj1 = {
    ...
}
let obj 2 = {
    ...
}
let obj 3 = {
    ...
}
let obj 4 = {
    ...
}
obj = {...obj1, ...obj2, ...obj3, ...obj4}
```

#### 应用

将伪数组转成真数组

### reset和扩展运算符的区别

reset是放在定义函数时的形参，而扩展运算符是放在函数调用时的实参。

## Symbol

### 特性

- 类似于字符串
- Symbol值是唯一的
- 不能与其他数据进行运算
- 定义的对象属性不能使用for...in遍历，但可以使用Reflect.ownkeys

### 语法

```javascript
let s1 = Symbol()
let s2 = Symbol('xxx')//添加描述，值是不同的
let s3 = Symbol.for('xxx') //值是一样的
```

### 使用场景

给一个不确定的object对象添加方法，担心覆盖的问题

```javascript
//不确定obj
let obj = {
	fn1:function(){
		...
	}
	fn2:function(){
		...
	}
}
        
//声明一个methods对象
let methods = {
    fn1: Symbol()
    fn2: Symbol()
}

//方法一
obj[methods.fn1]=function(){
	...
}

obj[methods.fn2]=function(){
	...
}
   
//方法二
let game = {
    [Symbol('say')]: function(){
		...	
    }
    [Symbol('go')]: function(){
		...	
    }
}
```

## 迭代器

有Iterator接口的数据可以使用for...of进行遍历

- Array
- Arguments
- Set
- Map
- String
- TypedArray
- NodeList

## Set

Set类似于数组，集合了Iterator接口，可以使用扩展运算符和for...of进行遍历。

### 方法

#### size

返回集合元素的个数

#### add

增加一个新元素，返回当前集合

#### delete

删除元素，返回boolean值

#### has

检测集合中是否包含某个元素，返回boolean值

### 应用

#### 数组取交集

```javascript
let arr = [1, 2, 3, 4, 5, 2, 4, 2, 5]
let arr2 = [4, 5, 6, 7, 8]
let result = [...new Set(arr)].filter((item) => new Set(arr2).has(item))
console.log(result)
```

#### 数组取并集

```javascript
let arr = [1, 2, 3, 4, 5, 2, 4, 2, 5]
let arr2 = [4, 5, 6, 7, 8]
let union = [...new Set([...arr, ...arr])]
console.log(union)
```

## Map

Map类似于对象，采用键值对的形式，集合了Iterator接口，可以使用扩展运算符和for...of进行遍历。

### 方法

#### size

返回Map的元素个数

#### set

增加一个新的元素，返回当前Map

#### get

返回键名对象的键值

#### has

检测Map中是否包含某个元素，返回boolean值

#### clear

清空集合，返回undefined

## class类

### 定义

```javascript
class Father{
	type = 'person'
	static age = 44
	name:string
	
	constructor(name){
		this.name = name
	}
}


class Father{
    //公有属性
    ...;
    //私有属性
    #..;
    #..;
    constructor(params,...){
        this.params = params
        ...
    }
    xx(){
        ...
    }
}

class Foo {
  #a
  #b
  constructor(a, b) {
    this.#a = a
    this.#b = b
  }
  printSum() {
    console.log(this.#a)
  }
}

var foo = new Foo(7, 2)
foo.printSum()

```

私有属性只能类的内部访问，外部不能访问。

### 类的继承

```javascript
class Father{
    constructor(param,...){
        this.params = params
        ...
    }
    xx(){
        ...
    }
}

class Son extends Father{
	constructor(params,...){
        super(param,..)
        this.params = params
        ...
    }
    yy(){
        ...
    }
}
        
class Father {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
        
class Son extends Father {
  constructor(name, age, work) {
    super(name, age)
    this.work = work
  }
}
var son = new Son('小明', 23, '写作业')
console.log(son)
```

定义一个名字相同的函数，可以实现覆盖。

super表示父类。

如果要添加新的属性，用construction则会覆盖父类的construction。此时要用super调用父类的construction，传入参数。

然后把新的属性写进去就行了。

## 数值扩展

### Number.EPSILON

JavaScript能够表示的最小精度。【

### Number.trunc

将数字的小数部分抹除。

### Number.sign

判断一个数字到底是正数，负数还是零。

## 对象扩展

### Object.is

判断两个值是否完全相等

```
Object.is(NaN,NaN)
```

### Object.assign

对象合并。有相同属性则覆盖，没有则合并。

```
obj1 = {
	...
}

obj2 = {
	...
}

Object.assign(obj1,obj2)
```

### Object.setPrototypeOf

### Object.getPrototypeOf

## 模块化导入导出

### 第一种分别导入导出

```javascript
//m.js
export let a = 1
export let b = 2

//通用导入
<script type='module'>

	import * as m from 'm.js'
	console.log(m.a, m.b)
	
</script>

//解构赋值导入
<script type='module'>

	import { a, b } from 'm.js'
	console.log(a, b)
	
</script>
```

### 第二种一起导入导出

```javascript
//m.js
let a = 1
let b = 2
export { a, b }

//通用导入
<script type='module'>

	import * as m from 'm.js'
	console.log(m.a, m.b)
	
</script>

//解构赋值导入
<script type='module'>

	import { a as c, b } from 'm.js'
	console.log(a, b)
	
</script>
```

### 第三种默认导入导出

```javascript
//向外暴露出defaul这个对象
export default{
	let a = 1
 	let b = 2
}

//通用导入
<script type='module'>

	import * as m from 'm.js'
	m.default.a
	m.default.b
	
</script>

//解构赋值导入
<script type='module'>

	import { default as m } from 'm.js'
	console.log(m)
	
</script>

//简便形式，只针对默认导出
<script type='module'>

	import m from 'm.js'
	
</script>
```

### 在html文件引入js文件时

```
<script src="m.js" type='module'></script>
```

# ES7

## Array数组新特性

### array.includes

```
let arr = [...]
arr.includes()
```

### **幂运算

```
console.log(2 ** 2)
```

## Object新特性

### Object.keys

获取对象的键

### Object.values

获取对象的值

### Object.entries()

返回一个数组，数组里面又是键值对组成的数组。

```
let obj = {
	...
}
Object.keys(obj)
Object.values(obj)
Object.entries(obj)
```

# ES11

## 可选链操作符 ?.

对象的属性是否存在的简化写法。如果不写，不存在这个属性则会报错。

```
const config = {
	db:{
		host:127.0.0.1
	}
}

const result = config?.db?.host
console.log(result)
```

## 动态导入模块import()

import()返回的是promise

```
function fn(){
	import('./...js').then(module=>{
		module.xx()
	})
}
```

