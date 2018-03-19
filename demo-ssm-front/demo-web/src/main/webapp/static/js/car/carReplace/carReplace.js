var myCarStyle, myCarArea, newCarBrand, newCarArea; //爱车车型、注册区域、新车品牌、新车城市
var isLoaded = false, url = "/car/carReplace/toNewCarList";
var myCarParam = null, newCarParam = null, cookieCityId = null;  //初始化参数
var elements = {
    newCar:{
        ulCarLevel:"#ulCarLevel",   //新车车型，大型、中型等
        ulProductType:"#ulProductType",  //国别，生产类型：国产、进口
        ulGearBoxType:"#ulGearBoxType",   //变速箱：手动、自动
        ulPriceScope:"#ulPriceScope"   //价格范围
    }
}

//初始化
function init(myCar, newCar, cityId) {

    if(myCar!=null) myCarParam = myCar;
    if(newCar!=null) newCarParam = newCar;
    if(cityId!=null) cookieCityId = cityId;

    // 旧车信息初始化
    initMyCar();

    //新车信息初始化
    initNewCar();

    //事件绑定
    bindEvent();

    if(newCarParam != null){
        if (newCarParam.priceScopeId != null && newCarParam.priceScopeId != ""){
            $(elements.newCar.ulPriceScope+">li[data=" + newCarParam.priceScopeId +"]").addClass("active")
                .siblings("li").removeClass("active");
        }
        if (newCarParam.gearBoxTypeId != null){
            $(elements.newCar.ulGearBoxType+">li[data=" + newCarParam.gearBoxTypeId +"]").addClass("active")
                .siblings("li").removeClass("active");
        }
        if (newCarParam.productTypeId != null){
            $(elements.newCar.ulProductType+">li[data=" + newCarParam.productTypeId +"]").addClass("active")
                .siblings("li").removeClass("active");
        }
        if (newCarParam.modelLevelId != null){
            $(elements.newCar.ulCarLevel+">li[data=" + newCarParam.modelLevelId +"]").addClass("active")
                .siblings("li").removeClass("active");
        }
    }
}

//初始化我的爱车信息
function initMyCar() {
    myCarStyle = new CarStyle().init({
        brandElement: '#changeMyCarBrand',   //触发显示品牌页面的元素
        brandListContainer:'#containerMyCarMake',  //品牌列表容器
        modelListContainer:'#containerMyCarModel',  //车系列表容器
        styleListContainer:'#containerMyCarStyle',  //车型列表容器
        searchListContainer:'#containerMakeOrModelSearch', //搜索列表容器
        showSearchButton:true,
        showHotBrand:true,
        level:3,
        isEst:true,
        produceStatus:0,
        brandId: myCarParam!=null?myCarParam.makeId:null,
        modelId: myCarParam!=null?myCarParam.modelId:null,
        styleId: myCarParam!=null?myCarParam.styleId:null,
        callback:bindDataMyCarStyle
    });
    myCarArea = new City().init({
        cityElement:'#changeMyCarArea',
        cityListContainner:'#containerAreaList',
        cityId:myCarParam!=null?myCarParam.cityId:(cookieCityId!=null?cookieCityId:null),
        callback:bindDataMyCarArea
    });
}

//初始化新车信息
function initNewCar() {
    newCarBrand = new CarStyle().init({
        brandElement: '#changeNewCarBrand',
        brandListContainer: '#containerNewCarBrand',
        searchListContainer:'#containerMakeOrModelSearch',
        showSearchButton:true,
        level:1,
        showHotBrand:true,
        produceStatus:1,
        brandId: newCarParam!=null?newCarParam.makeId:null,
        callback:bindDataNewCarBrand
    });
    newCarArea = new City().init({
        cityElement:'#changeNewCarArea',
        cityListContainner:'#containerNewCarAreaList',
        cityId:(newCarParam!=null && newCarParam.cityId) ? newCarParam.cityId : (myCarParam!=null ?
            myCarParam.cityId : cookieCityId) ,
        callback:bindDataNewCarArea
    });
}

//绑定事件
function bindEvent() {
    //注册时间点击时间
    $("#changeRegYear").bind("click", function () {
        if (myCarStyle.styleObj == null || myCarStyle.styleObj.styleId==null) {
            alert("请先选择品牌车型");
        }else{
            resetDateScope();
        }
    });

    //选择新车条件
    $(".ulxztiaojian li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active").siblings(".hdtiaojian").val($(this).attr("data"));
    });

    //提交申请
    $("#btnGo").bind("click",function () {
        var regularYear = /^(([1-9]+)|([1-6][0-9]+)|([0-9]+\.[0-9]{1,2}))$/;
        var myCarStyleId = Number(myCarStyle.styleObj.styleId),
            myCarMakeId = Number(myCarStyle.brandObj.makeId),
            myCarModelId = Number(myCarStyle.modelObj.modelId),
            regYear = Number($("#hdRegYear").val()),month = Number($("#hdRegMonth").val()),
            mileage = Math.round(Number($("#txtMileage").val()) * 10000),
            provId = Number(myCarArea.cityObj.provID),
            cityId = Number(myCarArea.cityObj.cityID),
            newMakeId = Number(newCarBrand.brandObj.makeId),
            newProvId = Number(newCarArea.cityObj.provID),
            newCityId = Number(newCarArea.cityObj.cityID),
            priceScope = $.trim($(elements.newCar.ulPriceScope+">li.active").attr("data")),
            gearBoxType = $.trim($(elements.newCar.ulGearBoxType+">li.active").attr("data")),
            productType = $.trim($(elements.newCar.ulProductType+">li.active").attr("data")),
            modelLevelId = $.trim($(elements.newCar.ulCarLevel+">li.active").attr("data"));
        var regdate = regYear + "/" + month + "/1";
        var endDate = new Date();
        var priceArr = priceScope.split("-");
        var minprice = Number(priceArr[0]);
        var maxprice = Number(priceArr[1]);
        if (isNaN(myCarStyleId) || myCarStyleId <= 0) { alert("请选择车辆信息");return;}
        if (isNaN(regYear) || isNaN(month) || regYear<=0 || month<=0) {alert("请选择上牌时间");return;}
        var monthNum = Number(new Date(regdate).dateDiff('m', endDate));
        if (isNaN(mileage) || !regularYear.test(mileage/10000)) { alert("请输入正确的行驶里程"); return; }
        else if (mileage > monthNum*10000) { alert("行驶里程不能超过" + monthNum + "万公里"); return; }
        if (isNaN(cityId) || cityId<=0) { alert("请选择上牌地区"); return; }
        if (isNaN(newMakeId) || newMakeId <= 0) { alert("请选择新车品牌");return;}
        if (isNaN(newCityId) || newCityId<=0) { alert("请选择置换城市"); return; }
        var params = {
            params: {
                myCarParam: {
                    makeId: myCarMakeId,
                    modelId: myCarModelId,
                    styleId: myCarStyleId,
                    cityId: cityId,
                    provId: provId,
                    regYear: regYear,
                    regMonth: month,
                    regDate: regdate,
                    mileage: mileage
                },
                newCarParam: {
                    cityId: newCityId,
                    makeId: newMakeId,
                    modelLevelId: modelLevelId,
                    priceScopeId: priceScope,
                    minPrice: minprice,
                    maxPrice: (!isNaN(maxprice) && maxprice > 0) ? maxprice : null,
                    gearBoxTypeId: gearBoxType,
                    productTypeId: productType
                }
            }
        };
        $.cookie("carRplParam", JSON.stringify(params.params), {expires:24*60*60});
        formCommit(url,params);
    });

}

//form表单提交
function formCommit(url, paramObj) {
    var newForm = document.createElement("form");
    newForm.action = url;
    newForm.method = "post";
    for(var key in paramObj){
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = JSON.stringify(paramObj[key]);
        newForm.appendChild(input);
    }
    document.body.appendChild(newForm);
    newForm.submit();
}

//回显我的车型
function bindDataMyCarStyle(styleObj) {
    var brandObj = myCarStyle.brandObj;
    var modelObj = myCarStyle.modelObj;

    $("#changeMyCarBrand").text(myCarStyle.styleFullName).addClass("col3");
    if(isLoaded){
        $("#txtMileage").val("");

        $("#hdRegYear").val("");
        $("#hdRegMonth").val("");
        $("#changeRegYear").text("请选择上牌时间").removeClass("col3");
    }else {
        isLoaded = true;
    }

    var currYear = new Date().getFullYear(), currMonth = new Date().getMonth();
    if ($.trim(styleObj.nextYear)==null || $.trim(styleObj.nextYear)==""){
        currMonth = currMonth==0?12:currMonth;
    } else{
        var nextYear = Number(styleObj.nextYear)+1;
        if (nextYear < Number(currYear)) {
            currYear = nextYear;
            currMonth = 12;
        }
    }
    var mindate = Number(styleObj.styleYear) - 1 + "/6/1";
    var maxdate = currYear + "/" + currMonth + "/1";
    var redate = new Mobile_SelectDate_v1("changeRegYear", "containerRegDate", mindate, maxdate, false, false);
    redate.initHidden("hdRegYear", "hdRegMonth");
}

//回显新车品牌
function bindDataNewCarBrand(brandObj) {
    $("#changeNewCarBrand").text(newCarBrand.styleFullName);
}

//回显我的车注册城市
function bindDataMyCarArea(cityObj) {
    $("#changeMyCarArea").css("color","black").text(cityObj.cityName);
}

//回显新车城市
function bindDataNewCarArea(cityObj) {
    $("#changeNewCarArea").text(cityObj.cityName);
}

//重置上牌日期可选范围
function resetDateScope() {
    var date = new Date();
    var mindate = Number(myCarStyle.styleObj.styleYear) - 1 + "/6/1";
    var maxdate = date.getFullYear() + "/" + date.getMonth() + "/1";
    if (new Date().getMonth() == 0) {
        maxdate = Number(date.getFullYear()) - 1 + "/12/1";
    }
    var styleYear = Number(myCarStyle.styleObj.styleYear);
    var nextYear = Number(myCarStyle.styleObj.nextYear);
    if (!isNaN(nextYear) &&  styleYear< Number(date.getFullYear() - 1)) {
        maxdate = nextYear + "/1/1";
    }
    var redate = new Mobile_SelectDate_v1("changeRegYear", "containerRegDate", mindate, maxdate, false, false);
    redate.initHidden("hdRegYear", "hdRegMonth");
    $(".sectiontop1").show();
}