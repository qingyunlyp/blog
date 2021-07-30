const val_username = /^[a-zA-Z0-9_-]{3,16}$/; //3-16位数字和字母的组合
const val_pwd = /^[a-zA-Z0-9_-]{6,18}$/; //6-18位数字和字母的组合
var flag = false;
$('.btn').on('click', function() {
    $('input').each((index, element) => {
        if (val_username.test($('#username').val()) && val_pwd.test($('#pwd').val())) {
            flag = true;
            return false;
        } else {
            flag = false;
            return false;
        }
    });
    if (flag) {
        return true;
    } else {
        alert('用户名3-16位数字和字母的组合;密码(6-18位数字和字母的组合)');
        return false;
    }
});