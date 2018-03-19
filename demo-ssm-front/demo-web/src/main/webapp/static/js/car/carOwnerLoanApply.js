$(function () {

    InitBaseInfo();
    //提交信息
    $(".btnSuccess").click(function () {

        if (checkBaseInfo()) {
            var styleid = $.trim($("#hdStyleId").val());
            var txtAppMyMileage = $.trim($("#txtAppMyMileage").val());
            var regdate = $.trim($("#hdRegdate").val());
            var provid = $.trim($("#hdProvenceId").val());
            var cityid = $.trim($("#hdCityId").val());
            var userid = $.trim($("#hdUserid").val());
            var diyazhuantai = $.trim($("#hdDYli").val());//抵押状态
            var dkqx = $.trim($("#hddaikuanqixian").val());//贷款期限
            var sex = $.trim($("#hdSex").val());//性别
            var age = $.trim($("#age").val());
            var orderid = $.trim($("#hdOrderId").val()); //序列号
            var username = $("#hdUserName").val();
            var Mobile = $("#hdMobile").val();
            var xyjl = $("#hdxyjl").val();
            var carid = $("#hdCarid").val();

            $.ajax({
                type: 'POST',
                url: '/carOwnerLoan/submitApplyLoan',
                async: false,
                type: 'post',
                dataType: 'json',
                data: {
                    "orderid": orderid, "styleid": styleid, "provinceid": provid, "cityid": cityid, "regdate": regdate,
                    "mileage": txtAppMyMileage, "username": username, "mobile": Mobile,
                    "userid": userid, "loanperiod": dkqx, "userid": userid, "hasMortgage": diyazhuantai, "gender": sex, "age": age,
                    "from": 2, "credit": xyjl
                },
                beforeSend: function () {
                },
                success: function (res) {
                    if (res != null || res != "") {
                        var data = eval(res);
                        if (data.status == "100") {
                            alert("提交申请成功");
                            window.location.href = "/";
                        }else  if (data.status == "101"||data.status == "103"||data.status == "104"){
                            alert("提交申请失败")
                        }else  if (data.status == "102") {
                            alert(data.msg);
                            window.location.href = "/";
                        }
                    }else{
                        alert("提交申请失败")
                    }
                }
            });
        }
    });

});
function InitBaseInfo() {
    var SeleCar = new Mobile_SelectCar_v1(0, "selectCar", "SectionSelectCar","sectionMakeOrModelSearch", false, false, true, true);
    SeleCar.AfterSelectCar = function () {
        var mindate = Number($("#hdStyleYear").val()) - 1 + "/6/1";
        var maxdate = new Date().getFullYear() + "/" + new Date().getMonth() + "/1";
        if (new Date().getMonth() == 0) {
            maxdate = Number(new Date().getFullYear()) - 1 + "/12/1";
        }
        // alert(maxdate);
        if ($.trim($("#hdNextStyleYear_Ks").val()) != "" && Number($.trim($("#hdNextStyleYear_Ks").val())) < Number(new Date().getFullYear() - 1)) {
            maxdate = Number($.trim($("#hdNextStyleYear_Ks").val())) + 1 + "/12/1";
        }
        var regdate = "";

        if ($("#hdRegYear").val() != "" && $("#hdRegMonth").val() != "") {
            $("#hdRegdate").val($("#hdRegYear").val() + "/" + $("#hdRegMonth").val() + "/1");
        }else{
            $("#hdRegMonth").val("6");
            if (Number(new Date().getFullYear()) > Number($.trim($("#hdStyleYear").val()))) {
                regdate = $.trim($("#hdStyleYear").val()) + "-06-01";
                $("#hdRegYear").val($.trim($("#hdStyleYear").val()));
            } else {
                if (new Date().getMonth() + 1 > 6) {
                    regdate = new Date().getFullYear() + "-06-01";
                    $("#hdRegYear").val(new Date().getFullYear());
                } else {
                    regdate = new Date().getFullYear() + "-" + new Date().getMonth() + "-01";
                    $("#hdRegYear").val(new Date().getFullYear());
                    $("#hdRegMonth").val(new Date().getMonth());
                    if (new Date().getMonth() == 0) {
                        $("#hdRegYear").val(Number(new Date().getFullYear()) - 1);
                        $("#hdRegMonth").val("12");
                    }
                }
            }
        }
        // alert(mindate + "\n" + maxdate);
        var redate = new Mobile_SelectDate_v1("liSelectYear", "SectionSelectData", mindate, maxdate, false, false);
        redate.AfterSelectData = function () {
            if ($("#hdRegYear").val() != "" && $("#hdRegMonth").val() != "") {
                $("#hdRegdate").val($("#hdRegYear").val() + "/" + $("#hdRegMonth").val() + "/1");
            }
        }
        redate.initHidden("hdRegYear", "hdRegMonth");

    };
    SeleCar.initHidden("hdMakeId", "hdModelId", "hdStyleId", "hdStyleYear", "hdStyleNextYear");



    //上牌地区
    var SelecarArea = new Mobile_SelectCity_v1("liSelectArea", "SectionSelectArea", false, false, true, false);
    SelecarArea.initHidden("hdProvenceId", "hdCityId", "hdDistrictId");

    //抵押状态
    var SelecarDy = new Mobile_SelectDy_v4("liSelectdy", "SectionSelectDY", "hdDYli");
    //抵押期限
    var SelecarDkdy = new Mobile_SelectYDQX_v4("liSelectdkqy", "SectionSelectDKQX", "hddaikuanqixian");
    //信用记录
    var Selecarxyjl = new Mobile_SelectXYJL_v4("liSelectXYJL", "SectionSelectXYJL", "hdxyjl");

    var SelecarSex = new Mobile_SelectSex_v4("liSelectSex", "SectionSelectSex", "hdSex");
}
function checkBaseInfo() {
    var ISPass = true;
    if ($("#hdStyleId").val() == "" || $("#hdStyleId").val() == null) {
        alert("请选择车辆信息");
        return false;
    }
    if ($('#hdRegYear').val() == "" && $('#hdRegMonth').val() == "") {
        alert("上牌时间不能为空");
        return false;
    }
    if ($.trim($('#txtAppMyMileage').val()) == "" || $.trim($('#txtAppMyMileage').val()) == "请输入行驶里程") {
        //$("#txtAppMyMileage").html("请输入行驶里程").addClass("zhszt")
        alert("请输入行驶里程");
        Ispass = false;
        return false;
    } else {
        var regs = /^(([1-9]+)|([1-6][0-9]+)|([0-9]+\.[0-9]{1,2}))$/;
        var beginDate = new Date($('#hdRegYear').val() + '/' + $('#hdRegMonth').val() + '/1');
        var endDate = new Date();
        var monthNum = beginDate.dateDiff('m', endDate);

        if (!regs.test($.trim($('#txtAppMyMileage').val()))) {
            alert("行驶里程格式不正确,可带两位小数");
            $("#txtAppMyMileage").addClass("zhszt")
            //$(".plicheng a").html("行驶里程格式不正确,可带两位小数").parent("p").show();
            Ispass = false;
            return false;
        } else {
            if (parseFloat($.trim($('#txtAppMyMileage').val())) > monthNum || parseFloat($.trim($('#txtAppMyMileage').val())) <= 0) {
                alert("行驶里程格式不正确,里程范围为0-" + monthNum.toString() + ",可带两位小数");
                // $(".plicheng").html("行驶里程格式不正确,里程范围为0-" + monthNum.toString() + ",可带两位小数").parent("p").show();
                Ispass = false;
                return false;
            } else {
                $(".plicheng").hide();
                $("#hdMile").val(Number($.trim($('#txtAppMyMileage').val())) * 10000);
            }
        }
    }

    var ProvId = $.trim($("#hdProvenceId").val());
    var CityId = $.trim($("#hdCityId").val());
    if (!(ProvId != "" && Number(ProvId) > 0 && CityId != "" && Number(CityId) > 0)) {
        alert("请选择上牌地点");
        return false;
    } else {
        //$("#liSelectArea a").removeClass("zhszt")
    }

    if ($.trim($("#hdDYli").val()) == "") {
        alert("请选择抵押状态");
        return false;
    }

    if ($.trim($("#hddaikuanqixian").val()) == "") {
        alert("请选择贷款期限");
        return false;
    }
    if ($.trim($("#hdSex").val()) == "") {
        alert("请选择性别");
        return false;
    }

    if ($.trim($("#age").val()) == "" || $("#age").val() == "请填写年龄") {
        alert("请填写年龄");
        return false;
    } else {
        var regage = /^[0-9]*$/;
        //debugger;
        var tmp = Number($.trim($("#age").val()));
        if (tmp <= 0 || tmp > 99) {
            alert("请输入正确的申请人年龄");
            return false;
        }
    }
    if ($.trim($("#hdxyjl").val()) == "") {
        alert("请选择信用记录");
        return false;
    }
    return true;
}
//抵押状态
var Mobile_SelectDy_v4 = function (DisplayDY, SelectDYId, hdDYId) {
    this.DYDisplay = null;//点击触发事件的id
    this.DYSelect = null;//选择车型弹出框id
    this.DYIdHidden = null;
    this.isShowSelectAll = false;

    this.strBLId = "";
    this.strBLTxt = "";

    if (!!DisplayDY) {
        this.DYDisplay = $("#" + DisplayDY);
    }
    if (!!SelectDYId) {
        this.DYSelect = $("#" + SelectDYId);
    }
    if (!!hdDYId) {
        this.DYIdHidden = $("#" + hdDYId);
    }
    //if (IsShowSelectAll != undefined) {
    //    this.isShowSelectAll = IsShowSelectAll;
    //}
    var obj = this;
    this.disScolltop = 0;
    var hgt = $(document).height();

    var StrHtml = "<div class=\"posabs divTcSelectDY\" style=\"z-index:21;\" >";
    // StrHtml+="<header class=''><div class=\"per_tit \"  ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\"></a></div><div class=\"head-r\"></div></header>";
    StrHtml+="<header><div class=\"per_tit \"> <a href=\"javascript:void(0);\" class=\"closemake\" onclick=\"$('.divTcSelectDY').parents('section').hide();\"><i class=\"per_icon_tit jtx\"></i></a><span class=\"per_tit_span\">抵押状态</span></div></header>";
    StrHtml+="<div class=\"cont\">";
    StrHtml += "<div class=\"jzgzlist backbgf xzpplist divTcdetailDY  z-1\" style=\"min-height:" + hgt + "px;\" >";
    StrHtml += "<ul class=\"ulDY\"> ";
    StrHtml += "<li  class=\"liDY\"  data=\"1\"><a href=\"javascript:void(0);\"> <span>有抵押(含贷款未还清)</span></a></li>";
    StrHtml += "<li  class=\"liDY\"  data=\"0\"><a href=\"javascript:void(0);\"> <span>无抵押</span></a></li>";
    StrHtml += "</ul>"
    StrHtml += "</div></div></div>";
    if (obj.DYSelect != null) {
        obj.DYSelect.html(StrHtml);
    }
    obj.DYSelect.find(".divTcSelectDY .divTcdetailDY .liDY").bind("click", function () {
        obj.DYSelect.find(".divTcSelectDY .divTcdetailDY .liDY").removeClass("xuanzhong");
        $(this).addClass("xuanzhong");
        obj.strBLId = $(this).attr("data");
        obj.strBLTxt = $(this).find("span").html();
        obj.DYIdHidden.val(obj.strBLId);
        obj.DYSelect.hide();
        obj.DYDisplay.html(obj.strBLTxt).addClass("col3").siblings("i").hide();
        $("body").scrollTop(obj.disScolltop);
    });

    this.BindEvent = function () {

        obj.DYDisplay.click(function () {
            if (obj.DYIdHidden.val() != "") {
                obj.DYSelect.find(".divTcSelectDY .divTcdetailDY .liDY[data='" + obj.DYIdHidden.val() + "']").addClass("xuanzhong").siblings(".liDY").removeClass("xuanzhong");
            }
            obj.disScolltop = $("body").scrollTop();
            obj.DYSelect.show();
            $("body").scrollTop(0);
        });
    };

    obj.BindEvent();
}

//抵押期限
var Mobile_SelectYDQX_v4 = function (DisplayYDQX, SelectYDQXId, hdYDQXId) {
    this.YDQXDisplay = null;//点击触发事件的id
    this.YDQXSelect = null;//选择车型弹出框id
    this.DYIdHidden = null;
    this.isShowSelectAll = false;

    this.strYDQXId = "";
    this.strYDQXTxt = "";

    if (!!DisplayYDQX) {
        this.YDQXDisplay = $("#" + DisplayYDQX);
    }
    if (!!SelectYDQXId) {
        this.YDQXSelect = $("#" + SelectYDQXId);
    }
    if (!!hdYDQXId) {
        this.DYIdHidden = $("#" + hdYDQXId);
    }
    //if (IsShowSelectAll != undefined) {
    //    this.isShowSelectAll = IsShowSelectAll;
    //}
    var obj = this;
    this.disScolltop = 0;
    var hgt = $(document).height();

    var StrHtml = "<div class=\"posabs divTcSelectYDQX\" style=\"z-index:21;\" >";
    //StrHtml+="<header class='header2'><div class=\"head-l closemake\" onclick=\"$('.divTcSelectYDQX').parents('section').hide();\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">贷款期限</a></div><div class=\"head-r\"></div></header>";
    StrHtml+="<header><div class=\"per_tit \"> <a href=\"javascript:void(0);\" class=\"closemake\" onclick=\"$('.divTcSelectYDQX').parents('section').hide();\"><i class=\"per_icon_tit jtx\"></i></a><span class=\"per_tit_span\">贷款期限</span></div></header>";
    StrHtml+="<div class=\"cont\">";
    StrHtml += "<div class=\"jzgzlist backbgf xzpplist divTcSelectYDQX  z-1\" style=\"min-height:" + hgt + "px;\" >";
    StrHtml += "<ul class=\"ulDKQX\"> ";
    StrHtml += "<li  class=\"liDKQX\"  data=\"1\"><a href=\"javascript:void(0);\"> <span>1个月</span></a></li>";
    StrHtml += "<li  class=\"liDKQX\"  data=\"3\"><a href=\"javascript:void(0);\"> <span>3个月</span></a></li>";
    StrHtml += "<li  class=\"liDKQX\"  data=\"6\"><a href=\"javascript:void(0);\"> <span>6个月</span></a></li>";
    StrHtml += "<li  class=\"liDKQX\"  data=\"12\"><a href=\"javascript:void(0);\"> <span>1年</span></a></li>";
    StrHtml += "<li  class=\"liDKQX\"  data=\"24\"><a href=\"javascript:void(0);\"> <span>2年</span></a></li>";
    StrHtml += "<li  class=\"liDKQX\"  data=\"36\"><a href=\"javascript:void(0);\"> <span>3年</span></a></li>";
    StrHtml += "</ul>"
    StrHtml += "</div></div></div>";
    if (obj.YDQXSelect != null) {
        obj.YDQXSelect.html(StrHtml);
    }
    obj.YDQXSelect.find(".divTcSelectYDQX .divTcSelectYDQX .liDKQX").bind("click", function () {
        obj.YDQXSelect.find(".divTcSelectYDQX .divTcSelectYDQX .liDKQX").removeClass("xuanzhong");
        $(this).addClass("xuanzhong");
        obj.strYDQXId = $(this).attr("data");
        obj.strYDQXTxt = $(this).find("span").html();
        obj.DYIdHidden.val(obj.strYDQXId);
        obj.YDQXSelect.hide();
        obj.YDQXDisplay.html(obj.strYDQXTxt).addClass("col3").siblings("i").hide();
        $("body").scrollTop(obj.disScolltop);
    });

    this.BindEvent = function () {

        obj.YDQXDisplay.click(function () {
            if (obj.DYIdHidden.val() != "") {
                obj.YDQXSelect.find(".divTcSelectYDQX .divTcSelectYDQX .liDKQX[data='" + obj.DYIdHidden.val() + "']").addClass("xuanzhong").siblings(".liDKQX").removeClass("xuanzhong");
            }
            obj.disScolltop = $("body").scrollTop();
            obj.YDQXSelect.show();
            $("body").scrollTop(0);
        });
    };

    obj.BindEvent();
}

//信用记录
var Mobile_SelectXYJL_v4 = function (DisplayXYJL, SelectXYJLId, hdXYJLId) {
    this.XYJLDisplay = null;//点击触发事件的id
    this.XYJLSelect = null;//选择车型弹出框id
    this.XYJLIdHidden = null;
    this.isShowSelectAll = false;

    this.strYDQXId = "";
    this.strYDQXTxt = "";

    if (!!DisplayXYJL) {
        this.XYJLDisplay = $("#" + DisplayXYJL);
    }
    if (!!SelectXYJLId) {
        this.XYJLSelect = $("#" + SelectXYJLId);
    }
    if (!!hdXYJLId) {
        this.XYJLIdHidden = $("#" + hdXYJLId);
    }
    //if (IsShowSelectAll != undefined) {
    //    this.isShowSelectAll = IsShowSelectAll;
    //}
    var obj = this;
    this.disScolltop = 0;
    var hgt = $(document).height();

    var StrHtml = "<div class=\"posabs divTcSelectXYJL\" style=\"z-index:21;\" >";
    // StrHtml+="<header class='header2'><div class=\"head-l closemake\" onclick=\"$('.divTcSelectXYJL').parents('section').hide();\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">信用记录</a></div><div class=\"head-r\"></div></header>";
    StrHtml+="<header><div class=\"per_tit \"> <a href=\"javascript:void(0);\" class=\"closemake\" onclick=\"$('.divTcSelectXYJL').parents('section').hide();\"><i class=\"per_icon_tit jtx\"></i></a><span class=\"per_tit_span\">信用记录</span></div></header>";
    StrHtml+="<div class=\"cont\">";
    StrHtml += "<div class=\"jzgzlist backbgf xzpplist divTcSelectXYJL  z-1\" style=\"min-height:" + hgt + "px;\" >";
    StrHtml += "<ul class=\"ulDKQX\"> ";
    StrHtml += "<li  class=\"liXYJL\"  data=\"71\"><a href=\"javascript:void(0);\"> <span>信用良好</span></a></li>";
    StrHtml += "<li  class=\"liXYJL\"  data=\"72\"><a href=\"javascript:void(0);\"> <span>少数逾期</span></a></li>";
    StrHtml += "<li  class=\"liXYJL\"  data=\"70\"><a href=\"javascript:void(0);\"> <span>长期多数逾期</span></a></li>";
    StrHtml += "<li  class=\"liXYJL\"  data=\"256\"><a href=\"javascript:void(0);\"> <span>无信用记录</span></a></li>";

    StrHtml += "</ul>"
    StrHtml += "</div></div></div>";
    if (obj.XYJLSelect != null) {
        obj.XYJLSelect.html(StrHtml);
    }
    obj.XYJLSelect.find(".divTcSelectXYJL .divTcSelectXYJL .liXYJL").bind("click", function () {
        obj.XYJLSelect.find(".divTcSelectXYJL .divTcSelectXYJL .liXYJL").removeClass("xuanzhong");
        $(this).addClass("xuanzhong");
        obj.strYDQXId = $(this).attr("data");
        obj.strYDQXTxt = $(this).find("span").html();
        obj.XYJLIdHidden.val(obj.strYDQXId);
        obj.XYJLSelect.hide();
        obj.XYJLDisplay.html(obj.strYDQXTxt).addClass("col3").siblings("i").hide();
        $("body").scrollTop(obj.disScolltop);
    });

    this.BindEvent = function () {

        obj.XYJLDisplay.click(function () {
            if (obj.XYJLIdHidden.val() != "") {
                obj.XYJLSelect.find(".divTcSelectXYJL .divTcSelectXYJL .liXYJL[data='" + obj.XYJLIdHidden.val() + "']").addClass("xuanzhong").siblings(".liXYJL").removeClass("xuanzhong");
            }
            obj.disScolltop = $("body").scrollTop();
            obj.XYJLSelect.show();
            $("body").scrollTop(0);
        });
    };

    obj.BindEvent();
}

//性别
var Mobile_SelectSex_v4 = function (DisplaySex, SelectSexId, hdSexId) {
    this.SexDisplay = null;//点击触发事件的id
    this.SexSelect = null;//选择车型弹出框id
    this.SexIdHidden = null;
    this.isShowSelectAll = false;

    this.strBLId = "";
    this.strBLTxt = "";

    if (!!DisplaySex) {
        this.SexDisplay = $("#" + DisplaySex);
    }
    if (!!SelectSexId) {
        this.SexSelect = $("#" + SelectSexId);
    }
    if (!!hdSexId) {
        this.SexIdHidden = $("#" + hdSexId);
    }
    //if (IsShowSelectAll != undefined) {
    //    this.isShowSelectAll = IsShowSelectAll;
    //}
    var obj = this;
    this.disScolltop = 0;
    var hgt = $(document).height();


    var StrHtml = "<div class=\"posabs divTcSelectSex\" style=\"z-index:21;\" >";
    //StrHtml+="<header class='header2'><div class=\"head-l closemake\" onclick=\"$('.divTcSelectSex').parents('section').hide();\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">性别</a></div><div class=\"head-r\"></div></header>";;
    StrHtml+="<header><div class=\"per_tit \"> <a href=\"javascript:void(0);\" class=\"closemake\" onclick=\"$('.divTcSelectSex').parents('section').hide();\"><i class=\"per_icon_tit jtx\"></i></a><span class=\"per_tit_span\">性别</span></div></header>";
    StrHtml+="<div class=\"cont\">";
    StrHtml += "<div class=\"jzgzlist backbgf xzpplist divTcdetailSex  z-1\" style=\"min-height:" + hgt + "px;\" >";
    StrHtml += "<ul class=\"ulSex\"> ";
    StrHtml += "<li  class=\"liSex\"  data=\"男\"><a href=\"javascript:void(0);\"> <span>男</span></a></li>";
    StrHtml += "<li  class=\"liSex\"  data=\"女\"><a href=\"javascript:void(0);\"> <span>女</span></a></li>";
    StrHtml += "</ul>"
    StrHtml += "</div></div></div>";
    if (obj.SexSelect != null) {
        obj.SexSelect.html(StrHtml);
    }
    obj.SexSelect.find(".divTcSelectSex .divTcdetailSex .liSex").bind("click", function () {
        obj.SexSelect.find(".divTcSelectSex .divTcdetailSex .liSex").removeClass("xuanzhong");
        $(this).addClass("xuanzhong");
        obj.strBLId = $(this).attr("data");
        obj.strBLTxt = $(this).find("span").html();
        obj.SexIdHidden.val(obj.strBLId);
        obj.SexSelect.hide();
        obj.SexDisplay.html(obj.strBLTxt).addClass("col3").siblings("i").hide();
        $("body").scrollTop(obj.disScolltop);
    });

    this.BindEvent = function () {

        obj.SexDisplay.click(function () {
            if (obj.SexIdHidden.val() != "") {

                obj.SexSelect.find(".divTcSelectSex .divTcdetailSex .liSex[data='" + obj.SexIdHidden.val() + "']").addClass("xuanzhong").siblings(".liSex").removeClass("xuanzhong");
            }
            obj.disScolltop = $("body").scrollTop();
            obj.SexSelect.show();
            $("body").scrollTop(0);
        });
    };

    obj.BindEvent();
}
