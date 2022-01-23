# 变量

## 值的变量

```
@color:red;
```

## 属性的变量

```
@m:marrgin;

@{m}:0
```

## 选择器的变量

```
@select:#div

@{select}{
	...
}
```

## 变量的延迟加载

块级作用域，选择最后加载的变量。

## 除法

```
@w
width:(320px / @w)
```



# 混合

## 不带输出的混合

```
//加了()，则不会被当成是class的定义，不会被解析。不加()，则默认是普通class的定义，会输出
.center(){
	marrgin:0;
	padding:0;
	position: absolute;
}

div{
	.center;//这里是调用，因为没有{}，所以不会被认为是类选择器。
}
```

## 带参数的混合

```
.center(@ma,@pa,@po){
	marrgin:@ma;
	padding:@pa;
	position: @po;
}

div{
	.center(0,0,absolute);//这里是调用，因为没有{}，所以不会被认为是类选择器。
}
```

## 带默认值的混合

```
.center(@ma:0,@pa:0,@po:absolute){
	marrgin:@ma;
	padding:@pa;
	position: @po;
}

div{
	.center;//这里是调用，因为没有{}，所以不会被认为是类选择器。
}

div{
	.center(@ma:10px);//指定参数值
}
```

# 继承

```
div:extend(.xx all)
```

# 避免编译

```
~"calc(50% + 100px)"
```

