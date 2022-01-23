# 开启grid

```
display: grid;
grid-template-columns: 100px 100px 100px;  //repeat(3, 100px);
grid-template-rows: 100px 100px 100px;     //repeat(3, 100px);
```

模板的布局要和容器的长宽一致，或者用单位。

|           单位           |
| :----------------------: |
|            %             |
|            fr            |
|    100px  auto  100px    |
| repeat(auto-fill, 100px) |
|    minmax(150px, 1fr)    |

# 间距

```
column-gap: 10px;
row-gap: 10px;

//统一设置
gap:10px 20px;
gap:10px;
```

# 在项目中的排列方式

```
justify-items: center;
align-items: center;
```

```
//统一设置
 place-items: center center;
```

# 单独项目的排列方式

```
justify-self
align-self
```

# grid-auto-flow

子元素的排放方式。

```javascript
row | colum | dense
```

# grid-template-areas

```
grid-template-areas:
'a b c'
'd e f'
'g h i';
```

```
grid-column: 1 / 3;
grid-row: 1 / 2;

//不设置宽高
grid-area:a;
```

