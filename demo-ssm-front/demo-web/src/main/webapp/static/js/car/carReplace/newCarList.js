var pageNo = 0, pageSize = 10;
var params = null;

function initParam(param) {
    this.params = param;
}

//分页查询新车
function getNewCarPageList() {

    if ($("div.cont .zlsesc.ListNewCar").find(".nomorecar").length > 0) {
        return;
    }

    if($("div.cont .zlsesc.ListNewCar").find(".loading1").length>0){
        return;
    }

    var url = "/car/carReplace/getNewCarPageListHtml";
    params.newCarParam.pageNo = ++pageNo;
    params.newCarParam.pageSize = pageSize;
    var htmlobj = $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(params),
        dataType: "text",
        contentType: "application/json",
        beforeSend:function () {
            $("div.cont .zlsesc.ListNewCar").append("<div class='loading1'><label><img src='/static/images/loading.gif' alt='' /></label>正在加载中..</div>");
        },
        success: function (data) {
            if ($("div.cont .zlsesc.ListNewCar").find(".nomorecar").length > 0) {
                return;
            }
            $("div.cont .zlsesc.ListNewCar").find(".loading1").remove();
            $("div.cont .zlsesc.ListNewCar").append(data);
            if(pageNo>1 && $("div.cont .zlsesc.ListNewCar").find(".zwsy_div").length>0){
                $("div.cont .zlsesc.ListNewCar").find(".zwsy_div").hide();
            }
            resetStyleListStyle();
            bindEvent();
        }
    })
}

function resetStyleListStyle() {
    var top = $("header").height();
    if($(".ad-app")!=undefined &&$(".ad-app").length>0){
        top += $(".ad-app").height();
    }
    if( $(document).scrollTop()>top){
        top =0;
    }
    $(".dvstyleList").css({height: ($(window).height()- top)  + "px", top: top + "px"});
    // $(document).css({"overflow":"hidden"});

}

function bindEvent() {

    //蒙板点击事件（关闭车型选择侧栏）
    $(".zyxzz").unbind("click").bind("click", function (event) {
        $(this).hide();
        $(".dvstyleList").removeClass("styleshow").removeClass("mover");
        resetStyleListStyle();
        $(document.body).css("overflow", "");
    });

    //选择车型点击事件
    $(".dvModelList .zes_as2").find("p.zfhtj_p1.pselectstyle").unbind("click").bind("click", function (ev) {
        var _model = $(this).parents(".zes_as2");
        var _modelParent = _model.parents(".dvModelList");
        _modelParent.removeClass("z-0").addClass("z-1").find(".zyxzz").show(); //蒙板
        _modelParent.siblings().addClass("z-0").removeClass("z-1");
        _modelParent.siblings(".dvModelList").find(".dvstyleList").removeClass("styleshow").removeClass("mover");
        resetStyleListStyle();
        var modelId = _model.attr("data-modelId");
        $(".dvstyleList[data-modelId=" + modelId + "]").addClass("styleshow mover");
        $(".dvstyleList[data-modelId=" + modelId + "]").find("ul>li.listyleinfo").bind("click keydown mousedown", function () {
            var _style = $(this);
            var styleObj = new Object();
            styleObj.styleId = _style.attr("data-styleId");
            styleObj.modelId = _style.attr("data-modelId");
            styleObj.year = _style.attr("data-year");
            styleObj.fullName = _style.attr("data-fullName");
            styleObj.nowMsrp = _style.attr("data-nowMsrp");
            styleObj.styleName = _style.attr("data-styleName");
            styleObj.apply = _style.attr("data-apply");
            reverseModelStyleInfo(styleObj, _model);
            $(".zyxzz").click();
        });
        bindEvent();
        $(document.body).css("overflow", "hidden");
        if (_model.find(".dvstyleList li").length > 0) {
            var postop = $(window).scrollTop();

            _model.find(".dvstyleList").toggleClass("styleshow").show().toggleClass("mover"); //toggle();//;
            if (_model.find(".dvstyleList").hasClass("styleshow")) {
                $(document.body).css("overflow", "hidden");
                _model.find(".dvstyleList").height($(window).height - top);
            } else {
                $(document.body).css("overflow", "")
            }
        }
    });


    //申请按钮
    $("span.zdb_sp1.btnAddShenqing").unbind().bind("click", function () {
        var _this = $(this);
        _this.toggleClass("zdb_sp1_1");
        var _model = _this.parent().parent();
        var modelId = _model.attr("data-modelId"), styleId = _model.attr("data-styleId");

        $(".dvstyleList[data-modelId=" + modelId + "]")
            .find("ul>li.listyleinfo[data-styleId=" + styleId + "]")
            .attr("data-apply", _this.parent().find(".zdb_sp1_1").length);
        var applyNum = $(".dvstyleList").find("ul>li.listyleinfo[data-apply=" + "1]").length;

        if (applyNum > 4) {
            alert("申请最多不能超过4个");
            _this.toggleClass("zdb_sp1_1");
            $(".dvstyleList[data-modelId=" + modelId + "]")
                .find("ul>li.listyleinfo[data-styleId=" + styleId + "]")
                .attr("data-apply", _this.parent().find(".zdb_sp1_1").length);
            return;
        }

        resetApplyInfo();
    });

    // $(document.body).css("overflow", "hidden");


    $(document,window).unbind("scroll touchmove").bind("scroll touchmove", function (e) {
        var scrolltop = $(document).scrollTop();
        if(scrolltop<=0){
            $("header").show();
            $(".ad-app").show();
            if($(".dvstyleList").hasClass("styleshow")){
                resetStyleListStyle();
            }
        }else if(scrolltop>0){
            if ($(".dvstyleList").hasClass("styleshow")) {
                $("header").hide();
                $(".ad-app").hide();
                resetStyleListStyle();
            }
            if (scrolltop >= ($(document).height() - $(window).height()-1000)) {
                getNewCarPageList();
            }
        }

    });
}

function reverseModelStyleInfo(styleObj, modelElement) {
    modelElement.find(".pFirststyle").text(styleObj.year + "款 " + styleObj.styleName);
    modelElement.find(".zdb_sp1.btnAddShenqing").removeClass("zdb_sp1_1");
    if (styleObj.apply == 1) {
        modelElement.find(".zdb_sp1.btnAddShenqing").addClass("zdb_sp1_1");
    }
    modelElement.attr("data-styleId", styleObj.styleId);
    modelElement.attr("data-year", styleObj.year);
    modelElement.attr("data-nowMsrp", styleObj.nowMsrp);
    modelElement.attr("data-fullName", styleObj.fullName);
    modelElement.attr("data-modelId", styleObj.modelId);
    $(".dvstyleList[data-modelId=" + styleObj.modelId + "]").removeClass("styleshow mover");
    bindEvent();
}

function resetApplyInfo(showApplyButton) {
    var applyMenuButton = $(".zdbyq.fd_applay");
    var applyListContainer = $("#tcDiv")
    var styleArr = getApplyStyleList();
    if (styleArr.length > 0) {
        applyMenuButton.find("a.aappcount").text("申请" + styleArr.length);
        applyListContainer.find("#tctit .lbappcount").text("(" + styleArr.length + "/4)");
        if (typeof showApplyButton != undefined && showApplyButton == false) {
            applyMenuButton.hide();
        } else {
            applyMenuButton.show();
        }
        var html = "";
        for (var key in styleArr) {
            var obj = styleArr[key];
            html += '<li class="lifcshq" data-modelId="' + obj.modelId + '" data-styleId="' + obj.styleId + '" >';
            html += '<span>' + obj.fullName + '</span>';
            html += '<span class="buycartanc-cloico lifcdeletesq"></span>';
            html += '</li>';
        }
        html += '<div class="btn wid94 bor-rano mt20 dvgozhihuan">';
        html += '<a href="javascript:void(0);">提交申请</a>';
        html += '</div>';
        applyListContainer.find("ul.ulfdapply").html(html);

        applyMenuButton.unbind().bind("click", function () {
            var top = ($(window).height() - applyListContainer.height()) / 2;
            var left = ($(window).width() - applyListContainer.width()) / 2;
            applyListContainer.css({position: 'fixed', 'top': top , left: left }).show();
            applyMenuButton.hide();
        });
        applyListContainer.find(".buycartanc-cloico.lifcdeletesq").click(function () {
            var li = $(this).parent();
            var modelId = li.attr("data-modelId"), styleId = li.attr("data-styleId");
            $(this).parent().remove();
            $(".dvstyleList[data-modelId=" + modelId + "]")
                .find("ul>li.listyleinfo[data-styleId=" + styleId + "]")
                .attr("data-apply", 0);
            $(".dvModelXinxi .zes_as2[data-modelId=" + modelId + "][data-styleId=" +styleId+
                "]").find(".btnAddShenqing").removeClass("zdb_sp1_1");
            resetApplyInfo(false);
        });

        applyListContainer.find(".btn.wid94.bor-rano.mt20.dvgozhihuan").click(function () {
            //TODO 提交申请
            var url = '/car/carReplace/toConfirmPriceDiff';
            var styleArr = getApplyStyleList();
            var paramObj = new Object();
            paramObj.params = params;
            paramObj.styleIds = new Array();
            for (var key in styleArr) {
                paramObj.styleIds.push(styleArr[key].styleId);
            }
            formCommit(url, paramObj);
        });
    } else {
        applyMenuButton.hide();
        applyListContainer.hide();
        $("span.zdb_sp1.btnAddShenqing").removeClass("zdb_sp1_1");
    }
}

function formCommit(url, paramObj) {
    var newForm = document.createElement("form");
    newForm.action = url;
    newForm.method = "post";
    for (var key in paramObj) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = JSON.stringify(paramObj[key]);
        newForm.appendChild(input);
    }
    document.body.appendChild(newForm);
    newForm.submit();
}

function getApplyStyleList() {
    var styleArr = new Array();
    $(".dvstyleList").find("ul>li.listyleinfo[data-apply=" + "1]")
        .each(function (i, e) {
            var styleElement = $(this);
            var styleObj = new Object();
            styleObj.styleId = styleElement.attr("data-styleId");
            styleObj.modelId = styleElement.attr("data-modelId");
            styleObj.year = styleElement.attr("data-year");
            styleObj.nowMsrp = styleElement.attr("data-nowMsrp");
            styleObj.fullName = styleElement.attr("data-fullName");
            styleArr.push(styleObj);
        });
    return styleArr;
}


/*
var CarChange = {
    options:{
        carStyleId:null,  //车型
        date:null,
        miles:0,
        cityId:null,
        carStyleName:'',
        cityName:''
    },
    elements:{
        myCar:{
            el_changeCarStyle:'',  //品牌车型元素
            el_changeDate:'',      //上牌时间元素
            el_changeMiles:'',     //公里数元素
            el_changeCity:'',       //上牌地区
            formCarStyle:'',
            formDate:'',
            formMiles:'',
            formCity:''
        },
        newCar:{
            el_changeCarStyle:'',  //车型
            el_changeCarBrand:'',  //品牌
            el_changeCity:'',       //置换城市
            el_changePriceScope:'',  //价格范围
            el_changeCarGearbox:'',  //变速箱
            el_changeMakePlace:'',  //国别
            formCarStyle:'',        //车型
            formCarBrand:'',        //品牌
            formCity:'',        //置换城市
            formPriceScope:'',  //价格范围
            formCarGearbox:'',  //变速箱
            formMakePlace:''    //国别
        }
    },
    url:{
        getCarBrandUrl:'/getMakeModelStyleAll/makeList',
        getCarModelUrl:'/getMakeModelStyleAll/modelList',
        getCarStyleUrl:'/getMakeModelStyleAll/styleList',
        getSearchSuggestListUrl:'/getMakeModelStyleAll/searchSuggestList',
        getCityUrl:'/areacity/citylist'
    },
    form:{
        myCarInfo:{
            carStyleId:null,  //车型
            date:null,
            miles:0,
            cityId:null
        },
        newCarInfo:{
            carStyleId:'',  //车型
            carBrandId:'',  //品牌
            cityId:'',       //置换城市
            priceScopeType:'',  //价格范围
            carGearboxType:'',  //变速箱
            makePlaceType:''  //国别
        }
    }
}

/!**
 * 初始化对象
 * @param options
 *!/
CarChange.prototype.init = function(options){
    var instance = this;
    if(typeof options != undefined){
        if(options instanceof Object){
            if(options.carStyleId) instance.options.carStyleId = options.carStyleId;
            if(options.date) instance.options.date = options.date;
            if(options.miles) instance.options.miles = options.miles;
            if(options.cityId) instance.options.cityId = options.cityId;
        }
    }
}

//事件绑定
CarChange.prototype.bindEvent = function () {
    var instance = this;
    $(instance.elements.myCar.el_changeCarStyle).bind("click",function(){
        //选择我的车型事件

    });
    $(instance.elements.myCar.el_changeCity).bind("click",function () {
        //选择我的上牌城市事件
    });
    $(instance.elements.myCar.el_changeDate).bind("click",function () {
        //点击选择时间事件
    });
    $(instance.elements.myCar.el_changeMiles).bind("change",function () {
        //修改公里数
    });
    $(instance.elements.newCar.el_changeCarStyle).bind("click",function () {
        //选择新车车型
    });
    $(instance.elements.newCar.el_changeCarBrand).bind("click",function () {
        //选择新车品牌
    });
    $(instance.elements.newCar.el_changeCity).bind("click",function () {
        //选择新车置换城市
    });
    $(instance.elements.newCar.el_changePriceScope).bind("click",function () {
        //选择新车价格范围
    });
    $(instance.elements.newCar.el_changeCarGearbox).bind("click",function () {
        //选择新车变速箱
    });
    $(instance.elements.newCar.el_changeCity).bind("click",function () {
        //选择新车国别
    });
}*/
