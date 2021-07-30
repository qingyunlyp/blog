const bcrypt = require('bcrypt');
const Users = require('../../model/users');

module.exports = async(req, res) => {
    if (req.query.id) { //通过是否有id判断是否是编辑页面还是修改界面
        // console.log(req.body.isPwd);
        if (req.body.password < 6) {
            res.render('message', {
                msg: '密码至少六位',
                link: '/admin/user-edit?id=' + req.query.id,
                countdown: '2',
            })
        }
        if (req.body.isPwd == '1') {
            // 修改密码
            //哈希加密
            let salt = await bcrypt.genSalt(10);
            let hashpwd = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashpwd;
            //哈希加密
        }
        Users.updateOne({ _id: req.query.id }, req.body)
            .then(() => {
                res.redirect('/admin/user');
                return;
            })
            // res.send('修改用户');
    } else { // 添加用户

        let queryUser = await Users.findOne({ username: req.body.username });
        if (queryUser) {
            res.render(`message`, {
                msg: '该用户已被注册',
                link: '/admin/user-edit',
            });
            return;
        } else {
            if (req.body.password < 6) {
                res.render('message', {
                    msg: '密码至少六位',
                    link: '/admin/user-edit',
                    countdown: '2',
                })
            }
            // 哈希加密
            let salt = await bcrypt.genSalt(10);
            let hashpwd = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashpwd;
            // 哈希加密
            Users.create(req.body)
                .then(() => {
                    res.render('message', {
                        msg: '注册成功',
                        link: '/admin/user',
                        countdown: '2',
                    });
                    // res.redirect('/admin/user');
                    return;
                })
                .catch((err) => {
                    let errObj = err.errors;
                    for (let k in errObj) {
                        res.render('message', {
                            msg: errObj[k].message,
                            link: '/admin/user-edit',
                            countdown: '2',
                        });
                        break;
                    }
                    return;
                });
        }
        // res.send('添加用户');
    }
}