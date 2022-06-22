const express = require('express')
const router = express.Router()
const db = require('./dataBase')

router.post('/login',(req,res)=>{
    console.log(req.body)
    const findUserSql = 'SELECT * FROM users WHERE username=? AND password=?;'
    db.query(findUserSql,[req.body.username,req.body.password],(err,resSql)=>{
        if (err) console.log(err.message)
        res.send({
            status:0,
            msg:'GET请求成功！',
            userId:resSql[0].id,
            success:true
        })
    })
})
module.exports = router

