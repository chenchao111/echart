const myCanvas = require('./module/canvas')
const files = require('./module/file')

console.log('myCanvas: ', myCanvas)

const app = async () => {
  // 配置文件获取echarts图表相关参数
  const option = await files.read('./config/option.json')
  const options = await files.read('./config/options.json')
  // 创建图片画布，生成对应图片
  myCanvas({ // 生成一个图片(传递一个对象，具体参数格式参照config/option.json文件即可)
    width: 800, // 生成图片宽度(不传默认800)
    height: 600, // 生成图片高度(不传默认060)
    name: 'test.png', // 生成图片名字(不传默认随机时间)
    options: option // 设置echarts参数
  })
  myCanvas(options) // 批量生成图片(传递数组，具体参数格式参照config/options.json文件即可)
}

app()
