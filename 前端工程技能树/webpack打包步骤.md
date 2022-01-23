# 一、初始化json包，下载webpack

```
npm init -y
npm i webpack webpack-cli
```

# 二、配置文件

- 新建src、build文件夹。src放源文件、build放打包完的文件。
- 在src里面放index.html
- 项目打包

```javascript
//打包指令
webpack ./src/index.js -o ./build/build.js --mode=development

//后面配置了webpack.config.js 则打包指令是webpack
```

但是因为webpack不能打包css/img等静态资源，所以需要配置webpack.config.js

# 三、配置webpack.config.js

新建webpack.config.js文件

```javascript
const { resolve } = require('path')
module.exports = {
  //根据实际路径更改
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [],
  },
  plugins: [],
  mode: 'development',
  //   mode: 'production',
}
```

## 打包html文件(plugin)

loader下载直接可以使用

plugin下载后还要import导入



下载html-webpack-plugin插件

```
npm i html-webpack-plugin
```

在webpack.config.js中引入

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

在plugin中导入

```javascript
plugins:[
	new HtmlWebpackPlugin({
		template:'./src/index.html'
	})
]
```

打包后会自动引入css/js等资源，所以不用再引入了。

## 打包css静态资源(loader)

在index.js入口文件中导入css文件

```
import 'xx.css'
```

单纯打包css文件，则下载对应的loader

```
npm i style-loader css-loader
```

如果是less文件，则还要额外下多两个包

```
npm i less less-loader
```

在webpack.config.js配置以下代码

```javascript
  module: {
    rules: [
      {
        test: /\.css$/,
        //使用一个loader时用loader，使用多个loader时用use数组
        use: [
          //注意顺序。创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          //将css文件变成common.js模块加载js中，里面内容是样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          //注意顺序。创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          //将css文件变成common.js模块加载js中，里面内容是样式字符串
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
```

## 打包图片资源(loader)

### 步骤一

- 只能处理css中引入的图片

下载url插件

```
npm i url-loader file-loader
```

rules配置

```javascript
{
  test: /\.(jpg|png|gif)$/,
  loader: 'url-loader',
  options: {
    //图片大小小于8kb，就会被base64处理
    limit: 8 * 1024,
    outputPath: 'imgs',
    esModule: false,
    name: '[hash:10].[ext]',
  }
},
```

### 步骤二

- 下载html-loader来处理html中引入的图片

```
npm i html-loader
```

rules配置

```javascript
{
   test: /\.html$/,
   loader: 'html-loader',
   options: {
      esModule: false,
    },
},
```

但是与url-loader冲突，要设置url-loader中的options选项

```javascript
options: {
   //图片大小小于8kb，就会被base64处理
   limit: 8 * 1024,
   esModule: false,
 },
```

## 打包其他资源

在rules里面配置。除了css，js，html文件，其他都不处理。

```
{
	exclude:/\.(css|js|html)$/,
	loader:'file-loader'
}
```

# 四、自动打包

在module.exports中新增一个根对象

```javascript
devServer:{
	contentBase:resolve(__dirname,'build'),
	//启动gzip压缩
	compress:true,
	port:3000,
    //自动打开浏览器
    open:true
}
```

下载npx, webpack-dev-server, webpack-cli

```
npm i webpack-dev-server webpack-cli
```

运行指令打包

```
npx webpack serve
```

在package.json文件的scripts中新增

```javascript
"scripts":{
	"dev":"webpack serve"
}
```

就能使用npm run dev自动打包

```
npm run dev
```

## 区别

npm webpack会自动打包新的文件到build目录中

npx webpack-dev-server会再内存中生成文件，不会生成真实的文件，只与src文件有关，就算没有build文件也会显示。



# 五、单独提取css文件

因为webpack打包之后，css样式都存在于js文件中，没有单独的css文件，所以如果要提取成单独的css文件，则需要下载mini-css-extract-plugin

```
npm i mini-css-extract-plugin
```

然后在webpack.config.js中引入

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

在plugins中引入

```javascript
plugins:[
	new MiniCssExtractPlugin({
		filename:'css/build.css'
	})
]
```

把loader中的'style-loader'去掉，改成MiniCssExtractPlugin.loader

```javascript
use:[
	MiniCssExtractPlugin.loader,
	'css-loader'
]
```

## css兼容性处理

```
npm i postcss-loader postcss-preset-env
```

在css loader的use里面新增对象

```javascript
use:[
    MiniCssExtractPlugin.loader,
    'css-loader',
	{
	    loader: 'postcss-loader',
	    options: {
	      postcssOptions: {
	        plugins: [['postcss-preset-env', {}]],
	      },
	    },
	  },
    //'less-loader'
	]
```

在webpack.config.js中设置环境变量

```javascript
//默认是production。开发时设置，生产时去掉，才有兼容性。
//process.env.NODE_ENV = 'development'
```

然后在package.json里面增加browserlist

```javascript
  "browserslist": {
    "development": [
      "last 1 chrome version"
    ],
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```

## 压缩css

下载插件

```
npm i optimize-css-assets-webpack-plugin
```

然后在webpack.config.js中引入

```
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
```

在plugins中引入

```
plugins:[
	new OptimizeCssAssetsWebpackPlugin()
]
```

# 六、Eslint

下载eslint eslint-loader

```
npm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import
```

在rules中引入

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  //优先执行
  enforce: 'pre',
  loader: 'eslint-loader',
  options: {
  //自动修复错误
  	fix: true
  },
},
```

在package.json中新增

```
"eslintConfig": {
    "extends": "airbnb-base"
  }
```

让eslint忽略下一行后面的全部代码检查

```javascript
//eslint-disble-next-line
```

# 七、babel

有问题：只能转换基本语法，像promise的语法不转换。

下载babel-loader

```
npm i babel-loader @babel/core @babel/preset-env
```

在rules中引入

```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
	presets:['@babel/preset-env']
  },
},
```

## 处理ie浏览器的兼容性问题

问题：代码引入体积太大，不能按需导入。

下载@babel/polyfill

```
npm i @babel/polyfill
```

在js文件中引入即可

```
import '@babel/polyfill'
```

## 按需导入

```
npm i core-js
```

将babel中的presets配置改成

```
presets: [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'entry',
      corejs: {
        version: 3,
      },
      targets: {
        chrome: '60',
        firefox: '60',
        ie: '9',
        safari: '10',
        edge: '17',
      },
    },
  ],
],
```

并将import '@babel/polyfill' 去掉

# 八、压缩

## js

将mode的development改成production，则会自动压缩js

```
mode: 'production',
```

## html

在plugins中的html插件中，新增minify配置

```
new HtmlWebpackPlugin({
   template: './src/index.html',
   minify: {
     collapseWhitespace: true,
     removeComments: true,
   },
 }),
```

# 九、优化打包

在webpack.config.js中修改entry和devServer

```
entry: ['./src/js/index.js', './src/index.html']
```

```
devServer:{
	hot:true
}
```

# 十、source-map错误提示

```
devtool:'source-map'

eval-cheap-source-map 最快打包
source-map 调试友好
cheap-module-source-map
nosources-source-map防止源代码泄露
```

# 十一、oneOf

优化loader的打包

```
把rules里面的loader提取出来
rules: [
	{
		oneOf:[
			{
				loader
			}
		]
	}
]
```

# 十二、缓存

```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
	presets:['@babel/preset-env']
  },
  //增加缓存
  cacheDirectory: true
},
```

添加chunkhash哈希值

```
  output: {
    filename: 'js/build.[chunkhash:10].js',
    path: resolve(__dirname, 'build'),
  },
```

配置服务器

```
const express = require('express')
const app = express()
app.use(express.static('build',{maxAge:1000*3600}))
app.listen(3000)
```

