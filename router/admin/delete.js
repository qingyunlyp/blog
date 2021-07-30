 //删除

 const Users = require('../../model/users');

 module.exports = async(req, res) => {

     // console.log(req.query.id);
     let isDelete = await Users.findOneAndDelete({ _id: req.query.id });
     if (isDelete) {
         res.redirect('/admin/user');
     } else {
         res.render('message', {
             msg: '删除异常，请重新操作',
             link: '/admin/user',
             countdown: '2',
         });
         return;
     }
 }