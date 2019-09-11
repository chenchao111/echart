const canvas = require("canvas");//npm install canvas
const echarts = require("echarts");//npm install echarts
const files = require('./file')
const path = require('path')

const myCanvasObj = ({ width = 800, height = 600, name = `${new Date().getTime()}.png`, options}) => {
  //创建一个canvas实例
  let ctx = canvas.createCanvas(width, height)
  //将canvas实例设置为echarts容器
  echarts.setCanvasCreator(()=>ctx)
  //使用canvas实例为容器创建echarts实例
  let chart = echarts.init(ctx)
  //设置图标实例配置项
  chart.setOption(options)
  //保存图片
  const imgPath = path.resolve(`./images/${name}`) 
  files.write(imgPath, chart.getDom().toBuffer())
}
const myCanvasList = (ary) => {
  ary.forEach(item => myCanvas(item))
}
const myCanvas = (obj) => {
  Array.isArray(obj) ? myCanvasList(obj) : myCanvasObj(obj)
}
module.exports = myCanvas