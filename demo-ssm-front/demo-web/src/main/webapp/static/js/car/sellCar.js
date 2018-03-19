/**
 * Created by Administrator on 2017/1/4.
 */
$(function () {
    swiper();
    var sellCarMobelVcode = new MobileSMSVerificationcode($("#textMobile"), $("#txtSzyzm"), $("#btnSendYZM"), "zhqyahui", $("#hdLevSecond"), $("#btnfszyzm"))
    InitBaseInfo();
    GetSellC2BPrice();
    $(".ulpingtai li").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");

        } else {
            $(this).addClass("active");
        }
    });
    $("#onekeysellcar,#zhihuannewcar,#btnGotoJQGuzhi").click(function () {
        if (ChekSaleCarInfo()) {
            var styid = $.trim($("#hdStyleId_Ks").val());
            var regsYear = $.trim($("#hdRegYear_Ks").val());
            var regsMonth = $.trim($("#hdRegMonth_Ks").val());
            var regdate = $("#hdRegYear_Ks").val() + "-" + $("#hdRegMonth_Ks").val() + "-01";
            var provid = $.trim($("#hdProvenceId_Ks").val());// hdProvenceId_Ks
            var cityid = $.trim($("#hdCityId_Ks").val());
            var regmile = (parseFloat($.trim($("#txtMile_Ks").val())) * 10000).toFixed(0);
            if ($(this).attr("id") == "onekeysellcar") {
                $("#txtSzyzm").val("");
                $("#textMobile").val("");
                $("#textMobileYZM").val("")
                $(".zhezhaosellcar").show();

            } else if ($(this).attr("id") == "zhihuannewcar") {
                var zhurl = "/zhihuan-s" + styid + "-r" + regdate + "-m" + regmile + "-c" + cityid;
                window.location.href = zhurl;
            } else {
                var xqurl = "/sale-s" + styid + "-r" + regdate + "-m" + regmile + "-c" + cityid + "-y-j-h";
                window.location.href = xqurl;
            }

        }
    });

    $(".btnFinishAndPublish").click(function () {
        if ($(".zhezhaosellcar").is(":visible")) {
            if (ChekSaleCarInfo(1)) {
                PublishCarSource();
            }
        }
    });

});
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
function ChekSaleCarInfo(flag) {
    var Ispass = true;
    var Ispass = true;
    if (!($.trim($("#hdStyleId_Ks").val()) != "" && $.trim($("#hdStyleId_Ks").val()) > 0 && $.trim($("#hdMakeId_Ks").val()) != "")) {
        Ispass = false;
        alert("请先选择品牌车型")
        return false;
    }

    if (!($.trim($("#hdRegYear_Ks").val()) != "" && $.trim($("#hdRegMonth_Ks").val()) != "" && Number($.trim($("#hdRegYear_Ks").val())) > 0 && Number($.trim($("#hdRegMonth_Ks").val())) > 0)) {
        Ispass = false;
        alert("请选择上牌时间")
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
        alert("请选择上牌城市")
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
    if (flag == "1") {


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

        if ($(".ulpingtai .active").length <= 0) {
            alert("请至少选择一个帮卖平台");
            Ispass = false;
            return false;
        }

    }
    return Ispass;
}
function PublishCarSource() {
    var styid = $.trim($("#hdStyleId_Ks").val());
    var regsYear = $.trim($("#hdRegYear_Ks").val());
    var regsMonth = $.trim($("#hdRegMonth_Ks").val());
    var regdate = $.trim($("#hdRegdate").val());
    var provid = $.trim($("#hdProvenceId_Ks").val());// hdProvenceId_Ks
    var cityid = $.trim($("#hdCityId_Ks").val());
    var regmile = (parseFloat($.trim($("#txtMile_Ks").val())) * 10000).toFixed(0);

    var mobile = $.trim($("#textMobile").val());
    var szYzm = $.trim($("#txtSzyzm").val());
    var dxYzm = $.trim($("#textMobileYZM").val());
    var sellprice = $.trim($("#sellprice").val());
    var clueFrom = $.trim($("#hdclueFrom").val());
    var Tripartite = "";
    if ($("ulpingtai .active").length >= 0) {
        $(".ulpingtai .active").each(function (i, n) {
            Tripartite += "," + $(this).attr("data");
        })
        if (Tripartite != "") {
            Tripartite = Tripartite.substring(1);
        }
    }
    var regedate = $.trim($("#hdRegYear_Ks").val()) + "-" + $.trim($("#hdRegMonth_Ks").val()) + "-1"
    if (regdate == "") {
        regdate = regedate;
    }
    $.ajax({
        url: '/carSource/submitSellCar',
        data: {
            'styleid': (styid), 'regdate': (regdate)
            , 'provid': (provid), 'cityid': (cityid), 'mileage': (regmile),
            'sellprice': (sellprice), 'mobile': (mobile), 'szYzm': szYzm, 'dxYzm': dxYzm, 'clueFrom': clueFrom,
            "Tripartite": (Tripartite)
        },
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (data != null || data != "") {
                var data = eval(data);
                if (data.status == "100") {
                    alert("卖车信息发布成功");
                    location.href = "/ershouche/salecar-s" + styid + "-r" + regedate + "-m" + regmile + "-c" + cityid
                } else if (data.status == "101" || data.status == "104") {
                    alert("卖车信息发布失败")
                } else if (data.status == "102") {
                    alert("验证码错误")
                    ReloadMPicVailcode($("#btnfszyzm"))
                } else if (data.status == "103") {
                    alert("短信验证码错误")
                }
            } else {
                alert("车源发布失败")
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
