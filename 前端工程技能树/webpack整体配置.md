```
npm i webpack webpack-cli html-webpack-plugin style-loader css-loader less less-loader url-loader file-loader html-loader webpack-dev-server mini-css-extract-plugin postcss-loader postcss-preset-env optimize-css-assets-webpack-plugin eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import babel-loader @babel/core @babel/preset-env  @babel/polyfill core-js -D
```

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    //根据实际路径更改
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //使用一个loader时用loader，使用多个loader时用use数组
                use: [
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
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    //图片大小小于8kb，就会被base64处理
                    limit: 8 * 1024,
                    outputPath: 'imgs',
                    esModule: false,
                    name: '[hash:10].[ext]',
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    //自动修复错误
                    fix: true,
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
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
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/build.css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    mode: 'development',
    //   mode: 'production',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        port: 3000,
        //自动打开浏览器
        open: true,
        hot: true,
    },
    output: {
        filename: 'js/build.[chunkhash:10].js',
        path: resolve(__dirname, 'build'),
    },
}

```

