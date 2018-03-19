/**
 * Created by dougp on 2016/12/2.
 */
var IsPost = true;
$(function () {
    tabSelect();//选项卡选中
    $(".hdPage").val(1);
    if ($("#isshow").val() == 1) {
        $(".ad-app").hide();
    }
    if (IsPost) {
        //拖动都市头条列表到底部加载数据
        $('.list_Tj,.list_Xg,.list_Yc,.list_Qw,.list_BZ').on("touchmove", function (event) {
            //touchstart:     //手指放到屏幕上时触发
            //touchmove:      //手指在屏幕上滑动时触发
            //touchend:       //手指离开屏幕时触发
            var bodyScrollTop = $('body').scrollTop();
            var documentHeight = jQuery(document).height();
            var windowHeight = jQuery(window).height();
            //滚动条拖动到底部时加载数据
            if (bodyScrollTop >= documentHeight - windowHeight) {
                var page = Number($(this).find(".hdPage").val()) + 1;
                var type = $(this).find(".hdPage").attr("data");
                $(this).find(".hdPage").val(page);

                LoadArtical(page, type, $(this));
            }
        })
    }
});
//选项卡选中
function tabSelect() {
    var type = "";
    var t = $("#selectType").val();
    if (!isNaN(t)) {
        type = getTpye(t);
    }
    else {
        type = getUrlParam("type");
    }

    if (type != null && type != "" && type != "list_Tj") {
        $(".list_Tj").removeClass("active");
        $("#list_Tj").css("display", "none");
        $("." + type).addClass("active");
        $("#" + type).css("display", "block");
    }
    else {
        $(".list_Tj").addClass("active");
        $("#list_Tj").css("display", "block");
    }
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function LoadArtical(page, type, obj) {
    IsPost = false;
    $.ajax({
        type: 'GET',
        dataType: "json",
        async: false,
        url: "/information/getarticlelist?pageIndex=" + page + "&pageSize=8&newsType=" + type + "&isshow=" + $("#isshow").val(),
        beforeSend: function () {
            if (obj.find(".ztjnr .loadmore").length <= 0) {
                obj.find(".ztjnr").append("<div class=\"loadmore\" style=\"margin:0 auto;\">加载中...</div>");
            }
        },
        success: function (msg) {
            var t = getTpye(type);
            obj.find(".ztjnr .loadmore").remove();
            var html = '';
            msg = eval(msg);
            if (msg != "" && msg.length > 0) {
                $.each(msg, function (i, n) {
                    html += "<div class=\"zcxdv\">";
                    html += "<a href=\"/information/detail?id=" + n.id + "&type=" + t + "&isshow=" + $("#isshow").val() + "\">";
                    html += "<aside class=\"zcxle\"><img src=\"" + n.imgVo + "\" alt=\"" + n.title + "\"  onerror=\"nofind(this);\"/></aside>";
                    html += "<aside class=\"zcxri\">";
                    html += "<label class=\"zcxla1\">" + n.title + "</label>";
                    html += "<label class=\"zcxla2\">" + n.summary + "</label>";
                    html += "</aside>";
                    html += "</a>";
                    html += "</div>";
                });
            }
            obj.find(".ztjnr").append(html);
        },
        error: function (errorMsg) {
            obj.find(".ztjnr .loadmore").remove();
        }
    });
    IsPost = true;
}
function getTpye(num) {
    var className = "";
    switch (parseInt(num)) {
        case 1:
            className = "list_Tj";
            break;
        case 2:
            className = "list_Xg";
            break;
        case 3:
            className = "list_Yc";
            break;
        case 4:
            className = "list_Qw";
            break;
        case 5:
            className = "list_BZ";
            break;
    }
    return className;
}
function nofind(obj) {
    obj.src = $("#zwtid").val() + '/4.0/images/zwt.jpg';
}