const express = require('express');
const bcrypt = require('bcrypt');

const admin = express.Router();

//导入用户集合
const Users = require('../model/users');
const Articles = require('../model/article');
admin.get('/register', (req, res) => {
    res.render(`register`);
});
//注册
admin.post('/register', require('./admin/reghandle'));

admin.get('/login', (req, res) => {
    res.render(`login`);
});
//登录
admin.post('/login', require('./admin/loginhandle'));
//分页
admin.get('/user', require('./admin/pagehandle'));
//用户编辑
admin.get('/user-edit', require('./admin/usereditget'));
//添加用户  修改用户
admin.post('/user-edit', require('./admin/useredithandle'));
//删除
admin.get('/delete', require('./admin/delete'));
//退出
admin.get('/exit', require('./admin/exit'));


//文章展示页
admin.get('/article', require('./admin/articleshow'));
//文章编辑
admin.get('/article-edit', require('./admin/articleedit'));
admin.post('/article-edit', require('./admin/articlehandle'));
// 删除
admin.get('/article-delete', require('./admin/articledel'));
module.exports = admin;