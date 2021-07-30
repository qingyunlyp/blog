const express = require('express');
const path = require('path');
const session = require('express-session');
const template = require('art-template');

const port = 3000;
const admin = require('./router/admin');
const home = require('./router/home');

require('./model/connect');

const app = express();

//开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

//引入模板引擎  并配置模板
//时间处理模块
const dateFormat = require("dateformat");

template.defaults.imports.dateFormat = dateFormat;

app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'art');

// 设置post参数获取
app.use(express.urlencoded({ extended: false }));

//配置session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }))
    //路由拦截
app.use('/admin', (req, res, next) => {
    if (req.session.username || req.url == '/login' || req.url == '/register') {
        next();
    } else {
        res.render('message', {
            msg: '用户未登录，请先登录',
            link: '/admin/login',
            countdown: '2',
        });
    }
})

//分配路由任务
app.use('/admin', admin);
app.use('/home', home);
// 404
app.use((req, res) => {
    res.render(`message`, {
        msg: '404出错',
        link: '/admin/login',
        countdown: '6'
    });
})
app.listen(port, () => console.log(`服务器启动成功!`));