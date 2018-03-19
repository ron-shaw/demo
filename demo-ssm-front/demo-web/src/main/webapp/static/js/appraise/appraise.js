/**
 * Created by dougp on 2017/1/4.
 */
// $(window).resize(function(){
//     alert(parseInt($("#windowHighet").val())+"=="+parseInt($(window).height()))
//     // $("#windowHighet").val($(window).height());
//     // alert(parseInt($("#windowHighet").val())>parseInt($(window).height()))
//     if(parseInt($("#windowHighet").val())<=parseInt($(window).height())-300)
//     {
//         alert("ccc="+$("#windowHighet").val()+"=="+$(window).height())
//         getAppraiseRecommend(2);
//         $("#windowHighet").val($(window).height());
//     }
//     else
//     {
//         // alert(parseInt($("#windowHighet").val()));
//         $("#windowHighet").val($(window).height());
//     }
// })
var appraisePrice = {
    "price": 0,
    "addPrice": 0
}
$(function () {
    // $("#windowHighet").val($(window).height());
    // alert($("#windowHighet").val())
    // $('#zw_sh_txt_tit span').click(function(){
    //     calcPrice();
    // });
    tabPrice();
    var shareurl = document.location.href.toLocaleLowerCase();
    //分享到各平台
    $(".btnShare dl").eq(0).children("a").attr("href", "http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(shareurl) + "&title=" + encodeURIComponent(document.title) + "&appkey=1343713053&pic=http://res.jingzhengu.com/ptv/3.0/images/logo-20150114.png");
    $(".btnShare dl").eq(1).children("a").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + shareurl + "&title=" + document.title.substr(0, 80) + "&pics=http://res.jingzhengu.com/ptv/3.0/images/logo-20150114.png");
    $(".btnShare dl").eq(2).children("a").attr("href", "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(shareurl) + "&title=" + encodeURIComponent(document.title) + "&pic=http://res.jingzhengu.com/ptv/3.0/images/logo-20150114.png");
    var _price = $("#zw_sh_bd>div[style='display: block;'] .suggest").val();
    if (_price) {
        calcPrice(_price);
    }
})
/**
 * 加价推荐
 * @param type
 */
function getAppraiseRecommend(type) {
    Common.showLoading();
    var AddPrice = $("#increasePrice").val();
    if (AddPrice == "")return false;
    if (parseInt(AddPrice) > 100 || parseInt(AddPrice) <= 0) {
        alert("请输入1-100之间的整数");
        return false;
    }
    if (type == 1) {
        var GuzhiPrice = $("#tab_body>div[style='display: block;'] #suggest").val();
    }
    else if (type == 2) {
        var GuzhiPrice = $("#zw_sh_bd>div[style='display: block;'] .suggest").val();
    }
    var pageIndex = parseInt($("#pageIndex").val()) + 1;
    if (parseInt(AddPrice) != parseInt($("#dataPrice").val())) {
        pageIndex = 1;
    }
    getGuzhiTuijianOldCarForV5(pageIndex, 5, GuzhiPrice, AddPrice);
    getGuzhiTuijianNewCarForV5(pageIndex, 5, GuzhiPrice, AddPrice);

}
/**
 * 验证只能输入整数
 * @param t
 * @constructor
 */
function NumberCheck(t) {
    var num = t.value;
    var re = /^\d*$/;
    if (!re.test(num)) {
        isNaN(parseInt(num)) ? t.value = 0 : t.value = parseInt(num);
    }
}
function selectActive(id, chid) {
    $("#" + id).find("li").removeClass("active");
    $("#" + id).find("li").eq(1).addClass("active");
    // $("#"+chid).find("div").css("display","none");
    $("#" + chid + ">div").css("display", "none");
    $("#" + chid + ">div:eq(1)").css("display", "block");
}
/**
 * 获取二手车加价推荐
 */
function getGuzhiTuijianOldCarForV5(pageIndex, pageSize, GuzhiPrice, AddPrice) {
    // $("#loading").show();
    $.ajax({
        type: 'GET',
        dataType: "json",
        async: true,
        url: "/appraise/getguzhituijianoldcarforv5?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&guzhiPrice=" + GuzhiPrice + "&addPrice=" + AddPrice,
        success: function (msg) {
            var html = '';
            msg = $.parseJSON(msg);
            if (msg != "" && msg.tjOldCarList.length > 0) {
                $.each(msg.tjOldCarList, function (i, n) {
                    html += "<div class=\"zescsj\">";
                    html += "<div class=\"zesbfb clearfix\">";
                    html += "<a href=\"/ershouche/mcarsourcedetail-" + n.carSourceID + "-" + n.carSourceFrom + ".html\">";
                    html += "<aside class=\"zes_as1\"><img src=\"" + n.carSourceImageUrl + "\" alt=\"\"></aside>";
                    html += "<aside class=\"zes_as2\">";
                    html += "<p class=\"zti_p1\">" + n.fullName + "</p>";
                    html += "<p class=\"zti_p2 col565757\">" + n.mileage + " | " + n.releaseTime + " | " + n.cityName + "</p>";
                    html += "<p class=\"zti_p3\"><label class=\"zgzlab1\"><strong>" + n.sellPrice + "</strong>万</label>";
                    if(parseFloat(n.apprisePrice) > 0){
                        html += "<label class=\"zgzlab2\">";
                        html += "<span class=\"col6\">精真估估值</span><em>" + n.apprisePrice + "万</em>";
                        html += "</label>";
                    }
                    html += "</p>";
                    html += "</aside>";
                    html += "</a>";
                    html += "</div>";
                    html += "</div>";
                });
                $("#SecondHandCar").html(html);
                var obj = msg.tjOldCarList[parseInt(Math.random() * (msg.tjOldCarList.length))];
                $("#modelnameid").html(obj.modelName)
                //替换查看更多车源链接
                $("#selectCarSource").attr("href", "/ershouche/c/-j2-0-0-0-0-0-0-0-" + msg.startPrice + "-" + msg.endPrice + "t.html")
                //输入加价价格
                $("#dataPrice").val(AddPrice);
                $("#pageIndex").val(pageIndex);
            }
        },
        error: function (errorMsg) {

        }
    });
}

/**
 * 获取新车加价推荐
 */
function getGuzhiTuijianNewCarForV5(pageIndex, pageSize, GuzhiPrice, AddPrice) {
    $.ajax({
        type: 'GET',
        dataType: "json",
        async: true,
        url: "/appraise/getguzhituijiannewcarforv5?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&guzhiPrice=" + GuzhiPrice + "&addPrice=" + AddPrice,
        success: function (msg) {
            var html = '';
            msg = eval(msg);
            if (msg != "" && msg.length > 0) {
                var strContent;
                $.each(msg, function (i, n) {
                    html += "<div class=\"zescsj\">";
                    html += "<div class=\"zesbfb clearfix\">";
                    html += "<a href=\"http://car.m.yiche.com/" + n.url + "/\">";
                    html += "<aside class=\"zes_as1\"><img src=\"" + n.carSourceImageUrl + "\" alt=\"\"></aside>";
                    html += "<aside class=\"zes_as2\">";
                    html += "<p class=\"zti_p1\">" + n.fullName + "</p>";
                    html += "<p class=\"zti_p2 zti_p5\">" + n.modelLevelName + "</p>";
                    html += "<p class=\"zti_p3\">";
                    html += "<label class=\"zgzlab1\">";
                    html += "<span class=\"col6 scale-875\">新车优惠价</span>";
                    html += "<strong>" + n.minMsrp + "</strong>";
                    html += "</label>";
                    html += "<label class=\"zgzlab1 zgzlab-hr\"><strong>" + n.maxMsrp + "</strong>万</label>";
                    html += "</p>";
                    html += "</aside>";
                    html += "</a>";
                    html += "</div>";
                    html += "</div>";
                });
                $("#NewCar").html(html);
                //输入加价价格
                $("#dataPrice").val(AddPrice);
                $("#pageIndex").val(pageIndex);
            }
            Common.hideLoading();
        },
        error: function (errorMsg) {

        }
    });
}
function tab(obj1, obj2) {
    var oBj1 = document.getElementById(obj1);
    var oBtnz = oBj1.children;
    var oBj2 = document.getElementById(obj2);
    var oBoxz = oBj2.children;
    for (var i = 0; i < oBtnz.length; i++) {
        (function (index) {
            oBtnz[i].onclick = function () {
                for (var i = 0; i < oBtnz.length; i++) {
                    oBtnz[i].className = '';
                    oBoxz[i].style.display = 'none';
                }
                oBtnz[index].className = 'active';
                oBoxz[index].style.display = 'block';
            }
        })(i)
    }
}

function tabPrice() {
    $("#zw_sh_txt_tit li").click(function () {
        var _this = $(this);
        _this.addClass("active").siblings('li').removeClass("active");
        var index = _this.attr("data");
        $("#zw_sh_bd").find(".qiehuan1").eq(index).show().siblings(".qiehuan1").hide();
        var price = $("#zw_sh_bd .suggest").eq(index).val();

        calcPrice(price);

    });
    // $("#zw_sh_txt_tit .liqiehuan").click(function () {
    //     var _this = $(this);
    //     $(this).addClass("active").siblings('.liqiehuan').removeClass("active");
    //     var index = $(this).index($("#zw_sh_txt_tit .liqiehuan"))
    //     alert(index);
    //
    // });
}

function calcPrice(price) {
    appraisePrice.price = price;
    appraisePrice.addPrice = $('#increasePrice').val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: appraisePrice,
        url: "/sellappraise/calcPrice",
        success: function (e) {
            if (e.data) {
                var href = "/ershouche/c/-j2-0-0-0-0-0-0-0-" + e.data + "t.html";
                $('#selectCarSource').attr("href", href);
            }
        }
    });
}