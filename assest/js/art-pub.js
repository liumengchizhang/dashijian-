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





    })
    var draft = false;
    $("#caogao").on("click",function(e){
        e.preventDefault();
        draft = true;
          
    })

    $("#form-pub").on("submit", function (e){
        e.preventDefault();
        var image="";
        var dataobj = {};
        var cover = {};
        console.log($(this)[0]);
        console.log(dataobj);
        var form = new FormData($(this)[0]);
        form.forEach(function(value,index){
            dataobj[index]=value;
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
                
                console.log(file);
                $.ajax({
                    method: "POST",
                    contentType: false, //禁止设置请求类型
                    processData: false, //禁止缓存
                    headers: {
                        Authorization: localStorage.getItem("todolist")
                    },
                    url: "http://geek.itheima.net/v1_0/upload",
                    data:fd,
                    success:function(e){
                        console.log(e);
                        console.log(e.data.url);
                        cover.images =[e.data.url];
                        cover.type=1;
                        console.log(cover);
                         dataobj.cover =cover;
                         console.log(dataobj);
                         publishArt(dataobj,draft);    
                    }

                })
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
            // console.log(htmlstr);
            $("select").html(htmlstr);

            //  layui需要从新渲染一遍
            layui.form.render();
        }
    })
}

//发表文章的
function publishArt(data,draft){
   console.log(JSON.stringify(data));
    $.ajax({
        method:"POST",
        url:"http://geek.itheima.net/v1_0/mp/articles?draft="+draft,
        headers: {
            Authorization: localStorage.getItem("todolist")
        },
        contentType: "application/json",
        data:JSON.stringify(data),
        success:function(e){
            console.log(e);
            location.href='../article/art-list.html'
        }

    })
    
}