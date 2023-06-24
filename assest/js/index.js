$(function () {
    var layer = layui.layer;
    $(".layui-input").on('change',function(){
        getPersonmsg();
    })
    $("#btnlogout").on("click",function(){
        layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清空token
            localStorage.removeItem("token");
            //2.跳转到另一个页面的内容
            location.href = "./login.html";
            
            layer.close(index);
          });
    })
})
function getPersonmsg() {
    $.ajax({
        type: "GET",
        url: "api/settings",
        data: {
            creator: $(".layui-input").val(),
        },
        success: function (e) {
            // var name = nickname||desc;
            // console.log(name);
          renderingAvatar(e.data);
        },
        complete:function(e){
            console.log(e);
            if(e.responseJSON.message!='获取个人设置成功'){
                localStorage.removeItem("token");
                location.href="./login.html";
            }
        }
    })
}
//渲染个人头像的内容
function renderingAvatar(user) {
    console.log(user);
  
    if (user.avatar!=='') {
      
        $(".avatar-img").attr("src", user.avatar).show();
        $(".avatar-text").hide();
    } else {
        $(".avatar-img").hide();
        $(".avatar-text").show();
        var word = name[0].toUpperCase();
        $(".avatar-text").html(word)
    }
     var name = user.nickname || user.desc;
     console.log(name);
     $(".welcome").html("欢迎&nbsp;&nbsp;"  +  name);


}