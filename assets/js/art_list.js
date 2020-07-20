$(function () {
    // 定义一个查询参数对象
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    initTable();
    // 获取文章列表
    function initTable() {
        $.ajax({
            mathod: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章列表失败!')
                layer.msg('文章列表读取成功!')
                $('')
            }
        })
    }
})