/**
 * Created by Administrator on 2017/1/4.
 */
var newCarBrand, newCarParam = null, myCarParam = null;


$(function () {
    //给输入框添加颜色
    InputAddClass();
    swiper();
    var sellCarMobelVcode = new MobileSMSVerificationcode($("#textMobile"), $("#txtSzyzm"), $("#btnSendYZM"), "zhqyahui", $("#hdLevSecond"), $("#btnfszyzm"))
    var changeCarMobelVcode = new MobileSMSVerificationcode($("#textMobile1"), $("#txtSzyzm1"), $("#btnSendYZM1"), "zhqyahui", $("#hdLevSecond1"), $("#btnfszyzm1"))
    InitBaseInfo();
    GetSellC2BPrice();
    //选择品牌
    initNewCar();
    $("#onekeysellcar,#btnzhiHuanNewCar,#btnGotoJQGuzhi").click(function () {
        if (ChekSaleCarInfo()) {
            var styid = $.trim($("#hdStyleId_Ks").val());
            var regsYear = $.trim($("#hdRegYear_Ks").val());
            var regsMonth = $.trim($("#hdRegMonth_Ks").val());
            var regdate = $("#hdRegYear_Ks").val() + "-" + $("#hdRegMonth_Ks").val() + "-01";
            var provid = $.trim($("#hdProvenceId_Ks").val());// hdProvenceId_Ks
            var cityid = $.trim($("#hdCityId_Ks").val());
            var regmile = (parseFloat($.trim($("#txtMile_Ks").val())) * 10000).toFixed(0);
            if ($(this).attr("id") == "onekeysellcar") {
                $("#textMobile").val("");
                $("#textMobileYZM").val("")
                $('.tanc-mc').show();
            }
            else if ($(this).attr("id") == "btnzhiHuanNewCar") {
                $("#textMobile1").val("");
                $("#textMobileYZM1").val("")
                $('#page-t').hide();
                $('.tanc-zhxc').show();
            }
            else {//车源
                var xqurl = "/appreport-s" + styid + "-r" + regdate + "-m" + regmile + "-c" + cityid + "-f" + $.trim($("#hdclueFrom").val());
                //alert(xqurl);
                window.location.href = xqurl;
            }

        }
    });
    //一键卖车
    $(".btnFinishAndPublish").click(function () {
        if ($(".tanc-mc").is(":visible")) {
            if (sellCarVerifi()) {
                PublishCarSource(2);
            }
        }
    });
    //以旧换新
    $(".btnOldChange").click(function () {
        if ($(".tanc-zhxc").is(":visible")) {
            if (ReplaceVerifi()) {
                PublishCarSource(4);
            }
        }
    });
    //选择车型
    $('#ulCarLevel li').click(function () {
        $('#ulCarLevel li').removeClass("active");
        $(this).addClass("active");
        $("#ModelsName").val($(this).html());
    });
});
//选择时间
function selectData() {
    var mindate = Number($("#hdStyleYear_Ks").val()) - 1 + "/6/1";
    var maxdate = new Date().getFullYear() + "/" + new Date().getMonth() + "/1";
    if (new Date().getMonth() == 0) {
        maxdate = Number(new Date().getFullYear()) - 1 + "/12/1";
    }
    // alert(maxdate);
    if ($.trim($("#hdNextStyleYear_Ks").val()) != "" && Number($.trim($("#hdNextStyleYear_Ks").val())) < Number(new Date().getFullYear() - 1)) {
        maxdate = Number($.trim($("#hdNextStyleYear_Ks").val())) + 1 + "/12/1";
    }
    var redate = new Mobile_SelectDate_v1("liSelectYear_Ks", "SectionSelectData_Ks", mindate, maxdate, false, false);
    redate.initHidden("hdRegYear_Ks", "hdRegMonth_Ks");
    redate.AfterSelectData = function () {
        GetSellC2BPrice();
    }
}
function initNewCar() {
    newCarBrand = new CarStyle().init({
        brandElement: '#changeNewCarBrand',
        brandListContainer: '#containerNewCarBrand',
        searchListContainer: '#containerMakeOrModelSearch',
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
    var newBrandNames = "";
    var BrandNames = $("#BrandNames").val();
    if (BrandNames != "") {
        if (BrandNames.split(",").length > 4) {
            alert("最多选择5个品牌");
            return false;
        }
        if (BrandNames.indexOf(newCarBrand.styleFullName) == -1) {
            newBrandNames = BrandNames + "," + newCarBrand.styleFullName;
            $("#BrandNames").val(newBrandNames);
        }
    }
    else {
        $("#BrandNames").val(newCarBrand.styleFullName);
    }
    if ($("#BrandNames").val() != "") {
        $("#ulBrand li").remove();
        var lis = "";
        var aryBnames = $("#BrandNames").val().split(",");
        for (var i = 0; i < aryBnames.length; i++) {
            lis += "<li>";
            lis += "<span>" + aryBnames[i] + "</span>";
            lis += "<em onclick=\"removeli($(this),'" + aryBnames[i] + "')\"></em>";
            lis += "</li>";
        }
        $("#ulBrand").append(lis);
    }
    $(".zhezhaosellcar1").show();
}
//移除品牌
function removeli(obj, name) {
    var newBrandNames = "";
    var BrandNames = $("#BrandNames").val();
    obj.parent("li").remove();
    if (BrandNames != "") {
        var aryBnames = $("#BrandNames").val().split(",");
        for (var i = 0; i < aryBnames.length; i++) {
            if (aryBnames[i] != name) {
                if (i == aryBnames.length - 1) {
                    newBrandNames += aryBnames[i];
                }
                else {
                    newBrandNames += aryBnames[i] + ",";
                }
            }
        }
        $("#BrandNames").val(newBrandNames);
    }
}
function InitBaseInfo() {
    $("#liSelectYear_Ks").bind("click", function () {
        if ($.trim($("#hdStyleId_Ks").val()) == "") {
            alert("请先选择品牌车型");
        } else {
            selectData();
        }
    });
    if ($("#hdRegYear_Ks").val() != "" && $("#hdRegMonth_Ks").val() != "") {
        $("#liSelectYear_Ks").html($("#hdRegYear_Ks").val() + "年 " + $("#hdRegMonth_Ks").val() + "月").addClass("col3");
    }
    $("#sellprice").DecimalTwo();
    $("#txtMile_Ks").DecimalTwo();
    $("#txtMile_Ks").blur(function () {
        //验证行驶里程
        GetSellC2BPrice();
    });

    var ksPingguCar = new Mobile_SelectCar_v1(2, "liSelectCar_Ks", "SectionSelectCar_Ks", "sectionMakeOrModelSearch", false, false, true, true);
    ksPingguCar.initHidden("hdMakeId_Ks", "hdModelId_Ks", "hdStyleId_Ks", "hdStyleYear_Ks", "hdNextStyleYear_Ks");
    ksPingguCar.AfterSelectCar = function () {

        if ($("#hdRegYear_Ks").val() != "") {
            $("#liSelectYear_Ks").html("请选择上牌时间").removeClass("col3").siblings("i").show();
        }

        $("#hdRegYear_Ks").val("");
        $("#hdRegMonth_Ks").val("");
        $("#txtMile_Ks").val("请输入");
        var mindate = Number($("#hdStyleYear_Ks").val()) - 1 + "/6/1";
        var maxdate = new Date().getFullYear() + "/" + new Date().getMonth() + "/1";
        if (new Date().getMonth() == 0) {
            maxdate = Number(new Date().getFullYear()) - 1 + "/12/1";
        }
        // alert(maxdate);
        if ($.trim($("#hdNextStyleYear_Ks").val()) != "" && Number($.trim($("#hdNextStyleYear_Ks").val())) < Number(new Date().getFullYear() - 1)) {
            maxdate = Number($.trim($("#hdNextStyleYear_Ks").val())) + 1 + "/12/1";
        }


        var redate = new Mobile_SelectDate_v1("liSelectYear_Ks", "SectionSelectData_Ks", mindate, maxdate, false, false);
        redate.initHidden("hdRegYear_Ks", "hdRegMonth_Ks");
        redate.AfterSelectData = function () {
            GetSellC2BPrice();
        }
        GetSellC2BPrice();
    };
    if ($.trim($("#hdStyleId_Ks").val()) != "") {
        selectData();
    }
    var ksPingguArea = new Mobile_SelectCity_v1("liSelectArea_Ks", "SectionSelectArea_Ks", true, false);
    ksPingguArea.initHidden("hdProvenceId_Ks", "hdCityId_Ks");
    ksPingguArea.AfterSelectArea = function () {
        GetSellC2BPrice();
    }
    //放到加载品牌及其日期的后边
    $(".sectiontop1").show();

}
function GetSellC2BPrice() {
    //$("#sellcarc2bprice").html("");
    if ($("#hdStyleId_Ks").val() > 0 && $("#hdRegYear_Ks").val() != "" && $("#hdRegMonth_Ks").val() != "" && $("#txtMile_Ks").val() > 0 && $("#txtMile_Ks").val() != "" && $("#txtMile_Ks").val() != "请输入" && $("#hdCityId_Ks").val() != "") {

        $.ajax({
            url: "/carSource/getCarAppraiseInfo",
            data: {
                "styleid": $("#hdStyleId_Ks").val(),
                "regdate": $("#hdRegYear_Ks").val() + "/" + $("#hdRegMonth_Ks").val() + "/01",
                "mileage": (parseFloat($.trim($("#txtMile_Ks").val())) * 10000).toFixed(0),
                "cityid": $("#hdCityId_Ks").val()
            },
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function (data) {
                //alert(JSON.stringify(data))
                if (data != null || data != "") {
                    var data = eval(data);
                    if (data.status == 100) {
                        var c2bPrice = JSON.parse(data.msg);
                        //alert(JSON.stringify(c2bPrice));
                        if (c2bPrice.c2BBLowPrice > 0 && c2bPrice.c2BBHighPrice > 0) {
                            var str = "<label>精真估估值</label><strong>" + c2bPrice.c2BBLowPrice + "万</strong>--<strong>" + c2bPrice.c2BBHighPrice + "万</strong>"

                            $("#sellcarc2bprice").html(str);
                        } else {
                            var str = "<label>精真估估值</label>";
                            $("#sellcarc2bprice").html(str);
                        }
                    } else {
                        var str = "<label>精真估估值</label>";
                        $("#sellcarc2bprice").html(str);
                    }
                } else {
                    $("#sellcarc2bprice").html("<label>精真估估值</label>");
                }
            }
        });

    } else {
        $("#zhihuannewcar a").attr("href", "javascript:void(0)");
        $("#btnGotoJQGuzhi a").attr("href", "javascript:void(0)");
        $("#sellcarc2bprice").html("<label>精真估估值</label>");
    }
}
//验证品牌车型信息
function ChekSaleCarInfo() {
    var Ispass = true;
    var Ispass = true;
    if (!($.trim($("#hdStyleId_Ks").val()) != "" && $.trim($("#hdStyleId_Ks").val()) > 0 && $.trim($("#hdMakeId_Ks").val()) != "")) {
        Ispass = false;
        $("#liSelectCar_Ks").addClass("colred");
        return false;
    }
    if (!($.trim($("#hdRegYear_Ks").val()) != "" && $.trim($("#hdRegMonth_Ks").val()) != "" && Number($.trim($("#hdRegYear_Ks").val())) > 0 && Number($.trim($("#hdRegMonth_Ks").val())) > 0)) {
        Ispass = false;
        // alert("请选择上牌时间")
        $("#liSelectYear_Ks").addClass("colred");
        return false;
    }
    var regdate = $.trim($("#hdRegYear_Ks").val()) + "/" + $.trim($("#hdRegMonth_Ks").val()) + "/1"; //alert(regdate);
    var rg = /^(([1-9]+)|([1-6][0-9]+)|([0-9]+\.[0-9]{1,2}))$/;
    var mileage = $.trim($("#txtMile_Ks").val());
    var endDate = new Date();
    var monthNum = new Date(regdate).dateDiff('m', endDate);
    //alert(monthNum)
    if (mileage == "" || mileage == "请输入") {
        Ispass = false;
        alert("请输入行驶里程");
        // $("#txtMile_Ks").addClass("colred");
        return false;
    } else if (!rg.test(mileage)) {
        Ispass = false;
        alert("请输入正确的行驶里程");
        return false;
    } else if (Number(mileage) > Number(monthNum)) {
        Ispass = false;
        alert("行驶里程不能超过" + monthNum + "万公里");
        return false;
    }
    if (!($.trim($("#hdCityId_Ks").val()) != "" && $.trim($("#hdCityId_Ks").val()) > 0)) {
        Ispass = false;
        // alert("请选择上牌城市")
        $("#liSelectArea_Ks").addClass("colred");
        return false;
    }
    var price = $.trim($("#sellprice").val());
    if (price != "") {
        var reTest = /^(([1-9]{1}[0-9]{0,3})|([1-9]{1}[0-9]{0,3}\.[0-9]{1,2})|([0]{1}\.[1-9]{1})|([0]{1}\.[0-9]{1}[1-9]{1}))$/;
        if (!reTest.test(price)) {
            //$("#sellprice").addClass("zhszt");
            alert("请输入正确预期售价格式，格式：0.00");
            Ispass = false;
            return false;
        }
    }
    return Ispass;
}
//卖车申请
function sellCarVerifi() {
    var Ispass = true;
    var mobile = $.trim($("#textMobile").val());
    if (mobile == "" || mobile == "请输入手机号") {
        // $("#textMobile").val("请输入手机号").addClass("zhszt");
        $("#textMobile").attr("placeholder", "请输入手机号").addClass("colred");
        // alert("请输入手机号");
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
    // if ($("#txtSzyzm").val() == "" || $("#txtSzyzm").val() == "请输入验证码") {
    //     Ispass = false;
    //     alert("请输入验证码");
    //     $("#txtSzyzm").attr("placeholder", "请输入验证码").addClass("colred");
    //     return false;
    // }
    var validatecode = $.trim($("#textMobileYZM").val());
    if (validatecode == "" || validatecode == "请输入短信验证码") {
        Ispass = false;
        alert("请输入短信验证码");
        $("#textMobileYZM").attr("placeholder", "请输入短信验证码").addClass("zhszt");
        // $("#textMobileYZM").val("请输入短信验证码").addClass("zhszt");
        //$(".pyanzhm a").html("请输入验证码").parent("p").show();
        return false;
    }
    return Ispass;
}
//置换申请
function ReplaceVerifi() {
    var Ispass = true;
    var yxmakename = $("#BrandNames").val();
    var yxModelLevelName = $("#ModelsName").val();
    var mobile = $.trim($("#textMobile1").val());
    if (yxmakename == "") {
        alert("请选择品牌");
        Ispass = false;
        return false;
    }
    if (yxModelLevelName == "") {
        alert("请选择车型");
        Ispass = false;
        return false;
    }
    if (mobile == "" || mobile == "请输入手机号") {
        // $("#textMobile").val("请输入手机号").addClass("zhszt");
        $("#textMobile1").attr("placeholder", "请输入手机号").addClass("zhszt");
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
    // if ($("#txtSzyzm1").val() == "" || $("#txtSzyzm1").val() == "请输入验证码") {
    //     Ispass = false;
    //     alert("请输入验证码");
    //     return false;
    // }
    var validatecode = $.trim($("#textMobileYZM1").val());
    if (validatecode == "" || validatecode == "请输入短信验证码") {
        Ispass = false;
        alert("请输入短信验证码");

        $("#textMobileYZM1").attr("placeholder", "请输入短信验证码").addClass("zhszt");
        // $("#textMobileYZM").val("请输入短信验证码").addClass("zhszt");
        //$(".pyanzhm a").html("请输入验证码").parent("p").show();
        return false;
    }
    return Ispass;
}

function PublishCarSource(cluetype) {
    var styid = $.trim($("#hdStyleId_Ks").val());
    var regsYear = $.trim($("#hdRegYear_Ks").val());
    var regsMonth = $.trim($("#hdRegMonth_Ks").val());
    var provid = $.trim($("#hdProvenceId_Ks").val());// hdProvenceId_Ks
    var cityid = $.trim($("#hdCityId_Ks").val());
    var regmile = (parseFloat($.trim($("#txtMile_Ks").val())) * 10000).toFixed(0);
    var regedate = $.trim($("#hdRegYear_Ks").val()) + "-" + $.trim($("#hdRegMonth_Ks").val()) + "-1"
    var lianxiRen="",mobile="",szYzm="",dxYzm="",yxMakename="",yxModelLevl="";
    if(cluetype==2){
        mobile=$.trim($("#textMobile").val());
        szYzm=($.trim($("#txtSzyzm").val()));
        dxYzm=($.trim($("#textMobileYZM").val()));
    }else if(cluetype==4){
        mobile=$.trim($("#textMobile1").val());
        szYzm=($.trim($("#txtSzyzm1").val()));
        dxYzm=($.trim($("#textMobileYZM1").val()));
        yxMakename=$("#BrandNames").val();
        yxModelLevl=$("#ModelsName").val();
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
            'cityName': ($.trim($("#liSelectArea_Ks").html())),
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
            if (data != null || data != "") {
                var data = eval(data);
                if (data.status == 100) {
                    if (cluetype == 2) {
                        alert("您的信息已提交，将有合作平台的工作人员与您确认卖车信息！");
                        $('.tanc-mc').hide();
                    } else {
                        alert("您的信息已提交，将有对应品牌4S店工作人员与您确认置换信息！");
                        $('.zhezhaosellcar1').hide();
                        $('.tanc-zhxc').hide();
                    }
                } else if (data.status == 101 || data.stauts == 104) {
                    alert("提交失败");
                    ReloadMPicVailcode($("#btnfszyzm"))
                } else if (data.status == 102) {
                    alert("验证码不正确");
                } else if (data.status == 103) {
                    alert("短信验证码不正确");
                }
            } else {
                alert("提交失败");
                if (cluetype == 2) {
                    ReloadMPicVailcode($("#btnfszyzm"))
                } else {
                    ReloadMPicVailcode($("#btnfszyzm1"))
                }
            }
        }
    });
}
function swiper() {
    var swiper = new Swiper('.swiper-container', {
        touchMoveStopPropagation: false,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        loop: true

    });
}
