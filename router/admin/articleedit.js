const Article = require('../../model/article');


module.exports = (req, res) => {
    if (req.query.id) {
        Article.findOne({ _id: req.query.id }).lean() //.lean()  默认mongoose返回的单个对象是mongoose对象  体积过大，不能直接放到摸版中，需要.lean（）处理
            .then(doc => {
                res.render(`article-edit`, {
                    articleinfo: doc,
                });
                console.log(doc);
            }).catch(error => {

            });
    } else {
        // console.log(req.app.locals.userinfo);
        res.render('article-edit', {
            currentuserinfo: req.app.locals.userinfo,
        });
    }

}