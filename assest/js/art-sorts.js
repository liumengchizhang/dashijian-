$(function () {
    // addBooklist();
    var form = layui.form;
    var layer = layui.layer;
    getBookmsg();

    //点击添加图书，弹出层
    var index = null
    $("#addBooklist").on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加图书分类',
            area: ['500px', '300px'],
            content: $("#formartAddlist").html(),
        });

    });

    //通过代理，经过弹出层对图书进行新增
    $("body").on("submit", "#formadd", function (e) {
        e.preventDefault();
        var data = JSON.stringify(form.val("formTest"));
        console.log(data);
        $.ajax({
            method: "POST",
            url: "http://hmajax.itheima.net/api/books",
            contentType: "application/json",
            data: data,
            success: function (e) {
                console.log(e);
                getBookmsg();
            },
            error: function (e) {
                console.log(e);
            }
        })
        layer.close(index);
    })

    // 通过代理对图书进行修改
    var indexedit = null;
    var id = 0;
    $("tbody").on("click", "#art-edit", function () {
        id = $(this).attr("data-id");
        indexedit = layer.open({
            type: 1,
            title: '修改图书分类',
            area: ['500px', '300px'],
            content: $("#formeditlist").html(),
        });

        //   获取图书的信息
        $.ajax({
            method: "GET",
            url: "http://hmajax.itheima.net/api/books/" + id,
            success: function (e) {
                console.log(e);
                form.val("formTestedit", e.data);
            }
        })
    })




    //  通过代理提交修改图书的信息

    $("body").on("submit", "#formedit", function (e) {
        e.preventDefault();
        var data = JSON.stringify(form.val("formTestedit"));
        $.ajax({
            method: "PUT",
            url: "http://hmajax.itheima.net/api/books/" + id,
            contentType: "application/json",
            data: data,
            success: function (e) {
                console.log(e);
                layer.msg(e.message);
                layer.close(indexedit);
                getBookmsg();

            },
            error: function (e) {
                console.log(e);
                layer.msg(e.message)
            }
        })
       
    })

    // 删除图书的信息
    $("tbody").on("click","#art-delete",function(){
        var id = $(this).attr("data-id");
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:"DELETE",
                url:"http://hmajax.itheima.net/api/books/"+id,
                success:function(e){
                    console.log(e.message);
                    layer.msg(e.message);
                    getBookmsg();

                },
                error:function(e){
                    console.log(e.message);
                    layer.msg(e.message);

                }
            })
            
            layer.close(index);
          });
    })






})
//获取图书的函数
function getBookmsg() {
    $.ajax({
        method: "GET",
        url: "http://hmajax.itheima.net/api/books",
        data: {
            creator: "溜溜liuliu001"
        },
        success: function (e) {
            console.log(e);
            var htmstr = template('artAddlist', e)
            console.log(htmstr);
            $("tbody").empty().html(htmstr);
        },
        error: function (e) {
            console.log(e);
        }
    })
}

