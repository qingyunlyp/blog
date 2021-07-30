const express = require('express');
const home = express.Router();
const Counts = require('../model/count');
const Articles = require('../model/article');
const P = require('mongoose-sex-page');
const { findOne } = require('../model/count');

//主页index
home.get('/', require('./home/index'));

home.get('/tags', async(req, res) => {
    if (req.query.type) {
        //有type
        // console.log('有type');

        let articleDatas = await P(Articles).find({ tag: req.query.type }).sort('-_id')
            .page(req.query.page) //当前页
            .size(4) //显示几条数据
            .display(3) //几个分页按钮
            .exec(); //查询
        // console.log(articleDatas);
        res.render(`home/tags`, {
            articleDatas: articleDatas,
            type: req.query.type,
        });
    } else {
        // 无type
        // console.log('无type');
        let articleDatas = await P(Articles).find().sort('-_id')
            .page(req.query.page)
            .size(4)
            .display(3)
            .exec();
        // console.log(articleDatas.display[0]);
        // res.send('tags');
        res.render(`home/tags`, {
            articleDatas: articleDatas
        });
    }

});

home.get('/about', (req, res) => {
    res.send('ablot');
})
home.get('/articlecon', async(req, res) => {
    let artileObj = await Articles.findOne({ _id: req.query.artid }).lean();
    // console.log(artileObj);
    res.render('home/articlecon', artileObj);
})
module.exports = home;