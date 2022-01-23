# vue指令

## v-cloak

在标签中设置v-cloak，设置属性选择器

```
[v-cloak]{
	display:none;
}
```

## v-once

只初始化渲染一次

## v-bind

如果想将data中多个对象样式绑定给标签，可以通过数组的模式赋值

v-bind:style='[obj1, obj2]'

## @keyup
@keyup.enter='fn'
### 自定义按键
Vue.config.keyCodes.F1 = 112

## v-自定义指令

### directive全局指令

在vue实例的上面

```
Vue.directive("color",{
	bind:function(el,obj){
		el.style.color='red'
	}
})
```

### directives局部指令

在vue实例的里面

```
directives: {
    blue: {
      bind(el) {
        el.style.color = 'blue'
      },
    },
  },
```

# computed计算属性

```
computed:{
	value(){
		return val
	}
}
```

# filter过滤器

## filter全局过滤器

```
Vue.filter('filter',(val)=>{
		var newval = val.trim()
		return newval
})
```

## filters局部过滤器

```
filters:{
	filter(val){
		var newval = val.trim()
		return newval
	}
}
```

过滤器可以连续使用

```
{{val | filter1 | filter2}}
```

# watch

```
data:{
	num:0
}

watch:{
	num(newval, oldval){
		...
	}
}
```

监听路由地址的变化

```
"$store.path":function(newpath,oldpath){
	...
}
```

# transition动画

```
mode="out-in"
```

把想要添加动画的元素放到transition里面，并且配合v-show使用。

一个transition只能放一个元素。

```
      <transition>
        <div class="div" v-show="isShow"></div>
      </transition>
```

添加动画的类

```
.v-enter {
	opacity: 0;
}
.v-enter-to {
	opacity: 1;
}
.v-enter-active {
	transition: all 3s;
}
  
.v-leave{
	opacity: 1;
}
.v-leave-to{
	opacity: 0;
}
.v-leave-active{
	transition: all 3s;
}
```

使页面初始化时就有动画，则给transition添加appear属性

```
<transition appear>
	...
</transition>
```

默认是查找上面6个类，动画都是一样的。但是要设置不同元素不同动画，则给transition添加name属性，则会去查找name里面开头的类

```
<transition appear name='one'>
	...
</transition>
<transition appear name='two'>
	...
</transition>
```

```
.one-leave{
	opacity: 1;
}
.two-leave{
	opacity: 1;
}
```

用js钩子函数实现动画时，不让transition绑定css类

```
<transition v-bind:css="false">
	...
</transition>
```

钩子函数执行动画时，如果想一进来就有动画，要给done()延迟

```
setTimeout(() => {
  done()
})
```

## transition-group动画

默认情况下，transition-group会变成span，可通过tag属性指定变换的元素

```
<transition-group tag="div">
	...
</transition-group>
```

# vue组件

## 全局组件

```
Vue.component('navbar', {
  template: `
    <ul>
      <li>个人中心</li>
      <li>大会员</li>
      <li>消息</li>
    </ul>
  `,
})
```

```
<template id="temp">
	<ul>
      <li>个人中心</li>
      <li>大会员</li>
      <li>消息</li>
    </ul>
</template>

Vue.component('navbar',{
	template:'#temp'
})
```

## 局部组件

```
components:{
	"navbar":{
		template:'#temp'
	}
}
```

```
components: {
    abc: {
      template: `
        <div>{{msg}}</div>
      `,
      data() {
        return {
          msg: '组件',
        }
      },
    },
  }
```

```
var navbar = {
	template: `
        <div>{{msg}}</div>
      `,
      data() {
        return {
          msg: '组件',
        }
      },
}

components:{
	navBar:navbar
}
```

驼峰式命名法，可在模板字符串中直接使用，但是在根标签中使用的话，会有问题，要改成短横线。

## 动态组件切换

```
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

```
toggle(){
	this.xx==='xxa'?xxa:xxb
}
```

## 组件间传值

### 父子组件传值

通过v-bind自定义属性名称，将父级数据传给子级，该属性名称作为子级的数据变量名称，通过props接收。

```
//父级拥有msg的数据
data:{
	msg:'父亲的数据'
}

<father>
	<son :famsg='fa'></son>
</father>

//子组件
props:['famsg']
```

传方法

父组件通过自定义事件，将自己的方法传给该子组件的自定义事件。

在子组件中，通过自定义方法触发，在方法中用this.$emit('自定义事件名称')接收。

在this.$emit('xx', data)后面传递参数。

```javascript
import './node_modules/vue/dist/vue'

var son = {
  template: `
    <div @click='son'>子组件</div>
  `,
  methods: {
    son() {
      this.$emit('sonFn','子组件中的数据')
    },
  },
}

var father = {
  template: `
  <div>
    <div @click='faFn'>父组件</div>
    <son @sonFn='faFn'></son>
  </div>
  `,
  methods: {
    faFn(data) {
      alert('父组件的方法')
    },
  },
  components: {
    son,
  },
}

const vm = new Vue({
  el: '#app',
  components: {
    father,
  },
})

```

### 子组件获取父组件数据

```
this.$parent.data
this.$parent.methods()
```

### 父组件获取子组件数据

```
this.$refs.component.data
this.$refs.component.methods()
```

## vue3的用法

```javascript
//校验传递参数是否合法
props:{
	msg:String
},

//校验传递参数是否合法
emits:{
	submit(paramsA,paramsB){
		if(...){
			...
		}
	}
}
```

## 组件命名规则

```html
//注册组件时，如果用驼峰命名的话，则在html文件使用中，用短横线分割。并且把大写字母改成小写字母。
components:{
	myFather:father
}
<my-father></my-father>
```

```
//传递参数时，不能用驼峰命名，用短横线命名时，在props中要使用驼峰命名
<son :fa-data='data'></son>

props:['faDate']
{{faDate}}
```

```
//传方法时，永远只能用短横线命名，不能用驼峰命名
```

## 匿名插槽

一个组件只用一个匿名插槽，其他都用具名插槽。

```
<temp><div>组件里面写内容是看不到的</div></temp>
```

组件里面写内容是看不见的，要使能看见，用插槽。

插槽有默认值，如果使用者没有填这个插槽，则会显示出默认数据。

插槽是写在组件中的。

```
//组件
temp:
template:`
	<div>
		<div>普通数据</div>
		<slot>默认数据</slot>
	</div>
`

<temp><div>内容可以看见了</div></temp>
```

## 具名插槽

```
//在组件内定义时
<slot name="first"></slot>

//在html内使用时
<div slot="first"><div>内容可以看见了</div></div>
```

## v-slot

```
//在组件内定义时
<slot name="first"></slot>

//在html内使用时
<son>
	<template v-slot="first">
		<div>内容可以看见了</div>
	</template>
</son>
```

v-slot可以用#代替

## 独占默认插槽

```
<componentName v-slot="slotname" :data="data">
	<div>
		...
	<div>
</componentName>
```



## slot-scope

```
var son = {
  template: `
    <div>
      <div>{{msg}}</div>
      <slot name="slot" :sonmsg='msg'>插槽</slot>
    </div>
  `,
  data() {
    return {
      msg: '数据',
    }
  },
}

var father = {
  template: `
  <div>
    <div>父组件</div>
    <son>
      <template #slot="data">
        <div>slot{{data.sonmsg}}</div>
      </template>
    </son>
  </div>
  `,
  components: {
    son,
  },
}
```

# vuex

```
const store = new Vuex.Store({
	state:{
		...
	},
	mutations:{
		...
	}
})

//在vue实例中挂载store
//然后可以通过this.$store.state.xxx访问数据
```

## mutations

```
mutations:{
	add(state){
		state.count++
	}
}

//调用时
this.$store.commit("add")
```

## getters

```
getters:{
	formart(state){
		return state.msg+'..'
	}
}

//调用时
this.$store.getters.formart
```

# vue-router

```
import './node_modules/vue/dist/vue'
import VueRouter from 'vue-router'

const one = {
  template: `
    <div>第一个组件</div>
  `,
}
const two = {
  template: `
    <div>第二个组件</div>
  `,
}

const routes = [
  { path: '/one', component: one },
  { path: '/two', component: two },
]

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
})

const vm = new Vue({
  el: '#app',
  router,
  components: {
    one,
    two,
  },
})
```

```
<div id="app">
      <router-link to="/one">第一个组件</router-link>
      <router-link to="/two">第二个组件</router-link>
      <router-view></router-view>
</div>
```

## 嵌套路由

```
const routes = [
  {
    path: '/one',
    component: one,
    children: [
      {
        path: 'one-one',
        component: oneOne,
      },
      {
        path: 'one-two',
        component: oneTwo,
      },
    ],
  },
  { path: '/two', component: two },
]
```

## 路由守卫

### 全局路由守卫

```javascript
router.beforeEach((to, from, next)=>{
	next()
})
```

```javascript
router.afterEach((to, from, next)=>{
	next()
})
```

### 独享路由守卫

只有beforeEnter

```
routes:[
	{
		path:'/',
		beforeEnter:(to, from, next)=>{
			next()
		}
	}
]

```

### 组件内守卫

beforeRouterEnter(to ,from, next)



```
通过路由规则
beforeRouterEnter(to ,from, next){
	
}

beforeRouterLeave(to ,from, next){
}
```

