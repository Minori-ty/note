# �����﷨

## module

- ����ʱ�����Ӻ�׺����Ĭ����js

```
const a = require('./index')
const a = require('./index.js')
```

- exports= module.exports

ϵͳ�ҵ���module.exports������޸���exports���򵽳���Ч��

## fs

```
fs.readFile('./1.txt', (err, data) => {
  console.log(data.toString())
})
```

# ����Mysql

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
  console.log('���ӳɹ�')
})
let str = 'select * from user'
connection.query(str, (err, res, files) => {
  if (err) return console.log(err)
  console.table(res)
  console.table(files)
})
```

