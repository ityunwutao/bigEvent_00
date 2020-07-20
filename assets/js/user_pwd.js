$(function () {

    var form = layui.form;
    var layer = layui.layer;

    // 自定义验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samPwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能于原密码相同'
            };
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                console.log(res)
                layer.msg('修改成功')
                // 重置表单
                $('.layui-form')[0].reset()
                window.parent.location.href = '/home/login.html';
            }
        })
    })
})