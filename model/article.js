//文章集合
const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({ //返回实例对象
    title: {
        type: String,
        required: [true, '请传入文章标题'],
        minlength: [2, '昵称至少2位'],
    },
    author: {
        type: String,
    },
    tag: {
        type: String,
        require: [true, '请传入文章分类'],
    },
    pubDate: {
        type: Date,
        default: new Date()
    },
    state: String,
    content: {
        type: String,
        require: [true, '请先编辑文章内容再发布'],
    },
}, { versionKey: false });
const Articles = mongoose.model('Articles', articlesSchema);

// Articles.create({
//     title: '文章测试',
//     author: 'admin',
//     tag: 'text',
//     state: '1'
// });
module.exports = Articles;