var mongoose = require("mongoose")

var Schema = mongoose.Schema

// 定义用户信息的数据库约束
var userSchema = new Schema({
   openid:{
       type:String,
       required:true
   },
   name:String
})

module.exports = mongoose.model("User",userSchema)
