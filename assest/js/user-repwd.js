$(function(){
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        sam: function(){
            var old1 = $("form [name=old1]").val();
            var new1 = $("form [name=new1]").val();
            if(old1===new1){
                return "新旧密码不能相同";
            }

        },
        con:function(){
            var new1 = $("form [name=new1]").val();
            var confirm1 = $("form [name=confirm1]").val();
            if(confirm1!==new1){
                return "两次输入密码不一致"
            }
           
        }
    });

    // 进行修改密码请求
    $(".layui-form").submit(function(e){
        e.preventDefault();
        var data={
            "id":11,
            "newPass":$("form [name=new1]").val()
        };
        console.log(JSON.stringify(data))
        $.ajax({
            type:"PUT",
            contentType:"application/json",
            url:"http://192.168.0.116:9090/admin/password",
            data:JSON.stringify(data),
            success:function(e){
                console.log(e);
                layer.msg(e.data);
            },
            error:function(e){
                layer.msg(e.responseJSON.error)
            }

        })
        $(this)[0].reset();

    })



})