$(function () {
    //获取个人信息
    getUserPerson();
    // 表单的重置的行为
    $("#btnreset").on("click", function (e) {
        // e.preventDefault();
        getUserPerson();
        console.log("ok");
    });
    $("#form1").submit(function (e) {
        e.preventDefault();
        console.log("okkkk");
        putUserPerson();
    })


})

//获取个人信息
function getUserPerson() {
    $.ajax({
        type: "GET",
        url: "api/settings",
        data: {
            creator: "溜溜liuliu001"
        },
        success: function (e) {
            layui.form.val("formTest", e.data)

            //获取表单区域所有值
            var data1 = layui.form.val("formTest");
        }
    })

}



// 修改个人信息

function putUserPerson() {
    var data = {
        desc: $("#form1 [name=desc]").val(),
        email: $("#form1 [name=email]").val(),
        gender: +$("#form1 [name=gender]").val(),
        nickname: $("#form1 [name=nickname]").val(),
        creator: "溜溜liuliu001"

    };
    $.ajax({
        type: "PUT",
        url: "api/settings",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (e) {
            console.log(e);
            layui.layer.msg(e.message, { icon: 6 });
            // window.parent.getPersonmsg();
        },
        error: function (e) {
            console.log(e.responseJSON.message);
            layui.layer.msg(e.responseJSON.message, { icon: 2 })

        }
    })

}