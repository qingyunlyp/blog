//删除文章
const Article = require('../../model/article');

module.exports = async(req, res) => {
    let isDelete = await Article.findOneAndDelete({ _id: req.query.id });
    if (isDelete) {
        res.redirect('/admin/article');
    } else {
        res.render('message', {
            msg: '删除异常，请重新操作',
            link: '/admin/article',
            countdown: '2',
        });
        return;
    }
}