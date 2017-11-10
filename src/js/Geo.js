import {
    radius,
    scale
} from "./Config"

import {
    calculateInters,
    Query
} from "./Util"

export default class Geo {

    constructor(canvasGraph, ctx) {
        this.ctx = ctx
        this.ctx.font = "20px serif";
        this.canvasGraph = canvasGraph
        this.showEdgesWeightInfo()
        this.drawGraph()
        this.drawEdge()
        this.drawMinPaths()
    }


    _drawCycle(point, v) {
        const { x, y } = point
        const { ctx } = this
        ctx.moveTo(x * scale + radius, y * scale);
        ctx.arc(x * scale, y * scale, radius, 0, Math.PI * 2, true);
        ctx.fillText(v, x * scale - 5, y * scale + 5)
    }

    /**
     * 画顶点的位置
     */
    drawGraph() {
        const { ctx } = this
        const { vertexPoints } = this.canvasGraph
        ctx.beginPath()
        Object.keys(vertexPoints).forEach(p => {
            this._drawCycle(vertexPoints[p], p)
        })
        ctx.stroke();
        //对顶点0加背景，寻找最小生成树时我们规定从0开始找
        ctx.beginPath()
        ctx.fillStyle = "#FFA500"
        this._drawCycle(vertexPoints[0], 0)
        ctx.stroke();
    }

    _drawLine(p1, p2) {
        const { ctx } = this
        const newP = calculateInters({
            x: p1.x * 70,
            y: p1.y * 70
        }, {
                x: p2.x * 70,
                y: p2.y * 70
            }, radius)
        ctx.moveTo(newP.p1Inters.x, newP.p1Inters.y)
        ctx.lineTo(newP.p2Inters.x, newP.p2Inters.y)
    }

    _drawLines() {
        const { edgeList, vertexPoints } = this.canvasGraph
        edgeList.forEach(e => {
            let es = e.split('-')
            let p1 = vertexPoints[es[0]]
            let p2 = vertexPoints[es[1]]
            this._drawLine(p1, p2)
        })
    }

    /**
     * 画边
     */
    drawEdge() {
        const { ctx } = this
        ctx.beginPath();
        this._drawLines()
        ctx.stroke();

    }

    _drawMinLine(edge, edges, i, vertexPoints) {
        const { ctx } = this
        ctx.lineWidth = 3
        setTimeout(() => {
            ctx.beginPath();
            let p1 = edge.v
            let p2 = edge.w
            this.showMinEdgesWeightInfo(edges, i)
            this._drawLine(vertexPoints[p1], vertexPoints[p2])
            ctx.stroke();
        }, (i + 1) * 1000)
    }

    //画最小生成树
    drawMinPaths() {
        const { mst, vertexPoints } = this.canvasGraph
        let edges = mst.edges()
        edges.forEach((edge, index) => {
            this._drawMinLine(edge, edges, index, vertexPoints)
        })
    }

    showEdgesWeightInfo() {
        const { edgeList } = this.canvasGraph
        const html = edgeList.map(x => {
            const d = x.split('-')
            return `<div class="edge">${d[0]} ---- ${d[1]}   权重:${d[2]}</div>`
        }).join('')
        new Query('.all_edges .edges_list').html(html)
        new Query('.all_edges .title').html(`共${edgeList.length}条边`)
    }

    showMinEdgesWeightInfo(edges, end) {
        let html = ''
        for (let i = 0; i <= end; i++) {
            const v = edges[i].either()
            const w = edges[i].other(v)
            const weight = edges[i].weight()
            html += `<div class="edge">${v} ---- ${w}   权重:${weight}</div>`
        }
        new Query('.min_edges .edges_list').html(html)
    }

}