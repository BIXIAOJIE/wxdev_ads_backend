const express = require('express');
const bodyParser = require('body-parser');
var customer = require('./routes/customer');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/customer', customer);


app.listen(3000,()=>{
    console.log("服务器运行在3000端口");
})