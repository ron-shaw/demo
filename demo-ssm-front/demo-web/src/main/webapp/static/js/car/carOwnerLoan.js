
$(function () {
    var carOnwerLoanMobelVcode = new MobileSMSVerificationcode($("#textMobile"), $("#txtSzyzm"), $("#btnSendYZM"), "cola", $("#hdLevSecond"), $("#btnfszyzm"))
    $(".btnSuccess").click(function () {

        if (checkBaseInfo()) {
            var personname = $.trim($("#ApplyPersonName").val());
            var mobile = $.trim($("#textMobile").val());
            var szyzm=$.trim($("#txtSzyzm").val());
            var dxyzm=$.trim($("#textMobileYZM").val());

            $.ajax({
                type: 'POST',
                url: '/carOwnerLoan/applyLoanStepOne',
                async: false,
                type: 'post',
                dataType: 'json',
                data: {
                    "username": personname, "mobile": mobile,"szYzm":szyzm,"dxYzm":dxyzm
                },
                beforeSend: function () {
                },
                success: function (res) {
                    if (res != null || res != "") {
                        var data = eval(res);
                        if (data.status == "100") {
                            var url="/carOwnerLoan/applyLoan?orderId="+data.msg+"&username="+escape(personname)+"&mobile="+mobile;
                            if($.trim($("#hdstyleid").val())>0&&$.trim($("#hdmileage").val())>0&&$.trim($("#hdcityId").val())>0){
                                url+="&styleid="+$.trim($("#hdstyleid").val())+"&cityid="+$.trim($("#hdcityId").val())+"&mileage="+$.trim($("#hdmileage").val())+"&regDate="+$.trim($("#hdregDate").val())
                            }
                            window.location.href=url;
                        }else  if (data.status == "101"||data.status == "104"||data.status == "106"){
                            alert("申请失败")
                        }else  if (data.status == "102") {
                            alert("验证码错误")
                            ReloadMPicVailcode($("#btnfszyzm"))
                        } else  if (data.status == "103") {
                            alert("短信验证码错误")
                        }else  if (data.status == "105") {
                            alert(data.msg);
                        }
                    }else{
                        alert("申请失败")
                    }

                }
            });
        }
    });
});
function checkBaseInfo() {
    var ISPass = true;

    if ($("#ApplyPersonName").val() == "" || $("#ApplyPersonName").val() == null || $("#ApplyPersonName").val() == "请输入姓名") {
        alert("请输入姓名");
        return false;

    }
    if ($("#textMobile").val() == "" || $("#textMobile").val() == null || $("#textMobile").val() == "请输入手机号") {
        alert("请输入手机号");
        return false;
    }
    if ($("#txtSzyzm").val() == "" || $("#txtSzyzm").val() == null || $("#txtSzyzm").val() == "请输入验证码") {
        alert("请输入验证码");
        return false;

    }
    if ($("#textMobileYZM").val() == "" || $("#textMobileYZM").val() == null || $("#textMobileYZM").val() == "" || $("#textMobileYZM").val() == "请输入短信验证码") {

        alert("请输入短信验证码");
        return false;
    }
    return true;
}