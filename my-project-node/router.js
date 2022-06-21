const express = require('express')
const router = express.Router()
router.post('/login',(req,res)=>{
    console.log(req.body)
    return res.send({
        status:0,
        msg:'GET请求成功！',
        data:req.query,
        success:true
    })
})
module.exports = router

