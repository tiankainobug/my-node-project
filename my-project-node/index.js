// 导入express
const express = require('express')
const cors = require('cors')
// 导入路由模块
const router = require('./router')
// 创建app服务器
const app = express()
app.use(express.json())
// 使用路由模块
app.use(cors())
app.use(router)
// 开启服务器，监听80端口
app.listen(80,()=>{
    console.log('server is running at http://127.0.0.1:80')
})
