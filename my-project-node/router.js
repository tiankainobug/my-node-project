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
                token:"Bearer " + jwt.sign({username:req.body.username,userId:resSql[0]?.id}, secretKey, {expiresIn: 60 * 60})
            })
        }
    })
})
router.get('/getData',(req,res)=>{
    res.send({
        success:true,
        username:'tiank'
    })
})
router.get('/user/getUserName',(req,res)=>{
    const getUsername = 'SELECT username FROM users WHERE id = ?'
    db.query(getUsername,[1],(err,resSql)=>{
        if (err) console.log(err.message)
        if (resSql.length === 0){
            res.send({
                msg:'未找到用户！',
                success:false
            })
        }else {
            res.send({
                success:true,
                username:resSql[0]?.username,
            })
        }
    })
})
module.exports = router

