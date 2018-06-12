# postcss-px-to-vw
A plugin for PostCSS that converts pixel units to vw unit.

# postcss-pxconverter

## 目前存在的问题

1. rem 布局受到 root font-size 影响，如果 Android 开启了字号放大模式，会导致整个布局崩盘。
2. Android 下 viewport scale 强制为 1，一些 Canvas 绘制的内容略为模糊。部分 Android 设备改变 scale 有 bug，机型太多较难定位。

## 改进的思路

保留原本 rem 方案的基础上，对于非 font-size 的单位渐进增强，在 `rem` 的规则下面新增一条 `vw` 的规则进行覆盖。此方案可以保证低版本 Android 的兼容问题。

## 　注意

如果原来是rem,也会新增一条 `vw` 的规则进行覆盖。
例如  padding:1rem; 会被转换成 padding:1rem;padding:1vw;



## 可能的缺陷

1. CSS 体积增加。



```
.title {
  /* you can override pixel replacement by adding a "px" *
   * comment after the declaration if you want to keep.  */

  font-size: 32px; /*px*/
  padding: 16px 0 18px;
}
```

```
.title {
   /* you can override pixel replacement by adding a "px" *
   * comment after the declaration if you want to keep.  */

  font-size: 32px; /*px*/
  padding: 4.444444444444445vw 0 5vw;
}
```



## Usage

Plug it into your PostCSS configuration.

```
var option = {
  vwUnit: 375, minPixelValue:2
};


postcss([require('postcss-pxtoremvw')(option)])
```