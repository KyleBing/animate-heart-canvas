# animate-heart-canvas




## 使用说明

### 1. 浏览器
使用 `animate-bg-canvas-browser.js` 这个文件
```js
// 新建对象时，会自动呈现动画效果
let animateCanvas = new AnimatedCanvasBG()

// 其它操作
animateCanvas.play()  // 方块动起来
animateCanvas.stop()  // 方块不动

```

### 2. Vue

```bash
npm i animate-bg-canvas
```

```js
import {AnimatedCanvasBG} from "animate-heart-canvas"

export default {
    mounted() {
        this.height = innerHeight
        this.animatedBg = new AnimatedCanvasBG()
    },
    beforeDestroy() {
        this.animatedBg.destroy()
    }
}
```

## log
- 2023-02-21 v0.1
