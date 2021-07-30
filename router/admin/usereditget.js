const Users = require('../../model/users');

module.exports = (req, res) => {
    if (req.query.id) {
        //传了id 是修改操作
        Users.findOne({ _id: req.query.id }).lean() //.lean()  默认mongoose返回的单个对象是mongoose对象  体积过大，不能直接放到摸版中，需要.lean（）处理
            .then(doc => {
                res.render(`user-edit`, {
                    userInfo: doc,
                });
                console.log(doc);
            }).catch(error => {

            });

    } else {
        //  添加用户
        res.render(`user-edit`);
    }
}