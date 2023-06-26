// 注意，每次调用$.get()或$.post或$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){

    console.log(options.url);
    options.url = "http://hmajax.itheima.net/"+options.url
    console.log(options.url);
    // // if(options.url.indexOf('/my')!=-1){
    // //     options.header ={
    // //         Authorization:localStorage.getItem("token")||''
    // // }

    // }
   
})