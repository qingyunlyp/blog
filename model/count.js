const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const countsSchema = new mongoose.Schema({ //返回实例对象
    num: Number,
}, { versionKey: false });
const Counts = mongoose.model('Counts', countsSchema);

// Count.create({
//     num: 0,
// });
module.exports = Counts;