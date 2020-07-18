$(function () {
    // 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
    // 会先调用 ajaxPrefilter 这个函数
    // 在这个函数中，可以拿到我们给Ajax提供的配置对象
    $.ajaxPrefilter(function (options) {
        console.log(options)
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        };

        // 不论成功还是失败，最终都会调用 complete 回调函数
        options.complete = function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空token
                localStorage.removeItem('token');
                // 强制跳转到登录页
                location.href = '/home/login.html'
            }
        }

    })
})