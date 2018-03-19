$(function () {
    var userAppMobelVcode = new MobileSMSVerificationcode($("#textMobile"), $("#txtSzyzm"), $("#btnSendYZM"), "cola", $("#hdLevSecond"), $("#btnfszyzm"));
    $("#btnSellCarAppraise,#btnBuyCarAppraise").click(function () {
        if (CheckKsInfo()) {
            var guzhitype = $(this).attr("data");
            var makeid = $.trim($("#hdMakeId_Ks_Com").val());
            var modeid = $.trim($("#hdModelId_Ks_Com").val());
            var styid = $.trim($("#hdStyleId_Ks_Com").val());
            var regdate = $.trim($("#hdRegYear_Ks_Com").val()) + "-" + $.trim($("#hdRegMonth_Ks_Com").val()) + "-1"
            var mileage = (parseFloat($.trim($("#txtMile_Ks_Com").val())) * 10000).toFixed(0);
            //alert(mileage);
            var provid = $.trim($("#hdProvenceId_Ks_Com").val());
            var cityid = $.trim($("#hdCityId_Ks_Com").val());
            var clueType = 1;
            if (guzhitype == 1) {
                clueType = 2;
                url = "/sale-s" + styid + "-r" + regdate + "-m" + mileage + "-c" + cityid + "-y-j-h";
            } else {
                url = "/buy-s" + styid + "-r" + regdate + "-m" + mileage + "-c" + cityid + "-y-j-h"
                clueType = 1;
            }
//                if ($("#hdClueFrom").val() != "jzg") {
//                    url += "-rbackxiansuo/pinggu-" + $("#hdClueFrom").val() + ".html"
//                } else {
//                    url += "-rbackxiansuo/pinggu.html"
//                }


            $.ajax({
                url: '/comAppraise/submitAppraiseClue',
                data: {
                    'styleid': (styid),
                    'regDate': (regdate),
                    'mileage': (mileage),
                    'cityid': (cityid),
                    'cluefrom': ($("#hdClueFrom").val()),
                    'clueType': (clueType),
                    'cityName': ($.trim($("#liSelectArea_Ks_Com").html())),
                    'lianxiRen': ($.trim($("#txtLianxiRen").val())),
                    'mobile': ($.trim($("#textMobile").val())),
                    'szYzm': ($.trim($("#txtSzyzm").val())),
                    'dxYzm': ($.trim($("#textMobileYZM").val()))
                },

                type: 'post',
                datatype: 'json',
                async: false,
                success: function (data) {
                    // alert(JSON.stringify(data));

                    if (data != null || data != "") {
                        var data = eval(data);
                        if (data.status == 100) {
                            window.location.href = url;
                        } else if (data.status == 101 || data.status == 104) {
                            alert("提交失败");
                            ReloadMPicVailcode($("#btnfszyzm"))
                        } else if (data.status == 102) {
                            alert("验证码不正确");
                        } else if (data.status == 103) {
                            alert("短信验证码不正确");
                        }
                    }
                }
            });
        }
    });


});


function CheckKsInfo() {
    var Ispass = true;
    if (ComCheckKsInfo()) {
        /*    var txtLianxiRen = $.trim($("#txtLianxiRen").val());
         if (txtLianxiRen == "" || txtLianxiRen == "请输入联系人") {
         Ispass = false;
         alert("请输入联系人");
         return false;
         }*/

        var rge = /^[1][34578][0-9]{9}$/;
        var textMobile = $.trim($("#textMobile").val());
        if (textMobile == "" || textMobile == "请输入手机号") {
            Ispass = false;
            alert("请输入手机号");
            return false;
        } else if (!rge.test(textMobile)) {
            Ispass = false;
            alert("手机号格式不正确");
            return false;
        }
        var txtSzyzm = $.trim($("#txtSzyzm").val());
        if (txtSzyzm == "" || txtSzyzm == "请输入右侧验证码") {
            Ispass = false;
            alert("请输入数字验证码");
            return false;
        }

        var textMobileYZM = $.trim($("#textMobileYZM").val());
        if (textMobileYZM == "" || textMobileYZM == "请输入短信验证码") {
            Ispass = false;
            alert("请输入短信验证码");
            return false;
        }
    } else {
        return false;
    }
    return Ispass;
}
