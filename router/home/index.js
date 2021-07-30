const express = require('express');
const Counts = require('../../model/count');
const { findOne } = require('../../model/count');
const Articles = require('../../model/article');
module.exports = async(req, res) => {
    // 首页访问次数
    let showCount = await Counts.findOne();
    await Counts.updateOne({ _id: showCount._id }, { num: showCount.num + 1 });
    // console.log(showCount.num);
    let articlesDatas = await Articles.find().sort('-_id'); //查询全部
    let articlesData = await Articles.find().sort('-_id').limit(5); //限制长度为5

    //标签数据
    let tagsArr = [];
    articlesDatas.forEach(element => {
        // console.log(element.state);
        if (element.state == 1) {
            if (!tagsArr.includes(element.tag)) {
                tagsArr.push(element.tag);
            }
        }
    });
    req.app.locals.tagsArr = tagsArr;
    res.render(`home/index`, {
        showCount: showCount,
        articlesData,
    });
}