

export function random(max) {
    return Math.floor(Math.random() * max)
}

export class Query {
    constructor(selector) {
        this.ele = document.querySelector(selector)
    }
    html(html) {
        this.ele.innerHTML = html
    }
}

/**
 * 计算过两圆心的直线与圆的交点
 * @param {object} p1  圆心1位置
 * @param {object} p2  圆心2位置
 * @param {number} R   半径
 */

export function calculateInters(p1, p2, R) {
    const xAixsDis = Math.abs(p1.x - p2.x)
    const yAixsDis = Math.abs(p1.y - p2.y)
    const disOfTwoPoint = Math.sqrt(xAixsDis * xAixsDis + yAixsDis * yAixsDis).toFixed(2)
    const x = (R / disOfTwoPoint * xAixsDis).toFixed(2)
    const y = (R / disOfTwoPoint * yAixsDis).toFixed(2)

    let p1X = x
    let p1Y = y
    let p2X = x
    let p2Y = y
    
    if (p1.x <= p2.x && p1.y > p2.y) {
        p1Y = -p1Y
        p2X = -p2X
    }
    if (p1.x <= p2.x && p1.y <= p2.y) {
        p2X = -p2X
        p2Y = -p2Y
    }
    if (p1.x > p2.x && p1.y > p2.y) {
        p1X = -p1X
        p1Y = -p1Y
    }
    if (p1.x > p2.x && p1.y <= p2.y) {
        p1X = -p1X
        p2Y = -p2Y
    }

    return {
        p1Inters: {
            x: p1.x + Number(p1X),
            y: p1.y + Number(p1Y)
        },
        p2Inters: {
            x: p2.x + Number(p2X),
            y: p2.y + Number(p2Y)
        }
    }

}


