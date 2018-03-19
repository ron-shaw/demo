/**
 * Created by dougp on 2016/12/2.
 */
var IsPost = true;
$(function () {
    $("body").addClass("backbg2");
    zqbsClick();//注册点击事件
    //消息滑动
    $(".hdPage").val(1);
    if (IsPost) {
        //拖动都市头条列表到底部加载数据
        $('.list_Tz,.list_Gg').on("touchmove", function (event) {
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
function LoadArtical(page, type, obj) {
    IsPost = false;
    $.ajax({
        type: 'GET',
        dataType: "json",
        async: false,
        url: "/belletin/getbelletinlist?pageIndex=" + page + "&pageSize=10&newsType=" + type,
        beforeSend: function () {
            if (obj.find(".ztzga .loadmore").length <= 0) {
                obj.find(".ztzga").append("<div class=\"loadmore\" style=\"margin:0 auto;\">加载中...</div>");
            }
        },
        success: function (msg) {
            obj.find(".ztzga .loadmore").remove();
            var html = '';
            msg = eval(msg);
            if (msg != "" && msg.length > 0) {
                var strContent;
                $.each(msg, function (i, n) {
                    html += "<dl class=\"ztzdl\"><dt>" + n.title + "</dt><dd style=\"position: relative;\">";
                    html += "<label class=\"zswxd\"><span  id=\"span" + n.id + "\">" + DateToStringCN(n.updatetime, "span" + n.id, 1) + "</span></label>";
                    html += "<div class=\"zdfr collapse in\" style=\"height:60px;\">";
                    html += "<div id='div" + n.id + "'>";
                    // if (n.content.length >= 70) {
                    //     strContent = n.content.substring(0, 70) + "......";
                    // }
                    // else {
                    strContent = n.content;
                    // }
                    html += strContent;
                    html += "</div>";
                    html += "</div>";
                    // if (n.content.length >= 70) {
                    html += "<a class=\"zqbs\" data-toggle=\"collapse\" data-parent=\"#accordion\" keyid=\"" + n.id + "\" key=\"" + n.content + "\" href=\"#collapseOne\">全部</a>";
                    // }
                    html += "<div class=\"content\" style=\"display:none;\">" + n.content + "</div>";
                    html += "</dd>";
                    html += "</dl>";
                });
            }
            obj.append(html);
            $('.zqbs').unbind("click");
            zqbsClick();//注册点击事件
        },
        error: function (errorMsg) {
            obj.find(".ztzga .loadmore").remove();
        }
    });
    IsPost = true;
}

//注册点击事件
function zqbsClick() {
    $('#myTab li').each(function () {
        $(this).click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.ztzga').eq($(this).index()).css({
                'opacity': '1',
                'height': 'auto',
                overflow: 'hidden'
            }).siblings().css({'opacity': '0', 'height': '0', overflow: 'hidden'});
            $('.ztzdl').each(function () {
                $(this).find('.zdfr').css({'height': '60px'});
                $(this).find('.zqbs').html('全部')
            })
        })
    });
    $('.zdfr').each(function (i, n) {
        var old = $(n).children().height();
        // var newold = $(n).siblings("a").siblings(".content").height();
        var contentlength = $.trim($(n).siblings("a").siblings(".content").html()).length
        if (contentlength <= 70) {
            $(n).siblings(".zqbs").hide();
        } else {
            if ($(n).siblings(".zqbs").html() != '收起') {
                var s = $.trim($(n).children().html());
                var g = s.substring(0, 70) + "<span style='display:;' class='Lifenge'>...</span><span class='Liafter' style='display:none;'>" + s.substring(70) + "</span>";
                $(n).find("div").html(g);
                $(n).attr("oldheight", old).css({height: '60px'});
                $(n).siblings(".zqbs").html('全部');
            }
        }
    });
    $('.ztzdl').find('.zqbs').click(function () {
        var slideHeight = 60; // px
        // var defHeight = $(this).siblings('.zdfr').attr('oldheight');
        var defHeight = $(this).siblings(".zdfr").attr("oldheight");
        if ($(this).html() == '收起') {
            $(this).siblings('.zdfr').find(".Lifenge").show().siblings(".Liafter").hide();
            $(this).siblings('.zdfr').animate({
                height: slideHeight + 'px'
            }, "fast");
            $(this).html('全部');
        } else {
            $(this).siblings('.zdfr').find(".Lifenge").hide().siblings(".Liafter").show();
            $(this).siblings('.zdfr').animate({
                height: defHeight + 'px'
            }, "fast");
            $(this).html('收起');
        }
    })
}
//时间处理
function DateToStringCN(DateIn, spanid, type) {
    DateIn = new Date(DateIn);
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var Hours = 0;
    var Minutes = 0;
    var CurrentDate = "";
    //初始化时间
    Year = DateIn.getFullYear();
    Month = DateIn.getMonth() + 1;
    Day = DateIn.getDate();
    Hours = DateIn.getHours();
    Minutes = DateIn.getMinutes();
    Year = (Year < 1900 ? (1900 + Year) : Year);
    CurrentDate = Year + "年";
    if (Month >= 10) {
        CurrentDate = CurrentDate + Month + "月";
    }
    else {
        CurrentDate = CurrentDate + "0" + Month + "月";
    }
    if (Day >= 10) {
        CurrentDate = CurrentDate + Day + "日";
    }
    else {
        CurrentDate = CurrentDate + "0" + Day + "日";
    }
    if (Hours >= 10) {
        CurrentDate = CurrentDate + " " + Hours;
    }
    else {
        CurrentDate = CurrentDate + " 0" + Hours;
    }
    if (Minutes >= 10) {
        CurrentDate = CurrentDate + ":" + Minutes;
    }
    else {
        CurrentDate = CurrentDate + ":0" + Minutes;
    }
    if (type == 1) {
        return CurrentDate;
    }
    else {
        $("#" + spanid).html(CurrentDate);
    }
}