// 爱德生妇产医院客户信息管理路由模块
const express = require('express');
const mongoose = require('mongoose')
const request = require('request');
const router = express.Router();

let config = require('../util/config');
const util = require('../util/util')
const {schema,Customer} = require('../model/customer') //模型大写

config = Object.assign({}, config.customer);

mongoose.connect("mongodb://127.0.0.1/customer_test",{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.once("open",(err)=>{
    console.log("数据库连接成功");
})


// 
router.get('/getSession',(req,res)=>{
    console.log("调试")
    let code = req.query.code;
    if (!code) {
        res.json(util.handleFail('code不能为空', 10001));
    } else {
        let sessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
        request(sessionUrl, (err, response, body) => {
            let result = util.handleResponse(err, response, body);
            res.json(result);
        })
    }
})

router.post('/customerPost',(req,res)=>{
    
    Customer.create(req.body,(err)=>{
        if(err){
        return    res.json({msg:err})
        }
        res.json({msg:'插入成功'})

    })
})


router.get("/getSimpleData", (req, res) => {
    // console.log('接受到简单数据请求',req.query.openid)
    // res.json({hello:'world'})
    Customer.find({openId:req.query.openId},(err,docs)=>{
        if(err){
           return res.send({msg:err})  
        }
        res.send(docs)
    })
})


module.exports = router; 