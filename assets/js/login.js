$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 去登录
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 要自定义校验规则, 首先需得到form模块对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 一.可以通过键值对(值是数组)校验,规则,弹出内容
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 二.可以通过函数指定校验规则
        repwd: function (value) {
            // 形参拿到确认密码框的内容
            // 还需要拿到密码框的内容
            var pwd = $('.reg-box [name=password]').val();
            // 进行等于判断
            if (pwd !== value) return '两次密码不一致'
        }
    })

    // 监听注册提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认跳转提交事件
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        // 发送ajax请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功,请登录!');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败')
                layer.msg('登录成功')
                // 本地存储
                localStorage.setItem('token', res.token)
                location.href = "/index.html";
                // location.href = "http://127.0.0.1:5500/home/index.html";
            }
        })
    })
})