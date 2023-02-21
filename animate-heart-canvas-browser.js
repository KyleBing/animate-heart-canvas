/**
 * 心动
 * Animated Canvas Heart
 * @author: KyleBing(kylebing@163.com)
 * @github: https://github.com/KyleBing/animate-canvas-heart
 * @date-init: 2023-02-21
 * @date-update: 2023-02-21
 * @version: v0.1.0
 * @platform: NPM
 */

class AnimateHeartCanvas {
    constructor() {
        this.isPlaying = true // 默认自动播放

        this.mouseX = 0
        this.mouseY = 0

        this.configFrame = {
            width : 1200,
            height: 300,
        }
        this.configHeart = {
            gravity: 4,                     // 加速度
            timeInit: new Date().getTime(),
            movement: 1,                    // 运动速度
            x: 50,                          // 位置 x
            y: 50,                          // 位置 y
            width: 200,                     // heart 大小
            height: 200,                    // heart 大小
            countHeart: 100,                 // heart 数量

            sizeMin: 20,                    // 最小值
            sizeMax: 200,                   // 最大值
                                            // 颜色
            minH: 0,                        // 色值最小
            maxH: 10,                       // 色值最大
            minOpacity: 0.2,                // 透明度最小 %
            maxOpacity: 0.8,                // 透明度最大 %

            opacityGrowth: 10,              // 透明度增长值
        }

        this.heartBuffer = [] // 心缓存

        this.init()

        window.onresize = () => {
            this.configFrame.height = innerHeight * 2
            this.configFrame.width = innerWidth * 2
            let heartLayer = document.getElementById('heartLayer')
            this.updateFrameAttribute(heartLayer)
        }
    }

    play(){
        if (this.isPlaying){

        } else {
            this.isPlaying = true
            this.draw()
        }
    }
    stop(){
        this.isPlaying = false
    }

    speedUp(){}
    speedDown(){}

    destroy(){
        this.isPlaying = false
        let heartLayer = document.getElementById('heartLayer')
        heartLayer.remove()
        console.log('动画已停止')
    }


    updateFrameAttribute(heartLayer){
        heartLayer.setAttribute('id', 'heartLayer')
        heartLayer.setAttribute('width', this.configFrame.width)
        heartLayer.setAttribute('height', this.configFrame.height)
        heartLayer.style.width = `${this.configFrame.width / 2}px`
        heartLayer.style.height = `${this.configFrame.height / 2}px`
        heartLayer.style.zIndex = '-3'
        heartLayer.style.userSelect = 'none'
        heartLayer.style.position = 'fixed'
        heartLayer.style.top = '0'
        heartLayer.style.left = '0'
    }


    init(){
        this.configFrame.width = innerWidth
        this.configFrame.height = innerHeight

        let heartLayer = document.createElement("canvas")
        this.updateFrameAttribute(heartLayer)
        document.documentElement.append(heartLayer)

        this.configHeart.timeInit =  new Date().getTime()

        // 填充缓存形状
        for (let i = 0; i < this.configHeart.countHeart; i++) {
            let randomSize = randomInt(this.configHeart.sizeMin, this.configHeart.sizeMax)
            let x = randomInt(0, this.configFrame.width)
            let y = randomInt(this.configFrame.height * 0.5, this.configFrame.height)
            this.heartBuffer.push({
                id: i,
                opacity: 0,
                opacityFinal: randomInt(0, 100), // 最终透明度
                timeInit: new Date().getTime() - randomInt(100, 1000),
                x, // 位置 x
                y, // 位置 y
                originalX: x,
                originalY: y,
                width: randomSize, // heart 大小
                height: randomSize, // heart 大小
                colorH: randomInt(this.configHeart.minH, this.configHeart.maxH)
            })
        }

        console.log(this.heartBuffer)

        this.draw()

        document.documentElement.addEventListener('mousemove', event => {
            this.mouseX = event.x
            this.mouseY = event.y
        })
    }

    // 判断鼠标跟 box 的距离
    isMouseIsCloseToBox(box){
        let distance = Math.sqrt(Math.pow(Math.abs(box.position.x / 2 - this.mouseX),2) + Math.pow(Math.abs(box.position.y /2  - this.mouseY), 2))
        return distance < 100
    }



    draw() {
        // create heart
        let canvasHeart = document.getElementById('heartLayer')
        let contextHeart = canvasHeart.getContext('2d')
        contextHeart.clearRect(0, 0, this.configFrame.width, this.configFrame.height)

        this.heartBuffer.forEach(heart => {
            // 当出了画面时
            if (heart.y < -(heart.height)){
                heart.y = heart.originalY
                heart.timeInit = new Date().getTime()
                heart.opacity = 0
            }

            // 当透明度到达最终透明度时
            if (heart.opacity >= heart.opacityFinal){
                heart.opacity = heart.opacityFinal // 定位到最终的透明度
            }

            // 1/2 gt㎡  运动轨迹
            // let movement = 1/2 * this.configHeart.gravity * Math.pow((new Date().getTime() - heart.timeInit)/1000,2)

            // speed = 1/2 gt
            let movement = 1/2 * this.configHeart.gravity * (new Date().getTime() - heart.timeInit)/1000
            heart.y = heart.y - movement

            heart.opacity = heart.opacity + this.configHeart.opacityGrowth
            this.drawHeart(
                heart.x,
                heart.y,
                heart.width / 2,
                heart.height / 2,
                `hsl(${heart.colorH} 100% 50% / ${heart.opacity * ((new Date().getTime() - heart.timeInit)/1000)}%)`
            )
        })

        if (this.isPlaying) {
            window.requestAnimationFrame(() => {
                this.draw()
            })
        }
    }

    // 画一个心
    drawHeart(x, y, width, height, colorFill) {

        let canvasHeart = document.getElementById('heartLayer')
        let contextHeart = canvasHeart.getContext('2d')

        contextHeart.save()
        contextHeart.beginPath()
        let topCurveHeight = height * 0.3
        contextHeart.moveTo(x, y + topCurveHeight)
        // top left curve
        contextHeart.bezierCurveTo(
            x, y,
            x - width / 2, y,
            x - width / 2, y + topCurveHeight
        )
        // bottom left curve
        contextHeart.bezierCurveTo(
            x - width / 2, y + (height + topCurveHeight) / 2,
            x, y + (height + topCurveHeight) / 1.4,
            x, y + height
        )
        // bottom right curve
        contextHeart.bezierCurveTo(
            x, y + (height + topCurveHeight) / 1.8,
            x + width / 2, y + (height + topCurveHeight) / 2,
            x + width / 2, y + topCurveHeight
        )
        // top right curve
        contextHeart.bezierCurveTo(
            x + width / 2, y,
            x, y,
            x, y + topCurveHeight
        )
        contextHeart.closePath()
        contextHeart.fillStyle = colorFill
        contextHeart.fill()
        contextHeart.restore()
    }

}





/**
 * 生成随机 box 大小
 * @param min
 * @param max
 * @returns {{frameWidth: *, frameHeight: *}}
 */
function randomBoxSize(min, max){
    let random = randomFloat(min, max)
    return {
        width: random,
        height: random
    }
}
/**
 * 随机位置
 * @param configFrame
 * @returns {{x: *, y: *}}
 */
function randomPosition(configFrame){
    let randomX = Math.random() * configFrame.width
    let randomY = Math.random() * configFrame.height
    return {
        x: randomX,
        y: randomY
    }
}

/**
 * 输出随机 1 或 -1
 * @returns {number}
 */
function randomDirection(){
    let random = Math.random()
    if (random > 0.5){
        return 1
    } else {
        return -1
    }
}
/**
 * 输出速度值
 */
function randomSpeed(speedMin, speedMax){
    let randomX = Math.random() * (speedMax - speedMin) + speedMin
    let randomY = Math.random() * (speedMax - speedMin) + speedMin
    return {
        speedX: randomX,
        speedY: randomY
    }
}

/**
 * 随机颜色值
 * @returns string
 */
function randomColor(hMin, hMax, opacityMin, opacityMax){
    let randomH = randomInt(hMin, hMax)
    let randomOpacity = randomFloat(opacityMin, opacityMax)
    return `hsl(${randomH}, 100%, 50%, ${randomOpacity})`
}

/**
 * 随机透明度
 * @returns {string}
 */
function randomOpacity(minOpacity, maxOpacity){
    let randomOpacity = Math.random() * (maxOpacity - minOpacity) + minOpacity
    let randomOpacityString = `${(randomOpacity * 100).toFixed(2)}%`
    return `hsl(0 0% 100% / ${randomOpacityString})`
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randomInt(min, max){
    return Number((Math.random() * (max - min) + min).toFixed(0))
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randomFloat(min, max){
    return Number(Math.random() * (max - min) + min)
}
