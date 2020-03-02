const hapiJoi = require('@hapi/joi')

const {Customer,schema} = require('./model/customer')

const {error} = schema.validate({
    openId:"11213kdsas",
    name:"毕晓杰",
    gestation:"23+6",
    age:25,
    address:"陕西富平",
    channel:"市场部",
    assistant_manager:"赵文慧",
    // note:"这个人没有怀孕"
})

if(error) return console.log(error.details[0].message)
console.log(error)

