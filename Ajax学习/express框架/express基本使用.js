// 1.引入express
const express = require('express');

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// request 是对请求报文的一个封装
// response 是对相应报文的一个封装
app.get('/',(request,response)=>{
    // 设置相应
    response.send('hello express')
});

// 4.监听端口启动服务
app.listen(8000,()=>{
    console.log("服务已经启动，8000端口监听中");
})