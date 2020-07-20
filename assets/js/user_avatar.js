$(function () {
    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮注册点击事件
    $("#btn_file").on('click', function () {
        $('#file').click()
    })

    // 注册上传修改事件
    $('#file').on('change', function (e) {
        // 获取上传文件列表
        var filelist = e.target.files;
        console.log(filelist)

        if (filelist.length === 0) return layer.msg('上传文件不能为空!')

        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 注册确定按钮
    $('#btn_confirm').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


        // 发送请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败!')
                }
                layer.msg('更新成功!')
                window.parent.getUser()
            }
        })
    })


  
})