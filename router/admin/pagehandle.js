//分页

const Users = require('../../model/users');


module.exports = async(req, res) => {

    ///分页功能
    let currentPage = req.query.page || 1;
    // console.log(currentPage);
    //总数据
    let dataTital = await Users.countDocuments();
    // console.log(dataTital);
    //每页显示几条
    let pageShow = 4;
    //一共多少页
    let pages = Math.ceil(dataTital / pageShow);
    // console.log(pages);

    let usersArr = await Users.find().skip((currentPage - 1) * pageShow).limit(pageShow);
    res.render(`user`, {
        usersArr: usersArr,
        pages: pages,
        currentPage: currentPage,

    });
}