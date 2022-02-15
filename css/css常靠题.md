# 清除浮动

清除浮动是为了清除元素浮动后导致父盒子撑不开，高度为0px的影响。

### clear:both

## 一、额外标签法

```html
<div class="clear"></div>

<style>
    .clear{
        clear: both;
    }
</style>
```

## 二、给父元素添加overflow

## 三、单伪元素清除浮动

父元素增加一个clearfix的class，再用::after设置clear: both清除

```html
<div class="father clearfix"></div>

<style>
    .clearfix::after{
        content: "";
        display: block;
        height:0;
        clear: both;
        visibility: hidden;
    }
</style>
```

## 四、双为元素清除浮动

```html
<div class="father clearfix"></div>

<style>
.clearfix:: before, .clearfix:: after {
    content: "";
    display: table
}
.clearfix:: after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}

</style>
```



