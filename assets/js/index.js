$(function () {
    getUser()

    var layer = layui.layer;

    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = '/home/login.html';
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})

// 获取用户信息
function getUser() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                layui.layer.msg('获取用户信息失败！')
                return console.log(res);
            };
            console.log(res);
            renderAvatar(res.data)

        }
    })
}


function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    console.log(name)
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}



