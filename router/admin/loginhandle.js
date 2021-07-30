  const Users = require('../../model/users');
  const bcrypt = require('bcrypt');


  module.exports = async(req, res) => {
      let queryUser = await Users.findOne({ username: req.body.username });
      if (queryUser) {
          let ispwd = await bcrypt.compare(req.body.password, queryUser.password);
          //   console.log(ispwd);
          if (ispwd) {
              // 验证密码正确
              req.session.username = queryUser.username;
              req.app.locals.userinfo = queryUser;
              res.redirect('/admin/user');
          } else {
              // 验证密码错误
              res.render(`message`, {
                  msg: '密码错误，请重新输入密码',
                  link: '/admin/login',
                  countdown: '2',
              });
          }
      } else {
          res.render(`message`, {
              msg: '用户名不存在，请重新输入用户名',
              link: '/admin/login',
              countdown: '2',
          });
      }
  }