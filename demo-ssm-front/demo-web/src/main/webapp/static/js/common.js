/**
 * Created by zhanglj on 2016/12/5.
 */
/* 计算两日期相差的日期年月日等 */
Date.prototype.dateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
};
$.fn.DecimalTwo = function () {
    $(this).keyup(function (event) {
        var $amountInput = $(this);
        //响应鼠标事件，允许左右方向键移动
        event = window.event || event;
        if (event.keyCode == 37 | event.keyCode == 39) {
            return;
        }

        //先把非数字的都替换掉，除了数字和.
        $amountInput.val($amountInput.val().replace(/[^\d.]/g, "").//只允许一个小数点
        replace(/^\./g, "").replace(/\.{2,}/g, ".").//只能输入小数点后两位
        replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
        if ($amountInput.val().length > 7) {
            $amountInput.val($amountInput.val().substring(0, $amountInput.val().length - 1));
            return;
        }
    });
    $(this).blur(function () {
        var $amountInput = $(this);
        //最后一位是小数点的话，移除
        $amountInput.val(($amountInput.val().replace(/\.$/g, "")));

        if ($amountInput.val() != "" && $amountInput.val() != 'NaN') {
            $amountInput.val(parseFloat($amountInput.val()));
        } else {
            $amountInput.val("");
        }

    });
};
//选择车型：IsNewCar(1：新车，0旧车 2:能评估的车),DisplayCarId(被点击父标签Id),SelectId（展示列表父标签Id）,IsReverseDis(是否反选)
//IsShowSelectAll(true：显示全部品牌等 false:不显示全部),IsDisModel(true:显示车系false不显示),IsDisStyle(ture:显示车型,false不显示)
//车型选择
var Mobile_SelectCar_v1 = function (IsNewCar, DisplayCarId, SelectId, SearchSuggestId, IsReverseDis, IsShowSelectAll, IsDisModel, IsDisStyle) {

    this.CarDisplay = null;//点击触发事件的id
    this.CarSelect = null;//选择车型弹出框id

    this.IsReverseShow = true;//是否反选
    this.IsShowModel = true;//是否显示选择车系
    this.IsShowStyle = true;//是否显示选择车型

    this.carBrandIdHidden = null;
    this.carSerialIdHidden = null;
    this.carBasicIdHidden = null;
    this.carYearHidden = null;
    this.carNextYearHidden = null;

    this.strCarMakeId = "";
    this.strCarModelId = "";
    this.strCarStyleId = "";
    this.strCarYear = "";
    this.strNextCarYear = "";
    this.strMsrp = "";
    this.SearchSuggest = "";//搜索按钮点击事件

    this.defaultTxt = "品牌 车系 车型";

    this.CarselectText = "";
    this.CarMakeName = "";
    this.CarModelName = "";
    this.CarStyleName = "";

    this.ShowSelctAll = false;
    this.InSale = 0;
    var obj = this;
    this.CarDisplay = $("#" + DisplayCarId);
    this.CarSelect = $("#" + SelectId);
    this.SearchSuggest = $("#" + SearchSuggestId);//搜索按钮

    if (IsShowSelectAll != undefined) {
        obj.ShowSelctAll = IsShowSelectAll;
    }

    if (IsNewCar != undefined && IsNewCar != "") {
        //1：新车，0旧车 2:能评估的车
        obj.InSale = IsNewCar;
        if (obj.InSale == 0) {
            obj.EstimateParm = 0;
            obj.ProduceStatusParm = 0;
        }
        if (obj.InSale == 1) {
            obj.EstimateParm = 0;
            obj.ProduceStatusParm = 1;
        }
        if (obj.InSale == 2) {
            obj.EstimateParm = 1;
            obj.ProduceStatusParm = 0;
        }

    }
    if (IsReverseDis != undefined) {
        obj.IsReverseShow = IsReverseDis;
    }
    if (IsDisModel != undefined) {
        obj.IsShowModel = IsDisModel;
    }
    if (IsDisStyle != undefined) {
        obj.IsShowStyle = IsDisStyle;
    }
    var hgt = "0";//$(document).height();

    var StrHtml = "<div class=\"posabs divTcSelectMake\" style=\"z-index:21;\" ><header><div class='per_tit'> <a href='javascript:void(0);' class='closemake'><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>选择品牌</span><a class=\"per-titr searchMakeorModel\" href=\"javascript:;\"><i class=\"per_icon_tit\"></i></a></div></header> <div class=\"cont\"><div class=\"hotRe divHotMake clearfix\"></div><div class=\"jzgzlist backbgf mt10 xzpplist divTcdetailMake  z-1\" id='divMake' style=\"min-height:" + hgt + "px;\" ></div></div></div>";
    // <div class=\"head-l closemake\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\"></a></div><div class=\"head-r\"></div>
    if (obj.IsShowModel == true) {
        StrHtml += "<div class=\"posabs divTcSelectModel\" style=\"display:none;z-index:22;height:" + hgt + "px;\">";
        StrHtml += "<header style=\"z-index:22\"><div class='per_tit'> <a href='javascript:void(0);' class='closemodel'><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>选择车系</span><a class=\"per-titr searchMakeorModel\" href=\"javascript:;\"><i class=\"per_icon_tit\"></i></a></div></header>";
        // StrHtml+="<header style=\"z-index:22\"><div class=\"head-l closemodel\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div> <div class=\"head-c\"><a href=\"javascript:void(0);\">选择车系</a></div> <div class=\"head-r\"></div>  </header>";
        StrHtml += "<div class=\"cont\"> <div class=\"jzgzlist backbgf xzpplist cxlist divTcdetailModel \"   style=\"min-height:" + hgt + "px;\"></div></div></div>";
    }
    if (obj.IsShowStyle == true) {
        StrHtml += "<div class=\"posabs  divTcSelectStyle\" style=\"display:none;z-index:23;height:" + hgt + "px;\">";
        StrHtml += "<header style=\"z-index:23\"><div class='per_tit'> <a href='javascript:void(0);' class='closestyle'><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>选择车型</span><a class=\"per-titr searchMakeorModelOrStyle\" href=\"javascript:;\"><i class=\"per_icon_tit\"></i></a></div></header>";
        //StrHtml+="<header style=\"z-index:23\"><div class=\"head-l closestyle\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">选择车型</a></div><div class=\"head-r\"></div></header>";
        StrHtml += "<div class=\"cont\"><div class=\"jzgzlist backbgf xzpplist cxinglist divTcdetailStyle \" style=\"min-height:" + hgt + "px;\"></div></div></div>";
    }
    if (obj.CarSelect != null) {
        obj.CarSelect.html(StrHtml);
    }
    this.disScolltop = 0;
    this.initHidden = function (brandHiddenId, serialHiddenId, basicHiddenId, caryearHiddenId, nextCaryearHiddenId) {
        if (!!brandHiddenId) {
            this.carBrandIdHidden = $("#" + brandHiddenId);
            if ($.trim(obj.carBrandIdHidden.val()) != "" && Number(obj.carBrandIdHidden.val()) >= 0) {
                obj.strCarMakeId = $.trim(obj.carBrandIdHidden.val());
                obj.BindCarMake($.trim(obj.carBrandIdHidden.val()));
            } else {
                obj.BindCarMake();
            }
        }
        if (!!serialHiddenId) {
            this.carSerialIdHidden = $("#" + serialHiddenId);
            if ($.trim(obj.carSerialIdHidden.val()) != "" && Number($.trim(obj.carSerialIdHidden.val())) >= 0) {
                obj.strCarModelId = $.trim(obj.carSerialIdHidden.val());
                if (obj.IsShowModel == true) {
                    obj.BindCarModel($.trim(obj.carSerialIdHidden.val()));
                }
            }
        }
        if (!!nextCaryearHiddenId) {
            this.carNextYearHidden = $("#" + nextCaryearHiddenId);
        }
        if (!!caryearHiddenId) {
            this.carYearHidden = $("#" + caryearHiddenId);
            obj.strCarYear = $.trim(obj.carYearHidden.val());
        }

        if (!!basicHiddenId) {
            this.carBasicIdHidden = $("#" + basicHiddenId);
            if ($.trim(obj.carBasicIdHidden.val()) != "" && Number($.trim(obj.carBasicIdHidden.val())) >= 0) {
                obj.strCarStyleId = $.trim(obj.carBasicIdHidden.val());
                if (obj.IsShowStyle == true) {
                    obj.BindCarStyle($.trim(obj.carBasicIdHidden.val()));
                }
            }
        }

        if (obj.IsShowStyle == false) {
            if (obj.strCarMakeId != "" && obj.strCarModelId != "") {
                obj.FinishSelect(1);
            }
        }
        if (obj.IsShowModel == false) {
            if (obj.strCarMakeId != "") {
                obj.FinishSelect(1);
            }
        }
        if (obj.strCarMakeId != "" && obj.strCarModelId != "" && obj.strCarStyleId != "") {
            obj.FinishSelect(1);
        }
    }

    this.BindEvent = function () {
        obj.CarDisplay.click(function () {
            obj.selecttop1Hide();
            //alert(obj.IsReverseShow);
            if (!obj.IsReverseShow) {
                $("#divMake").show();
                if (obj.IsShowStyle == true) {
                    obj.CarSelect.find(".divTcSelectStyle").hide();
                    obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle .listyle").removeClass("xuanzhong");
                }
                if (obj.IsShowModel == true) {
                    obj.CarSelect.find(".divTcSelectModel").hide();
                    obj.CarSelect.find(".divTcSelectModel .divTcdetailModel  .limodel").removeClass("xuanzhong");
                }
                obj.CarSelect.find(".divTcSelectMake .divTcdetailMake .limake").removeClass("xuanzhong");
                obj.CarSelect.find('.divTcSelectMake').show();
            }
            if ($('body').scrollTop() != undefined) {
                obj.disScolltop = $('body').scrollTop();
            }
            // alert(obj.disScolltop);

            // obj.CarSelect.find('.divTcSelectMake').show();
            obj.CarSelect.show();
            if ($('body').scrollTop() != undefined) {
                $('body').scrollTop(0);
            }
        });
        obj.CarSelect.find(".closemake").click(function () {
            $(this).parents('.divTcSelectMake').parent('section').hide();
            obj.selecttop1Show();

        });
        obj.CarSelect.find(".closemodel").click(function () {
            obj.selecttop1Hide();
            $(this).parents('.divTcSelectModel').hide()
            obj.CarSelect.find('.divTcSelectMake').show();
            $("#divMake").show();
        });
        obj.CarSelect.find(".closestyle").click(function () {
            obj.selecttop1Hide();
            $(this).parents('.divTcSelectStyle').hide();
            obj.CarSelect.find('.divTcSelectModel').show();

        });

        obj.CarSelect.find(".searchMakeorModel").click(function () {
            obj.BindSearchSuggestClick();
        });
        //车型搜索点击按钮
        obj.CarSelect.find(".searchMakeorModelOrStyle").click(function () {

            obj.BindSearchSuggestClick(3);
        });

    }

    this.BindSearchSuggestClick = function (val) {
        if (val == 3) {
            obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle ").hide();
        }
        //搜索层展示
        $("#divMake").hide();
        //if( this.SearchSuggest!=null){
        obj.SearchSuggest.html(obj.BindSuggestCarHtml());

        $('form').on('submit', function (e) {
            // 不提交
            document.activeElement.blur();
            return false;
        });


        //alert($(document).height());
        obj.SearchSuggest.find(".ulcarsourlist").css("min-height", $(document).height());
        //取消搜索层
        obj.SearchSuggest.find(".labelCloseMakeOrModel").bind("click", function () {
            obj.SearchSuggest.hide();
            obj.CarSelect.show();
            $("#divMake").show();
            if (val == 3) {
                obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle ").show();
            }

        });
        //搜索调用事件

        obj.SearchSuggest.find(".txtkeyMakeOrModel").bind("input propertychange", function () {

            var gsName = obj.SearchSuggest.find(".txtkeyMakeOrModel").val(); //公司名称
            $(".search-lBtn").hide();
            if ($.trim(gsName) != "") {
                $(".search-lBtn").show();
                window.setTimeout(function () {
                    var newValue = gsName;
                    if ($.trim(newValue) == "") {
                        obj.clearSearchResultList();
                    } else if ($.trim(newValue) == $.trim(gsName)) {
                        obj.BindSuggestCarList(obj.InSale, $.trim(newValue));
                        if (val == 3) {
                            obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle ").hide();
                        }
                    }
                }, 800);
            } else {
                obj.clearSearchResultList();
            }
        });


        $(".search-lBtn").bind("click", function () {
            $(this).hide();
            $(".txtkeyMakeOrModel").val("");
            obj.SearchSuggest.find(".ulcarsourlist").html("");
            obj.clearSearchResultList();
            //obj.SearchSuggest.find(".ulcarsourlist").css("min-height", $(document).height());
        });
        obj.SearchSuggest.show();
    }

    this.clearSearchResultList = function () {
        obj.SearchSuggest.find(".ulcarsourlist").html("<div style='text-align: center;'>暂无搜索结果</div>");
        obj.SearchSuggest.find(".ulcarsourlist").css("min-height", $(document).height());
    }
    this.selecttop1Hide = function () {
        //第一个select隐藏
        $(".sectiontop1").hide();
    }
    this.selecttop1Show = function () {
        //第一个select隐藏
        $(".sectiontop1").show();
    }
    //搜索
    this.BindSuggestCarList = function (parms, sval) {
        var url = "/getMakeModelStyleAll/searchSuggestList";
        $.ajax({
            url: url,
            type: 'post',
            async: true,
            data: {parms: parms, searchName: sval},
            beforeSend: function () {
                $("#divMake").hide();
                obj.SearchSuggest.find(".ulcarsourlist").html("<div style='text-align: center;'>数据加载中，请稍后...</div>");
                obj.SearchSuggest.find(".ulcarsourlist").css("min-height", $(document).height());
                //alert($(document).height());
            },
            success: function (ptv_carbasicinfo) {
                //obj.SearchSuggest.find(".ulcarsourlist").css("min-height", 0);
                var makeOrModelStr = "";

                var data = JSON.parse(ptv_carbasicinfo);

                var datavalue = data;
                if (datavalue == null || datavalue == undefined || data.makeOrModelSearchDTO == undefined) {
                    obj.clearSearchResultList();
                } else {
                    datavalue = data.makeOrModelSearchDTO;
                    $.each(datavalue, function (ii, nn) {
                        makeOrModelStr += "<li  datamodelid=\"" + nn.modelId + "\" data=\"" + nn.groupName + "\" datamakeid=\"" + nn.makeId + "\" datamakename=\"" + nn.name + "\"  datamakename1='" + nn.makeName + "'><a href=\"javascript:void(0);\" ><span>" + nn.name + "</span></a></li>";
                    });
                    obj.SearchSuggest.find(".ulcarsourlist").html(makeOrModelStr);

                    obj.SearchSuggest.find(".ulcarsourlist").find("li").bind("click", function () {
                        var makeid = $(this).attr("datamakeid");
                        var modelid = $(this).attr("datamodelid");
                        if (makeid > 0) {
                            obj.strCarMakeId = makeid;
                            obj.strCarModelId = modelid;
                            obj.BindCarMake(makeid);
                            if (obj.IsShowModel) {//是否显示车系
                                obj.BindCarModel(modelid);
                                var mName = $(this).attr("datamakename1");
                                var mAllName = $.trim($(this).attr("datamakename"));
                                mAllName = $.trim(mAllName.replace(mName));
                                obj.CarMakeName = $.trim(mName);
                                obj.CarModelName = $.trim(mAllName).replace('undefined', '').replace(' ', '');
                            }
                            //obj.selecttop1Show();
                            if (modelid > 0) {
                                if (obj.IsShowStyle) {//是否显示车型
                                    obj.BindCarStyle();
                                } else {
                                    obj.FinishSelect();
                                    obj.selecttop1Show()
                                }
                            } else {
                                obj.strCarMakeId = makeid;
                                obj.CarMakeName = obj.CarMakeName;
                                obj.CarModelName = "";
                                obj.CarStyleName = "";
                                obj.BindCarMake(makeid);
                                obj.CarSelect.find(".closestyle").click();
                            }
                        }
                        obj.SearchSuggest.hide();

                    });
                }
            }
        });
    }
    this.BindCarMake = function (val) {
        var strNum = ['热', 'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
        ;
        var shallhtml = "";
        if (obj.ShowSelctAll) {
            shallhtml = " <a href=\"javascript:void(0);\" class=\"sltallmake\"><h3 class=\"list-tit1\">全部品牌</h3></a>	";
        }
        var pinpaiNum = "<div class=\"fixA bor-ra clearfix stlmakeNum\">";
        for (var n = 0; n < strNum.length; n++) {
            pinpaiNum += "<a href=\"javascript:void(0);\" data=\"" + strNum[n] + "\">" + strNum[n] + "</a>";

        }
        pinpaiNum += "</div>";

        var url = "";
        $.ajax({
            url: "/getMakeModelStyleAll/getMakeList",
            type: 'get',
            dataType: 'json',
            async: false,
            data: {isEst: obj.EstimateParm, produceStatus: obj.ProduceStatusParm},
            success: function (data) {
                obj.CarSelect.find(".divTcSelectMake .divHotMake").html(obj.BindCarHotMake());
                obj.CarSelect.find(".divTcSelectMake .divHotMake").find("li").click(function () {
                    // obj.CarSelect.find(".divTcdetailMake").find(".li").removeClass("xuanzhong");
                    // $(this).addClass("xuanzhong");
                    obj.strCarMakeId = $(this).attr("data");
                    obj.CarMakeName = $(this).find("span").html();
                    obj.CarModelName = "";
                    obj.CarStyleName = "";

                    if (obj.IsShowModel == true) {
                        obj.BindCarModel();
                    } else {
                        obj.FinishSelect();
                        obj.selecttop1Show();
                    }
                });
                eval(data);
                if (data == "") {
                    return;
                }
                //res = makeDataList.makeData;
                res = data.list;
                var Makehtml = "";
                for (var c in strNum) {

                    var JsonPPChar = res.filter(function (a) {
                        return a.groupName.toUpperCase() == strNum[c];
                    });
                    if (JsonPPChar.length > 0) {
                        Makehtml += "<h3 class=\"list-tit grouph3\" data=\"" + strNum[c] + "\">" + strNum[c] + "</h3><ul class=\"ulmake\">";
                        $.each(JsonPPChar, function (ii, nn) {
                            var picMake = nn.logoUrl;//"http://image.jingzhengu.com/Logo/Make/m_" + nn.Value + "_100.jpg";
                            Makehtml += " <li class=\"limake\" group=\"" + strNum[c] + "\" data=\"" + nn.makeId + "\"><a href=\"javascript:void(0);\"> <div class=\"carimg\"> <img src=\"" + picMake + "\" alt=\"\" onerror=\"nofind(this);\" /></div><span>" + $.trim(nn.makeName) + "</span></a>  </li>"
                        });
                        Makehtml += "</ul>";
                    }
                }
                //alert(Makehtml);

                obj.CarSelect.find(".divTcSelectMake .divTcdetailMake").html(shallhtml + Makehtml + pinpaiNum);
                obj.CarSelect.find(".divTcSelectMake .divTcdetailMake").find(".stlmakeNum a").bind("click", function () {
                    var top1 = obj.CarSelect.find(".divTcSelectMake .divTcdetailMake").find("h3[data='A']").position().top;
                    var hdhgt = obj.CarSelect.find(".divTcSelectMake .head-l").height(); //alert(hdhgt);
                    //obj.CarSelect.find(".divTcSelectMake .cont").scrollTop(0);
                    $('body').scrollTop(0);
                    if ($(this).html() == "热") {
                        var postiontop = obj.CarSelect.find(".divTcSelectMake .divHotMake").find("h3[data='" + $(this).html() + "']").position().top;
                        $('body').scrollTop(postiontop);
                    }
                    else {
                        var postiontop = obj.CarSelect.find(".divTcSelectMake .divTcdetailMake").find("h3[data='" + $(this).html() + "']").position().top;
                        $('body').scrollTop(postiontop);
                    }
                    //obj.CarSelect.find(".divTcSelectMake .cont").scrollTop(postiontop);
                });
                obj.CarSelect.find(".divTcSelectMake .divTcdetailMake").find(".limake").click(function () {
                    obj.CarSelect.find(".divTcdetailMake").find(".limake").removeClass("xuanzhong");
                    $(this).addClass("xuanzhong");

                    obj.strCarMakeId = $(this).attr("data");
                    obj.CarMakeName = $(this).find("span").html();
                    obj.CarModelName = "";
                    obj.CarStyleName = "";

                    if (obj.IsShowModel == true) {
                        obj.BindCarModel();
                    } else {
                        obj.FinishSelect();
                        obj.selecttop1Show();
                    }
                });


                if (val != undefined && Number(val) > 0) {
                    var $slt = obj.CarSelect.find(".divTcSelectMake .divTcdetailMake").find(".limake[data=\"" + val + "\"]");
                    obj.CarSelect.find(".divTcdetailMake").find(".limake").removeClass("xuanzhong");
                    $slt.addClass("xuanzhong");
                    obj.CarMakeName = $slt.find("span").html();
                    obj.CarModelName = "";
                    obj.CarStyleName = "";
                    // alert($slt.find("span").html());
                    // obj.FinishSelect(1);
                }
                if (obj.ShowSelctAll) {
                    obj.CarSelect.find(".divTcSelectMake .sltallmake").click(function () {
                        obj.CarSelect.find(".divTcdetailMake").find(".limake").removeClass("xuanzhong");
                        obj.strCarMakeId = "0";
                        obj.strCarStyleId = "0";
                        obj.strCarModelId = "0";
                        //obj.CarselectText = "全部品牌";
                        obj.CarMakeName = "全部品牌";
                        obj.CarModelName = "";
                        obj.CarStyleName = "";
                        obj.strCarYear = "";
                        obj.strMsrp = "";

                        obj.FinishSelect();
                        obj.selecttop1Show();
                    });
                }
            }

        });

    };
    this.BindCarModel = function (val) {
        obj.selecttop1Hide();
        if (obj.strCarMakeId != "" && obj.strCarMakeId > 0 && obj.IsShowModel == true) {
            //obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle ").show();
            var url = "/getMakeModelStyleAll/getModelList";
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                async: false,
                //data: {parms: obj.InSale, makeId: obj.strCarMakeId},
                data: {isEst: obj.EstimateParm, produceStatus: obj.ProduceStatusParm, makeId: obj.strCarMakeId},
                beforeSend: function () {
                    // $("#loadimg1").show();
                },
                success: function (ptv_carserial) {
                    //eval(ptv_carserial);
                    datavalue = ptv_carserial.list;
                    var list = "";
                    var listContentSec = "";
                    var groupNameList = new Array();
                    var hasGroupName = false;
                    var shallhtml = "";
                    if (obj.ShowSelctAll) {
                        shallhtml = "  <a href=\"javascript:void(0);\" class=\"sltallmodel\"><h3 class=\"list-tit1\">全部车系</h3></a>";
                    }
                    var picMake = "http://image.jingzhengu.com/Vehicle/logo/make/m" + obj.strCarMakeId + "100_301.jpg";
                    //var picMake = "http://image.jingzhengu.com/Logo/Make/m_" + obj.strCarMakeId + "_100.jpg";
                    if(obj.ShowSelctAll){
                        shallhtml += "<h3 class=\"list-img sltallmodel\"> <img src=\"" + picMake + "\" onerror=\"nofind(this);\" alt=\"\" /> <span class=\"list-imgtit\">" + obj.CarMakeName + "</span></h3>";
                    }else{
                        shallhtml += "<h3 class=\"list-img\"> <img src=\"" + picMake + "\" onerror=\"nofind(this);\" alt=\"\" /> <span class=\"list-imgtit\">" + obj.CarMakeName + "</span></h3>";

                    }

                    var map = {},
                        dest = [];
                    for (var i = 0; i < datavalue.length; i++) {
                        var ai = datavalue[i];
                        if (!map[ai.groupName]) {
                            dest.push({
                                groupName: ai.groupName,
                                heat: ai.heat,
                                imgUrl: ai.imgUrl,
                                modelId: ai.modelId,
                                modelName: ai.modelName,
                                data: [ai]
                            });
                            map[ai.groupName] = ai;
                        } else {
                            for (var j = 0; j < dest.length; j++) {
                                var dj = dest[j];
                                if (dj.groupName == ai.groupName) {
                                    dj.data.push(ai);
                                    break;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < dest.length; i++) {
                        var newModelList = dest[i].data;
                        if (newModelList != "") {
                            listContentSec += "<h3 class=\"list-tit\">" + dest[i].groupName + "</h3> <ul class=\"ulmodel\">{0}</ul>";
                            if (newModelList != "") {
                                list = "";
                                for (var j = 0; j < newModelList.length; j++) {
                                    if (newModelList[j].modelId != undefined) {
                                        list += " <li class=\"limodel\" data=\"" + newModelList[j].modelId + "\"><a href=\"javascript:void(0);\"> <span>" + $.trim(newModelList[j].modelName) + "</span></a>  </li>";
                                    }
                                }
                            }
                        }
                        listContentSec = listContentSec.replace("{0}", list);
                    }

                    obj.CarSelect.find(".divTcSelectModel .divTcdetailModel").html(shallhtml + listContentSec).css("min-height", hgt);
                    obj.CarSelect.find(".divTcSelectMake").hide();
                    obj.CarSelect.find(".divTcSelectModel").show();
                    if ($('body').scrollTop() != undefined) {
                        $('body').scrollTop(0);
                    }


                    obj.CarSelect.find(".divTcSelectModel .divTcdetailModel").find(".limodel").click(function () {

                        obj.CarSelect.find(".divTcSelectModel  .divTcdetailModel .limodel").removeClass("xuanzhong");
                        $(this).addClass("xuanzhong");


                        obj.strCarModelId = $(this).attr("data");
                        obj.CarModelName = $(this).find("span").html();
                        obj.CarStyleName = "";

                        if (obj.IsShowStyle == true) {
                            obj.BindCarStyle();
                        } else {
                            obj.FinishSelect();
                            obj.selecttop1Show();
                        }
                    });


                    if (obj.ShowSelctAll) {
                        obj.CarSelect.find(".divTcSelectModel .divTcdetailModel").find(".sltallmodel").click(function () {
                            obj.CarSelect.find(".divTcSelectModel  .divTcdetailModel .limodel").removeClass("xuanzhong");
                            obj.strCarStyleId = "0";
                            obj.strCarModelId = "0";
                            obj.strCarYear = "";
                            obj.strMsrp = "";
                            obj.CarModelName = "";
                            obj.CarStyleName = "";

                            obj.FinishSelect();
                            obj.selecttop1Show();
                        });
                    }
                    if (val != undefined) {
                        if (Number(val) > 0) {
                            var $slt = obj.CarSelect.find(".divTcSelectModel .divTcdetailModel").find(".limodel[data=\"" + val + "\"]");
                            obj.CarSelect.find(".divTcSelectModel  .divTcdetailModel .limodel").removeClass("xuanzhong");
                            $slt.addClass("xuanzhong");

                            obj.CarModelName = $slt.find("span").html();
                            obj.CarStyleName = "";
                            //obj.FinishSelect(1);
                        }
                        else if (Number(val) == 0) {
                            obj.CarStyleName = "";
                            obj.CarSelect.find(".divTcSelectModel  .divTcdetailModel .limodel").removeClass("xuanzhong");
                        }
                    }
                }
            });
        }
        ;

    }
    this.BindCarStyle = function (val) {
        if (obj.strCarModelId != "" && obj.strCarModelId > 0 && obj.IsShowStyle == true) {
            var url = "/getMakeModelStyleAll/getStyleList";
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                async: false,
                //data: {parms: obj.InSale, modelId: obj.strCarModelId},
                data: {isEst: obj.EstimateParm, produceStatus: obj.ProduceStatusParm, modelId: obj.strCarModelId},
                success: function (ptv_carbasicinfo) {
                    if (ptv_carbasicinfo == "") {
                        alert("此车系暂无对应车型数据");
                        return;
                    }
                    // var data = JSON.parse(ptv_carbasicinfo);
                    // var datavalue = data.styleData;
                    var datavalue = ptv_carbasicinfo.list;
                    var list = "";
                    var listContentSec = "";
                    var groupNameList = new Array();
                    var hasGroupName = false;
                    var shallhtml = "";
                    if (obj.ShowSelctAll) {
                        shallhtml = "<a href=\"javascript:void(0);\"><h3 class=\"list-tit1 sltallstyle\">全部车型</h3></a>"
                    }

                    if (datavalue != "") {
                        for (var i = 0; i < datavalue.length; i++) {
                            hasGroupName = false;
                            for (var j = 0; j < groupNameList.length; j++) {
                                if (groupNameList[j] == datavalue[i].styleYear) {
                                    hasGroupName = true;
                                }
                            }
                            if (!hasGroupName) {
                                groupNameList.push(datavalue[i].styleYear);
                                //可编辑部分
                                listContentSec += "<h3 class=\"list-tit\">" + datavalue[i].styleYear + "</h3> <ul class=\"ulstyle\" data=\"" + $.trim(datavalue[i].styleYear.replace("款", '')) + "\">{0}</ul>"
                                if (i != 0)
                                    listContentSec = listContentSec.replace("{0}", list);
                                list = "";
                            }
                            list += " <li class=\"listyle\"   msrp='" + datavalue[i].mSRP + "' data='" + datavalue[i].styleId + "' styyear=\"" + $.trim(datavalue[i].styleYear.replace("款", '')) + "\"  stynextyear=\"" + $.trim(datavalue[i].nextYear) + "\"><a href=\"javascript:void(0);\" > <span>" + $.trim(datavalue[i].styleName) + "</span></a>  </li>";

                        }
                        listContentSec = listContentSec.replace("{0}", list);
                    }
                    //alert(listContentSec);
                    //obj.CarSelect.css('width', "708px");
                    obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle ").html(shallhtml + listContentSec).css("min-height", $(document).height());
                    obj.CarSelect.find('.divTcSelectModel').hide();
                    obj.CarSelect.find(".divTcSelectStyle").show();
                    obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle").show();
                    if ($('body').scrollTop() != undefined) {
                        $('body').scrollTop(0);
                    }


                    obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle ").find(".listyle").click(function () {
                        obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle .listyle").removeClass("xuanzhong");
                        $(this).addClass("xuanzhong");
                        obj.strCarStyleId = $(this).attr("data");
                        obj.strCarYear = $(this).attr("styyear");
                        obj.strNextCarYear = $(this).attr("stynextyear");
                        obj.strMsrp = $(this).attr("msrp");
                        //alert( $(this).attr("styyear"));
                        //obj.GetNextCarYear();
                        obj.CarStyleName = $(this).attr("styyear") + "款 " + $(this).find("span").html();
                        //obj.CarStyleName = $(this).find("span").html();
                        obj.FinishSelect();
                        obj.selecttop1Show();
                    });

                    if (obj.ShowSelctAll) {
                        obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle").find(".sltallstyle").click(function () {
                            obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle .listyle").removeClass("xuanzhong");
                            obj.strCarStyleId = "0";
                            obj.strCarYear = "";
                            obj.strMsrp = "";
                            obj.strNextCarYear = "";
                            obj.CarStyleName = "";

                            obj.FinishSelect();
                            obj.selecttop1Show();

                        });
                    }
                    if (val != undefined) {
                        if (Number(val) > 0) {
                            var $slt = obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle .listyle[data=\"" + val + "\"]");
                            obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle .listyle").removeClass("xuanzhong");
                            $slt.addClass("xuanzhong");

                            obj.strCarYear = $slt.attr("styyear");
                            obj.strNextCarYear = $slt.attr("stynextyear");
                            obj.strMsrp = $slt.attr("msrp");
                            //obj.GetNextCarYear();
                            obj.CarStyleName = $slt.attr("styyear") + "款 " + $slt.find("span").html();
                            //obj.CarStyleName = $slt.find("span").html();
                            // obj.FinishSelect();
                            if (obj.IsShowStyle) {
                                obj.CarselectText = $.trim(obj.CarMakeName + obj.CarModelName.replace($.trim(obj.CarMakeName.replace("·", "")), "") + " " + obj.CarStyleName);
                                obj.CarDisplay.html(obj.CarselectText).addClass("col3");//.siblings("i").hide();
                            }

                        }
                        else if (Number(val) == 0) {
                            obj.CarStyleName = "";
                            obj.CarSelect.find(".divTcSelectStyle .divTcdetailStyle .listyle").removeClass("xuanzhong");
                        }
                    }
                }
                // }
            });
        }
        //obj.selecttop1Show();

    };

    this.BindCarHotMake = function () {
        var arrHotMake = [{"makeId": "8", "makeName": "大众", "GroupName": "D"}, {
            "makeId": "2",
            "makeName": "奔驰",
            "GroupName": "B"
        }, {"makeId": "3", "makeName": "宝马", "GroupName": "B"}
            , {"makeId": "9", "makeName": "奥迪", "GroupName": "A"}, {
                "makeId": "7",
                "makeName": "丰田",
                "GroupName": "F"
            }, {"makeId": "26", "makeName": "本田", "GroupName": "B"}
            , {"makeId": "17", "makeName": "福特", "GroupName": "F"}, {
                "makeId": "127",
                "makeName": "别克",
                "GroupName": "B"
            }];
        var hotHtml = "";
        hotHtml = " "
        hotHtml += "<h3 class=\"list-tit list-titH36\" data='热'>热门品牌</h3>";
        hotHtml += "<ul class=\"hotRe-ul\">";
        for (var i = 0; i < arrHotMake.length; i++) {
            hotHtml += "<li data=\"" + arrHotMake[i]['makeId'] + "\" group=\"" + arrHotMake[i]['GroupName'] + "\">";
            hotHtml += "<img class=\"hotRe-img\" src=\"http://image.jingzhengu.com/Vehicle/logo/make/m" + arrHotMake[i]['makeId'] + "100_301.jpg\" alt=\"\" />";
            hotHtml += "<span class=\"hotRe-txt\">" + arrHotMake[i]['makeName'] + "</span>";
            hotHtml += "</li>";
        }
        hotHtml += "</ul>";
        hotHtml += "";
        return hotHtml;
    }
    this.FinishSelect = function (flag) {
        if (obj.CarMakeName == "全部品牌") {
            obj.CarselectText = "全部品牌";
        } else if (obj.CarModelName == "全部车系") {
            obj.CarselectText = obj.CarMakeName;
        } else if (obj.CarStyleName == "全部车型") {
            obj.CarselectText = $.trim(obj.CarMakeName + obj.CarModelName.replace($.trim(obj.CarMakeName.replace("·", "")), ""));
        } else if (obj.CarMakeName != "") {

            obj.CarselectText = $.trim(obj.CarMakeName + obj.CarModelName.replace($.trim(obj.CarMakeName.replace("·", "")), "") + " " + obj.CarStyleName);
        }
        if ($.trim(obj.CarselectText) != "") {
            obj.CarDisplay.html(obj.CarselectText).attr("msrp", obj.strMsrp).addClass("col3");//.siblings("i").hide();
        }

        if (obj.carYearHidden != null && obj.strCarYear != "") {
            obj.carYearHidden.val(obj.strCarYear);
        }
        if (obj.carNextYearHidden != null && obj.strNextCarYear != "") {
            obj.carNextYearHidden.val(obj.strNextCarYear);
        }
        if (flag == undefined) {
            obj.carBrandIdHidden.val(obj.strCarMakeId);
            if (obj.carSerialIdHidden != null) {
                obj.carSerialIdHidden.val(obj.strCarModelId);
            }
            if (obj.carBasicIdHidden != null) {
                obj.carBasicIdHidden.val(obj.strCarStyleId);
            }
            if (obj.carYearHidden != null) {
                obj.carYearHidden.val(obj.strCarYear);
            }
            if (obj.carNextYearHidden != null) {
                obj.carNextYearHidden.val(obj.strNextCarYear);
            }
            obj.CarSelect.hide();
            //alert(obj.disScolltop);
            if ($('body').scrollTop() != undefined) {
                $('body').scrollTop(obj.disScolltop);
            }

        }

        obj.AfterSelectCar();
    };

    this.BindSuggestCarHtml = function (val) {
        var SuggestHtml = "";
        SuggestHtml += "<div class=\"cont\">";
        SuggestHtml += "<div class=\"search\">";
        SuggestHtml += "<div class=\"search-l\">";
        SuggestHtml += "<form action='#'><input class=\"search-inp inp198 txtkeyMakeOrModel\" autofocus='autofocus' name='search' type=\"search\" value=\"\" placeholder=\"请输入汽车品牌、型号、或拼音\" autocomplete='off'></form>";
        SuggestHtml += "<div class=\"search-lBtn\"></div>";
        SuggestHtml += "</div>";
        SuggestHtml += "<div class=\"search-r labelCloseMakeOrModel\">取消</div>";
        SuggestHtml += "</div>";
        SuggestHtml += "<div class=\"jzgzlist z-3\">";
        SuggestHtml += "<ul class=\"zcx_ul ulcarsourlist\" >";
        SuggestHtml += "</ul>";
        SuggestHtml += "</div>";
        SuggestHtml += "</div>";
        return SuggestHtml;
    }

    this.AfterSelectCar = function () {
    };
    this.BindEvent();
};
//上牌时间

var Mobile_SelectDate_v1 = function (DisplayData, SelectDataId, mindate, maxdate, isshowExpersion, IsReverseDis, type) {


    /*模拟下拉框弹出层对象*/
    this.dataDisplay = null;
    this.dataSelect = null;

    this.defaultText = "请选择上牌年份";


    this.displayText = "";
    this.displayYearId = "";
    this.displayMonthId = "";
    this.displayDistrictId = "";
    this.displayYearName = "";
    this.displayMonthName = "";
    this.displayDistrictName = "";


    this.HiddenYear = null;
    this.HiddenMonth = null;
    this.HiddenDistrict = null;
    this.isShowSelectAll = false;
    this.isShowCity = true;
    this.isShowDistrict = false;
    this.IsReverseShow = true;//是否反选
    this.isOutProvName = true;//是否输出省份名称


    this.maxDateYear = new Date().getFullYear();
    this.maxDateMonth = new Date().getMonth();
    this.minDateYear = "1990";
    this.minDateMonth = "1";

    this.Type = "";
    if (!!mindate) {
        if (mindate != "" && mindate != undefined && mindate != null) {
            var dat = mindate.split("/");
            if (dat[1] == "0") {
                this.minDateYear = parseInt(dat[0]) - 1;
                this.minDateMonth = 12;
            } else {
                var datemin = new Date(Date.parse(mindate));
                if (datemin != null) {
                    this.minDateYear = datemin.getFullYear();
                    this.minDateMonth = datemin.getMonth() + 1;

                }
            }
        }
    }
    if (!!maxdate) {
        if (maxdate != "" && maxdate != null && maxdate != undefined) {
            var dt = maxdate.split("/");
            if (dt[1] == "0") {
                this.maxDateYear = parseInt(dt[0]) - 1;
                this.maxDateMonth = 12;
            } else {
                var datemax = new Date(Date.parse(maxdate));

                if (datemax != null) {
                    this.maxDateYear = datemax.getFullYear();
                    if (isshowExpersion != undefined && isshowExpersion == true) {
                        this.maxDateMonth = 12;
                        this.isShowExpersion = isshowExpersion;

                    } else {
                        this.maxDateMonth = datemax.getMonth() + 1;

                    }
                }
            }
        }
    }
    if (isshowExpersion != undefined) {
        this.isShowExpersion = isshowExpersion;

    }

    if (!!DisplayData) {
        this.dataDisplay = $("#" + DisplayData);
    }
    if (!!SelectDataId) {
        this.dataSelect = $("#" + SelectDataId);
    }

    if (IsReverseDis != undefined) {
        this.IsReverseShow = IsReverseDis;
    }

    if (type != undefined) {
        this.Type = type;
    }

    var obj = this;
    var hgt = "0";//$(document).height()
    this.disScolltop = 0;
    var TypeTitle = "上牌年份";
    var TypeDesc = "上牌月份";
    if (obj.Type == "1") {
        TypeTitle = "选择年份";
        TypeDesc = "选择月份";
    }
    var StrHtml = "<div class=\"posabs divTcSelectYear\" style=\"z-index:21;\" >";
    StrHtml += "<header style=\"z-index:21\"><div class='per_tit'> <a href='javascript:void(0);' class='closeyear' ><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>" + TypeTitle + "</span></div></header>";
    // StrHtml+="<header><div class=\"head-l closeyear\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">" + TypeTitle + "</a></div><div class=\"head-r\"></div></header>";
    StrHtml += "<div class=\"cont\"><div class=\"jzgzlist backbgf xzpplist divTcdetailYear  z-1\" style=\"min-height:" + hgt + "px;\" ></div></div></div>";
    if (obj.isShowCity == true) {
        StrHtml += "<div class=\"posabs divTcSelectMonth\" style=\"display:none;z-index:22;height:" + hgt + "px;\">";
        StrHtml += "<header style=\"z-index:22\"><div class='per_tit'> <a href='javascript:void(0);' class='closeMonth' ><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>" + TypeDesc + "</span></div></header>";

        //StrHtml+="<header style=\"z-index:22\"><div class=\"head-l closeMonth\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div> <div class=\"head-c\"><a href=\"javascript:void(0);\">" + TypeDesc + "</a></div> <div class=\"head-r\"></div>  </header>";
        StrHtml += "<div class=\"cont\"> <div class=\"jzgzlist backbgf xzpplist cxlist divTcdetailMonth\"   style=\"min-height:" + hgt + "px;\"></div></div></div>"
    }

    if (obj.dataSelect != null) {
        obj.dataSelect.html(StrHtml);
    }
    this.initHidden = function (hdProvId, hdCityId_Ks) {

        if (!!hdProvId) {
            this.HiddenYear = $("#" + hdProvId);
            if (this.HiddenYear.val() != "") {
                this.BindYear($.trim(this.HiddenYear.val()));
            } else {
                this.BindYear();
            }
        }
        if (!!hdCityId_Ks) {
            this.HiddenMonth = $("#" + hdCityId_Ks);
            if (this.isShowCity) {
                if (this.HiddenMonth.val() != "") {
                    this.BindMonth($.trim(this.HiddenMonth.val()));
                }
            }
        }

        if (this.isShowCity == false) {
            if ($.trim(this.displayYearId) != "" && Number($.trim(this.displayYearId)) >= 0) {
                this.FinishSelect(1);
            }
        }
        if (this.isShowCity == true && this.isShowDistrict == false) {
            //  alert($.trim(this.displayMonthId) != "");
            if ($.trim(this.displayYearId) != "" && $.trim(this.displayMonthId) != "" && Number($.trim(this.displayYearId)) >= 0 && Number($.trim(this.displayMonthId)) >= 0) {
                this.FinishSelect(1);
            }
        }
        if (this.isShowCity == true && this.isShowDistrict == true) {
            if ($.trim(this.displayYearId) != "" && $.trim(this.displayMonthId) != "" && $.trim(this.displayDistrictId) != "" && Number($.trim(this.displayYearId)) >= 0 && Number($.trim(this.displayMonthId)) >= 0 && Number($.trim(this.displayDistrictId)) >= 0) {
                this.FinishSelect(1);
            }
        }
    };
    //alert(hgt);
    this.BindEvent = function () {
        obj.dataDisplay.click(function () {
            //alert(obj.IsReverseShow);
            if (!obj.IsReverseShow) {

                if (obj.isShowCity == true) {
                    obj.dataSelect.find(".divTcSelectMonth").hide();
                    obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth  .liscity").removeClass("xuanzhong");
                }
                obj.dataSelect.find(".divTcSelectYear .divTcdetailYear .liyear").removeClass("xuanzhong");
            }
            obj.disScolltop = $('body').scrollTop();
            obj.dataSelect.find('.divTcSelectYear').show();
            obj.dataSelect.show();
            $('body').scrollTop(0);
            $(".sectiontop1").hide();
        });
        obj.dataSelect.find(".closeyear").click(function () {
            $(this).parents('.divTcSelectYear').parent('section').hide();
            $(".sectiontop1").show();

        });
        obj.dataSelect.find(".closeMonth").click(function () {
            $(this).parents('.divTcSelectMonth').hide()
            obj.dataSelect.find('.divTcSelectYear').show();

        });
        obj.dataSelect.find(".closeDist").click(function () {
            $(this).parents('.divTcSelectDist').hide();
            obj.dataSelect.find('.divTcSelectMonth').show();

        });
    }
    this.BindYear = function (val) {

        var strYearhtml = "";
        if (obj.isShowSelectAll) {
            strYearhtml += "";
        }
        strYearhtml += "<ul class=\"ulyear\"> ";
        if (obj.isShowExpersion) {
            strYearhtml += "<li  class=\"liyear\" data=\"-1\"><a href=\"javascript:void(0);\"> <span>已过期</span></a>  </li>  ";
        }

        for (var i = obj.minDateYear; i <= obj.maxDateYear; i++) {
            strYearhtml += "<li  class=\"liyear\" data=\"" + i + "\"><a href=\"javascript:void(0);\"> <span>" + i + "年</span></a>  </li>  ";
        }
        strYearhtml += "</ul>"


        obj.dataSelect.find(".divTcSelectYear .divTcdetailYear").html(strYearhtml);//;.css("min-height", $(document).height());
        obj.dataSelect.find(".divTcSelectYear").show();

        obj.dataSelect.find(".divTcSelectYear .divTcdetailYear").find(".liyear").click(function () {
            //if (obj.isShowExpersion) {
            //    obj.FinishSelect();
            //    //新增加

            //} else {

            obj.dataSelect.find(".divTcSelectYear .divTcdetailYear  .liyear").removeClass("xuanzhong");
            $(this).addClass("xuanzhong");
            obj.displayYearId = $(this).attr("data");
            obj.displayMonthId = "";
            obj.displayDistrictId = "";
            obj.displayYearName = $(this).find("span").html();
            obj.displayMonthName = "";

            if (obj.isShowCity == false) {
                obj.FinishSelect();
            }
            else {
                if ($(this).attr("data") == "-1") {
                    obj.displayYearId = "1900";
                    obj.displayMonthId = "01";
                    obj.HiddenMonth.val("01");
                    obj.HiddenYear.val("1900");
                    obj.dataDisplay.html("已过期").addClass("col3").siblings("i").hide();
                    obj.FinishSelect();
                } else {
                    obj.BindMonth();
                }
            }
            //}
        });


        if (val != undefined && Number(val) > 0) {

            var $lt = obj.dataSelect.find(".divTcSelectYear .divTcdetailYear  .liyear[data=\"" + val + "\"]");
            if ($lt.length > 0) {
                obj.dataSelect.find(".divTcSelectYear .divTcdetailYear  .liyear").removeClass("xuanzhong");
                $lt.addClass("xuanzhong");

                obj.displayYearId = val;
                obj.displayYearName = $lt.find("span").html();
            }
            if (val == 0) {
                obj.dataSelect.find(".divTcSelectYear .divTcdetailYear  .liyear").removeClass("xuanzhong");
            }
        }

    };

    this.BindMonth = function (val) {

        if (obj.displayYearId > 0 && obj.isShowCity == true) {

            var hdyear = obj.displayYearId;
            var minmonth = 1;
            var maxmonth = 12;
            if (hdyear != "" && hdyear > 0) {
                if (Number(hdyear) == Number(obj.minDateYear)) {
                    minmonth = obj.minDateMonth;
                }
                if (Number(hdyear) == Number(obj.maxDateYear)) {
                    maxmonth = obj.maxDateMonth;
                }
            }
            var strhtml = " ";
            if (obj.isShowSelectAll) {
                strhtml += "";
            }
            strhtml += "<ul class=\"ulcity\"> ";
            for (var j = minmonth; j <= maxmonth; j++) {
                strhtml += "<li  class=\"limonth\" data=\"" + j + "\"><a href=\"javascript:void(0);\"> <span>" + j + "月</span></a>  </li>  ";
            }

            strhtml += "</ul>"
            obj.dataSelect.find(".divTcSelectYear").hide();

            obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth").html(strhtml);//.css("min-height", $(document).height());
            obj.dataSelect.find(".divTcSelectMonth").show();
            $('body').scrollTop(0);

            obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth").find(".limonth").click(function () {
                obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth .limonth").removeClass("xuanzhong");
                $(this).addClass("xuanzhong");

                obj.displayMonthId = $(this).attr("data");
                obj.displayDistrictId = "";
                obj.displayMonthName = $(this).find("span").html();


                if (obj.isShowDistrict == false) {
                    obj.FinishSelect();
                }
                if (Number($(this).attr("data")) > 0 && obj.isShowDistrict == true) {
                    obj.BindDistrict();
                }
                $(".sectiontop1").show();
            });
            if (obj.isShowSelectAll) {
                obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth").find(".sltallCity").click(function () {

                    obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth  .limonth").removeClass("xuanzhong");
                    obj.displayMonthId = "0";
                    obj.displayMonthName = "";
                    obj.FinishSelect();
                });
            }
            //alert(val);
            if (val != undefined && Number(val) >= 0) {

                var $lt = obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth .limonth[data=\"" + val + "\"]");
                if ($lt.length > 0) {
                    obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth .limonth").removeClass("xuanzhong");
                    $lt.addClass("xuanzhong");

                    obj.displayMonthId = val;
                    obj.displayMonthName = $lt.find("span").html();
                }

                if (val == 0) {
                    obj.dataSelect.find(".divTcSelectMonth .divTcdetailMonth .limonth").removeClass("xuanzhong");
                }
            }
        }
    };

    this.FinishSelect = function (flag) {

        if (obj.displayYearName == "上牌年份") {
            obj.displayText = "上牌年份";
        } else if (obj.displayMonthName == "上牌月份") {
            obj.displayText = obj.displayYearName;
        } else if (obj.displayDistrictName == "全部区县") {

            if (obj.displayYearName == obj.displayYearName) {
                obj.displayText = obj.displayYearName;
            } else {
                obj.displayText = obj.displayYearName + " " + obj.displayMonthName;
            }
            if (!obj.isOutProvName) {
                obj.displayText = obj.displayMonthName;
            }
        } else if (obj.displayYearName != "") {

            obj.displayText = obj.displayYearName + ((obj.displayMonthName == obj.displayYearName) ? "" : " " + obj.displayMonthName) + " " + obj.displayDistrictName;
            if (!obj.isOutProvName) {
                obj.displayText = obj.displayMonthName + " " + obj.displayDistrictName;
            }
        }
        //alert(obj.displayText);
        if (obj.displayText != "") {
            obj.dataDisplay.html($.trim(obj.displayText)).addClass("col3");//.siblings("i").hide();
        }
        if (flag == undefined) {
            obj.HiddenYear.val(obj.displayYearId);
            if (obj.HiddenMonth != null) {
                obj.HiddenMonth.val(obj.displayMonthId);
            }
            if (obj.HiddenDistrict != null) {
                obj.HiddenDistrict.val(obj.displayDistrictId);
            }
            obj.dataSelect.hide();
            $('body').scrollTop(obj.disScolltop);
        }

        obj.AfterSelectData();
    };
    this.AfterSelectData = function () {
    };
    this.BindEvent();

}

var Mobile_SelectCity_v1 = function (DisplayArea, SelectAreaId, IsReverseDis, IsShowSelectAll, IsShowPostion) {

    /*模拟下拉框弹出层对象*/
    this.cityDisplay = null;
    this.divdwCitySelect = null;

    this.defaultText = "请选择城市";


    this.displayText = "";
    this.displayProvId = "";
    this.displayCityId = "";

    this.displayCityName = "";


    this.HiddenProvence = null;
    this.HiddenCity = null;

    this.isShowSelectAll = false;

    this.IsReverseShow = true;//是否反选

    this.IsShowPos = true;//是否显示定位

    if (!!DisplayArea) {
        this.cityDisplay = $("#" + DisplayArea);
    }
    if (!!SelectAreaId) {
        this.divdwCitySelect = $("#" + SelectAreaId);
    }

    if (IsReverseDis != undefined) {
        this.IsReverseShow = IsReverseDis;
    }
    if (IsShowSelectAll != undefined) {
        this.isShowSelectAll = IsShowSelectAll;
    }
    if (IsShowPostion != undefined) {
        this.IsShowPos = IsShowPostion;
    }

    var obj = this;
    var hgt = $(document).height()
    this.disScolltop = 0;
    var StrHtml = "<div class=\"posabs divTcSelectDwCity\" style=\"z-index:21;\" >";
    StrHtml += "<header style=\"z-index:22\"><div class='per_tit'> <a href='javascript:void(0);' class='closedwcity' ><i class='per_icon_tit jtx'></i></a><span class='per_tit_span'>选择城市</span></div></header>";

    //StrHtml+="<header><div class=\"head-l closedwcity\" ><span class=\"ico1\"></span><label class=\"icowz\">返回</label></div><div class=\"head-c\"><a href=\"javascript:void(0);\">选择城市</a></div><div class=\"head-r\"></div></header>";
    StrHtml += "<div class=\"cont\"><div class=\"jzgzlist backbgf xzpplist divTcDwdetailCity  z-1\" style=\"min-height:" + hgt + "px;\" ></div></div></div>";


    if (obj.divdwCitySelect != null) {
        obj.divdwCitySelect.html(StrHtml);
    }
    this.initHidden = function (hdProvId, hdCityId_Ks) {
        if (!!hdProvId) {
            this.HiddenProvence = $("#" + hdProvId);
        }
        if (!!hdCityId_Ks) {
            this.HiddenCity = $("#" + hdCityId_Ks);

            if (this.HiddenCity.val() != "") {
                this.BindDWCity($.trim(this.HiddenCity.val()));
            } else {
                this.BindDWCity();
            }
        }
    };
    //alert(hgt);
    this.BindEvent = function () {

        obj.cityDisplay.click(function () {
            //alert(obj.IsReverseShow);
            if (!obj.IsReverseShow) {
                obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity .lidwcity").removeClass("xuanzhong");
            }
            obj.disScolltop = $('body').scrollTop();
            obj.divdwCitySelect.find('.divTcSelectDwCity').show();
            obj.divdwCitySelect.show();
            $('body').scrollTop(0);
            obj.GpsShowPosition();
        });
        obj.divdwCitySelect.find(".closedwcity").click(function () {
            $(this).parents('.divTcSelectDwCity').parent('section').hide()

        });

    }
    this.BindDWCity = function (val) {

        var strNum = ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
        ;
        var HtmlNum = "<div class=\"fixA bor-ra clearfix citygroupNum\">";
        for (var n = 0; n < strNum.length; n++) {
            HtmlNum += "<a href=\"javascript:void(0);\" data=\"" + strNum[n] + "\">" + strNum[n] + "</a>";
        }
        HtmlNum += "</div>";

        $.ajax({
            url: '/areacity/citylist',
            type: 'post',
            dataType: 'json',
            async: false,
            success: function (res) {
                var strProHtml = "";
                if (obj.IsShowPos) {
                    strProHtml = "<div class=\"zdwcs btnGpsdw\"><span class=\"zdw_spn1\">定位城市</span><span class='spdwz' style='display: none;'>定位中...</span></div> ";
                }
                //strProHtml += "<a href=\"javascript:void(0);\" class=\"sltallProv\"><h3 class=\"list-tit1\">全部地区</h3></a>";
                strProHtml += "<h3 class=\"list-tit grouph3\" data=\"热\">热门城市</h3><ul class=\"uldwcity\">";

                if (obj.isShowSelectAll) {
                    strProHtml += "<li  class=\"lidwcity\" prodata=\"0\" data=\"0\"><a href=\"javascript:void(0);\"> <span>全国</span></a>  </li>  ";
                }
                strProHtml += "<li  class=\"lidwcity\" prodata=\"2\" data=\"201\"><a href=\"javascript:void(0);\"> <span>北京</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"30\" data=\"3001\"><a href=\"javascript:void(0);\"> <span>杭州</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"15\" data=\"1501\"><a href=\"javascript:void(0);\"> <span>南京</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"5\" data=\"501\"><a href=\"javascript:void(0);\"> <span>广州</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"10\" data=\"1001\"><a href=\"javascript:void(0);\"> <span>郑州</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"21\" data=\"2101\"><a href=\"javascript:void(0);\"> <span>济南</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"17\" data=\"1701\"><a href=\"javascript:void(0);\"> <span>沈阳</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"22\" data=\"2201\"><a href=\"javascript:void(0);\"> <span>太原</span></a>  </li>  ";
                strProHtml += "<li  class=\"lidwcity\" prodata=\"9\" data=\"901\"><a href=\"javascript:void(0);\"> <span>石家庄</span></a>  </li>  ";
                strProHtml += "</ul>"
                if (res != null && res != "") {
                    eval(res);
                    var data = JsonCityList;
                    for (var c in strNum) {
                        if (strNum[c] != "热") {
                            var JsonPPChar = data.filter(function (a) {
                                return a.groupName.toUpperCase() == strNum[c];
                            });
                            if (JsonPPChar.length > 0) {
                                strProHtml += "<h3 class=\"list-tit grouph3\" data=\"" + strNum[c] + "\">" + strNum[c] + "</h3><ul class=\"uldwcity\">";
                                $.each(JsonPPChar, function (ii, nn) {
                                    strProHtml += " <li class=\"lidwcity\" group=\"" + strNum[c] + "\" prodata=\"" + nn.provID + "\" data=\"" + nn.cityID + "\"><a href=\"javascript:void(0);\"> <span>" + $.trim(nn.cityName) + "</span></a>  </li>"
                                });
                                strProHtml += "</ul>";
                            }
                        }
                    }

                }
                //alert(strProHtml + HtmlNum);
                obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").html(strProHtml + HtmlNum).css("min-height", $(document).height());
                obj.divdwCitySelect.find(".divTcSelectDwCity").show();

                obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").find(".citygroupNum a").bind("click", function () {
                    // alert(3)
                    var top1 = obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").find("h3[data='热']").position().top;

                    $('body').scrollTop(0);
                    var postiontop = obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").find("h3[data='" + $(this).html() + "']").position().top;
                    $('body').scrollTop(postiontop);
                });
                obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").find(".lidwcity").unbind("click");
                obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").find(".lidwcity").bind("click", function () {
                    obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity  .lidwcity").removeClass("xuanzhong");
                    $(this).addClass("xuanzhong");

                    obj.displayProvId = $(this).attr("prodata");
                    obj.displayCityId = $(this).attr("data");
                    obj.displayCityName = $(this).find("span").html();
                    obj.FinishSelect();
                });
                if (obj.isShowSelectAll) {
                    obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity").find(".sltallProv").click(function () {

                        //obj.GpsShowPosition();
                        obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity  .lidwcity").removeClass("xuanzhong");
                        obj.displayProvId = "0";
                        obj.displayCityId = "0";
                        obj.displayCityName = "全部地区";

                        obj.FinishSelect();
                    });
                }

                obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw").click(function () {
                    if ($(this).find(".zdw_spn1").attr("cityname") == "") {
                        obj.GpsShowPosition();
                    }
                    obj.displayProvId = $(this).find(".zdw_spn1").attr("provid");
                    obj.displayCityId = $(this).find(".zdw_spn1").attr("cityid");
                    obj.displayCityName = $(this).find(".zdw_spn1").attr("cityname");
                    obj.FinishSelect();
                });
                if (val != undefined && Number(val) >= 0) {

                    var $lt = obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity  .lidwcity[data=\"" + val + "\"]");
                    if ($lt.length > 0) {
                        obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity  .lidwcity").removeClass("xuanzhong");
                        $lt.addClass("xuanzhong");

                        obj.displayProvId = $lt.attr("prodata");
                        obj.displayCityId = val;
                        obj.displayCityName = $lt.find("span").html();
                        obj.FinishSelect();
                    }
                    if (val == 0) {
                        obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity  .lidwcity").removeClass("xuanzhong");
                    }
                }
            }
        });

    };
    this.GpsShowPosition = function () {
        $.ajax({
            url: '/areacity/iplocation',
            type: 'post',
            dataType: 'json',
            async: false,
            beforeSend: function () {
                $(".spdwz").show();
                // obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw .zdw_spn1").text("GPS定位中...");
                //$("#spandingwei").html("北京");
                // obj.displayProvId = 2;
                // obj.displayCityId = 201;
                // obj.displayCityName = "北京";
                // obj.FinishSelect();
            },
            success: function (res) {
                var data = JSON.parse(res);
                if (data != null && data != "") {
                    $(".spdwz").hide();
                    var $dwcs = obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw .zdw_spn1");
                    $dwcs.attr("provid", data.provId);
                    $dwcs.attr("cityid", data.cityId);
                    $dwcs.attr("cityname", data.cityname);
                    $dwcs.html(data.cityname)
                    //$("#spandingwei").html(aa.cityname);
                    // obj.displayProvId = data.provId;
                    // obj.displayCityId = data.cityId;
                    // obj.displayCityName = data.cityname;
                    // obj.FinishSelect();
                    // obj.divdwCitySelect.find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw .zdw_spn1")
                }
            }
        });
    };
    this.IPShowPostion = function () {

    };

    this.FinishSelect = function (flag) {

        obj.displayText = obj.displayCityName;

        //alert(obj.displayText);
        if (obj.displayText != "") {
            obj.cityDisplay.html($.trim(obj.displayText)).addClass("col3");//.siblings("i").hide();
        }
        if (flag == undefined) {
            obj.HiddenProvence.val(obj.displayProvId);
            obj.HiddenCity.val(obj.displayCityId);

            obj.divdwCitySelect.hide();
            $('body').scrollTop(obj.disScolltop);
        }

        obj.AfterSelectArea();
    };

    this.AfterSelectArea = function () {
    };
    this.BindEvent();

}

function nofind(obj) {
    obj.src = $("#zwtid").val() + '/4.0/images/zwt.jpg';
}

//头部城市定位
var LocationCityCookie = {
    //省份id标签，城市id标签，城市名称标签
    GetLocationCityCookie: function (hiddenProvId, hiddenCityId, disCityName) {
        $.ajax({
            url: '/areacity/getLocationCookie',
            type: 'post',
            dataType: 'json',
            async: true,
            beforeSend: function () {


            },
            success: function (res) {
                // alert(res)
                var data = JSON.parse(res);
                if (data != null && data != "") {
                    $("#" + hiddenProvId + "").val(data.provId)
                    $("#" + hiddenCityId + "").val(data.cityId)
                    $("#" + disCityName + "").html(data.cityname);
                } else {
                    $("#" + hiddenProvId + "").val(2)
                    $("#" + hiddenCityId + "").val(201)
                    $("#" + disCityName + "").html("北京");
                }
            }
        });
    },
    //省份id标签，城市id标签，城市名称标签
    AddLocationCityCookie: function (provId, cityId, cityName) {
        $.ajax({
            url: '/areacity/addLocationCookie',
            data: {'cityId': cityId, 'cityName': cityName, 'provId': provId},
            type: 'post',
            dataType: 'json',
            async: true,
            beforeSend: function () {
            },
            success: function (res) {
                //alert(res);
                var data = res;
                //alert(data);
                if (data != null && data.status == 100) {
                    // alert("添加定位cookie成功");
                }
            }
        });
    }
};
var MobileSMSVerificationcode = function ($Mobile, $SzYzm, $btnSendSms, disableCssBtnSendSms, $hdLevScend, $imgSzYzm) {

    var Obj = this;
    //发送验证码 $Mobile :手机号码jquery对象, $SzYzm:数字验证码jquery对象, $btnSendSms:获取短信按钮id  ,disableCssBtnSendSms: 按钮不能发送时样式 ,$hdLevScend:用于倒计时jquery对象
    this.SendMobileYZM = function () {
        var rge = /^[1][34578][0-9]{9}$/;
        if ($.trim($Mobile.val()) != "" && $.trim($Mobile.val()) != "请输入手机号码") {
            if (!$btnSendSms.hasClass(disableCssBtnSendSms)) {
                if (rge.test($.trim($Mobile.val()))) {
                    if ($.trim($SzYzm.val()) != "" && $.trim($SzYzm.val()) != "请输入右侧验证码") {

                        $.ajax({
                            url: '/user/sendMobileYzm',
                            data: {'mobile': $.trim($Mobile.val()), 'szYzm': $.trim($SzYzm.val())},
                            type: 'Get',
                            dataType: 'json',
                            async: false,
                            success: function (data) {

                                //alert(JSON.stringify(data))
                                if (data != null || data != "") {
                                    var data = eval(data);
                                    //alert(data.status)
                                    if (data.status == 100) {
                                        $hdLevScend.val("60");
                                        setTimeout(Obj.SMSCountDownSecond, 1000);
                                        $btnSendSms.addClass(disableCssBtnSendSms);
                                    } else if (data.status == 101) {
                                        alert("短信验证码发送失败，请重试");
                                        Obj.ReloadSZYZM();

                                    } else if (data.status == 102) {
                                        alert("验证码错误");
                                        //Obj.ReloadSZYZM();
                                    } else if (data.status == 103) {
                                        alert("验证码错误");
                                        Obj.ReloadSZYZM();
                                    }
                                } else {
                                    alert("短信验证码发送失败");
                                    Obj.ReloadSZYZM();
                                }
                            }
                        });
                    } else {
                        if ($.trim($SzYzm.val()) == "" || $.trim($SzYzm.val()) == "请输入右侧验证码") {
                            alert("请输入验证码");
                        }
                    }
                } else {
                    alert("手机号码格式不正确");

                    return false;
                    // alert("手机号不符合规则");
                }
            }
        } else {
            alert("请输入手机号码");
            return false;
        }
    }
    //刷新验证码
    this.ReloadSZYZM = function () {
        $imgSzYzm.attr("src", "/validate/validatecode?v=" + Math.random())
    }
    //倒计时
    this.SMSCountDownSecond = function () {
        $hdLevScend.val(Number($hdLevScend.val() - 1));
        var second = $hdLevScend.val();
        if (second > 0) {
            $btnSendSms.addClass(disableCssBtnSendSms);
            $btnSendSms.html("再次获取(" + second + ")");
            setTimeout(Obj.SMSCountDownSecond, 1000);

        } else {
            $btnSendSms.html("获取验证码").removeClass(disableCssBtnSendSms);
        }
    }
    $btnSendSms.on("click", function () {
        Obj.SendMobileYZM();
    });
    $imgSzYzm.on("click", function () {
        Obj.ReloadSZYZM();
    });
};
//给input添加颜色
function InputAddClass()
{
    $('.tcinp-txt').focus(function(){
        if($(this).val()==''){
            $(this).addClass('col3')
        }
    });
    $('.tcinp-txt').blur(function(){
        if($(this).val()==''){
            $(this).removeClass('col3')
        }
    });
}

function ReloadMPicVailcode($obj) {
    $obj.attr("src", "/validate/validatecode?v=" + Math.random())
}