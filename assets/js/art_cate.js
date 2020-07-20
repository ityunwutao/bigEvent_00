$(function () {
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 导入layer
    var layer = layui.layer;
    var index = null;
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#formAdd').html()
        })
    })



    $('body').on('submit', '#form-Add', function (e) {
        e.preventDefault()
        // 解决快速点击,多次添加的问题
        $('#add-btn').attr('disabled', true).addClass('layui-btn-disabled') // 禁用按钮,添加禁用样式


        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('添加失败');
                initArtCateList()
                console.log("成功", res)
                layer.msg('添加成功');
                layer.close(index);
            }
        })
    })

    // 为编辑按钮绑定点击事件
    var indexEdit = null;
    var form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })

    })

    // 更新文章功能
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 删除功能
    $('body').on('click', '.btn-del', function (e) {
        var id = $(this).attr('data-id')
        console.log(id)
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示',
            success: function (layero, index) {
                this.enterEsc = function (event) {
                    if (event.keyCode === 13) {
                        //确认执行代码段
                        $.ajax({
                            method: 'GET',
                            url: '/my/article/deletecate/' + id,
                            success: function (res) {
                                if (res.status !== 0) return layer.msg('删除失败!')
                                layer.msg('删除成功!')
                                layer.close(index);
                                initArtCateList()
                            }
                        })
                        layer.close(index);
                        return false;
                        //阻止系统默认回车事件
                    }
                };
                $(document).on('keydown', this.enterEsc);//监听键盘事件，关闭层
            },
          
        });

    })


})