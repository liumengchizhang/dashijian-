$(function () {

    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 1.4上传图片
    $("#btngetimg").on('click', function (e) {
        $("#file").click();

    })
    // 1.5获取
    $("#file").on("change", function (e) {
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)


        $("#btnupload").on('click', function () {

            var fd = new FormData();
            fd.append("avatar", file);
            fd.append("creator", '溜溜liuliu001');
            $.ajax({
                type: "PUT",
                contentType: false, //禁止设置请求类型
                processData: false, //禁止缓存
                url: 'http://hmajax.itheima.net/api/avatar',
                data: fd,
                success: function (e) {
                    console.log(e);
                    layui.layer.msg(e.message);
                    window.parent.getPersonmsg();
                }
            })

        })

    })



})