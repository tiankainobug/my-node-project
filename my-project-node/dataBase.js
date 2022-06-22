const mysql = require('mysql')
// 连接数据库
const db = mysql.createPool({
    host:'tiankaii.cn',
    port:'3306',
    user:'root',
    password:'Qq133242',
    database:'my_node_project'
})
module.exports = db
