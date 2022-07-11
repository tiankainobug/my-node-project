const express = require('express')
const router = express.Router()
const db = require('./dataBase')
const jwt = require('jsonwebtoken')

router.post('/login',(req,res)=>{
    const findUserSql = 'SELECT * FROM users WHERE username=? AND password=?;'
    const secretKey = 'tiankSecret'
    db.query(findUserSql,[req.body.username,req.body.password],(err,resSql)=>{
        if (err) console.log(err.message)
        if (resSql.length === 0){
            res.send({
                msg:'用户名或密码错误！',
                success:false
            })
        }else {
            res.send({
                msg:'登录成功！',
                success:true,
                userId:resSql[0]?.id,
                token:jwt.sign({username:req.body.username,userId:resSql[0]?.id},secretKey,{expiresIn:'30s'})
            })
        }
    })
})
module.exports = router

