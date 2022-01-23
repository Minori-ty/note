# js & eslint

```
npx eslint --init
npm i prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @vue/eslint-config-prettier -D
```

## 修改

```
```



全局安装eslint

```
npm i eslint -g
```

启动eslint，生成.eslintrc.js文件：

```javascript
eslint --init
```

把 [eslint规则](https://github.com/vuejs/eslint-config-vue/blob/master/index.js) 复制到.eslintrc.js文件中

然后输入：

```javascript
npx eslint index.js
```

如果有错误，则自动进行修复：

```javascript
npx eslint index.js --fix
```



# 安装eslint插件

配置setting.json

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "html",
    "autoFix": true
  },
  {
    "language": "vue",
    "autoFix": true
  }
]
```

要是出错了，则：

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "html",
  "vue"
]
```

