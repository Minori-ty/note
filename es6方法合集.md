# 字符串的方法

## split

将字符串切割成数组

```js
var str = 'xxxx'
str.split(' ')
```



## slice

截取字符串，不包括end，可以传负值

```
slice(begin, [end])
```

end如果不写，则截取从begin开始的后面的全部字符串。



## substring

截取字符串，不包括end，不能传负值。

```js
substring(begin, [end])
```

end如果不写，则截取从begin开始的后面的全部字符串。



## includes

判断字符串是否含有某个字符串

```js
includes(params, index)
```

