





# 常用命令

```
tsc index.ts
tsc --init
tsc -w
```

# 数据类型

![image-20210408003316177](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210408003316177.png)

```
unknown void never
tuple 固定长度数组 let arr:[string, number]
enum 枚举
enum Gender {
	male,
	female
}
```

## 数组

```
let arr: number[]
let d: (number | string)[]

//let arr: Array<number> 不常用
```

## 函数

```
function fn(params:string):number{
	return -params
}
```

## 对象

```
let obj:{
	name:string,
	[prop:string]:unknow //不确定属性
	age?:number          //可选属性
}
//必须要有name属性，其他可以随意
```

## 接口

```
interface user{
	name:string,
	age:number,
	say:()=>void
}

let p1:user={
	name:'Tom',
	age:22,
	say(){
		console.log('你好')
	}
}
```

## type

```typescript
type m = 1 | 2
type o = { name: string }
let k: m | 6
k = 6
let j: o & { age: number }
j = {
    name: 'ss',
    age: 18,
}
```

# 类型断言

```
let img = document.querySelector('xx') as HTMLxxx
```

# class类

```javascript
class Father{	
	name:string
	
	constructor(name:string){
		this.name = name
	}
}
```

### 简化写法(语法糖)

```
class Father{	
	constructor(public name:string){}
}
```



### 继承

```typescript
class Father {
    name: string  //ts独有的声明，es6没有

    constructor(name: string) {
        this.name = name
    }
}

class Son extends Father {
    age: number  //ts独有的声明，es6没有

    constructor(name: string, age: number) {
        super(name)	//这里是传入父类的参数
        this.age = age
    }
}
```



## 抽象类（不能被实例化，只能用来继承extends）

abstract

抽象类不能被实例化。

抽象方法必须定义在抽象类中，子类必须对方法重写。

```javascript
abstract class Father {
  name: string
  age: number
  constructor(name, age) {
    this.name = name
    this.age = age
  }
	abstract say():void;//强制让子类必须拥有这个方法
}
class Son extends Father {
  work: string
  constructor(name, age, work) {
    super(name, age)
    this.work = work
  }
	say(){
		xxx
    }
}
var son = new Son('小明', 23, '写作业')
console.log(son)
```

## 接口

```
interface Inter{
	name:string
	say():void;
}

class Father implements Inter{
	name:string
	constructor(name:string){
		this.name = name
	}
	
	say(){
		...
	}
}
```

### type和接口的区别

```
type可以定义任何类型的数据，而接口是用来定义类的。接口是定义标准的，用这个标准来创建类。
```



## public（默认值）

```javascript
class F{
	age:number
	constructor(age:number){
		this.age = age
	}
}

等价于

class F{
	constructor(public age:number){
	}
}
```

## private（私有属性）

```
private xx
```

外部不能访问，子类也不能。

```typescript
class F {
  private age: number

  constructor(age: number) {
    this.age = age
  }
  getAge() {	//向外暴露一个获取该属性的方法，可设置，可不设置。这样，属性的修改权就由自己掌控
    console.log(this.age)
  }
  setAge(age: number) { //向外暴露一个修改该属性的方法，可设置，可不设置。这样，属性的修改权就由自己掌控
    if (age > 0) this.age = age //这样在设置属性的时候，就可以自己掌控规则了
  }
}

var f = new F(23)
f.setAge(-12)
f.getAge()

或者
class F{
	private age: number
	
  	constructor(age: number) {
    	this.age = age
  	}
    
    get age(){
		return this.age
	}
    
    set age(value: number){
        if (age > 0) this.age = value
    }
}
```

## protected

在当前类和子类中可访问

# 泛型

```
function fn<T>(a:T):T{
	return a;
}
fn<number>(1)
fn<string>('xxx')


function fn<T, K>(a:T, b:K):T{
	return a;
}
fn<number, string>(1,'ss')


interface Inter{
	length: number
}
function fn<T extends Inter>(a:T):number{
	return a.length
}
```

## 类型约束

```typescript
interface Ilength {
	length: number
}

function getlenght<T extends Ilength>(params:T){ //不确定T类型是否有length，所以定义一个接口作约束
	return T.length
}

//传入的值一定要有length属性
getlenght('xxx')
```

# 模块化开发

## 定义cdn引入的全局变量

```typescript
declare const AMap:object

console.log(AMap)

declare class Person {
	name: string
    age: number
    constructor(name:string, age:number){}
}

declare module '*.jpg'
declare module '*.vue' {
	import {} from 'vue'
    
}
```



## 命名空间

```typescript
//比如jquery，只是为了拿到$里面的函数

declare namespace $ {
	export function ajax(url:string):any
}
    
$.ajax()
```



# tsconfig.js

```json
{
  "include": ["./src/**/*"],
  //默认值：["node_modules","bower_components","jspm_packages"]
  "exclude": ["./src/ex/**/*"],
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs"
  },
  "outDir": "./dist",
  //默认false
  "allowJs": true,
  //检查js语法，默认false
  "checkJs": true,
  //移除注释，默认false
  "removeComments": true,
  "strict": true,
  //语法错误不编译，默认false
  "noEmitOnError": true,
  //编译后的js文件是否使用严格模式，默认false
  "alwaysStrict": true,
  //检查any
  "noImplicitAny": true,
  //不允许不明确类型的this
  "noImplicitThis": true,
  //严格检查空值
  "noImplicitChecks": true
}
```

```
"use strict"
在js中开启严格模式

写了import，则自动进入严格模式
```

# webpack打包

```javascript
const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
}

```

