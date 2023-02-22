/**
 * 心动
 * Animated Canvas Heart
 * @author: KyleBing(kylebing@163.com)
 * @github: https://github.com/KyleBing/animate-canvas-heart
 * @date-init: 2023-02-21
 * @date-update: 2023-02-22
 * @version: v0.1.0
 * @platform: NPM
 */

class AnimateHeartCanvas {
    /**
     * @param hMin 颜色 h 最小值
     * @param hMax 颜色 h 最大值
     * @param countHeart 心的数量
     * @param sizeMin 心形最小值
     * @param sizeMax 心形最大值
     * @param bgColor 背景颜色
     */
    constructor(hMin, hMax, countHeart = 150, sizeMin = 50, sizeMax = 350, bgColor) {
        this.isPlaying = true // 默认自动播放

        this.mouseX = 0
        this.mouseY = 0

        this.configFrame = {
            width : 1200,
            height: 300,
            bgColor: bgColor
        }
        this.configHeart = {
            timeLine: 0,                    // 时间线

            timeInit: new Date().getTime(),
            movement: 1,                   // 运动速度

            x: 50,                         // 位置 x
            y: 50,                         // 位置 y
            width: 200,                    // heart 大小
            height: 200,                   // heart 大小
            countHeart: countHeart || 150, // heart 数量

            // 大小
            sizeMin: sizeMin || 50,        // 最小值
            sizeMax: sizeMax || 350,       // 最大值

            // 颜色
            colorSaturate: 100,            // 颜色饱和度 0-100
            colorLight: 60,                // 颜色亮度 0-100
            hMin: isNaN(hMin) ?330: hMin,  // 色值最小
            hMax: isNaN(hMax) ?350: hMax,  // 色值最大
            minOpacity: 20,                // 透明度最小 %
            maxOpacity: 100,               // 透明度最大 %
            opacityGrowth: 5,              // 透明度增长值

            // 出现的位置范围
            heartRangeMin: 0,              // 心出现的位置，从下面算起，取值 0.0-1.0
            heartRangeMax: 0.3,

            // 加速度
            gravityMin: 1,                 // 加速度 min
            gravityMax: 9.8,               // 加速度 max

            flowDirection: 1,              // 运动方向 1 向上 -1 向下


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

    moveDown(){
        this.configHeart.flowDirection = -1
    }
    moveUp(){
        this.configHeart.flowDirection = 1
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
        this.configFrame.height = innerHeight * 2
        this.configFrame.width = innerWidth * 2

        let heartLayer = document.createElement("canvas")
        this.updateFrameAttribute(heartLayer)
        document.documentElement.append(heartLayer)

        this.configHeart.timeLine =  0

        // 填充缓存形状
        for (let i = 0; i < this.configHeart.countHeart; i++) {
            let randomSize = randomInt(this.configHeart.sizeMin, this.configHeart.sizeMax)
            let x = randomInt(0, this.configFrame.width)
            let y = randomInt(this.configFrame.height * (1-this.configHeart.heartRangeMax), this.configFrame.height * (1-this.configHeart.heartRangeMin))
            this.heartBuffer.push({
                id: i,
                gravity: randomFloat(this.configHeart.gravityMin, this.configHeart.gravityMax),
                opacity: 0,
                opacityFinal: randomInt(this.configHeart.minOpacity, this.configHeart.maxOpacity), // 最终透明度
                timeInit: randomInt(1, 500), // 随机排布初始 heart 的位置
                x, // 位置 x
                y, // 位置 y
                originalX: x,
                originalY: y,
                width: randomSize,  // heart 大小
                height: randomSize, // heart 大小
                colorH: randomInt(this.configHeart.hMin, this.configHeart.hMax)
            })
        }

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
        // 建立自己的时间参考线，消除使用系统时间时导致的切换程序后时间紊乱的情况
        this.configHeart.timeLine = this.configHeart.timeLine + 1

        // create heart
        let canvasHeart = document.getElementById('heartLayer')
        let contextHeart = canvasHeart.getContext('2d')
        contextHeart.clearRect(0, 0, this.configFrame.width, this.configFrame.height)


        // 背景，没有 bgColor 的时候，背景就是透明的
        console.log(this.configFrame.bgColor)
        if (this.configFrame.bgColor){
            contextHeart.fillStyle = this.configFrame.bgColor
            contextHeart.fillRect(0,0,this.configFrame.width, this.configFrame.height)
        }


        this.heartBuffer.forEach(heart => {
            // 当出了画面时
            if (heart.y < -(heart.height)){
                heart.y = heart.originalY
                heart.timeInit = this.configHeart.timeLine // 重新定位时间节点
                heart.opacity = 0
            }

            // 当透明度到达最终透明度时
            let timeGap = this.configHeart.timeLine - heart.timeInit // 时间为正数时才计算透明度
            if (timeGap > 0){
                heart.opacity = heart.opacity * ((this.configHeart.timeLine - heart.timeInit)/100)
            } else { // 没到该 heart 的展示时间时，透明度为 0，不显示
                heart.opacity = 0
            }

            if (heart.opacity >= heart.opacityFinal){
                heart.opacity = heart.opacityFinal // 定位到最终的透明度
            }

            // 1/2 gt㎡  运动轨迹
            // let movement = 1/2 * this.configHeart.gravity * Math.pow((new Date().getTime() - heart.timeInit)/1000,2)

            // speed = 1/2 gt
            let movement = 1/2 * heart.gravity * (this.configHeart.timeLine - heart.timeInit) / 300 * this.configHeart.flowDirection
            heart.y = heart.y - movement

            this.drawHeart(
                heart.x,
                heart.y,
                heart.width / 2,
                heart.height / 2,
                `hsl(${heart.colorH} ${this.configHeart.colorSaturate}% ${this.configHeart.colorLight}% / ${heart.opacity}%)`
            )
            heart.opacity = heart.opacity + this.configHeart.opacityGrowth

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
