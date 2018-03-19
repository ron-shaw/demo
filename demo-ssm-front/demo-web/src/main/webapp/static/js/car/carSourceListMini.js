var CarSourcePage = 1;
var data ={
    "model.IsInternalCarSource":false,
    "model.ModelLevel":0,
    "model.MakeID":0,
    "model.ModelID":0,
    "model.StyleID":0,
    "model.ProvID":0,
    "model.CityID":0,
    "model.CityName":"",
    "model.PageIndex":1,
    "model.PageSize":10,
    "model.Sore":2,
    "model.CarSourceFrom":0,
    "model.BsqSimpleValue":0,
    "model.StyleFullName":"",
    "carType":1,
    "isLoan":0,
    "model.BeginSellPrice":0,
    "model.EndSellPrice":0,
    "model.CSUserType":0,

}
$(function () {
    $("#defaultulshow").find("li").click(function () {
        var sort = $(this).attr("data");
        $("#defaultulshow li").removeClass("active");
        $(this).addClass("active");
        data['model.Sore']=sort;
        $("#defaultulshow").hide();
        $('#defaultli').html($(this).attr("data-attr") + '<i class="jtx"></i>');
        CarSourcePage = 1;
        LoadLastCarSource();
    });


    $("#priceulshow").find("li").click(function () {
        var beginPrice = $(this).attr("data-begin");
        var endPrice = $(this).attr("data-end");
        $("#priceulshow li").removeClass("active");
        $(this).addClass("active");
        data['model.BeginSellPrice']=beginPrice;
        data['model.EndSellPrice']=endPrice;
        $("#priceulshow").hide();
        data['model.PageIndex'] = 1;
        CarSourcePage = 1;
        LoadLastCarSource();
    });
    // var SeleCar = new Mobile_SelectCar_v4(0, "selectCar", "SectionSelectCar", true, true, true, false);
    // SeleCar.initHidden("hdMakeId", "hdModelId");
    // SeleCar.AfterSelectCar = function () {
    //     $("#selectCar").html($("#selectCar").html().substr(0, 4));
    //     $("#selectCar").siblings("i").show();
    //     CarSourcePage = 1;
    //     data['model.MakeID'] = $("#hdMakeId").val();
    //     data['model.ModelID'] = $("#hdModelId").val();
    //     data['model.StyleID'] = $("#hdStyleId").val();
    //     data['model.PageIndex'] = 1;
    //     LoadLastCarSource();
    // };
    //品牌选择
    var ksPingguCar = new Mobile_SelectCar_v1(2, "liSelectCar_Ks", "SectionSelectCar_Ks", "sectionMakeOrModelSearch", false, true, true, false);
    ksPingguCar.initHidden("hdMakeId_Ks", "hdModelId_Ks", "hdStyleId_Ks", "hdStyleYear_Ks", "hdNextStyleYear_Ks");
    ksPingguCar.AfterSelectCar = function () {
        $('#liSelectCar_Ks').html($('#liSelectCar_Ks').html().substr(0,4));
        var makeId = $('#hdMakeId_Ks').val();
        var modelID = $('#hdModelId_Ks').val();
        if(makeId && $.trim(makeId)){
            data['model.MakeID'] = makeId;
        }
        if(modelID && $.trim(modelID)){
            data['model.ModelID'] = modelID;
        }
        data['model.PageIndex'] = 1;
        CarSourcePage = 1;
        LoadLastCarSource();
    }
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            CarSourcePage++;
            data["model.PageIndex"]++;
            LoadLastCarSource();
        }
        $('.zw_head_px .zpaxu').height($('.zmclb').height());
    });
})




function LoadLastCarSource() {
    $("#DvLastCsList").append('<div id="loadermore" class="loader"><div class="loader-inner ball-pulse"><div></div><div></div><div></div></div></div>');
    $.ajax({
        url: '/ershouche/searchCarList',
        data: data,
        datatype: 'json',
        async: false,
        beforeSend: function () {
        },
        success: function (e) {
            if (CarSourcePage == 1) { $("#DvLastCsList").html(''); }
            $("#loadermore").remove();
            if(e && e.data && e.data.length > 0) {
                var html = "";
                var strHtml = "";
                $.each(e.data, function (i, carSource) {
                    strHtml += "<div class=\"zescsj\">";
                    strHtml += "<div class=\"zesbfb clearfix\">";
                    strHtml += "<a href='/ershouche/mcarsourcedetail-"+carSource.carSourceId+"-"+carSource.carSourceFrom+".html'>";
                    strHtml += "<aside class=\"zes_as1\"><img src=\"" + carSource.carSourceImageUrl + "\"  onerror=\"nofind(this);\"/></aside>";
                    strHtml += "<aside class=\"zes_as2\">";
                    strHtml += "<p class=\"zti_p1\">" + carSource.fullName + "</p>";
                    strHtml += "<p class=\"zti_p2\">" + carSource.mileage + "  |  " + carSource.releaseTime + "  |  " + carSource.cityName + "</p>";
                    strHtml += "<p class=\"zti_p3\"><strong>" + (Number(carSource.sellPrice)).toFixed(2) + "万</strong></p>";
                    if(carSource.personalBusiness == 1){
                        strHtml += " <p class=\"zti_p4\"><label class=\"zsdrg\">个人</label></p>";
                    }else if(carSource.personalBusiness == 2){
                        strHtml += " <p class=\"zti_p4\"><label class=\"zsdrg\">商家</label></p>";
                    }
                    strHtml += "</aside>";
                    strHtml += "</a>";
                    strHtml += "</div>";
                    strHtml += "</div>";
                    if (CarSourcePage==1 && i == 2) {
                        strHtml += "<div class=\"zescsj\"><a class=\"head_ad_a\" href=\"http://m.taoche.com/bm/all/?WT.mc_id=m_jrtt_esc\"><img src=\"http://res.jingzhengu.com/ptvm/active/headline/images/ad_img.png\" alt=\"\" class=\"head_ad_img\" /></a></div>";
                    }
                });
                $("#DvLastCsList").append(strHtml);
            }else{
                if (CarSourcePage == 1) {
                    $("#DvLastCsList").html('<div class="zwsy_div" id="nothelist2"><label><img src="http://res.jingzhengu.com/ptvm/active/headline/images/sy-car1.png" alt="" /></label><label class="col9 mt30">暂无相关数据~</label></div>');
                }
            }
        }
    });
}

//默认排序
function defaultSort() {
    $("#defaultulshow").toggle();
    $("#priceulshow").hide();
    $("#priceli").parent("li").removeClass("active");
    if ($("#defaultulshow").css("display") == "block") {
        $("#defaultli").parent("li").addClass("active");
    } else {
        $("#defaultli").parent("li").removeClass("active");
    }
}

//默认排序
function PriceSort() {
    $("#priceulshow").toggle();
    $("#defaultulshow").hide();//隐藏其他的
    $("#defaultli").parent("li").removeClass("active");
    if ($("#priceulshow").css("display") == "block") {
        $("#priceli").parent("li").addClass("active");
    } else {
        $("#priceli").parent("li").removeClass("active");
    }
}
function nofind(obj) {
    obj.src = 'http://res.jingzhengu.com/ptvm/4.0/images/zwt.jpg';
}
function goSearchList() {
    // var style = data['model.MakeID'] + "-" + data['model.ModelID'] + "-0";
    // var zdyprice = data['model.BeginSellPrice']/10000 + "-" + data['model.EndSellPrice']/10000;//开始价格-结束价格
    // var color = "";
    // var mils = $('#carMileage').val();
    // var sort =data['model.Sore'];
    // var city = data['model.ProvID'] + "-" + data['model.CityID'];
    // var classfiy = data['model.MakeID'] + "-0-" + data['model.CSUserType'] + "-" + data['model.BsqSimpleValue'] + "-" + $('#carAge').val() + "-0-" + 0 + "-" + $('#carExhaust').val()+"-"+data.carType+"-"+data.isLoan+"-"+data['model.CountryId']+"-"+data['model.SeatCount']+"-"+data['model.CarSourceFrom']+"-"+data['model.ModelLevel'];
    // var searchUrl = "/ershouche/gaojilist/s" + style + "c" + city + "k" + zdyprice + "a" + color + "m" + mils;
    // searchUrl += "o" + sort + "e" + classfiy + "p1t" + data['model.StyleFullName'];//y是否是高级
    window.location.href = "/ershouche/gaojilist/s0-0-0c0-0k0-0am0o2e0-0-0-0-0-0-0-0p1t";
}