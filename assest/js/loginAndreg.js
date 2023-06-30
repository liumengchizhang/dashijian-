$(function(){
    $(".login-reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $(".reg-login").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide();
    });

    //自定义验证规则：
    var form = layui.form;
    var layer = layui.layer
    form.verify({
            username:function(value,item){
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                    return '用户名不能有特殊字符';
                  }
                  if(/(^_)|(__)|(_+$)/.test(value)) return '用户名首尾不能出现 _ 下划线';
                  if(/^\d+$/.test(value)) return '用户名不能全为数字';
                  if(!(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\u4e00-\u9fa5])[a-zA-Z0-9\u4e00-\u9fa5]{8,}$/.test(value))) return "中英文和数字组成, 最少8位" 
            },
            password: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
            confirmPassword:function(){
                var password = $(".reg-box [name=password]").val();
                var confirmPassword = $(".reg-box [name=confirmPassword]").val();
                if(password!=confirmPassword){
                       return '两次输入密码不一致';
                }
            }
    });

    //注册页面

   $("#myform-reg01").on("submit",function(e){
    e.preventDefault();
   var data = { username: $("#myform-reg01 [name=username]").val(), password: $("#myform-reg01 [name=password]").val()};
    console.log(e);
    $.ajax({
         url:'api/register',
         type:"post",
         data:{
            username: $('#myform-reg01 [name=username]').val(),
            password: $('#myform-reg01 [name=password]').val(),

          },
          success:function(e){
            console.log(e);
            layer.msg("注册成功请登录");
            $(".reg-login").click();
          },
          error:function(e){
          console.log(JSON.parse(e.responseText));
          layer.msg(JSON.parse(e.responseText).message);
           
          }
        
    })
    
   });

   //登陆的页面
   $("#myform-login01").submit(function(e){
    e.preventDefault();
    var data = { username: $("#myform-login01 [name=username]").val(), password: $("#myform-login01 [name=password]").val()};
    $.ajax({
        type:"post",
        url:"api/login",
        data:$(this).serialize(),
        success:function(e){
            console.log(e);
            layer.msg("登陆成功");
            localStorage.setItem("token",'98e27b86-1541-468d-a334-fa5350443651');
            location.href = './index.html'  
        },
        error:function(e){
            console.log(e);
            // console.log(JSON.parse(e.responseText));
            // layer.msg(JSON.parse(e.responseText).message);
             
            }
            
    })

   })



});
