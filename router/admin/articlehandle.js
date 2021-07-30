//文章添加 编辑
const { text } = require('express');
const Articles = require('../../model/article');
module.exports = async(req, res) => {
    if (req.query.id) {
        // 修改功能
        // console.log(req.body.content.txt.text());
        if (req.body.title.length < 2) {
            res.render('message', {
                msg: '文章标题至少两个字符',
                link: '/admin/article-edit?id=' + req.query.id,
                countdown: '2',
            });
            return;
        }
        if (req.body.tag.length < 2) {
            res.render('message', {
                msg: '文章标签至少两个字符',
                link: '/admin/article-edit?id=' + req.query.id,
                countdown: '2',
            });
            return;
        }
        if (req.body.content.length < 2) {
            res.render('message', {
                msg: '文章内容至少两个字符',
                link: '/admin/article-edit?id=' + req.query.id,
                countdown: '2',
            });
            return;
        }
        Articles.updateOne({ _id: req.query.id }, req.body)
            .then(() => {
                res.render('message', {
                    msg: '更新成功',
                    link: '/admin/article',
                    countdown: '2',
                })
            })
            .catch(err => {
                let errObj = err.errors;
                for (let k in errObj) {
                    res.render('message', {
                        msg: errObj[k].message,
                        link: '/admin/article-edit' + req.query.id,
                        countdown: '2',
                    });
                    break;
                }
                return;
            });

    } else {

        //添加功能
        //将昵称和时间给body
        req.body.author = req.app.locals.userinfo.nickname;
        if (req.app.locals.userinfo.pubDate) {
            console.log(req.app.locals.userinfo.pubDate);
        } else {
            req.body.pubDate = new Date();
        }
        //判断
        let queryArticle = await Articles.findOne({ title: req.body.title });
        if (queryArticle) {
            res.render('message', {
                msg: '标题重复，请更换标题',
                link: '/admin/article-edit',
                countdown: '2',
            })
        } else {
            Articles.create(req.body)
                .then(() => {
                    res.render(`message`, {
                        msg: '文章添加成功',
                        link: '/admin/article',
                        countdown: '2',
                    })
                })
                .catch(err => {
                    let errObj = err.errors;
                    for (let k in errObj) {
                        res.render(`message`, {
                            msg: errObj[k].message,
                            link: '/admin/article-edit',
                            countdown: '2',
                        })
                    }
                })
        }
    }
}