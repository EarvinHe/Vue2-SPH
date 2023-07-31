// 1.引入express
const { response } = require('express');
const express = require('express');

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// request 是对请求报文的一个封装
// response 是对相应报文的一个封装
app.all('/server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置相应体
    response.send('hello Ajax')
});

app.all('/server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置相应体
    response.send('hello Ajax post')
});

app.all('/json-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    // 设置相应体
    // response.send('hello Ajax json')
    const data = {
        name: 'atguigu22'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置响应体
    response.send(str);
});


app.all('/axios-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Access-Token,name')
    // 设置相应体
    // response.send('hello Ajax json')
    const data = { name: 'atguigu' };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置响应体
    response.send(str);
});



// 4.监听端口启动服务
app.listen(5500, () => {
    console.log("服务已经启动，8000端口监听中");
})