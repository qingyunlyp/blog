const Articles = require('../../model/article');

module.exports = (req, res) => {
    Articles.find()
        .then((doc) => {
            res.render(`article`, {
                data: doc,
            })
        }).catch(err => {
            res.render('message', {
                msg: '查询异常，请重试',
                link: '/admin/artcle',
                countdown: '3'
            })
        });
}