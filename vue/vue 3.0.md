# toRefs

```
const info = reactive({name:'zs', age:27})
let {name, age} = toRefs(info)
```

# toRef

```
const info = reactive({name:'zs', age:27})
let age = toRef(info, "age")
```

# 异步组件加载

```js
const home = defineAsyncComponent(() => import('./home.vue'))
```

# defineEmits父子组件传值

```js
必须在组件中
//Home.vue
interface emitType {
    (e: 'ws', data: number): void
}

const emits = defineEmits<emitType>()
function fn() {
    emits('ws',2)
}

父组件中
//App.vue
<Home @ws="fn"></Home>
const fn = (data:number) => {
    console.log(data++)
}

```

# defineProps父子组件传值

```typescript
const props = withDefaults(
	defineProps<{
		form?:string
	}>(),
	{
		form:'this is form'
	}
)




defineProps({
    msg: {
        type: Object,
        require: true,
        default(){
        	return { msg:'张三' }
    	}
    },
})
```

```vue
<Contact msg="111222"></Contact>
```

# Provide和Inject子孙组件通信

```vue
//父组件
const car = 'xxxx'
provide('name', car)
```

```vue
//子组件
import { inject } from 'vue'
const fn = inject('name')
```

响应式数据

```typescript
var arr = ref([1, 2, 3, 4])
var length = computed(() => arr.value.length)
provide('length', length)
console.log(arr.value.length)
function add() {
    arr.value.push(5)
    console.log(length.value)
}
```

# emitter兄弟组件通信

```typescript
import emitter from '../utils/eventbus'
function fn() {
    emitter.emit('why', { age: 12 })
}
```

```typescript
import emitter from '../utils/eventbus'
emitter.on('why', data => {
    console.log(`监听到了数据${data}`)
})

//监听所有事件
emitter.on('*', (type, data) => {
    console.log(type，data)
})

取消监听
emitter.all.clear()

const fn = ()=>{
    ...
}
emitter.on('type', fn)
emitter.off('type', fn)
```

# slot插槽

```vue
定义好slot
<slot />
```

## 默认插槽

```vue
<slot>
	<div></div>
</slot>
```

## v-slot:具名插槽

```vue
//父组件
<template>
    <son>
        <template #left>
            <h1>左</h1>
        </template>
        <template #center>
            <h1>中</h1>
        </template>
        <template #right>
            <h1>右</h1>
        </template>
    </son>
</template>
```

```vue
//子组件
<template>
    <h1>son</h1>
    <slot name="left"> </slot>
    <slot name="center"> </slot>
    <slot name="right"> </slot>
</template>
```

## v-slot=作用域插槽

让父组件可以向子组件指定的位置插入html结构

子组件要写插槽名，父组件要指定插槽。如果不写的话，则是默认插槽name="default" v-slot:default

v-slot可以简写成#，即#default

子组件向父组件传递数据时，使用自定义属性来传递  如item=""，index=""

而父组件则通过v-slot=“scope”来接收，可以简写成#default=“scope”，即#=“scope”

```vue
//父组件

<template>
    <son :left="left" :arr="arr">
        <template #son="scope">
            <button>{{ scope.item }}</button>
        </template>
    </son>
</template>

const arr = [7, 8, 9, 10]
```

```vue
//子组件

<template>
    <template v-for="(item, index) in arr">
        <slot :item="item" :index="index" name="son"></slot>
    </template>
</template>

defineProps({
    arr: {
        type: Array,
    },
})
```

结合使用

```
v-slot:letf='scoped'
#left='scoped'
```

```vue
<template>
    <son :arr="arr">
        <template #center="scoped">
            <button>{{ scoped.item }}</button>
        </template>
    </son>
</template>

const arr = [7, 8, 9, 10]
```

```vue
//son.vue

<template>
    <template v-for="(item, index) in arr">
        <slot :item="item" :index="index" name="center"></slot>
    </template>
</template>

defineProps({
    arr: {
        type: Array,
    },
})
```



## 动态插槽

```vue
//父组件
<template>
    <son :left="left" :right="right">
        <template #[left]>
            <h1>slot</h1>
        </template>
    </son>
</template>

const left = 'slot'
const right = 'right'
```

```vue
//子组件
<template>
    <div id="left">
        <slot :name="left"></slot>
    </div>
    <div id="right">
        <slot :name="right"></slot>
    </div>
</template>

defineProps({
    left: {
        type: String,
    },
    right: {
        type: String,
    },
})

<style>
#left {
    background-color: blue;
}
#right {
    background-color: red;
}
</style>
```

### el-table的动态插槽

```vue
<el-table :data="list">
    <template v-for="propItem in propList" :key="propItem.prop">
		<el-table-column v-bind="propItem">
            <template #default="scope">
                <slot :name="propItem.soltName">
        			{{scope.row[propItem.prop]}}
        		</slot>
    		</template>
        </el-table-column>
    </template>
</el-table>

<script setup>
	propList=[]
</script>
```



# watchEffect

```js
const age = ref(18)
const stop = watchEffect(()=>{
	console.log('----', age.value)
})

const add = ()=>{
    age.value++
    //如果大于25则停止监听
    if(age.value > 25) stop()
}
```



# vue-router

```
npm install vue-router@4
```

index.js

```
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
  		{ path: '/', component: () => import('../components/Comp.vue') },
  ],
})

export default router
```

main.js

```
import router from './router'

use(router)
```

### query和params

```javascript
import { useRoute } from 'vue-router'
const {
    params: { username },
    query,
} = useRoute()

query
:to='`/home/about/id=${val.id}&title=${val.title}`'

    router.push({
        path: '/user/goods2',
        query: {
            id: 1,
            title: '标题',
        },
    })

效果：/home/about/id=1&title=测试
```

```javascript
params（不允许写path，只能写name）
to='/home/about/:id/:title'

{
    name:'about',
    params:{
        id:1,
        title:'测试'
    }
}

效果：/home/about/1/测试
```

### props

```
component
{
	path:'/about',
	component:()=>important('./Home.vue'),
	props({query:{id,title}}){
		return {
			id:id,
			title:title
		}
	}
}

props:['id','title']

{{id}}{{title}}
```

### replace

```
<router-link to="/home" replace></router-link>
```

### router-link-active

```
.router-link-active{
	color: red;
}
```

### router.go

```
router.go(-1)
```



## useRoute和useRouter

```js
const router = useRouter()
router.push('/user/goods2')
```

## 动态路由

```
name:'home'

动态添加一级路由
const route = {
	path:'/xx',
	component:()=> import('../pages/cart.vue')
}
router.addRoute(route)

动态添加二级路由
router.addRoute("home", {
	path:'xx',
	component:()=> import('../pages/cart.vue')
})
```

## 路由导航守卫



# normalize.css

```
npm i normalize.css
```

```
import 'normalize.css'
```

