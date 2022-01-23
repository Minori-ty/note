# 引入css

```
@import url(./index.css);
@import './index.css';
```

# 权重

![image-20210407232327142](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210407232327142.png)

# 块级元素注意事项

<p style="color:red;font-size:22px;"><strong>存放文字类的块级标签不能放其他的块级标签</strong></p>

例如p标签、h1~h6标签

# 行内元素注意事项

<p style="color:red;font-size:22px;"><strong>行内元素只能容纳文本或其他行内元素</strong></p>

<p style="color:red;font-size:22px;"><strong>a标签里面不能放a标签</strong></p>

<p style="color:red;font-size:22px;"><strong>特殊情况a标签里面可以放块级元素，但是要给a标签转成块级元素。</strong></p>

# 行内块元素注意事项

<p style="color:red;font-size:22px;"><strong>行内元素可设置左右内外边距，不能设置上下内外边距。</strong></p>

所以为了解决浏览器兼容的问题，行内元素只设置左右内外边距，不设置上下内外边距。

<p style="font-size:22px;">行内块元素可在一行上显示，但是之间会有空白间隙。</p>

## 对齐方式

![image-20210406210314256](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210406210314256.png)

# background属性

## 简写形式

background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];

```
div{
	background: aquamarine url(img.png)
              no-repeat
              scroll
              center center / 50%
              content-box content-box;
}
```

background-attachment

|  参数  |           作用           |
| :----: | :----------------------: |
| scroll | 背景图像是随对象内容滚动 |
| fixed  |       背景图像固定       |

## 背景透明色

```
background:rgba(0,0,0,0.5)
```

不能和上面的一起写，会被覆盖掉。

# 优先级

|        选择器        |  权重  |
| :------------------: | :----: |
|          *           |   0    |
|      元素选择器      |   1    |
| 类选择器，伪类选择器 |   10   |
|       id选择器       |  100   |
|    行内样式style     |  1000  |
|      !important      | 无穷大 |

# margin塌陷

当嵌套的两个块级元素（父子关系）都有上外边距时，父元素会塌陷较大的外边距值。

##  解决方案

**1. 为父元素定义1px的上边框。border-top: 1px;**

**2. 为父元素定义上内边框。padding-top: 1px;**

**3. 为父元素添加overflow: hidden;**

<p style="color:red;font-size:22px;"><strong>浮动的盒子不会有外边距合并的问题。</strong></p>

# box-shadow

 ## 语法

box-shade: h-shadow v-shadow blur spread color inset;

|    值    | 描述                                                         |
| :------: | :----------------------------------------------------------- |
| h-shadow | <span style="color:red">必填。</span>水平阴影的位置，允许负值。 |
| v-shadow | <span style="color:red">必填。</span>垂直阴影的位置，允许负值。 |
|   blur   | 选填。模糊距离。                                             |
|  spread  | 选填。阴影的尺寸。                                           |
|  color   | 选填。阴影的颜色。                                           |
|  inset   | 选填。将外部阴影改成内部阴影。                               |

box-shadow: 0px 1px 2px #eedede;

# calc()

```
width: calc(100% - 50px);
```

# css变量

可以改变属性，响应式。

```
//定义变量
:root{
	--color:red;
}

.main{
	color:var(--color,[默认值])
}
```

