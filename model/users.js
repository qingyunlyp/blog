const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const usersSchema = new mongoose.Schema({ //返回实例对象
    nickname: {
        type: String,
        minlength: [2, '昵称至少2位'],
    },
    username: {
        type: String,
        minlength: [3, '用户名至少3个字符'],
        require: [true, '请输入用户名'],
    },
    password: {
        type: String,
        require: [true, '请输入密码'],
        minlength: [6, '密码至少6位字符'],
    },
    privilege: {
        type: String,
        require: [true, '请选择权限'],
        select: true,
        default: 'normal',
    }
}, { versionKey: false });
const Users = mongoose.model('Users', usersSchema);

// Users.create({
//     nickname: '管理员2',
//     username: 'admin2',
//     password: '123456',
//     privilege: 'admin'
// });
module.exports = Users;