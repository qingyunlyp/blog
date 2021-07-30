// 注册

//导入用户集合
const Users = require('../../model/users');
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    let queryUser = await Users.findOne({ username: req.body.username });
    if (queryUser) {
        res.render(`message`, {
            msg: '该用户已被注册',
            link: '/admin/register',
        });
    } else {
        if (req.body.password.length < 6) {
            res.render(`message`, {
                msg: '密码至少6位字符',
                link: '/admin/register',
                countdown: '2',
            });
            return;
        }
        let salt = await bcrypt.genSalt(10);
        let pwdhash = await bcrypt.hash(req.body.password, salt);
        req.body.password = pwdhash;
        // let isReg = await Users.create(req.body);
        // console.log(req.body);
        try {
            await Users.create(req.body);
            res.render(`message`, {
                msg: '注册成功',
                link: '/admin/login',
                countdown: '2',
            });
        } catch (error) {
            let errobj = error.errors;
            // console.log(error.errors);
            for (let k in errobj) {
                // console.log(errobj[k].message);
                res.render(`message`, {
                    msg: errobj[k].message,
                    link: '/admin/register',
                    countdown: '2',
                });
                break;
            }
            return;
        }
    }
}