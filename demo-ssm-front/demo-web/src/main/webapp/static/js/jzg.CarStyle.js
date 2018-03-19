
/*$.fn.extend({
    carStyle:new CarStyle()
});*/

var CarStyle = function(){
    Base.apply(this);
    this.brandObj = {};
    this.modelObj = {};
    this.styleObj = {};
    this.newBrandObj = null;
    this.newModelObj = null;
    this.newStyleObj = null;
    this.styleFullName = "";
    this.isLoaded = false;
    this.arrWordIndex = ['热', 'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
    this.arrHotBrand = [
        {"makeId": "8", "makeName": "大众", "groupName": "D", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m8100_301.jpg"},
        {"makeId": "2", "makeName": "奔驰", "groupName": "B", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m2100_301.jpg" },
        {"makeId": "3", "makeName": "宝马", "groupName": "B", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m3100_301.jpg"},
        {"makeId": "9", "makeName": "奥迪", "groupName": "A", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m9100_301.jpg"},
        {"makeId": "7", "makeName": "丰田", "groupName": "F", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m7100_301.jpg" },
        {"makeId": "26", "makeName": "本田", "groupName": "B", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m26100_301.jpg"},
        {"makeId": "17", "makeName": "福特", "groupName": "F", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m17100_301.jpg"},
        {"makeId": "127", "makeName": "别克", "groupName": "B", "logoUrl": "http://image.jingzhengu.com/Vehicle/logo/make/m127100_301.jpg"}
    ];
    this.options = {
        brandElement: '',
        brandListContainer: '',
        modelListContainer: '',
        styleListContainer: '',
        searchListContainer: '',
        level: 3,
        isEst: false,
        showHotBrand: true,
        showSearchButton: false,
        produceStatus: 0,
        brandId: null,
        modelId: null,
        styleId: null,
        callback: null
    };
    this.url = {
        getBrandListUrl: '/getMakeModelStyleAll/getMakeList',
        getModelListUrl: '/getMakeModelStyleAll/getModelList',
        getStyleListUrl: '/getMakeModelStyleAll/getStyleList',
        getKeySearchListUrl: '/getMakeModelStyleAll/getKeySearchList'
    };

};

CarStyle.prototype.init = function (options) {
    var instance = this;
    if(typeof options != undefined){
        if(options instanceof Object){
            if(options.brandElement) instance.options.brandElement = options.brandElement;
            if(options.brandListContainer) instance.options.brandListContainer = options.brandListContainer;
            if(options.modelListContainer) instance.options.modelListContainer = options.modelListContainer;
            if(options.styleListContainer) instance.options.styleListContainer = options.styleListContainer;
            if(options.level) instance.options.level = options.level;
            if(options.showHotBrand) instance.options.showHotBrand = options.showHotBrand;
            if(options.brandId) instance.options.brandId = options.brandId;
            if(options.modelId) instance.options.modelId = options.modelId;
            if(options.styleId) instance.options.styleId = options.styleId;
            if(options.showSearchButton) {
                instance.options.showSearchButton = options.showSearchButton;
                if(options.searchListContainer) instance.options.searchListContainer = options.searchListContainer;
            }
            if(options.callback && typeof options.callback=="function") instance.options.callback = options.callback;
        }
    }
    instance.bindEvent();
    if(instance.options.brandId!=null){
        instance.showBrandList();
    }else{
        instance.isLoaded = true;
    }
    return instance;
}

CarStyle.prototype.bindEvent = function () {
    var instance = this;
    $(instance.options.brandElement).bind("click",function () {
        instance.showBrandList();
    });
    return instance;
}

//显示选择品牌页面
CarStyle.prototype.showBrandList = function (callback) {
    var instance = this;
    $(instance.options.brandListContainer).html();
    var params = {
        isEst:instance.options.isEst?1:0,       //1：表示需要估值
        produceStatus:instance.options.produceStatus //0:表示所有车 1：新车
    }

    $.get(instance.url.getBrandListUrl,params,function (data) {
        if(data.status == instance.RetStatus.Ok){
            var brandList = data.list;
            var headerHtml ='<div class="posabs divTcSelectMake" style="z-index:21;"><header><div class="per_tit">' +
                '<a href="javascript:void(0);" class="closemake"><i class="per_icon_tit jtx"></i></a>' +
                '<span class="per_tit_span">选择品牌</span>';
            if(instance.options.showSearchButton) headerHtml += '<a class="per-titr searchMakeorModel" href="javascript:;"><i class="per_icon_tit"></i></a>';
            headerHtml += '</div></header><div class="cout">';
            if(instance.options.showHotBrand) headerHtml += '<div class="hotRe divHotMake clearfix backbgf"></div>';
            headerHtml +=  '<div class="jzgzlist backbgf xzpplist divTcdetailMake z-1" style="min-height:' +
                $(document).height()+ 'px;"></div></div></div>';
            $(instance.options.brandListContainer).html(headerHtml);

            var groupBrandHtml = "";


            var rightIndexHtml = '<div class="fixA bor-ra clearfix stlmakeNum">';

            //绑定品牌列表
            for(var i= 0;i<instance.arrWordIndex.length;i++){
                var group = instance.arrWordIndex[i];
                rightIndexHtml += '<a href="javascript:void(0);" data="' + group + '">' + group + '</a>';
                if(group == "热") continue;
                //根据groupName 分组
                var groupBrand  = brandList.filter(function (item) {
                    return item.groupName.toUpperCase()==group;
                });
                var brandListHTML ='';
                brandListHTML+= '<h3 class="list-tit grouph3" data-groupName="' + group + '">' + group + '</h3>';
                brandListHTML+= '<ul class="ulmake">';
                $.each(groupBrand, function (j, brand) {
                    brandListHTML += '<li class="limake" data-groupName="' + group +
                        '" data-makeId="' + brand.makeId +
                        '" data-makeName="' + brand.makeName +
                        '" data-logoUrl="' + brand.logoUrl + '">' +
                        '<a href="javascript:void(0);"><div class="carimg"> ' +
                        '<img src="' + brand.logoUrl + '" alt="" onerror="nofind(this);" /></div><span>' +
                        $.trim(brand.makeName) + '</span></a> </li>'
                });
                brandListHTML += '</ul>';
                groupBrandHtml +=brandListHTML;
            }

            rightIndexHtml += "</div>";

            if(instance.options.showHotBrand){
                $(instance.options.brandListContainer).find(".divTcSelectMake .divHotMake").html(instance.getHotBrandHtml());
            }
            groupBrandHtml+=rightIndexHtml;
            $(instance.options.brandListContainer).find(".divTcdetailMake").append(groupBrandHtml);
            if(instance.isLoaded){
                $(instance.options.brandListContainer).show();
            }
            if(instance.options.level==1){
                instance.isLoaded = true;
            }

            //region 事件绑定
            $(instance.options.brandListContainer).find(".divTcSelectMake .divTcdetailMake").find(".stlmakeNum a")
                .bind("click", function () {
                    var top1 = $(instance.options.brandListContainer).find(".divTcSelectMake .divTcdetailMake").find("h3[data-groupname='A']").position().top;
                    var hdhgt = $(instance.options.brandListContainer).find(".divTcSelectMake .head-l").height();
                    $('body').scrollTop(0);
                    var gname = $(this).text();
                    if (gname == "热") {
                        var postiontop = $(instance.options.brandListContainer).find(".divTcSelectMake .divHotMake").find("h3[data-groupname='" + gname + "']").position().top;
                        $('body').scrollTop(postiontop);
                    }else {
                        var postiontop = $(instance.options.brandListContainer).find(".divTcSelectMake .divTcdetailMake").find("h3[data-groupname='" + gname + "']").position().top;
                        $('body').scrollTop(postiontop);
                    }
                });

            //注册选中品牌事件
            $(instance.options.brandListContainer+" ul>li.limake,"+ instance.options.brandListContainer+" ul.hotRe-ul>li").bind("click",function () {
                var _this = $(this);
                var makeId = _this.attr("data-makeId");
                var makeName = _this.attr("data-makeName");
                var logoUrl = _this.attr("data-logoUrl");
                var groupName = _this.attr("data-groupName");
                instance.newBrandObj = {makeId:makeId, makeName:makeName,logoUrl:logoUrl,groupName:groupName};
                instance.newModelObj = null;
                instance.newStyleObj = null;
                if(typeof callback == "function"){
                    instance.finishSelect();
                    callback(instance.newBrandObj);
                }else {
                    if(instance.options.level==1){
                        instance.finishSelect();
                        instance.options.callback(instance.newBrandObj);
                    }else{
                        instance.showModelList(instance.newBrandObj);
                    }
                }
            });

            $(".closemake").bind("click",function () {
                $(instance.options.brandListContainer).hide();
                instance.gotoTop($(instance.options.brandElement).offset().top-($(window).height()/2));
            });
            $(".searchMakeorModel").bind("click",function () {
                instance.bindSearchSuggestClick();
            });

            if(instance.options.brandId!=null){
                $(instance.options.brandListContainer+" ul>li.limake[data-makeid=" +instance.options.brandId +
                    "]").click();
                instance.options.brandId=null;
            }
            //endregion
        }else{
            console.log(data.msg);
            $(instance.options.brandListContainer).find(".divTcdetailMake").html(data.msg);
        }
        instance.gotoTop();
    },"json");
}

//搜索按钮点击
CarStyle.prototype.bindSearchSuggestClick=function () {
    var instance = this;
    // $(instance.options.brandListContainer).find(".divTcSelectStyle .divTcdetailStyle ").hide();
    $("#divMake").hide();
    //搜索层展示
    $(instance.options.searchListContainer).html(instance.getSuggestInputHtml());
    $('form').bind('submit', function(e){
        // 不提交
        document.activeElement.blur();
        return false;
    });

    $(instance.options.searchListContainer).find(".ulcarsourlist").css("min-height", $(document).height());
    //取消搜索层
    $(".labelCloseMakeOrModel").bind("click", function () {
        $(instance.options.searchListContainer).hide();
        // $(instance.options.brandListContainer).show();
        $("#divMake").show();
    });
    //搜索调用事件

    $("#txtkeyMakeOrModel").bind("input propertychange", function () {

        var gsName = $("#txtkeyMakeOrModel").val(); //公司名称
        $(".search-lBtn").hide();
        if ($.trim(gsName) != "") {
            $(".search-lBtn").show();
            window.setTimeout(function () {
                var newValue = $("#txtkeyMakeOrModel").val();
                if($.trim(newValue) == ""){
                    instance.clearSearchResultList();
                }else if($.trim(newValue) == $.trim(gsName)){
                    instance.showSuggestCarList($.trim(newValue));
                }
            }, 800);
        }else {
            instance.clearSearchResultList();
        }
    });

    $(".search-lBtn").bind("click", function () {
        $(this).hide();
        $("#txtkeyMakeOrModel").val("");
        $(instance.options.searchListContainer).find(".ulcarsourlist").html("");
        instance.clearSearchResultList();
    });
    $(instance.options.searchListContainer).show();
}

//搜索框取消
CarStyle.prototype.clearSearchResultList = function () {
    var instance = this;
    $(instance.options.searchListContainer).find(".ulcarsourlist").html("<div style='text-align: center;'>暂无搜索结果</div>");
    $(instance.options.searchListContainer).find(".ulcarsourlist").css("min-height", $(document).height());
}

//搜索
CarStyle.prototype.showSuggestCarList = function (sval) {
    var instance = this;
    var url = instance.url.getKeySearchListUrl;
    var param = {isEst:instance.options.isEst?1:0, produceStatus: instance.options.produceStatus, keyword: sval};
    $.ajax({
        url: url,
        type: 'post',
        async: true,
        dataType: "json",
        data: param,
        beforeSend: function () {
            $("#divMake").hide();
            $(instance.options.searchListContainer).find(".ulcarsourlist").html("<div style='text-align: center;'>数据加载中，请稍后...</div>");
            $(instance.options.searchListContainer).find(".ulcarsourlist").css("min-height", $(document).height());
        },
        success: function (data) {
            var makeOrModelListHtml = "";
            if(data.status==instance.RetStatus.Ok ){
                var list = data.list;
                if (list == null || list.length==0) {
                    instance.clearSearchResultList();
                } else {
                    $.each(list, function (ii, nn) {
                        makeOrModelListHtml += '<li data-modelId="' + nn.modelId +
                            '" data-groupName="' + nn.groupName +
                            '" data-logoUrl="' + nn.logoUrl +
                            '" data-makeId="' + nn.makeId +
                            '" data-makeName="' + nn.name + '" >' +
                            '<a href="javascript:void(0);" ><span>' + nn.name + '</span></a></li>';
                    });
                    $(instance.options.searchListContainer).find(".ulcarsourlist").html(makeOrModelListHtml);
                    $(instance.options.searchListContainer).find(".ulcarsourlist").find("li").bind("click", function () {
                        var makeid = $(this).attr("data-makeId");
                        var modelid = $(this).attr("data-modelId");
                        if (makeid > 0) {
                            $(instance.options.searchListContainer).hide();
                            instance.newStyleObj = new Object();
                            $(instance.options.brandListContainer).find(" ul>li.limake[data-makeId=" +makeid+ "]").click();
                            if (modelid!=undefined && modelid > 0) {
                                if(instance.newModelObj==null/* || modelid!=instance.newModelObj.modelId*/){
                                     $(instance.options.modelListContainer).find("ul>li.limodel[data-modelId=" +modelid+ "]").click();
                                }
                            }
                        }
                    });
                }
            }else{
                instance.clearSearchResultList();
            }

        }
    });
}

CarStyle.prototype.getSuggestInputHtml = function (val) {
    var instance = this;
    var SuggestHtml = '<div class="cont">';
    SuggestHtml += '<div class="search">';
    SuggestHtml += '<div class="search-l">';
    SuggestHtml += '<form action="#"><input id="txtkeyMakeOrModel" class="search-inp inp198" autofocus="autofocus" name="search" type="search" value="" placeholder="请输入汽车品牌、型号、或拼音" autocomplete="off"></form>';
    SuggestHtml += '<div class="search-lBtn"></div>';
    SuggestHtml += '</div>';
    SuggestHtml += '<div class="search-r labelCloseMakeOrModel">取消</div>';
    SuggestHtml += '</div>';
    SuggestHtml += '<div class="jzgzlist z-3">';
    SuggestHtml += '<ul class="zcx_ul ulcarsourlist" >';
    SuggestHtml += '</ul>';
    SuggestHtml += '</div>';
    SuggestHtml += '</div>';
    return SuggestHtml;
}


CarStyle.prototype.getHotBrandHtml = function () {
    var instance = this;
    var hotHtml = '<h3 class="list-tit list-titH36" data-groupName="热">热门品牌</h3>';
    hotHtml += '<ul class="hotRe-ul">';
    for (var i = 0; i < instance.arrHotBrand.length; i++) {
        var hotBrandObj = instance.arrHotBrand[i];
        hotHtml += '<li data-groupName="'+hotBrandObj.groupName+
            '" data-makeId="' + hotBrandObj.makeId +
            '" data-makeName="' + hotBrandObj.makeName +
            '" data-logoUrl="' + hotBrandObj.logoUrl + '">';
        hotHtml += '<img class="hotRe-img" src="' + hotBrandObj.logoUrl + '" alt="" />';
        hotHtml += '<span class="hotRe-txt">' + hotBrandObj.makeName + '</span>';
        hotHtml += '</li>';
    }
    hotHtml += "</ul>";
    return hotHtml;
}

//显示选择车系页面
CarStyle.prototype.showModelList = function (brandObj, callback) {
    var instance = this;
    if(!brandObj || $.trim(brandObj.makeId)==null || $.trim(brandObj.makeId)==""){
        alert("参数有误");
        return;
    }
    var headerHtml = '<div class="posabs divTcSelectModel" style="z-index: 22; height: 2391px;">' +
        '<header style="z-index:22"><div class="per_tit"> <a href="javascript:void(0);" class="closemodel"><i class="per_icon_tit jtx"></i></a><span class="per_tit_span">选择车系</span>';
    if(instance.options.showSearchButton) headerHtml += '<a class="per-titr searchMakeorModel" href="javascript:;"><i class="per_icon_tit"></i></a>';
    headerHtml += '</div></header>' +
        '<div class="cont"> <div class="jzgzlist backbgf xzpplist cxlist divTcdetailModel " style="min-height: ' +
            $(document).height()+
        'px;"></div></div>';
    $(instance.options.modelListContainer).html(headerHtml);
    $(instance.options.brandListContainer).hide();
    if(instance.isLoaded){
        $(instance.options.modelListContainer).show();
    }
    if(instance.options.level==2){
        instance.isLoaded = true;
    }



    var params = {
        makeId:brandObj.makeId,
        isEst:instance.options.isEst?1:0,       //1：表示需要估值
        produceStatus:instance.options.produceStatus //0:表示所有车 1：新车
    }

    $.get(instance.url.getModelListUrl,params,function (data) {
        if(data.status == instance.RetStatus.Ok){
            var modelList = data.list;
            var groupNameList = new Array();
            //绑定车系列表
            var  groupModelHtml = "",
                 modelHtml = '<h3 class="list-img"> <img src="' + brandObj.logoUrl + '" onerror="nofind(this);" alt="" /> <span class="list-imgtit">' + brandObj.makeName + '</span></h3>';
            var groupModelList = new Object();

            for (var i = 0; i < modelList.length; i++) {
                var model = modelList[i];
                var showGroupName = true;
                if(groupNameList.length>0){
                    for (var j = 0; j < groupNameList.length; j++) {
                        if (groupNameList[j] == model.groupName) {
                            showGroupName = false;
                        }
                    }
                }
                if (showGroupName) {
                    groupNameList.push(model.groupName);
                    modelHtml = modelHtml.replace("{0}", groupModelHtml);
                    groupModelHtml = '';
                    //可编辑部分
                    modelHtml += '<h3 class="list-tit">' + model.groupName + '</h3> <ul class="ulmodel">{0}</ul>';
                }
                groupModelHtml += '<li class="limodel" data-modelId="' + model.modelId + '" data-modelName="' + model.modelName + '"><a href="javascript:void(0);"> <span>' + $.trim(model.modelName) + '</span></a>  </li>';
            }
            modelHtml = modelHtml.replace("{0}", groupModelHtml);

            $(instance.options.modelListContainer).find(".divTcdetailModel").append(modelHtml);
            $(instance.options.modelListContainer).find("ul>li.limodel").click(function () {
                var _this = $(this);
                $(instance.options.modelListContainer).find("ul>li.limodel.xuanzhong ").removeClass("xuanzhong");
                _this.addClass("xuanzhong");
                instance.newModelObj = new Object();
                instance.newModelObj.modelId = _this.attr("data-modelId");
                instance.newModelObj.modelName = _this.attr("data-modelName");
                instance.newStyleObj = null;
                if(typeof callback == "function"){
                    instance.finishSelect();
                    callback(instance.newModelObj);
                }else{
                    if(instance.options.level ==2){
                        instance.finishSelect();
                        instance.options.callback(instance.newModelObj);
                    }else {
                        instance.showStyleList(instance.newModelObj);
                    }
                }
            });

            if(instance.options.modelId!=null){
                $(instance.options.modelListContainer).find("ul>li.limodel[data-modelid="+instance.options.modelId+"]").click();
                instance.options.modelId=null;
            }
        }else{
            console.log(data.msg);
            $(instance.options.modelListContainer).find(".divTcdetailModel").html(data.msg);
        }
        instance.gotoTop();
    },"json");

    //region 注册事件
    $(".closemodel").bind("click",function () {
        $(instance.options.modelListContainer).hide();
        $(instance.options.brandListContainer).show();
    });

    $(".searchMakeorModel").bind("click",function () {
        instance.bindSearchSuggestClick();
    });
    //endregion

}

//显示选择车型页面
CarStyle.prototype.showStyleList = function (modelObj, callback) {
    var instance = this;
    if(!modelObj || $.trim(modelObj.modelId)==null || $.trim(modelObj.modelId)==""){
        alert("参数有误");
        return;
    }
    var headerHtml='<div class="posabs  divTcSelectStyle" style="z-index: 23; height: 2391px;">' +
        '<header style="z-index:23"><div class="per_tit"> <a href="javascript:void(0);" class="closestyle">' +
        '<i class="per_icon_tit jtx"></i></a><span class="per_tit_span">选择车型</span>';
    if(instance.options.showSearchButton)
        headerHtml += '<a class="per-titr searchMakeorModel" href="javascript:;"><i class="per_icon_tit"></i></a>';
        headerHtml += '</div></header><div class="cont"><div class="jzgzlist backbgf xzpplist cxinglist divTcdetailStyle " style="min-height: ' +
            $(document).height()+ 'px;">' + '</div></div></div>';
    $(instance.options.styleListContainer).html(headerHtml);
    if(instance.isLoaded){
        $(instance.options.styleListContainer).show();
        $(instance.options.modelListContainer).hide();
    }else{
        instance.isLoaded=true;
    }

    var params = {
        modelId:modelObj.modelId,
        isEst:instance.options.isEst?1:0,       //1：表示需要估值
        produceStatus:instance.options.produceStatus //0:表示所有车 1：新车
    }

    $.get(instance.url.getStyleListUrl,params,function (data) {
        if(data.status == instance.RetStatus.Ok){
            var styleList = data.list;
            var groupStyleHtml = "",styleHtml = "";
            var groupNameList = new Array();
            var showGroupName = false;
            for (var i = 0; i < styleList.length; i++) {
                var styleObj = styleList[i];
                showGroupName = true;
                if(groupNameList.length>0){
                    for (var j = 0; j < groupNameList.length; j++) {
                        if (groupNameList[j] == styleObj.styleYear) {
                            showGroupName = false;
                        }
                    }
                }
                if (showGroupName) {
                    groupNameList.push(styleObj.styleYear);
                    styleHtml += '<h3 class="list-tit">' + styleObj.styleYear + '</h3> <ul class="ulstyle" ' +
                        'data-styleYear="' + $.trim(styleObj.styleYear.replace("款", '')) + '">{0}</ul>';
                    if (i > 0) styleHtml = styleHtml.replace("{0}", groupStyleHtml);
                    groupStyleHtml = "";
                }
                groupStyleHtml += '<li class="listyle" data-mSRP="' + styleObj.mSRP + '" data-styleId="' + styleObj.styleId +
                    '" data-styleName="' + $.trim(styleObj.styleName) +
                    '" data-styleYear="' + $.trim(styleObj.styleYear.replace("款", '')) +
                    '" data-nextYear="' + $.trim(styleObj.nextYear) + '"><a href="javascript:void(0);" > ' +
                    '<span>' + $.trim(styleObj.styleName) + '</span></a></li>';



            }
            styleHtml = styleHtml.replace("{0}", groupStyleHtml);
            $(instance.options.styleListContainer).find(".divTcdetailStyle").append(styleHtml);
            $(instance.options.styleListContainer).find("ul>li.listyle").click(function () {
                var _this = $(this);
                $(instance.options.styleListContainer).find("ul>li.listyle.xuanzhong").removeClass("xuanzhong");
                _this.addClass("xuanzhong");
                instance.newStyleObj = new Object();
                instance.newStyleObj.styleId = _this.attr("data-styleId");
                instance.newStyleObj.styleYear = _this.attr("data-styleYear");
                instance.newStyleObj.styleName = _this.attr("data-styleName");
                instance.newStyleObj.nextYear = _this.attr("data-nextYear");
                instance.newStyleObj.mSRP = _this.attr("data-mSRP");
                instance.finishSelect();
                if(typeof callback=="function") callback(instance.newStyleObj);
                else instance.options.callback(instance.newStyleObj);
            });
            if(instance.options.styleId){
                $(instance.options.styleListContainer).find("ul>li.listyle[data-styleid=" +instance.options.styleId+
                    "]").click();
                instance.options.styleId=null;
            }
        }else{
            console.log(data.msg);
            $(instance.options.styleListContainer).find(".divTcdetailStyle").html(data.msg);
        }
        instance.gotoTop();
    },"json");

    $(".closestyle").bind("click",function () {
        $(instance.options.styleListContainer).hide();
        $(instance.options.modelListContainer).show();
    });

    $(".searchMakeorModel").bind("click",function () {
        instance.bindSearchSuggestClick();
    });
}

CarStyle.prototype.finishSelect = function () {
    var instance = this;
    $(instance.options.brandListContainer).hide();
    $(instance.options.modelListContainer).hide();
    $(instance.options.styleListContainer).hide();
    instance.brandObj = instance.newBrandObj;
    instance.modelObj = instance.newModelObj;
    instance.styleObj = instance.newStyleObj;
    instance.styleFullName = "";
    if(instance.brandObj!=null && instance.brandObj.makeName) instance.styleFullName += instance.brandObj.makeName;
    if(instance.modelObj!=null && instance.modelObj.modelName) {
        if(instance.modelObj.modelName.indexOf(instance.brandObj.makeName)!=-1){
            instance.styleFullName="";
        }
        instance.styleFullName += instance.modelObj.modelName;
    }
    if(instance.styleObj!=null && instance.styleObj.styleName) instance.styleFullName+= (" " + instance.styleObj.styleYear+"款 "+instance.styleObj.styleName);
    instance.gotoTop($(instance.options.brandElement).offset().top-($(window).height()/2));
}