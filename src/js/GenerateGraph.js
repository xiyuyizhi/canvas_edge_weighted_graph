

import {
    vertex,
    edge,
    maxWeight
} from "./Config"

import {
    random
} from "./Util"

import {
    Edge,
    EdgeWeightedGraph,
    LazyPrimMST
} from "./Mst"

/**
 * 随机生成N个顶点的坐标,M条边
 * 
 */
export default class GenerateCanvasGraph {

    constructor() {
        this.vertexPoints = {}
        this.edgeList = []
        this.mst = null
        this.initAxis(vertex + 1)
        this.geneVertexAxis()
        this.geneEdge()
        this.geneWeightGraph()
    }

    initAxis(count) {
        this.axis = new Array(count).fill(0).map(x => {
            return new Array(count).fill(-1)
        })
    }

    _random() {
        return {
            x: random(vertex) + 1,
            y: random(vertex) + 1
        }
    }

    /**
     * 构造顶点坐标
     */
    geneVertexAxis() {
        let i = 0
        const vertexList = []
        while (vertexList.length < vertex) {
            const p = this._random()
            if (this.axis[p.x][p.y] == -1) {
                this.axis[p.x][p.y] = i
                this.vertexPoints[i] = p
                vertexList.push(i)
                i++
            }
        }
    }

    _repeat(str) {
        for (let edge of this.edgeList) {
            if (edge.indexOf(str) !== -1) {
                return true
            }
        }
    }

    /**
     * 构造边
     */
    geneEdge() {
        for (let i = 0; i < edge; i++) {
            let v1 = random(vertex)
            let v2 = random(vertex)
            if (v1 !== v2) {
                let e = `${v1}-${v2}-${random(maxWeight)}`
                let eReverse = `${v2}-${v1}`
                if (!this._repeat(`${v1}-${v2}`) && !this._repeat(eReverse)) {
                    this.edgeList.push(e)
                }
            }
        }
    }

    //构造加权无向图
    geneWeightGraph() {
        const g = new EdgeWeightedGraph(vertex)
        this.edgeList.forEach(x => {
            const d = x.split('-')
            g.addEdge(new Edge(Number(d[0]), Number(d[1]), Number(d[2])))
        })
        this.mst = new LazyPrimMST(g, 0)
    }


}