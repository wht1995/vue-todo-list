const express = require('express');
const bodyParser = require('body-parser'); 
const indexRouter = require('./routes/index');

const server=express();
server.listen(8081);

 //请求数据
server.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
server.use(bodyParser.json())

server.use('/', indexRouter);

console.log("start...")