# animate-heart-canvas

一个好多心形上浮的 canvas 动画背景。
可以根据自己需要修改默认的行为，源码中标注的很清楚了。

> 演示地址： [https://kylebing.cn/test/animate-heart-canvas/](https://kylebing.cn/test/animate-heart-canvas/)  
> 演示 - 五颜六色: [https://kylebing.cn/test/animate-heart-canvas/?hMin=0&hMax=360](https://kylebing.cn/test/animate-heart-canvas/?hMin=0&hMax=360)



## API

```js

/**
 * @param hMin 颜色 h 最小值
 * @param hMax 颜色 h 最大值
 * @param countHeart 心的数量
 * @param sizeMin 心形最小值
 * @param sizeMax 心形最大值
 */
let animateHeartCanvas = new AnimateHeartCanvas(hMin, hMax, countHeart, sizeMin, sizeMax)
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
- 2023-02-21 v0.1


## TODO
- [ ] 添加心的存在时长
