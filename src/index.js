

import Geo from "./js/Geo"

import GenerateCanvasGraph from "./js/GenerateGraph"

const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

const g = new GenerateCanvasGraph()

const geo = new Geo(g, ctx)