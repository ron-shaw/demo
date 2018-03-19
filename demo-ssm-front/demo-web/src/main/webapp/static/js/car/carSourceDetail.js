
tab('zxcr', 'zkbgc');

var collectTime="";//收藏
var makeId = $("#makeId").val();
var modelId = $("#modelId").val();
var cityId = $("#cityId").val();
var styleId = $("#styleId").val();
var sellprice = $.trim($("#sellPriceId").val());
$(function () {
    $(".collectSection").hide();
    $("#txtYuQiPrice").DecimalTwo();
    $(".kjlabel").bind("click",function () {
        $(".bargainPrice").show();
    });
    $(".sharecardetail").click(function () {
        $(".btnShare").show();
    });
    carSourceLoan();
    baoZhilvRank();
    getGuzhiTuijianOldCar();
    getGuzhiTuijianNewCar();
    $(".btnSubmit").click(function () {
        var rge = /^[1][34578][0-9]{9}$/;
        var expectedPrice = $.trim($("#txtYuQiPrice").val());
        var mobile = $.trim($("#txtmobile").val());
        var sellprice = $.trim($("#sellPriceId").val());
        var carSourceId = $.trim($("#carSourceId").val());
        var carSouceFromId = $.trim($("#carSouceFromId").val());
        if (expectedPrice == "") {
            alert("请填写预期价");
            return false;
        }
        if (mobile == "") {
            alert("请填写手机号");
            return false;
        }else if (rge.test(mobile) == false) {
            alert("手机号码格式错误");
            return false;
        }
        $.ajax({
            type: "post",
            url: "/carSource/addCarSourceBargainPrice",
            data: {
                carSourceId: carSourceId,
                carSouceFromId: carSouceFromId,
                expectedPrice: expectedPrice,
                mobile: mobile,
                sellPrice: sellprice
            },
            success: function (data) {
                if (data.status == 200) {
                    alert("提交成功！");
                    //$("#txtYuQiPrice").val("");
                    //$("#txtmobile").val("");
                    $(".bargainPrice").hide();
                } else {
                    alert(data.msg);
                }
            }
        });
    });


    var shareurl = document.location.href.toLocaleLowerCase();
    //分享到各平台
    var defShareImg=$("#defShareImg").val();
    if(defShareImg==""){
        defShareImg="http://res.jingzhengu.com/ptv/3.0/images/logo-20150114.png";
    }
    $(".btnShare dl").eq(0).children("a").attr("href", "http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(shareurl) + "&title=" + encodeURIComponent(document.title) + "&appkey=1343713053&pic="+defShareImg+"");
    $(".btnShare dl").eq(1).children("a").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + shareurl + "&title=" + document.title.substr(0, 80) + "&pics="+defShareImg+"");
    $(".btnShare dl").eq(2).children("a").attr("href", "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(shareurl) + "&title=" + encodeURIComponent(document.title) + "&pic="+defShareImg+"")
});
swiper();
mySwiper();
function swiper() {
    var swiper = new Swiper('.swiper-container', {
        touchMoveStopPropagation: false,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        loop: true,
        paginationType: 'fraction'
    });
}

function mySwiper() {
    var mySwiper = new Swiper('.swiper-container1', {
        touchMoveStopPropagation: false,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1,
        paginationClickable: true,
        loop: true,
        pagination: '.swiper-pagination'
    })
}

function clearCollectTimeout() {
    if(collectTime!='')
    {
        clearTimeout(collectTime);
    }
}
//点击收藏
function  Collectclick() {
    $(".collectSection").show();
    collectTime= setTimeout("location.href='http://www.jingzhengu.com/app/jzgdownload.html?t=M'", 1000);
    //location.href='http://www.jingzhengu.com/app/jzgdownload.html?t=M';
}

//贷款
function carSourceLoan() {
    $(".loandiv").show();
    $.ajax({
        type: "post",
        url: "/carSource/carSourceLoan",
        data: {
            sellprice: sellprice,
            styleid: styleId,
            cityid: cityId
        },
        success: function (data) {
            if (data.status == 100) {
                var dataJson = JSON.parse(data.msg);

                var shoufuPayment = dataJson.shoufuPayment;
                var monthPayment = dataJson.monthPayment;
                var totalInterestText = dataJson.totalInterestText;
                if(shoufuPayment==0&&monthPayment==0&&totalInterestText==0){
                    $(".loandiv").hide();
                }else{
                    $(".term").html("2年期");
                $(".shoufuPayment").html("首付 " + shoufuPayment);
                $(".monthPayment").html("月供 " + monthPayment);
                $(".totalInterestText").html("比全款多花" + totalInterestText);
                }
            } else {

            }
        }
    });
}
//保值率
function baoZhilvRank() {
//        var makeId=$("#makeId").val();
//        var modelId=$("#modelId").val();
//        var cityId=$("#cityId").val();
    $.ajax({
        type: "post",
        url: "/carSource/baoZhilvRank",
        data: {
            makeId: makeId,
            modelId: modelId,
            cityId: cityId
        },
        success: function (data) {
            if (data.status == 100) {
                var dataJson = JSON.parse(data.msg);
                var bzstr = dataJson.baoZhilvRank;
                if (bzstr == 0) {
                    $(".baozhilvdiv").hide();
                } else {
                    if (dataJson.baoZhilvRank > 20) {
                        bzstr = "20+";
                    }
                    if(dataJson.baoZhilvRank>10){ $(".baozhilvdesc").hide();}
                    $("#baozhilvstr").html(bzstr);
                }
            } else {
                $(".baozhilvdiv").hide();
            }
        }
    });
}

function getGuzhiTuijianOldCar() {
    if (sellprice != "") {
        $.ajax({
            type: "post",
            url: "/carSource/getGuzhiTuijianOldCar",
            data: {
                pageSize: 5,
                pageIndex: 1,
                guzhiPrice: sellprice,
                addPrice: 0
            },
            success: function (data) {
                if (data.status == 100) {
                    if (data.msg != "") {
                        var dataJson = JSON.parse(data.msg);
                        var strhtml = "";
                        $.each(dataJson, function (index, domEle) {
                            strhtml += "<div class=\"zescsj\">";
                            strhtml += "<div class=\"zesbfb clearfix\">";
                            strhtml += "<a href=\"/ershouche/mcarsourcedetail-"+domEle.carSourceID+"-"+domEle.carSourceFrom+".html\">";
                            strhtml += "<aside class=\"zes_as1\"><img src=\"" + domEle.carSourceImageUrl + "\" alt=\"\" onerror='nofind(this)'>";
                            strhtml += "</aside>";
                            strhtml += "<aside class=\"zes_as2\">";
                            strhtml += "<p class=\"zti_p1\">" + domEle.fullName + "</p>";
                            strhtml += "<p class=\"zti_p2 col565757\">" + domEle.mileage + " | " + domEle.releaseTime + " | " + domEle.cityName + "</p>";
                            var apprisePrice = "";
                            if (domEle.apprisePrice != "0.00") {
                                apprisePrice = "<label class=\"zgzlab2 col565757\">精真估估价<em>" + domEle.apprisePrice + "万</em></label>";
                            }
                            strhtml += "<p class=\"zti_p3\"><label class=\"zgzlab1\"><strong>" + domEle.sellPrice + "</strong>万</label>" + apprisePrice + "</p>";
                            strhtml += "</aside>";
                            strhtml += " </a>";
                            strhtml += "</div>";
                            strhtml += "</div>";
                        })
                        $(".tuijianoldcar").html(strhtml);
                    }
                } else {

                }
            }
        });
    }
}
function getGuzhiTuijianNewCar() {
    if (sellprice != "") {
        $.ajax({
            type: "post",
            url: "/carSource/getGuzhiTuijianNewCar",
            data: {
                pageSize: 5,
                pageIndex: 1,
                guzhiPrice: sellprice,
                addPrice: 0
            },
            success: function (data) {
                if (data.status == 100) {
                    if (data.msg != "") {
                        var dataJson = JSON.parse(data.msg);
                        var strhtml = "";
                        $.each(dataJson, function (index, domEle) {
                            strhtml += " <div class=\"zescsj\">";
                            strhtml += "<div class=\"zesbfb clearfix\">";
                            //http://car.m.yiche.com/"+domEle.url+"/
                            strhtml += "<a href='http://car.m.yiche.com/"+domEle.url+"/'>";
                            strhtml += "<aside class=\"zes_as1\"><img src=\"" + domEle.carSourceImageUrl + "\" alt=\"\" onerror='nofind(this)'></aside>";
                            strhtml += "<aside class=\"zes_as2\">";
                            strhtml += "<p class=\"zti_p1\">" + domEle.fullName + "</p>";
                            strhtml += "<p class=\"zti_p2 col565757\">" + domEle.modelLevelName + "</p>";
                            strhtml += "<p class=\"zti_p3\">";
                            strhtml += "<label class=\"zgzlab1\">";
                            strhtml += "<span class=\"col6 scale-875\">新车优惠价</span>";
                            strhtml += "<strong>" + domEle.minMsrp + "</strong>";
                            strhtml += "</label>";
                            strhtml += "<label class=\"zgzlab1 zgzlab-hr\"><strong>" + domEle.maxMsrp + "</strong>万</label>";
                            strhtml += "</p>";
                            strhtml += "</aside>";
                            strhtml += "</a>";
                            strhtml += "</div>";
                            strhtml += "</div>";
                        })
                        $(".tuijiannewcar").html(strhtml);
                    }
                } else {

                }
            }
        });
    }
}

function nofind(obj) {
    obj.src = $("#zwtid").val() + '/4.0/images/zwt.jpg';
}
var mydata = $.cookie("mydata");
if (mydata == 1) {
    $("#wrapper").css("top", "0");
}