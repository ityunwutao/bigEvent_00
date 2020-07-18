$(function () {
    getUser()
})

function getUser() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
        success: function (res) {
            if (res.stauts !== 0) return layui.layer.msg('获取用户信息失败！');
            console.log(res);
        }
    })
}