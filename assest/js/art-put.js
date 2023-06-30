$(function () {
    //渲染下拉框的表单
    getChannels();

    // 初始化富文本编辑器
    initEditor();

    //图片的裁剪

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 开始选择图片
    $("#coverChoose").on("click", function (e) {
        e.preventDefault();
        $("#file").click();
    })

    // 获取图片的地址
    var a;

    $("#file").on("change", function (e) {
        console.log(e);
        var file = e.target.files[0]
        if (file.length == 0) {
            layui.layer.msg("请选择有效的图片");
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

        layui.form.on('select(filter)', function (data) {
            console.log(data.elem); //得到select原始DOM对象
            console.log(data.value); //得到被选中的值
            console.log(data.othis); //得到美化后的DOM对象
        });



    })
    var draft = false;
    $("#caogao").on("click", function (e) {
        e.preventDefault();
        draft = true;

    })

    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        var image = "";
        var dataobj = {};
        var cover = {};
        console.log($(this)[0]);
        console.log(dataobj);
        var form = new FormData($(this)[0]);
        form.forEach(function (value, index) {
            dataobj[index] = value;
        })

        console.log(dataobj);
        var fd = new FormData();
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                let file = new File([blob], 'test.png', { type: blob.type })
                fd.append("image", file);
                $.ajax({
                    method: "POST",
                    contentType: false, //禁止设置请求类型
                    processData: false, //禁止缓存
                    headers: {
                        Authorization: localStorage.getItem("todolist")
                    },
                    url: "http://geek.itheima.net/v1_0/upload",
                    data: fd,
                    success: function (e) {
                        console.log(e);
                        console.log(e.data.url);
                        cover.images = [e.data.url];
                        cover.type = 1;
                        console.log(cover);
                        var id = getContent();
                        id =id.id
                        console.log(id);
                        dataobj.cover = cover;
                        console.log(dataobj);
                        delete dataobj.images;
                        publishArt(dataobj, draft,id);
                    }


                })
            })

    })


    //获取所有频道列表的方法的内容
    function getChannels() {
        $.ajax({
            method: "GET",
            url: "http://geek.itheima.net/v1_0/channels",
            success: function (e) {
                console.log(e);
                var htmlstr = template('inputMenu', e.data);
                console.log(htmlstr);
                $("select").html(htmlstr);
                layui.form.render();
                //  layui需要从新渲染一遍

                var data = getContent();
                // console.log(data);
                layui.form.val("formTest", data);
                layui.form.val("formTest", data.cover);
                console.log($("[name=images]").val());
                $image
                    .cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', $("[name=images]").val())  // 重新设置图片路径
                    .cropper(options)        // 重新初始化裁剪区域
            }
        })
    }

    //获取页面的的内容
    function getContent() {
        var u = window.location.toString();
        u = u.split("?")[1];
        u = decodeURI(u);
        // console.log(u);
        u = u.split("&");
        console.log(u);
        var obj = {};

        var cover = {}
        u.forEach(function (value, index) {
            if (index > 5) {
                var arr = value.split("=")[0];
                cover[value.split("=")[0]] = value.split("=")[1];
            } else {
                var arr = value.split("=")[0];
                obj[value.split("=")[0]] = value.split("=")[1];
            }

        })
        obj.cover = cover;
        return obj;
    }

    //发表文章的
    function publishArt(data, draft,id) {
        console.log(JSON.stringify(data)+"yyy");
        $.ajax({
            method: "PUT",
            url: "http://geek.itheima.net/v1_0/mp/articles/"+id+"?draft="+draft,
           headers:{
                Authorization:"Bearer 98e27b86-1541-468d-a334-fa5350443651"
                // Authorization:localStorage.getItem("todolist")
           },
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (e) {
                console.log(e);
                 location.href='../article/art-list.html'
            }

        })
    
    }

})
