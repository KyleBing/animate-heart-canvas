# animate-heart-canvas

![2023-02-22 11 51 22](https://user-images.githubusercontent.com/12215982/220519714-8a13833e-b025-45b6-9015-2b9d99618576.png)

一个好多心形上浮的 canvas 动画背景。
可以根据自己需要修改默认的行为，源码中标注的很清楚了。

> 演示地址： [http://kylebing.cn/test/animate-heart-canvas/](http://kylebing.cn/test/animate-heart-canvas/)  
> 演示 - 五颜六色: [http://kylebing.cn/test/animate-heart-canvas/?hMin=0&hMax=360](http://kylebing.cn/test/animate-heart-canvas/?hMin=0&hMax=360)  
> 演示 - 小的: [http://kylebing.cn/test/animate-heart-canvas/?hMin=0&hMax=360&countHeart=500&sizeMin=10&sizeMax=50&bgColor=%233d3d3d](http://kylebing.cn/test/animate-heart-canvas/?hMin=0&hMax=360&countHeart=500&sizeMin=10&sizeMax=50&bgColor=%233d3d3d)


也可以直接通过演示地址的参数进行演示，注意，颜色值如果是 `#333333` 这种，注意对特殊字符进行域名地址转义, `encodeURIComponent`


## API

```js

/**
 * @param hMin 颜色 h 最小值
 * @param hMax 颜色 h 最大值
 * @param countHeart 心的数量
 * @param sizeMin 心形最小值
 * @param sizeMax 心形最大值
 * @param bgColor 背景颜色
 */
let animateHeartCanvas = new AnimateHeartCanvas(hMin, hMax, countHeart, sizeMin, sizeMax, bgColor)
// hMin hMax 对应 hue 的颜色值
// 什么参数都不写就是红色

let 五颜六色 = new AnimateHeartCanvas(0, 360)  // 这个就是五颜六色的

// 其它操作
animateHeartCanvas.play()        // 心动起来
animateHeartCanvas.stop()        // 心不动
animateHeartCanvas.moveUp()      // 心向上走
animateHeartCanvas.moveDown()    // 心向下走
```


## 使用说明

### 1. 浏览器
使用 `animate-heart-canvas-browser.js` 这个文件
```js
// 新建对象时，会自动呈现动画效果
let animateHeartCanvas = new AnimateHeartCanvas()

```

### 2. Vue

```bash
npm i animate-heart-canvas
```

```js
import {AnimateHeartCanvas} from "animate-heart-canvas"

export default {
    mounted() {
        this.height = innerHeight
        this.animateHeartCanvas = new AnimateHeartCanvas()
    },
    beforeDestroy() {
        this.animateHeartCanvas.destroy()
    }
}
```

## log
- 2023-02-21 v0.10
- 2023-02-23 v0.19


## TODO
- [ ] 添加心的存在时长
