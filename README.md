<h1 align="center">@zhangjicheng/scroller</h1>

<div align="center">

页面滚动插件

![](https://img.shields.io/npm/v/@zhangjicheng/scroller.svg?style=flat)
![](https://img.shields.io/bundlephobia/minzip/@zhangjicheng/scroller?color=green&label=gzip)
![](https://img.shields.io/bundlephobia/min/@zhangjicheng/scroller.svg?style=flat)
![](https://img.shields.io/npm/dw/@zhangjicheng/scroller)
</div>

<!-- 简体中文 | [English](./README-en.md) -->

## ✨ 特性

- 轻量：gzip 大小不足1kb
- 易用：完善的ts参数及方法提示，让您不查看文档也可玩转 @zhangjicheng/scroller

## 🖥 支持环境

- 现代浏览器和 IE9 及以上。

## 📦 安装

```bash
>  npm install --save @zhangjicheng/scroller
```

``` js
  // esm
  import Scroller form '@zhangjicheng/scroller';

  // commonjs
  const moment = require('@zhangjicheng/scroller');
```

## 🔨 示例

<h2 style="text-align: center;">window 滚动</h2>

```js
# .js

// 实例化滚动插件
const scroller = new Scroller();
// 调用滚动方法
scroller.scrollTo(500);

```

<h2 style="text-align: center;">指定元素滚动</h2>

``` html
# .html

<div id="scroll-container">
  <ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    <li>item4</li>
    <li>item5</li>
    <li>item6</li>
    <li>item7</li>
    <li>item8</li>
    <li>item9</li>
  </ul>
<div>
```

```js
# .js

// 实例化滚动插件
const scroller = new Scroller(document.getElementById('scroll-container'));

scroller.scrollTo(500);
```

<h2 style="text-align: center;">滚动配置项</h2>

``` js
# .js

// 实例化滚动插件
const scroller = new Scroller(document.getElementById('scroll-container'), {
  easing: 'ease',    // 'ease' | 'linear'
  duration: 500,     // 动画时间，默认300ms
});

function cb(y) {
  console.log(y); // 打印每次滚动的位置
}

// 调用滚动方法
scroller.scrollTo(500, cb);
```

## 参数及使用说明

### 实例化参数

`new Scroll(dom, options)` 接收两个参数 `dom` & `options`

- `dom`: 当前滚动dom元素，默认为窗口 `window`

- `options`配置项
  |参素值|参数类型|必填|默认值|方法说明|版本|
  |-|-|-|-|-|-|
  |`duration`|`number`|N|300|滚动时长|v1.0.0|
  |`ease`|`'ease' \| 'linear'`|N|ease|动画类型|v1.0.0|

### 实例 方法/属性 说明

- 方法

  |方法|说明|版本|
  |-|-|-|
  |`scrollTo(y: number, cb?: (y: number) => void)`|自动滚动方法，固定时间内滚动到指定位置，传递滚动距离及回调方法，回调方法返回每次滚动的位置，非必填|v1.0.0|
  |`start(speed: number, cb?: (y: number) => void)`|滚动方法，传递滚动距离及回调方法，回调方法返回每次滚动的位置，非必填|v1.1.0|
  |`stop(speed: number, cb?: (y: number) => void)`|滚动方法，传递滚动距离及回调方法，回调方法返回每次滚动的位置，非必填|v1.1.0|

- 属性

  |属性|说明|版本|
  |-|-|-|
  |`source`|滚动起始位置|v1.0.0|
  |`target`|滚动结束位置|v1.0.0|
  |`element`|滚动元素 `HTMLElement \| Window`|v1.0.0|
  |`easing`|滚动动画类型 `'ease' \| 'linear'`|v1.0.0|
  |`duration`|滚动持续时间 默认300ms|v1.0.0|

---

## 更新日志

- **v1.0.0**
  基本的`Scroller`类, 返回`scroller`实例，进行滚动操作；
- **v1.1.0**
  添加 `scroller.start(speed: number)`、`scroller.stop()` 方法，实现匀速滚动，手动控制开始停止，用于table自动滚动等效果

---

## 🔗 链接

- [项目地址](https://github.com/zhangjichengcc/scroller)
- [my portfolio](https://portfolio.zhangjc.cn/)

## 🤝 参与共建

- author zhangjicheng
- Email zhangjichengcc@163.com
