# mock

```
npm i mockjs -S
npm i vite-plugin-mock cross-env -D
```

vite.config.js

```
import { viteMockServe } from 'vite-plugin-mock'

viteMockServe({ supportTs: false })
```

package.json

```
"dev": "cross-env NODE_ENV=development vite --open",
```



# element

按需引入

main.js

```
import ElementPlus from './plugins/element'
createApp(App).use(ElementPlus).mount('#app')
```

element.js

```
import { ElButton } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export default function (app) {
  app.use(ElButton)
}
```



# alias

```
import path from 'path'

alias: {
    routes: path.resolve(__dirname, 'routes'),
    components: path.resolve(__dirname, 'src/components'),
    views: path.resolve(__dirname, 'src/views'),
  },
```



# postcss

自动添加浏览器私有前缀

```
npm i postcss autoprefixer -D
```

postcss.config.js

```
module.exports = {
  plugins: [require('autoprefixer')],
}
```

创建 .browserslistrc文件

```
# Browsers that we support

last 2 versions
> 1%
iOS 7
last 3 iOS versions

```



# eslint

```
npm i babel-eslint eslint eslint-plugin-prettier eslint-plugin-vue prettier @vue/eslint-config-prettier -D
```

dev

```
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-pligun-vue": "^7.13.0",
    "prettier": "^2.3.2"
```

```
    "lint":"eslint \"src/**/*.{js,vue}\""
```



# 相对路径

```
base:'./'
```

