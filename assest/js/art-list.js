$(function () {
    var data1 = {
        page: 1,
        per_page: 4
    };
    // 渲染页面
    getArtcontent(data1);
    // setInterval(function () {
    //     getArtcontent(data);
    // }, 20000)

    getSortsdetail();
    // 筛选表单
    $("#form").submit(function (e) {
        e.preventDefault();
        data1.channel_id = $("[name=choose]").val();
        data1.status = $("[name=status]").val();
        getArtcontent(data1);
    })

    //删除文章的列表
    $("tbody").on("click", ".art-delete", function (e) {
        var leng = $(".art-delete").length;
        console.log(length);
        var id = $(this).attr("data-id");
        data1.id = id
        var flag = $(this).parent().siblings(".status").html().trim();
        flag = artStatus(flag);
        console.log(flag);
        if (flag == false) {
            return layui.layer.msg("请把文章编辑为草稿或待审核的状态");
        }
        artdelete(id);
        if (leng === 1) {
            data1.page = data1.page === 1 ? 1 : data1.page - 1;
        }
        getArtcontent(data);



    })

    // 编辑文章的内容
    $("tbody").on("click", ".art-edit", function () {
        var id = $(this).attr("data-id");
        data1.id = id;
        var detail = {};
        $.ajax({
            method: "GET",
            url: "http://geek.itheima.net/v1_0/mp/articles/" + id,
            headers: {
                Authorization: localStorage.getItem("todolist")
            },
            contentType: "application/json",
            success: function (e) {
                console.log(e);
                console.log(e.data);
                e.data.id=id
                var datastr = objtoStr(e.data);
                var datcover = objtoStr(e.data.cover);
                var datastr = datastr+"&"+datcover;
                console.log(datastr&datcover);
                var index = layer.open({
                    title: "修改图书",
                    area: ['100%', '100%'],
                    type: 2,
                    content: 'http://127.0.0.1:5500/article/art-put.html?'+datastr
                });

            }

        })

    })


    //获取文章列表
    function getArtcontent(data) {
        $.ajax({
            method: "GET",
            url: "http://geek.itheima.net/v1_0/mp/articles/",
            data: data,
            headers: {
                Authorization: localStorage.getItem("todolist")
            },
            contentType: "application/json",
            // data:JSON.stringify(obj),
            success: function (e) {
                console.log(e.data);

                // 分页


                //定义不同文章的状态
                template.defaults.imports.fliterName = function (status) {
                    switch (status) {
                        case 0:
                            return "草稿";
                        case 1:
                            return "待审核";
                        case 2:
                            return "审核通过";
                        case 3:
                            return "审核失败";
                    }

                }

                // 利用模板引擎渲染页面
                var htmlstr = template('art-table', e.data);
                // console.log(htmlstr);
                $("tbody").html(htmlstr);

                render(e.data.total_count);

            }

        })


    }

    //获取文章序列详情
    function getSortsdetail() {
        $.ajax({
            method: "GET",
            url: "http://geek.itheima.net/v1_0/channels",
            headers: {
                Authorization: localStorage.getItem("todolist")
            },
            contentType: "application/json",
            success: function (e) {
                console.log(e);
                var htmlstr = template('artsprts-choose', e.data);
                //  console.log(htmlstr);
                $(".choose").html(htmlstr);
                //让layui从新渲染区域
                layui.form.render();

            },
        })

    }

    //分页
    function render(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'test1',//注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                limit: data1.per_page,
                curr: data1.page,
                limits: [2, 4, 6, 8],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function (obj, first) {
                    data1.page = obj.curr;
                    data1.per_page = obj.limit;
                    //首次不执行
                    if (!first) {
                        getArtcontent(data1);
                    }
                },

            });
        });
    }

    // 删除文章的函数
    function artdelete(id) {
        $.ajax({
            method: "DELETE",
            url: "http://geek.itheima.net/v1_0/mp/articles/" + id,
            headers: {
                Authorization: localStorage.getItem("todolist")
            },
            contentType: "application/json",
            success: function (e) {
                console.log(e);
                layui.layer.msg("删除成功");
            }
        })
    }

    // 判断文章的状态draf
    function artStatus(flag1) {
        switch (flag1) {
            case "草稿":
                return true;
            case "待审核":
                return true;
            case "审核通过":
                return false;
            case "审核失败":
                return 3;
        }
    }


    //获取文章的详情页

    function artDetail(id) {
        $.ajax({
            method: "GET",
            url: "http://geek.itheima.net/v1_0/mp/articles/" + id,
            headers: {
                Authorization: localStorage.getItem("todolist")
            },
            contentType: "application/json",
            success: function (e) {
                console.log(e.data);

            }

        })

    }
    //编辑文章的内容：
    function artEdit(id) {
        $.ajax({
            method: "put",
            url: "http://geek.itheima.net/v1_0/mp/articles/" + id,
            headers: {
                Authorization: localStorage.getItem("todolist")
            },
            contentType: "application/json",
           data:JSON.stringify(data1),
            success: function (e) {
                console.log(e);
            }

        })

    }

    //对象转换成字符串拼接的方式
    function objtoStr(obj) {
        var arr = []
        for (key in obj) {
            arr.push(key + "=" + obj[key]);

        }
        var datastr = arr.join("&");
        return datastr;
    }

})
