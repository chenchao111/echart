## 安装模块 cnpm install canvas echarts
## 如果当前没有images目录，在当前目录下创建images目录用于保存转换后的图片
## 目录结构
- module目录自定义模块
  - canvas通过canvas将echarts图标转换成图片
  - file文件读写操作
  - options生成echats图片参数的json配置文件，生成到config目录下
- http目录封装的请求
- config目录是echarts相关配置生成的json文件(目前支持一个，改成数组后支持批量设置)
- app.js启动文件(node app.js)