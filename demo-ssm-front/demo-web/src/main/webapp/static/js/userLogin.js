$(function () {
    var loginMobileSMSVerificationcode=new  MobileSMSVerificationcode($("#LoginName"),$("#txtSzyzm"),$("#getYZMHeader"),"cold",$("#hdLevSecondHeader"),$("#btnfszyzm"))

    $("#btnLogin").click(function () {
        if (!$("#btnLogin").hasClass("opac2")) {
            LoginInJZG();
        }
    });
});
function LoginInJZG() {

    var mobile = $.trim($("#LoginName").val());
    var szYzm= $.trim($("#txtSzyzm").val());
    var dxYzm = $.trim($("#txtDxYzm").val());

    if (CheckLoginName()&&CheckSzYZM()&&CheckDxYZM()) {
        $.ajax({
            url: '/user/loginJZG',
            data:{'mobile':mobile,'szYzm':szYzm,'dxYzm':dxYzm},
            type: 'post',
            dataTtype: 'json',
            //async: false,
            success: function (data) {
                //alert(JSON.stringify(data))
                var data = eval(data);
                if (data.status==100) {
                    // SubmitLocalGuzhiHistory();
                    if ($("#hdbackurl").val() != "") {
                        //首页特殊设置连接
                        if ($("#hdbackurl").val() == "/index") {
                            location.href = "/";
                        } else {
                            location.href = $("#hdbackurl").val();
                        }
                    } else {
                        location.href = "/";
                    }
                }else  if (data.status==101){
                    alert("验证码错误");

                }else  if (data.status==102){
                    alert("验证码错误");
                    //ReloadMVailcode("btnfszyzm")
                    ReloadMPicVailcode($("#btnfszyzm"));
                }else  if (data.status==104){
                    alert("短信验证码错误");

                } else {
                    alert("登陆失败");
                }
            }
        });
    }
}
function CheckSzYZM() {

    if ($.trim($("#txtSzyzm").val()) == "" || $.trim($("#txtSzyzm").val()) == "请输入右侧验证码") {
        alert("请输入验证码");
        return false;
    }
    return true;
}
function CheckDxYZM(){

    if ($.trim($("#txtDxYzm").val()) == "" || $.trim($("#txtDxYzm").val()) == "请输入短信验证码") {
        alert("请输入短信验证码");
        return false;
    }
    return true;
}
function CheckLoginName() {
    var IsPass = true;
    var rge = /^[1][34578][0-9]{9}$/;
    var loginName = $.trim($("#LoginName").val());

    if (loginName == "" || loginName == "请输入手机号码") {
        alert("请输入手机号码");
        return false;
    }
    else if (rge.test(loginName) == false) {
       // $("#getYZMHeader").addClass("cold");
        //$("#getYZMHeader").addClass("cold");
        alert("手机号码格式错误");
        return false;
    }

    //$("#getYZMHeader").removeClass("cold");
    $("#btnLogin").removeClass("opac2");
    return true;
}

//原来单个发送短信的
// function  ReloadMVailcode(id) {
//     $("#"+id+"").attr("src","/validate/validatecode?v="+Math.random())
// }
// function  SendMobileYZMHeader() {
//     var rge = /^[1][34578][0-9]{9}$/;
//     if ($.trim($("#LoginName").val()) != "" && $.trim($("#LoginName").val()) != "请输入手机号码") {
//         //
//         //$(".textMobile").html("手机号不符合规则").hide();
//         if (!$("#getYZMHeader").hasClass("cold")) {
//             if (rge.test($.trim($("#LoginName").val()))) {
//                 if ($.trim($("#txtSzyzm").val()) != "" && $.trim($("#txtSzyzm").val()) != "请输入右侧验证码" ) {
//
//                     $.ajax({
//                         url: '/user/sendMobileYzm',
//                         data:{'mobile':$.trim($("#LoginName").val()),'szYzm':$.trim($("#txtSzyzm").val())},
//                         type: 'Get',
//                         dataType: 'json',
//                         async: false,
//                         success: function (data) {
//
//                             //alert(JSON.stringify(data))
//                             if (data != null || data != "") {
//                                 var data = eval(data);
//                                 //alert(data.status)
//                                 if (data.status==100) {
//                                     $("#hdLevSecondHeader").val("60");
//                                     setTimeout(CutCaculatorSecondHeader, 1000);
//                                     $("#getYZMHeader").addClass("cold");
//                                 } else if(data.status==101) {
//                                     alert("短信验证码发送失败，请重试");
//                                     ReloadMVailcode("btnfszyzm")
//
//                                 } else if(data.status==102) {
//                                     alert("验证码错误");
//                                     //ReloadMVailcode("btnfszyzm")
//                                 }  else if(data.status==103) {
//                                     alert("验证码错误");
//                                     ReloadMVailcode("btnfszyzm")
//                                 }
//                             } else {
//                                 alert("短信验证码发送失败");
//                                 ReloadMVailcode("btnfszyzm")
//                             }
//                         }
//                     });
//                 } else {
//                     if ($.trim($("#txtSzyzm").val()) == "" || $.trim($("#txtSzyzm").val()) == "请输入右侧验证码") {
//                         alert("请输入验证码");
//                     }
//                 }
//             } else {
//                 alert("手机号码格式错误");
//
//                 return false;
//                 // alert("手机号不符合规则");
//             }
//         }
//     } else {
//         alert("请输入手机号码");
//         return false;
//     }
// }
// function CutCaculatorSecondHeader() {
//
//     $("#hdLevSecondHeader").val(Number($("#hdLevSecondHeader").val() - 1));
//     var second = $("#hdLevSecondHeader").val();
//     if (second > 0) {
//         $("#getYZMHeader").addClass("cold");
//         $("#getYZMHeader ").html("再次获取(" + second + ")");
//         setTimeout(CutCaculatorSecondHeader, 1000);
//
//     } else {
//         $("#getYZMHeader").removeClass("cold");
//         $("#getYZMHeader").html("获取验证码");
//     }
// }