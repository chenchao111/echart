const myRequest = require('../http/request.js')
const files = require('./file')
console.log('files: ', files)
const createOptions = async () => {
  try {
    const response = await myRequest({
      url: `https://stars.jrj.com.cn/inner/z3/smart/industry?innerCode=600919.SH`,
      method: 'get'
    })
    const res = response.data
    const avg = res[0].datas.datas.map(item => item.induAvg)
    let num = res[0].datas.datas.map(item => Number(item.stkLevel).toFixed(2))
    const labels = res[0].datas.datas.map(item => item.stkLevelDetail)
    num = num.map((item, index) => ({ value: item, label: labels[index]}))
    const bar = res[0].datas
    
    //echarts配置项
    let option = {
      backgroundColor: "#fff",
      legend: {
        type: 'plain',
        show: true,
        orient: 'horizontal',
        left: 0,
        top: 0,
        itemGap: 29,
        itemWidth: 32,
        itemHeight: 10,
        data: [
          {
            name: '个股水平',
            // 强制设置图形为圆。
            icon: 'rect',
            // 设置文本为红色
            textStyle: {
              color: '#666D80'
            }
          },
          {
            name: '行业均值',
            // 强制设置图形为圆。
            icon: 'rect',
            // 设置文本为红色
            textStyle: {
              color: '#666D80'
            }
          }
        ]
      },
      grid: {
        right: '3%',
      },
      tooltip: {
        trigger: 'axis',
        triggerOn: 'click',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'none'
          }
        },
        formatter: function (params, ticket, callback) {
          console.log('params: ', params)
          let html = `${params[0].name}\n`
          params.forEach(item => html += `${item.seriesName}: ${item.value}\n`)
          return html.slice(0, html.length-1)
        },
        position: function (point, params, dom, rect, size) {
          console.log('point: ', point)
          console.log('params: ', params)
          console.log('dom: ', dom)
          console.log('rect: ', rect)
          console.log('size: ', size)
          const { contentSize, viewSize } = size
          const [x, y] = point
          let rx = x
          let ry = y
          if (x + contentSize[0] > viewSize[0]) {
            rx -= contentSize[0]
          } else if (y + contentSize[0] > viewSize[1]) {
            ry -= contentSize[1]
          }
          return [rx, ry]
        }
      },
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#EBEBEB'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#2C2E33'
        },
        data: ['个股涨幅', '估值', '负债风险', '盈利能力', '成长性']
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#959CAD'
        },
        splitLine: {
          show: false
        }
      },
      series: [{
        data: avg,
        type: 'bar',
        name: '行业均值',
        barWidth: '23',
        itemStyle: {
          color: '#BFCCDB'
        }
      }, {
        data: num,
        type: 'bar',
        name: '个股水平',
        barWidth: '23',
        itemStyle: {
          color: '#308AF2'
        },
        label: {
          show: true,
          color: '#2C2E33',
          fontSize: '12',
          position: 'top',
          formatter: function(params) {
            return params.data.label
          }
        }
      }]
    }
    const file = await files.write('./config/options.json', JSON.stringify(option))
    console.log(file)
  } catch (error) {
    console.error(error)
  }
}
module.exports = createOptions