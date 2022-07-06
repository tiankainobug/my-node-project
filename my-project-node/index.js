// 导入express
const express = require('express')
const cors = require('cors')
// 导入路由模块
const router = require('./router')
const fs = require('fs')
const path = require("path");
const https = require('https')

// SSL证书认证
const privateKey = fs.readFileSync(path.join(__dirname,'./cert/tiankaii.cn.key'),'utf8')
const certificate = fs.readFileSync(path.join(__dirname,'./cert/tiankaii.cn_bundle.crt'),'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
}

// 创建app服务器
const app = express()
app.use(express.json())
// 使用路由模块
app.use(cors())
app.use(router)


// 创建https服务器实例
const httpsServer = https.createServer(credentials, app)
// 开启服务器，监听80端口
httpsServer.listen(8002,()=>{
    console.log('server is running at http://127.0.0.1:8002')
})
