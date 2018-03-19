/**
 * Created by Administrator on 2017/4/14.
 */
var newCarBrand, newCarParam = null;
$(function () {
    //给输入框添加颜色
    InputAddClass();
    var sellCarMobelVcode = new MobileSMSVerificationcode($("#textMobile"), $("#txtSzyzm"), $("#btnSendYZM"), "zhqyahui", $("#hdLevSecond"), $("#btnfszyzm"))
    var changeCarMobelVcode = new MobileSMSVerificationcode($("#textMobile1"), $("#txtSzyzm1"), $("#btnSendYZM1"), "zhqyahui", $("#hdLevSecond1"), $("#btnfszyzm1"))
    //车型级别
    var SectionSelectLevel = new SelectModelLevel("textModels", "SectionSelectLevel", "hdYxModelLevel", false);
    $("body").addClass("backbg2");
    setTimeout(AutoShowSellCarInfo,10*1000);
    OnloadClick();
    // $("#changeNewCarBrand").click(function () {
    //     //$(".zhezhaosellcar1").hide();
    // });
    //选择品牌
    initNewCar();
    $(".btnPublishSellCar a").click(function () {
        var mobile = $.trim($("#textMobile").val());
        if (mobile == "" || mobile == "请输入手机号") {
            // $("#textMobile").val("请输入手机号").addClass("zhszt");
            $("#textMobile").attr("placeholder","请输入手机号").addClass("zhszt");
            alert("请输入手机号");
            Ispass = false;
            return false;
        } else {
            var rg = /^[1][34578][0-9]{9}$/;
            if (!rg.test(mobile)) {
                alert("手机号码格式不对");
                $("#textMobile").addClass("zhszt");
                $(".pmobile a").html("手机号码格式不对").parent("p").show();
                Ispass = false;
                return false;
            } else {
                $("#textMobile").removeClass("zhszt");
                $(".pmobile").hide();
            }
        }
        if ($("#txtSzyzm").val() == "" || $("#txtSzyzm").val() == "请输入验证码") {
            Ispass = false;
            alert("请输入验证码");
            return false;
        }
        var validatecode = $.trim($("#textMobileYZM").val());
        if (validatecode == "" || validatecode == "请输入短信验证码") {
            Ispass = false;
            alert("请输入短信验证码");

            $("#textMobileYZM").attr("placeholder","请输入短信验证码").addClass("zhszt");
            // $("#textMobileYZM").val("请输入短信验证码").addClass("zhszt");
            //$(".pyanzhm a").html("请输入验证码").parent("p").show();
            return false;
        }
        SubmitClueInfo(2);
    });
    $(".btnPublishChangeCar a").click(function () {
        var yxmakename=$("#hdYxMakeName").val();
        var yxModelLevelName=$("#hdYxModelLevel").val();
        var mobile = $.trim($("#textMobile1").val());
        if(yxmakename==""){
            alert("请选择意向新车品牌");
            Ispass = false;
            return false;
        }
        if(yxModelLevelName==""){
            alert("请选择意向新车车型");
            Ispass = false;
            return false;
        }
        if (mobile == "" || mobile == "请输入手机号") {
            // $("#textMobile").val("请输入手机号").addClass("zhszt");
            $("#textMobile1").attr("placeholder","请输入手机号").addClass("zhszt");
            alert("请输入手机号");
            Ispass = false;
            return false;
        } else {
            var rg = /^[1][34578][0-9]{9}$/;
            if (!rg.test(mobile)) {
                alert("手机号码格式不对");
                $("#textMobile1").addClass("zhszt");
                $(".pmobile a").html("手机号码格式不对").parent("p").show();
                Ispass = false;
                return false;
            } else {
                $("#textMobile1").removeClass("zhszt");
                $(".pmobile").hide();
            }
        }
        if ($("#txtSzyzm1").val() == "" || $("#txtSzyzm1").val() == "请输入验证码") {
            Ispass = false;
            alert("请输入验证码");
            return false;
        }
        var validatecode = $.trim($("#textMobileYZM1").val());
        if (validatecode == "" || validatecode == "请输入短信验证码") {
            Ispass = false;
            alert("请输入短信验证码");

            $("#textMobileYZM1").attr("placeholder","请输入短信验证码").addClass("zhszt");
            // $("#textMobileYZM").val("请输入短信验证码").addClass("zhszt");
            //$(".pyanzhm a").html("请输入验证码").parent("p").show();
            return false;
        }
        SubmitClueInfo(4);
    });
});
function  SubmitClueInfo(cluetype) {
    var styid = $.trim($("#hdStyleId_Ks").val());
    var cityid = $.trim($("#hdCityId_Ks").val());
    var regmile = $.trim($("#hdMile_Ks").val());
    var regedate = $.trim($("#hdRegdate").val()) ;
    var lianxiRen="",mobile="",szYzm="",dxYzm="",yxMakename="",yxModelLevl="";
    if(cluetype==2){
       mobile=$.trim($("#textMobile").val());
        szYzm=($.trim($("#txtSzyzm").val()));
        dxYzm=($.trim($("#textMobileYZM").val()));
    }else if(cluetype==4){
        mobile=$.trim($("#textMobile1").val());
        szYzm=($.trim($("#txtSzyzm1").val()));
        dxYzm=($.trim($("#textMobileYZM1").val()));
        yxMakename=$("#hdYxMakeName").val();
        yxModelLevl=$("#textModels").val();
    }

    $.ajax({
        url: '/comAppraise/submitAppraiseClue',
        data: {
            'styleid': (styid),
            'regDate': (regedate),
            'mileage': (regmile),
            'cityid': (cityid),
            'cluefrom': ($.trim($("#hdclueFrom").val())),
            'clueType': cluetype,
            'cityName': ($.trim($("#hdCityName_Ks").val())),
            'lianxiRen': '',
            'mobile': mobile,
            'szYzm': szYzm,
            'dxYzm': dxYzm,
            'yxMakeName':yxMakename,
            'yxModelLevel':yxModelLevl
        },
        type: 'post',
        datatype: 'json',
        async: false,
        success: function (data) {
            //alert(JSON.stringify(data));

            if (data != null || data != "") {
                var data = eval(data);
                if (data.status == 100) {

                    if(cluetype==2 ) {
                        alert("您的信息已提交，将有合作平台的工作人员与您确认卖车信息！");
                        $('.zhezhaosellcar').hide();
                    }else{
                        alert("您的信息已提交，将有对应品牌4S店工作人员与您确认置换信息！");
                        $('.zhezhaosellcar1').hide();

                    }
                } else if (data.status == 101 || data.status == 104) {
                    alert("提交失败");
                    if(cluetype==2 ) {
                        ReloadMPicVailcode($("#btnfszyzm"))
                    }else{
                        ReloadMPicVailcode($("#btnfszyzm1"))
                    }
                } else if (data.status == 102) {
                    alert("验证码不正确");
                } else if (data.status == 103) {
                    alert("短信验证码不正确");
                }
            }else{
                alert("提交失败");
                if(cluetype==2 ) {
                    ReloadMPicVailcode($("#btnfszyzm"))
                }else{
                    ReloadMPicVailcode($("#btnfszyzm1"))
                }
            }
        }
    });
}
function OnloadClick() {
    $("#fastSellCar,#oldRenewedCar").click(function () {
        if ($(this).attr("id") == "fastSellCar") {//快速卖掉爱车
            $("#txtSzyzm").val("");
            $("#textMobile").val("");
            $("#textMobileYZM").val("")
            $(".zhezhaosellcar .title").html("一键发布信息，卖车又快又划算！");
            $(".zhezhaosellcar").show();

        } else if ($(this).attr("id") == "oldRenewedCar")//以旧换新
        {
            $("#changeNewCarBrand").val("");
            $("#hdYxModelLevel").val("");
            $("#textModels").val("")
            $("#txtSzyzm1").val("");
            $("#textMobile1").val("");
            $("#textMobileYZM1").val("")
            $(".zhezhaosellcar1").show();
        }
    });
}
function initNewCar() {
    newCarBrand = new CarStyle().init({
        brandElement: '#changeNewCarBrand',
        brandListContainer: '#containerNewCarBrand',
        searchListContainer:'#containerMakeOrModelSearch',
        showSearchButton: true,
        level: 1,
        showHotBrand: true,
        produceStatus: 1,
        brandId: newCarParam != null ? newCarParam.makeId : null,
        callback: bindDataNewCarBrand
    });
}
//回显新车品牌
function bindDataNewCarBrand(brandObj) {
    $("#changeNewCarBrand").val(newCarBrand.styleFullName).addClass("col3");;
    $("#hdYxMakeName").val(newCarBrand.styleFullName);
 //   $("#txtSzyzm1").val("");
    //$("#textMobile1").val("");
    //$("#textMobileYZM1").val("")
    $(".zhezhaosellcar1").show();
}

var SelectModelLevel = function (DisplayModelLevel, SelectModelLevelId, hdModelLevelId, IsShowSelectAll) {
    this.ModelLevelDisplay = null;//点击触发事件的id
    this.ModelLevelSelect = null;//选择车型弹出框id
    this.ModelLevelIdHidden = null;
    this.isShowSelectAll = false;

    this.strModelLevel = "";
    this.strModelLevelTxt = "";

    if (!!DisplayModelLevel) {
        this.ModelLevelDisplay = $("#" + DisplayModelLevel);
    }
    if (!!SelectModelLevelId) {
        this.ModelLevelSelect = $("#" + SelectModelLevelId);
    }
    if (!!hdModelLevelId) {
        this.ModelLevelIdHidden = $("#" + hdModelLevelId);
    }
    if (IsShowSelectAll != undefined) {
        this.isShowSelectAll = IsShowSelectAll;
    }
    var obj = this;

    var hgt = $(document).height();
    this.disScrollTop = 0;
    var StrHtml = "<div class=\"posabs divTcSelectModelLevel\" style=\"z-index:100;\" >";
    StrHtml += "<header style=\"z-index:100\"><div class='per_tit'> <a href='javascript:void(0);' class='closemake' onclick=\"$('.divTcSelectModelLevel').parents('section').hide();\"><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>车型级别</span></div></header>";

    // StrHtml+="<header><div class=\"head-l closemake\" onclick=\"$('.divTcSelectModelLevel').parents('section').hide();\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">车系级别</a></div><div class=\"head-r\"></div></header>";
    StrHtml += "<div class=\"cont\">";
    StrHtml += "<div class=\"jzgzlist backbgf xzpplist divTcdetailLevel  z-1\" style=\"min-height:" + hgt + "px;\" >";
    StrHtml += "<ul class=\"ulModelLevel\"> ";
    if (obj.isShowSelectAll) {
        StrHtml += "<li  class=\"liModelLevel\"  data=\"0\"><a href=\"javascript:void(0);\"> <span>全部</span></a></li>";
    }
    StrHtml += "<li  class=\"liModelLevel\"  data=\"1\"><a href=\"javascript:void(0);\"> <span>微型车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"2\"><a href=\"javascript:void(0);\"> <span>小型车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"3\"><a href=\"javascript:void(0);\"> <span>紧凑型车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"4\"><a href=\"javascript:void(0);\"> <span>中型车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"5\"><a href=\"javascript:void(0);\"> <span>中大型车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"6\"><a href=\"javascript:void(0);\"> <span>大型车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"7\"><a href=\"javascript:void(0);\"> <span>小型SUV</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"8\"><a href=\"javascript:void(0);\"> <span>紧凑型SUV</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"9\"><a href=\"javascript:void(0);\"> <span>中型SUV</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"10\"><a href=\"javascript:void(0);\"> <span>中大型SUV</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"11\"><a href=\"javascript:void(0);\"> <span>全尺寸SUV</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"12\"><a href=\"javascript:void(0);\"> <span>入门级跑车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"13\"><a href=\"javascript:void(0);\"> <span>中级跑车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"14\"><a href=\"javascript:void(0);\"> <span>超级跑车</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"15\"><a href=\"javascript:void(0);\"> <span>小型MPV</span></a></li>";
    StrHtml += "<li  class=\"liModelLevel\"  data=\"16\"><a href=\"javascript:void(0);\"> <span>大型MPV</span></a></li>";
    StrHtml += "</ul>"
    StrHtml += "</div></div></div>";
    if (obj.ModelLevelSelect != null) {
        obj.ModelLevelSelect.html(StrHtml);
    }

    obj.ModelLevelSelect.find(".divTcSelectModelLevel .divTcdetailLevel .liModelLevel").bind("click", function () {
        obj.ModelLevelSelect.find(".divTcSelectModelLevel .divTcdetailLevel .liModelLevel").removeClass("active");
        $(this).addClass("active");
        obj.strModelLevel = $(this).attr("data");
        obj.strModelLevelTxt = $(this).find("span").html();
        obj.ModelLevelIdHidden.val(obj.strModelLevel);
        obj.ModelLevelSelect.hide();
        $("#PageHistoryCar").show();
        if ($('body').scrollTop() != undefined) {
            $('body').scrollTop(obj.disScrollTop);
        }
        obj.ModelLevelDisplay.val(obj.strModelLevelTxt).addClass("col3");
        obj.AfterSelectModelLevel();
    });

    this.BindEvent = function () {
        obj.ModelLevelDisplay.click(function () {
            if (obj.ModelLevelIdHidden.val() != "") {
                obj.ModelLevelSelect.find(".divTcSelectModelLevel .divTcdetailLevel .liModelLevel[data='" + obj.ModelLevelIdHidden.val() + "']").addClass("active").siblings(".licolor").removeClass("active");
            }
            if ($('body').scrollTop() != undefined) {
                obj.disScrollTop = $('body').scrollTop();
            }
            obj.ModelLevelSelect.show();
            $("#PageHistoryCar").hide();
        });
    };
    obj.BindEvent();
    this.AfterSelectModelLevel = function () {
    };
}

function  AutoShowSellCarInfo() {
    if((!$(".zhezhaosellcar").is(":visible"))&&(!$(".zhezhaosellcar1").is(":visible"))){
        $("#txtSzyzm").val("");
        $("#textMobile").val("");
        $("#textMobileYZM").val("")
        $(".zhezhaosellcar .title").html("优质合作伙伴，让您卖车又快又放心！");
        $(".zhezhaosellcar").show();
    }
}