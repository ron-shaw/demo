var isFirstShow = false;
var pagesize = 20;
var pageindex = 1;
var num1 = 1;
$(function () {
    // baozhilvload();
    //车型级别
    var SectionSelectLevel = new Mobile_SelectModelLevel_v4("liSelectLevel", "SectionSelectLevel", "hdModelLevelId", true);
    SectionSelectLevel.AfterSelectModelLevel = function () {
        $(".modellevelul").find("li").map(function () {
            if ($(this).attr("data") == $("#hdModelLevelId").val()) {
                $(this).addClass("active");

            } else {
                $(this).removeClass("active");
            }
        })
        num1 = 1;
        $("#PageHistoryCar").html("");
        pagesize = 20;
        pageindex = 1;
        baozhilvload();
    }

    if ($("#hdModelLevelId").val() != "") {
        $(".ulModelLevel").find("li").map(function () {
            if ($(this).attr("data") == $("#hdModelLevelId").val()) {
                var desc = $(this).find("a span").html();
                if (desc != "") {
                    $("#liSelectLevel").html(desc);
                }
            } else {
                $(this).removeClass("active");
            }
        })
        $("#liSelectLevel").html();
    }

    //拖动车源列表到底部加载数据
    // $('.ht_body').on("touchmove", function (event) {
    //     //touchstart:     //手指放到屏幕上时触发
    //     //touchmove:      //手指在屏幕上滑动时触发
    //     //touchend:       //手指离开屏幕时触发
    //
    //     var bodyScrollTop = $('body').scrollTop();
    //     //var bodyScrollTop = document.documentElement.scrollTop;
    //     //alert('body.scrollTop:'+bodyScrollTop);
    //     var documentHeight = $(document).height();
    //     //alert(documentHeight);
    //     var windowHeight = $(window).height();
    //     //alert(windowHeight);
    //     //滚动条拖动到底部时加载数据
    //     if (bodyScrollTop >= documentHeight - windowHeight) {
    //         //alert('dao di le');
    //         pageindex++;
    //         baozhilvload();
    //     }
    //
    // })

    $(".sellcarlist div").bind("click", function () {
        var mdLevel = $("#hdModelLevelId").val();
        var makeid = $("#hdMakeId").val();
        var modelid = $("#hdModelId").val();
        GotoUrl(2, 0, 0, 0, 0, 0, 0, 0, "", makeid, modelid);
    });
    //选择城市
    var dwArea = new Mobile_SelectCity_v1("spandingwei", "SectionSelectArea_Dw", false, false, false);
    dwArea.AfterSelectArea = function () {
        $("#spandingwei").siblings("i").show();
        $("#hdCityName_Dw").val($("#spandingwei").html());
        num1 = 1;
        baozhilvload();
    }
    dwArea.initHidden("hdProvenceId_Dw", "hdCityId_Dw");

    $("#btnOpenApp").click(function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            setTimeout(function () {
                window.location = " http://itunes.apple.com/cn/app/jing-zhen-gu/id900393712?mt=8";
            }, 25);
            window.location = "JingZhenGuApp://";
        } else if (isAndroid) {
            var loadDateTime = new Date();
            // 设置时间阈值，在规定时间里面没有打开对应App的话，直接去App store进行下载。
            window.setTimeout(function () {
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jzg.jzgoto.phone";
            }, 25);
            window.location = "jzg://8888";　　// Android端URL Schema
        } else {
            //  window.location.href="m1.jingzhengu.com"
        }
    });
});

function GotoUrl(sort, price, userType, mdLevel, bsqtype, carage, mils, pailiang, searchword, _makeid, _modelid) {
    var classfiy1 = "-j" + sort + "-" + price + "-" + userType + "-" + mdLevel + "-" + bsqtype;
    classfiy1 += "-" + carage + "-" + mils + "-" + pailiang + "t" + searchword;
    var makeid = _makeid;
    var modelid = _modelid;
    var provid = "";//$.trim($("#hdProvenceId_Dw").val());
    var cityid = "";//$.trim($("#hdCityId_Dw").val());
    $.ajax({
        type: 'GET',
        url: "/buyappraise/getgotourl?makeid=" + makeid + "&modelid=" + modelid,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data != null || data != "") {
                var data = eval(data)[0];
                if (data.status == 200) {
                    var url = "/ershouche/";
                    // if (data.CityPinyin != "") {
                    //     url += "c" + data.CityPinyin + "/";
                    //     if (data.MakePinyin != "") {
                    //         url += data.MakePinyin;
                    //         if (data.ModelPinyin != "") {
                    //             url += "-" + data.ModelPinyin;
                    //         }
                    //         if (sort > 0 || price > 0 || userType > 0 || mdLevel > 0 || bsqtype > 0 || carage > 0 || mils > 0 || pailiang > 0) {
                    //             url += classfiy1;
                    //         }
                    //         url += ".html";
                    //     } else {
                    //         if (sort > 0 || price > 0) {
                    //             url += classfiy1;
                    //         }
                    //         url += ".html";
                    //     }
                    //
                    //
                    // } else {
                    if (data.MakePinyin != "") {
                        url += "m" + data.MakePinyin + "/";
                        if (data.ModelPinyin != "") {

                            url += data.ModelPinyin;
                        }
                        if (sort > 0 || price > 0) {
                            url += classfiy1;
                        }
                        url += ".html";
                    } else {
                        if (sort > 0 || price > 0 || userType > 0 || mdLevel > 0 || bsqtype > 0 || carage > 0 || mils > 0 || pailiang > 0) {
                            url += "c/" + classfiy1;
                        }
                        url += ".html";
                    }
                    // }
                    window.location.href = url;
                }
            }
        }
    });
}

function baozhilvload() {
    var cityid = $("#hdCityId_Dw").val() == "" ? 0 : $("#hdCityId_Dw").val();
    var ModelLevelId = $("#hdModelLevelId").val() == "" ? 0 : $("#hdModelLevelId").val();
    $("#nothelist").hide();
    $("#PageHistoryCar").hide();
    $.ajax({
        type: 'GET',
        url: "/buyappraise/getresidualratio?pageIndex=" + pageindex + "&pageSize=" + pagesize + "&cityid=" + cityid + "&modelLevelId=" + ModelLevelId,
        dataType: 'json',
        async: true,
        beforeSend: function () {
        },
        success: function (msg) {
            var strShtml = "";
            if (msg != "" && msg != null) {
                var rankdata = $.parseJSON(msg);
                var page = 0;
                var strHtml = "";
                if (rankdata != null && rankdata != "") {
                    if (rankdata.totalNumber == 0) {
                        $("#nothelist").show();
                        $(".cont.backbg1").removeClass("backbg1");
                    } else {
                        $(".cont").addClass("backbg1");
                        $.each(rankdata.appraiseRankings, function (idx, n) {
                            var isDisplay = "block";
                            strHtml += " <div class=\"paix1  ranklistdiv" + (num1) + "\" onclick=\"ranklistBZ(" + (num1) + ");\">";
                            strHtml += " <div class=\"paix1t\">";
                            if ((idx + 1) < 4 && pageindex == 1) {
                                strHtml += "  <em class=\"new_top_em zw_top" + (num1) + "\">" + (num1) + "</em>";
                            } else {
                                isDisplay = "none";
                                strHtml += "  <em class=\"new_top_em zw_top_no\">" + (num1) + "</em>";
                            }
                            strHtml += " <div class=\"paixltc\">";
                            strHtml += " <span >" + n.makeName + "</span>";
                            strHtml += " <span>" + n.modelName + "</span>";
                            strHtml += " </div>";
                            strHtml += " <div class=\"paixltr\">";
                            strHtml += " <img src=\"" + n.modelPic + "\" data-makeid='" + n.makeId + "'  data-modelid='" + n.modelId + "' alt=\"\" id='ranklistimg" + (num1) + "' data-name='" + n.makeName + "' data-name2='" + n.modelName + "'" +
                                    " onerror='nofind(this)'"+
                                ">";
                            strHtml += " </div>";
                            strHtml += " </div>";
                            strHtml += " <div class=\"paix1b clearfix\" style='display:" + isDisplay + "'>";
                            strHtml += " <dl class=\"clearfix ranklisttable" + (num1) + "\" >";
                            $.each(n.detailList, function (idx1, n1) {
                                strHtml += " <dt>" + n1.residualRatio.toFixed(1) + "%</dt>";
                            });
                            strHtml += " </dl>";
                            strHtml += " <dl class=\"mt5\">";
                            strHtml += " <dd>第一年</dd>";
                            strHtml += " <dd>第二年</dd>";
                            strHtml += " <dd>第三年</dd>";
                            strHtml += " <dd>第四年</dd>";
                            strHtml += " <dd>第五年</dd>";
                            strHtml += " </dl>";
                            strHtml += " </div>";
                            strHtml += "</div>";
                            page++;
                            num1++;
                        });
                        $(".zwsy_div").hide();
                        $("#PageHistoryCar").html(strHtml).show();
                        // }
                    }
                } else {
                    if (rankdata.totalNumber == 0) {
                        $("#nothelist").show();
                    }
                }
            }
            else {
                $("#nothelist").show();
            }
        },
        error: function (errorMsg) {
        }
    });
}

function ranklistBZ(pid) {
    var str = [];
    var strYear = [];
    $(".ranklisttable" + pid + " dt").each(function () {
        str.push(parseFloat($(this).html()));
    });
    $(".baozhilvf").html(pid);
    if (pid > 3) {
        $(".baozhilvf").addClass("hui_top4");
    } else {
        if (pid == 1) {
            $(".baozhilvf").removeClass("hui_top4").removeClass("hui_top3").removeClass("hui_top2").addClass("hui_top1");
        }
        if (pid == 3) {
            $(".baozhilvf").removeClass("hui_top4").removeClass("hui_top1").removeClass("hui_top2").addClass("hui_top" + pid + "");
        }
        if (pid == 2) {
            $(".baozhilvf").removeClass("hui_top4").removeClass("hui_top3").removeClass("hui_top1").addClass("hui_top" + pid + "");
        }
    }
    $(".tan_img img").attr("src", $("#ranklistimg" + pid + "").attr("src"));
    var makeid = $("#ranklistimg" + pid + "").attr("data-makeid");
    var modelid = $("#ranklistimg" + pid + "").attr("data-modelid");
    var makename = $("#ranklistimg" + pid + "").attr("data-name");
    var modelname = $("#ranklistimg" + pid + "").attr("data-name2");
    $(".tan_tit span").html(makename);
    $(".tan_tit em").html(modelname);
    $(".sellcarlist").find("div a").html("查看在售 " + modelname);

    var urlSellCar = "/ershouche/cbeijing/MercedesBenz-benchiEji-j2-0-0-0-0-0-0-0t.html";
    $("#hdMakeId").val(makeid);
    $("#hdModelId").val(modelid);
    if (str.length > 0) {
        var myDate = new Date();
        var yearnum = myDate.getFullYear();
        // 指定图表的配置项和数据
        optionZhu = {
            baseOption: {
                tooltip: {
                    show: false
                },
                legend: {
                    show: false
                },
                grid: {
                    left: -20,
                    right: '3%',
                    top: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [(yearnum + 1) + "年", (yearnum + 2) + "年", (yearnum + 3) + "年", (yearnum + 4) + "年", (yearnum + 5) + "年"],
                        boundaryGap: true,
                        minInterval: 1,
                        axisTick: {show: false},
                        axisLine: {lineStyle: {color: '#ddd'}},
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#9e9a94'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {show: false},
                        axisLabel: {show: false},
                        axisLine: {show: false},
                        splitLine: {
                            lineStyle: {
                                color: '#ddd'
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        barWidth: 20,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}%',
                                position: 'top'
                            }
                        },
                        data: (function () {
                            return str;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        'rgb(104,174,245)', 'rgb(147,207,94)', 'rgb(255,213,46)', 'rgb(255,184,61)', 'rgb(255,129,121)', 'rgb(255,184,61)', 'rgb(255,129,121)'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }
                ]
            },
            media: [ // 这里定义了 media query 的逐条规则。
                {
                    query: {maxWidth: 360, minWidth: 200},                   // 这条里没有写规则，表示『默认』，
                    option: {
                        tooltip: {
                            show: false
                        },
                        legend: {
                            show: false
                        },
                        grid: {
                            left: -20,
                            right: '3%',
                            top: '15%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                minInterval: 1,
                                nameGap: 10,
                                splitLine: {show: false},
                                axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: '#9e9a94'
                                    }
                                },
                                axisTick: {show: false},
                                splitNumber: 5,
                                data: [(yearnum + 1) + "年", (yearnum + 2) + "年", (yearnum + 3) + "年", (yearnum + 4) + "年", (yearnum + 5) + "年"],
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitNumber: 5,
                                axisTick: {show: false},
                                axisLabel: {show: false},
                                axisLine: {show: false},
                                splitLine: {
                                    lineStyle: {
                                        color: '#ddd'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                type: 'bar',
                                barWidth: 20,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        formatter: function (data) {
                                            return data.value.toFixed(1) + "%";
                                        },
                                        fontSize: 12
                                    }
                                },
                                data: (function () {

                                    return str;
                                })(),
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                'rgb(104,174,245)', 'rgb(147,207,94)', 'rgb(255,213,46)', 'rgb(255,184,61)', 'rgb(255,129,121)', 'rgb(255,184,61)', 'rgb(255,129,121)'
                                            ];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        };
        $(".zhutushow").show();
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zhu'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(optionZhu);
    }
}

var Mobile_SelectModelLevel_v4 = function (DisplayModelLevel, SelectModelLevelId, hdModelLevelId, IsShowSelectAll) {
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
    var StrHtml = "<div class=\"posabs divTcSelectModelLevel\" style=\"z-index:21;\" >";
    StrHtml += "<header style=\"z-index:21\"><div class='per_tit'> <a href='javascript:void(0);' class='closemake' onclick=\"$('.divTcSelectModelLevel').parents('section').hide();\"><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>车型级别</span></div></header>";

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
        obj.ModelLevelDisplay.html(obj.strModelLevelTxt).addClass("col3");
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
