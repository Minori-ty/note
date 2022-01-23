# 基础语法

## module

- 导入时，不加后缀名，默认是js

```
const a = require('./index')
const a = require('./index.js')
```

- exports= module.exports

系统找的是module.exports，如果修改了exports，则到出无效。

## fs

```
fs.readFile('./1.txt', (err, data) => {
  console.log(data.toString())
})
```

# 连接Mysql

```
const mysql = require('mysql')
let options = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'test',
}

let connection = mysql.createConnection(options)
connection.connect((err) => {
  if (err) return console.log(err)
  console.log('连接成功')
})
let str = 'select * from user'
connection.query(str, (err, res, files) => {
  if (err) return console.log(err)
  console.table(res)
  console.table(files)
})
```

