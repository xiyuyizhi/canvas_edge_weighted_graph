
/**
 * 优先队列
 */
function MaxPQ() {
    this.container = []
}

MaxPQ.prototype.insert = function (v) {
    this.container.push(v)
}

MaxPQ.prototype.less = function (i, j) {
    return this.container[i].weight() < this.container[j].weight()
}

MaxPQ.prototype.exch = function (i, j) {
    var t = this.container[i]
    this.container[i] = this.container[j]
    this.container[j] = t
}

MaxPQ.prototype.delMin = function () {
    var min = 0
    var n = this.container.length
    for (var i = 1; i < n; i++) {
        if (this.less(i, min)) {
            min = i
        }
    }
    this.exch(min, this.container.length - 1)
    return this.container.pop()
}
MaxPQ.prototype.size = function () {
    return this.container.length
}
MaxPQ.prototype.isEmpty = function () {
    return !this.container.length
}

export class Edge {

    constructor(v, w, weight) {
        this.v = v
        this.w = w
        this._weight = weight
    }

    weight() {
        return this._weight
    }

    either() {
        return this.v
    }

    other(v) {
        let vertex
        v == this.v ? (vertex = this.w) : (vertex = this.v)
        return vertex
    }

    campareTo(that) {
        this._weight > that._weight ? 1 : -1
    }

}

/**
 * 加权无向图
 */
export class EdgeWeightedGraph {

    constructor(V) {
        this.V = V
        this.E = 0
        this.adjs = new Array(V).fill(0).map(x => {
            return []
        })
    }

    /**
     * 
     * @param {Edge} e 
     */
    addEdge(e) {
        let v = e.either()
        let w = e.other(v)
        this.adjs[v].unshift(e)
        this.adjs[w].unshift(e)
        this.E++
    }

    adj(v) {
        return this.adjs[v]
    }

    v() {
        return this.V
    }

    edge() {
        return this.E
    }

}

export class LazyPrimMST {

    constructor(G, defaultV) {
        this.marked = new Array(G.v()).fill(0)
        this.mst = [] //最小生成树的边
        this.pq = new MaxPQ()
        this.visit(G, defaultV)
        while (!this.pq.isEmpty()) {
            let e = this.pq.delMin()
            let v = e.either()
            let w = e.other(v)
            if (this.marked[v] && this.marked[w]) continue
            this.mst.push(e)
            if (!this.marked[v]) this.visit(G, v)
            if (!this.marked[w]) this.visit(G, w)
        }
    }


    visit(G, v) {
        this.marked[v] = true

        for (let e of G.adj(v)) {
            if (!this.marked[e.other(v)]) {
                this.pq.insert(e)
            }
        }
    }

    edges() {
        return this.mst
    }

}
