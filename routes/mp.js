let express = require('express');
let router = express.Router();
let request = require('request');
let config = require('../util/config');
let util = require('../util/util')
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1/customer_test",{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.once("open",(err)=>{
    console.log("数据库连接成功");
})

const CustomerModel = require('../model/customer') //模型大写
const UserModel = require('../model/user')
config = Object.assign({}, config.mp);

// 两个接口
router.get('/getSession', (req, res) => {
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

router.get("/login", (req, res) => {
    let userInfo = JSON.parse(req.query.userInfo);
    if (!userInfo) {
        res.json(util.handleFail('用户信息不能为空'), 10002);
    } else {
        /**
         * 存储数据到数据库
         */
        res.json({ 
            code: 0,
            data: {
                userId:'10000001'
            }, 
            message: "登录成功" 
        })
    }
})

router.get("/getSimpleData", (req, res) => {
    // console.log('接受到简单数据请求',req.query.openid)
    // res.json({hello:'world'})
    CustomerModel.find({openId:req.query.openId},(err,docs)=>{
        if(err){
           return res.send({msg:err})
        }
        res.send(docs)
    })
})

router.post('/customerPost',(req,res)=>{
    CustomerModel.create(req.body,(err)=>{
        if(err){
        return    res.json({msg:err})
        }
        res.json({msg:'插入成功'})

    })
})

module.exports = router;