# animate-heart-canvas




## 使用说明

### 1. 浏览器
使用 `animate-heart-canvas-browser.js` 这个文件
```js
// 新建对象时，会自动呈现动画效果
let animateHeartCanvas = new AnimateHeartCanvas()

// 其它操作
animateHeartCanvas.play()  // 方块动起来
animateHeartCanvas.stop()  // 方块不动

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
