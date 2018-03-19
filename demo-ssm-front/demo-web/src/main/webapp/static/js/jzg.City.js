
var City = function () {
    Base.apply(this);
    this.isLoaded = false;
    this.isShow = false;
    this.cityObj = {
        provID:2,
        cityID:201,
        cityName:'北京'
    }
    this.options = {
        cityElement:'',
        cityId:null,
        showAll:false,
        cityListContainner:'',
        callback:null
    };
    this.elements = {

    };
    this.url={
        getCityListUrl:'/areacity/citylist'
    }
}

City.prototype.init = function(options){
    var instance = this;
    if(options && options instanceof Object){
        if(options.cityElement) instance.options.cityElement = options.cityElement;
        if(options.cityListContainner) instance.options.cityListContainner = options.cityListContainner;
        if(options.callback && typeof options.callback=="function") instance.options.callback = options.callback;
        if(options.showAll) instance.options.showAll=true;
        if(options.cityId) instance.options.cityId=options.cityId;
    }
    instance.bindEvent();
    if(!instance.isLoaded) instance.loadCityHtml();
    return instance;
}


City.prototype.bindEvent = function () {
    var instance = this;
    $(instance.options.cityElement).bind("click",function () {
        instance.showCityList();
    });
}

City.prototype.loadCityHtml = function () {
    var instance = this;
    var groupArr = ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];

    var strHtml = '<div class="posabs divTcSelectDwCity" style="z-index:21;" >' +
        '<header style="z-index:22"><div class="per_tit"> <a href="javascript:void(0);" class="closedwcity" >' +
        '<i class="per_icon_tit jtx"></i></a><span class="per_tit_span">选择城市</span></div></header>' +
        '<div class="cont"><div class="jzgzlist backbgf xzpplist divTcDwdetailCity  z-1" ' +
        'style="min-height:' + $(document).height() + 'px;" ></div></div></div>';

    $(instance.options.cityListContainner).html(strHtml);
    $(".closedwcity").bind("click",function () {
        instance.closeCityPage();
    });

    $.get(instance.url.getCityListUrl,{},function (data) {
            var cityListHtml = '<div class="zdwcs btnGpsdw"><span class="zdw_spn1">定位城市</span>' +
                '<span class="spdwz" style="display: none;">定位中...</span></div>';
            cityListHtml += '<h3 class="list-tit grouph3" data="热">热门城市</h3><ul class="uldwcity">';
            if (instance.options.showAll) {
                 cityListHtml += '<li  class="lidwcity" data-provID="0" data-cityID="0"  data-cityName="全国"><a href="javascript:void(0);"> <span>全国</span></a>  </li>';
            }
            cityListHtml += '<li  class="lidwcity" data-provID="2" data-cityID="201" data-cityName="北京"><a href="javascript:void(0);"> <span>北京</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="30"  data-cityID="3001" data-cityName="杭州"><a href="javascript:void(0);"> <span>杭州</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="15"  data-cityID="1501" data-cityName="南京"><a href="javascript:void(0);"> <span>南京</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="5"  data-cityID="501" data-cityName="广州"><a href="javascript:void(0);"> <span>广州</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="10"  data-cityID="1001" data-cityName="郑州"><a href="javascript:void(0);"> <span>郑州</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="21"  data-cityID="2101" data-cityName="济南"><a href="javascript:void(0);"> <span>济南</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="17"  data-cityID="1701" data-cityName="沈阳"><a href="javascript:void(0);"> <span>沈阳</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="9"  data-cityID="901" data-cityName="太原"><a href="javascript:void(0);"> <span>太原</span></a>  </li>';
            cityListHtml += '<li  class="lidwcity" data-provID="22"  data-cityID="22001" data-cityName="石家庄"><a href="javascript:void(0);"> <span>石家庄</span></a>  </li>';
            cityListHtml += '</ul>'
            if (data != null && data != "") {
                eval(data);
                var cityList = JsonCityList;
                for (var key in groupArr) {
                    var keyStr = groupArr[key];
                    if (keyStr != "热") {
                        var groupCityList = cityList.filter(function (a) {
                            return a.groupName.toUpperCase() == keyStr;
                        });
                        if (groupCityList.length > 0) {
                            cityListHtml += '<h3 class="list-tit grouph3" data="' + keyStr + '">' + keyStr + '</h3><ul class="uldwcity">';
                            $.each(groupCityList, function (ii, cityItem) {
                                cityListHtml += '<li class="lidwcity" data-groupId="' + keyStr +
                                    '" data-provID="' + cityItem.provID +
                                    '" data-cityName="' + cityItem.cityName +
                                    '" data-cityID="' + cityItem.cityID + '"><a href="javascript:void(0);"> <span>' +
                                    $.trim(cityItem.cityName) + '</span></a>  </li>';
                            });
                            cityListHtml += '</ul>';
                        }
                    }
                }
            }
            var groupHtml = '<div class="fixA bor-ra clearfix citygroupNum">';
            for (var n = 0; n < groupArr.length; n++) {
                groupHtml += '<a href="javascript:void(0);" data="' + groupArr[n] + '">' + groupArr[n] + '</a>';
            }
            groupHtml += '</div>';

            $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity").html(cityListHtml+groupHtml)
                .css("min-height",$(document).height());

            instance.isLoaded = true;

            // instance.showPosition();
            instance.selectLocalPosition();
            $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity")
                .find(".citygroupNum a")
                .bind("click",function () {
                    var top1 = $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity").find("h3[data='热']").position().top;
                    $('body').scrollTop(0);
                    var postiontop = $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity").find("h3[data='" + $(this).html() + "']").position().top;
                    $('body').scrollTop(postiontop);
                });

            $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity").find(".lidwcity").unbind("click")
                .bind("click",function () {
                    var _this = $(this);
                    _this.siblings(".xuanzhong").removeClass("xuanzhong");
                    _this.addClass("xuanzhong");
                    instance.cityObj = new Object();
                    instance.cityObj.provID = _this.attr("data-provID");
                    instance.cityObj.cityName = _this.attr("data-cityName");
                    instance.cityObj.cityID = _this.attr("data-cityID");
                    if(typeof callback=="function"){
                        callback(instance.cityObj);
                    }else {
                        instance.finishSelect();
                    }
                });

            $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw").bind("click",function () {
                instance.selectLocalPosition();
            });

            if(instance.options.cityId!=null){
                //todo
                $(instance.options.cityListContainner).find(".divTcSelectDwCity .divTcDwdetailCity").find(".lidwcity[data-cityid=" +
                    instance.options.cityId+"]").click();
                instance.options.cityId==null;
            }
        }
        ,"json");
}

City.prototype.showCityList = function (callback) {
    var instance = this;
    instance.gotoTop();
    if(instance.isLoaded){
        $(instance.options.cityListContainner).show();
    }else{
        instance.loadCityHtml();
        $(instance.options.cityListContainner).show();
    }
    instance.isShow = true;
}

City.prototype.selectLocalPosition = function () {
    var instance = this;
    var binddataElement = $(instance.options.cityListContainner)
        .find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw")
        .find(".zdw_spn1");
    var dwCityId = binddataElement.attr("data-cityId");
    if(typeof dwCityId=='undefined' || dwCityId==''){
        instance.showPosition(instance.finishSelect());
    }else{
        instance.cityObj = new Object();
        instance.cityObj.provID = binddataElement.attr("data-provId");
        instance.cityObj.cityName =  binddataElement.attr("data-cityName");
        instance.cityObj.cityID =  binddataElement.attr("data-cityId");
        instance.finishSelect();
    }
}

City.prototype.closeCityPage = function () {
    var instance = this;
    $(instance.options.cityListContainner).hide();
    instance.isShow=false;
    instance.gotoTop($(instance.options.cityElement).offset().top-($(window).height()/2));
}

City.prototype.showPosition = function (callback) {
    var instance = this;
    var dwing = $(instance.options.cityListContainner).find(".spdwz");
    $.ajax({
        url: '/areacity/iplocation',
        type: 'post',
        dataType: 'json',
        async: false,
        beforeSend: function () {
            dwing.show();
        },
        success: function (res) {
            var data = JSON.parse(res);
            if (data != null && data != "") {
                instance.cityObj = new Object();
                instance.cityObj.provID = data.provId;
                instance.cityObj.cityName = data.cityname;
                instance.cityObj.cityID = data.cityId;
                var binddataElement = $(instance.options.cityListContainner)
                    .find(".divTcSelectDwCity .divTcDwdetailCity .btnGpsdw")
                    .find(".zdw_spn1");
                binddataElement.attr("data-cityId",data.cityId).attr("data-cityName",data.cityname).attr("data-provId",data.provId)
                    .text(data.cityname);
                if(typeof callback == "function"){
                    callback(instance.cityObj);
                }
            }
            dwing.hide();
        }
    });
};

City.prototype.finishSelect = function () {
    var instance = this;
    instance.options.callback(instance.cityObj);
    if(instance.isShow){
        instance.closeCityPage();
    }
}