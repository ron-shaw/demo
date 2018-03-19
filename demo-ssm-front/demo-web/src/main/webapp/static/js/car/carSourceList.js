/**
 * Created by wanglijun on 2016/12/29.
 */
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
    "carType":0,
    "isLoan":0
}
var _urlData={
    "cityOrMakeName":"c",
    "makeNameAndModelName":"",
    "Sore":2,
    "CarSourceFrom":0,
    "ModelLevel":0,
    "BsqSimpleValue":0,
    "carAge":0,
    "carMileage":0,
    "carExhaust":0,
    "beginPrice":0,
    "endPrice":0,
    "StyleFullName":"",
    "CountryId":0,
    "SeatCount":0,
    "carType":0,
    "isLoan":0,
    "CSUserType":0,
    "MakeID":0,
    "ModelID":0,
    "StyleID":0,
    "ProvID":0,
    "CityID":0,
    "CityName":'',
}
var load_flag = true;
var bodyScrollTop = 0;
$(function(){
    if($('#zwsy_id').length>0){
        $('body').addClass("backbg2");
        $('#carList').addClass("backbg2");
        $('.zwsy_div').show();
    }
    //新车  只显示品牌和更多
    if($('#carType').val() == 2){
        $('#loan').hide();
        $('#default_sore').hide();
        $('#defaultSore').hide();
    }else{
        $('#loan').show();
        $('#default_sore').show();
        $('#defaultSore').show();
    }
    $('.buy-cartabc span').click(function(){
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        $('.zmclbc .zmclb').eq(_this.index()).show().siblings().hide();
        _urlData.carType =_this.attr("carType");
        data['model.PageIndex']=1;
        bodyScrollTop=0;
        load_flag = true;
        goToUrl();
    });
    if(!$.trim($('#condition').html())){
        $('#condition').hide();
    }else{
        $('#condition').show();
    }
    bindConditionSpan();
    $('.zmr_ul.clearfix li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        var _data = _this.attr('data-attr');
        $('#default_sore').html(_data);
        $('#defaultulshow').css('display','none');
        _urlData.Sore=_this.attr('data');
        goToUrl();
    });
    $(".claosebox").click(function () {
        $("#sectionul1").show();
        $("#sectionSearchCeng").hide();
        if ($('#txtword').val() == "") {
            $("#txtword").val("");
        }
    });

    $(".divSectionSearch").click(function () {
        $('#sectionSearchCeng').show();
        $('#txtkeyword').focus();
        $('#sectionul1').hide();
        if ($('#txtword').val() == '请输入汽车品牌、型号、或拼音')
        { $(this).val(''); }
        $('#sectionSearchCeng').scroll(0);
    });
    //拖动车源列表到底部加载数据
    $('.zmclb').on("touchmove", function (event) {
        bodyScrollTop=$('body').scrollTop();
        //touchstart:     //手指放到屏幕上时触发
        //touchmove:      //手指在屏幕上滑动时触发
        //touchend:       //手指离开屏幕时触发
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        //滚动条拖动到底部时加载数据
        if (bodyScrollTop +700>= documentHeight - windowHeight) {
            if(load_flag){
                load_flag = false;
                if($('#loadingMore')){
                    $('#loadingMore').hide();
                    $('#loading').show();
                }
                data["model.PageIndex"]++;
                getCarList();
            }
        }
    })
    //选择城市
    var ksPingguArea = new Mobile_SelectCity_v1("liSelectArea_Ks", "SectionSelectArea_Ks", true, true);
    ksPingguArea.initHidden("hdProvenceId_Ks", "hdCityId_Ks");
    ksPingguArea.AfterSelectArea = function(){
        $("#liSelectArea_Ks").removeClass("col3 al_tit_r10");
        data['model.ProvID'] = $('#hdProvenceId_Ks').val();
        data['model.CityID'] = $('#hdCityId_Ks').val();
        if($('#liSelectArea_Ks').html() == '全国'){
            data['model.CityName'] = "";
        }else{
            data['model.CityName'] = $('#liSelectArea_Ks').html();
        }
        data['model.PageIndex'] = 1;
        goToUrl();
    };
    //品牌选择
    var ksPingguCar = new Mobile_SelectCar_v1(2, "liSelectCar_Ks", "SectionSelectCar_Ks", "sectionMakeOrModelSearch", false, true, true, false);
    ksPingguCar.initHidden("hdMakeId_Ks", "hdModelId_Ks", "hdStyleId_Ks", "hdStyleYear_Ks", "hdNextStyleYear_Ks");
    ksPingguCar.AfterSelectCar = function () {
        $('#liSelectCar_Ks').html("品牌").removeClass("col3");
        var makeId = $('#hdMakeId_Ks').val();
        var modelID = $('#hdModelId_Ks').val();
        if(makeId && $.trim(makeId)){
            data['model.MakeID'] = makeId;
        }
        if(modelID && $.trim(modelID)){
            data['model.ModelID'] = modelID;
        }
        data['model.PageIndex'] = 1;
        _urlData.StyleFullName = "";
        goToUrl();
    }
    //车源
    var _CSUserType = $('#csUserType').val();
    if(_CSUserType){
        data['model.CSUserType']=_CSUserType;
        _urlData.CSUserType = _CSUserType;
    }
    //平台
    var _CarSourceFrom = $('#carSourceFrom').val();
    if(_CarSourceFrom){
        data['model.CarSourceFrom']=_CarSourceFrom;
        _urlData.CarSourceFrom=_CarSourceFrom;
    }
    //车型
    var _ModelLevel = $('#modelLevel').val();
    if(_ModelLevel){
        data['model.ModelLevel']=_ModelLevel;
        _urlData.ModelLevel=_ModelLevel;
    }
    //价格
    var _BeginSellPrice = $('#carPrice').attr('data-begin');
    var _EndSellPrice = $('#carPrice').attr('data-end');
    if(_BeginSellPrice && _EndSellPrice){
        data['model.BeginSellPrice']=_BeginSellPrice;
        data['model.EndSellPrice']=_EndSellPrice;
        _urlData.beginPrice=_BeginSellPrice;
        _urlData.endPrice=_EndSellPrice;
    }
    //车龄
    var _BeginCarAge = $('#carAge').attr('data-begin');
    var _EndCarAge = $('#carAge').attr('data-end');
    if(_BeginCarAge && _EndCarAge ){
        data['model.BeginCarAge']=_BeginCarAge;
        data['model.EndCarAge']=_EndCarAge;
        _urlData.carAge=$('#carAge').val();
    }
    //里程
    var _BeginMileage = $('#carMileage').attr('data-begin');
    var _EndMileage = $('#carMileage').attr('data-end');
    if(_BeginMileage && _EndMileage){
        data['model.BeginMileage']=_BeginMileage;
        data['model.EndMileage']=_EndMileage;
        _urlData.carMileage=$('#carMileage').val();
    }
    //排量
    var _BeginExhaust = $('#carExhaust').attr('data-begin');
    var _EndExhaust = $('#carExhaust').attr('data-end');
    if(_BeginExhaust && _EndExhaust){
        data['model.BeginExhaust']=_BeginExhaust;
        data['model.EndExhaust']=_EndExhaust;
        _urlData.carExhaust=$('#carExhaust').val();
    }
    //变速箱
    var _BsqSimpleValue = $('#carBsq').val();
    if(_BsqSimpleValue){
        data['model.BsqSimpleValue']=_BsqSimpleValue;
        _urlData.BsqSimpleValue=_BsqSimpleValue;
    }
    //座位数
    var _SeatCount = $('#carSeats').val();
    if(_SeatCount){
        data['model.SeatCount']=_SeatCount;
        _urlData.SeatCount=_SeatCount;
    }
    //国别
    var _CountryId = $('#country').val();
    if(_CountryId){
        data['model.CountryId']=_CountryId;
        _urlData.CountryId=_CountryId;
    }
    //其他基础数据
    var _MakeID = $('#makeID').val();
    if(_MakeID){
        data['model.MakeID']=_MakeID;
        _urlData.MakeID=_MakeID;
    }
    var _ModelID = $('#modelID').val();
    if(_ModelID){
        data['model.ModelID']=_ModelID;
        _urlData.ModelID=_ModelID;
    }
    var _StyleID = $('#styleID').val();
    if(_StyleID){
        data['model.StyleID']=_StyleID;
        _urlData.StyleID=_StyleID;
    }
    var _ProvID = $('#provID').val();
    if(_ProvID){
        data['model.ProvID']=_ProvID;
        _urlData.ProvID=_ProvID;
    }
    var _CityID = $('#cityID').val();
    if(_CityID){
        data['model.CityID']=_CityID;
        _urlData.CityID=_CityID;
    }
    var _CityName = $('#cityName').val();
    if(_CityName){
        data['model.CityName']=_CityName;
        _urlData.CityName=_CityName;
    }
    var _Sore = $('#sore').val();
    if(_Sore){
        data['model.Sore']=_Sore;
        _urlData.Sore=_Sore;
    }
    var _carType = $('#carType').val();
    if(_carType){
        data.carType=_carType;
        _urlData.carType=_carType;
    }
    var _isLoan = $('#isLoan').val();
    if(_isLoan){
        data.isLoan=_isLoan;
        _urlData.isLoan=_isLoan;
    }
    if(data.isLoan==1){
        $('#loan').addClass('zdqzt');
    }
    var _styleFullName = $('#txtword').val();
    if(_styleFullName){
        data['model.StyleFullName']=_styleFullName;
        _urlData.StyleFullName=_styleFullName;
    }
    $('#liSelectArea_Ks').removeClass('col3');
})
function nofind(obj) {
    obj.src = 'http://res.jingzhengu.com/ptvm/4.0/images/zwt.jpg';
}
function getCarList() {
    $.ajax({
        type:'POST',
        dataType:'json',
        data:data,
        url:"/ershouche/searchCarList",
        success:function (e) {
            if(e && e.data && e.data.length > 0){
                var html = "";
                for(var item in e.data){
                    var carSource = e.data[item];
                    if(carSource){
                        html += "<div class='zescsj'>";
                        if(carSource.isNewCar){
                            html += "<div class='zesbfb active clearfix'>"
                        }else{
                            html += "<div class='zesbfb  clearfix'>"
                        }
                        if(carSource.isNewCar){
                            html += "<a href='"+carSource.url+"'>";
                        }else{
                            html += "<a href='/ershouche/mcarsourcedetail-"+carSource.carSourceId+"-"+carSource.carSourceFrom+".html'>";
                        }
                        html += "<aside class='zes_as1'><img src="+carSource.carSourceImageUrl+" alt='"+carSource.fullName+"' onerror='nofind(this)'></aside>";
                        html += " <aside class='zes_as2'>";
                        if(carSource.isNewCar){
                            html += " <p class='zti_p1 zti_p5'>"+carSource.fullName+"</p>";
                            html += "<p class='zti_p2 zti_p5'>"+carSource.modelLevelName+"</p>";
                            html += "<p class='zti_p3'><label class='zgzlab1'><span class='col6 scale-875'>新车优惠价</span><strong>"+(Number(carSource.minMsrp)).toFixed(2)+"</strong>万</label><label class='zgzlab1 zgzlab-hr'><strong>"+(Number(carSource.maxMsrp)).toFixed(2)+"</strong>万</label></p>";
                        }else{
                            html += " <p class='zti_p1'>"+carSource.fullName+"</p>";
                            html += "<p class='zti_p2'>"+carSource.mileage+"  |  "+carSource.releaseTime+"  |  "+carSource.cityName+"</p>";
                            html += "<p class='zti_p3'>";
                            if(carSource.isLoan){
                                html += "<span class='col6 scale-875'>首付</span>";
                            }
                            html += "<label class='zgzlab1'>";
                            html += "<strong>"+(Number(carSource.sellPrice)).toFixed(2)+"</strong>万";
                            html += "</label>";
                            if(carSource.b2CPrice){
                                html += "<label class='zgzlab2'>";
                                html += "<span class='col6'>精真估估值</span><em>"+(Number(carSource.b2CPrice)).toFixed(2)+"万</em>";
                                html += "</label>";
                            }
                            html += "</p>";
                        }
                        html += "</aside>";
                        html += "</a>";
                        html += "</div>";
                        html += "</div>";
                    }
                }
                if(data['model.PageIndex'] == 1){
                    splicingData(html);
                }else{
                    $('#carList').append(html);
                    load_flag=true;
                }
                var pageSize = e.pageSize;
                var totalCount = e.totalCount;
                var pageIndex = e.nextPageNo;
                if(pageSize > 0 && ((totalCount % pageSize == 0) ? (totalCount / pageSize) : (totalCount / pageSize) + 1) <= pageIndex){
                    $('#loadingDiv').html('');
                }else{
                    if($('#loadingMore')){
                        $('#loadingMore').show();
                        $('#loading').hide();
                    }
                }
            }else{
                if(load_flag){
                    $('#carList').html("");
                    emptyData();
                }
            }
            // var conditions = "";
            // if(e && e.conditionVos){
            //     for(var item in e.conditionVos){
            //         var condition = e.conditionVos[item].key;
            //         var value = e.conditionVos[item].value;
            //         var groupName = e.conditionVos[item].groupName;
            //         var type = e.conditionVos[item].type;
            //         if(value != 0 && condition && condition != 'display' && (data.carType !=2 || groupName != 'usedCar')){
            //             conditions += "<span name='"+item+"' data-type='"+type+"'>"+condition+"</span>";
            //         }
            //     }
            //     if(conditions != ""){
            //         $('#condition').html(conditions);
            //         bindConditionSpan();
            //         $('#condition').show();
            //     }else{
            //         $('#condition').hide();
            //     }
            // }else{
            //     $('#condition').hide();
            // }
        }
    });
}
function changeIsLoan() {
    if(data.isLoan == 1){
        _urlData.isLoan=0;
        goToUrl();
    }else{
        _urlData.isLoan=1;
        goToUrl();
    }
}
function emptyData() {
    $('.zwsy_div').css("display","block");
}
function splicingData(datas) {
    if(datas){
        $('.zwsy_div').css("display","none");
    }else{
        emptyData();
    }
    $('#carList').html(datas);
}
//默认排序
function defaultSore() {

    $("#defaultulshow").toggle();
    if ($("#defaultulshow").css("display") == "block") {
        $("#defaultli").parent("li").addClass("active");
    } else {
        $("#defaultli").parent("li").removeClass("active");
    }
}

function goSearchList() {
    var style = data['model.MakeID'] + "-" + data['model.ModelID'] + "-0";
    var zdyprice = data['model.BeginSellPrice']/10000 + "-" + data['model.EndSellPrice']/10000;//开始价格-结束价格
    var color = "";
    var mils = $('#carMileage').val();
    var sort =data['model.Sore'];
    var city = data['model.ProvID'] + "-" + data['model.CityID'];
    var classfiy = data['model.MakeID'] + "-0-" + data['model.CSUserType'] + "-" + data['model.BsqSimpleValue'] + "-" + $('#carAge').val() + "-0-" + 0 + "-" + $('#carExhaust').val()+"-"+data.carType+"-"+data.isLoan+"-"+data['model.CountryId']+"-"+data['model.SeatCount']+"-"+data['model.CarSourceFrom']+"-"+data['model.ModelLevel'];
    var searchUrl = "/ershouche/gaojilist/s" + style + "c" + city + "k" + zdyprice + "a" + color + "m" + mils;
    searchUrl += "o" + sort + "e" + classfiy + "p1t" + data['model.StyleFullName'];//y是否是高级
    window.location.href=searchUrl;
}
function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "get";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("input");
        opt.name = x;
        opt.value = PARAMS[x];
        if(opt.value){
            temp.appendChild(opt);
        }
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}
function enterSuggest() {
    var _searchValue = $("#txtkeyword").val();
    if(_searchValue){
        _urlData.StyleFullName=_searchValue;
        $('#clearText').show();
    }else{
        _urlData.StyleFullName="";
    }
    $("#txtword").val(_searchValue);
    $("#sectionul1").show();
    $("#sectionSearchCeng").hide();
    if ($('#txtword').val() == "") {
        $("#txtword").val("全网搜车");
    }
    makeNameAndCityName();
    var strIndex = _urlData.cityOrMakeName.indexOf("c");
    if(strIndex == 0){
        window.location.href='/ershouche/'+_urlData.cityOrMakeName+'/-j'+_urlData.Sore+'-0-0-0-0-0-0-0-0-0-'+_urlData.carType+'-'+_urlData.isLoan+'-0-0-0t'+_urlData.StyleFullName+'.html';
    }
}
function searchSuggest() {

    $.ajax({
        type: 'POST',
        async: false,
        url: "/ershouche/hotKeyWordsList",
        data: {
            "searchValue": $("#txtkeyword").val()
        },
        dataType: "json",
        beforeSend: function () {
        },
        success: function (msg) {
            if (msg != "" && msg != null && msg.returnValue) {
                var _data=msg.returnValue;
                var sb = "";
                for(var obj in _data){
                    sb += " <li><a href=\"javascript:void(0);\"><span>" + _data[obj] + "</span></a></li>";
                }
                $("#ulcarsourlist").html(sb);
                $("#ulcarsourlist li a").click(function () {
                    var strDefaultText = $(this).find("span").html();
                    $("#txtword").val(strDefaultText);
                    $("#txtkeyword").val(strDefaultText);
                    _urlData.StyleFullName=strDefaultText;
                    $('#clearText').show();
                    makeNameAndCityName();
                    var strIndex = _urlData.cityOrMakeName.indexOf("c");
                    if(strIndex == 0){
                        window.location.href='/ershouche/'+_urlData.cityOrMakeName+'/-j'+_urlData.Sore+'-0-0-0-0-0-0-0-0-0-'+_urlData.carType+'-'+_urlData.isLoan+'-0-0-0t'+_urlData.StyleFullName+'.html';
                    }
                });
            }
            else {
            }


        },
        error: function (errorMsg) {
        }

    });
}
function delayExecute() {
    var txtkeyWord = $("#txtkeyword").val();
    if(txtkeyWord){
        $('#clearText').show();
    }
    window.setTimeout(function () { searchSuggest() }, 800);
    //延时处理
}
function bindConditionSpan(){
    $('#condition span').click(function () {
        var _this = $(this);
        var _name = _this.attr('name');
        var _type = _this.attr('data-type');
        if(_name=='carExhaust'){
            _urlData.carExhaust=0;
        }else if(_name=='carAge'){
            _urlData.carAge=0;
        }else if(_name=='carPrice'){
            _urlData.beginPrice=0;
            _urlData.endPrice=0;
        }else if(_name=='carMileage'){
            _urlData.carMileage=0;
        }else{
            if(_type=='int'){
                data['model.'+_name]=0;
                _urlData[_name]=0;
            }else{
                data['model.'+_name]="";
                _urlData[_name]="";
            }
        }
        goToUrl();
    });
}
function makeNameAndCityName() {
    $.ajax({
        type: 'POST',
        async: false,
        url: "/ershouche/seoPinyin",
        data: {
            "makeId": data['model.MakeID'],
            "modelId": data['model.ModelID'],
            "provId": data['model.ProvID'],
            "cityId": data['model.CityID']
        },
        dataType: "json",
        beforeSend: function () {
        },
        success: function (msg) {
            if (msg != "" && msg) {
                var _data=msg.data;
                if(_data.cityId){
                    var cityPinyin = _data.cityId.seomatchspell;
                    if(cityPinyin){
                        _urlData.cityOrMakeName='c'+cityPinyin;
                    }
                    if(_urlData.StyleFullName==""){
                        if(_data.makeId ){
                            var makePinyin = _data.makeId.seomatchspell;
                            if(makePinyin){
                                _urlData.makeNameAndModelName="m"+makePinyin;
                                if(_data.modelId){
                                    var modelPinyin = _data.modelId.seomatchspell;
                                    if(modelPinyin){
                                        _urlData.makeNameAndModelName+='-'+modelPinyin;
                                    }
                                }
                            }
                        }else if(_data.modelId){
                            var modelPinyin = _data.modelId.seomatchspell;
                            if(modelPinyin){
                                _urlData.makeNameAndModelName=modelPinyin;
                            }
                        }
                    }
                }else if(_data.makeId && _urlData.StyleFullName == ""){
                    if(_data.makeId ){
                        var makePinyin = _data.makeId.seomatchspell;
                        if(makePinyin){
                            _urlData.cityOrMakeName='m'+makePinyin;
                            if(_data.modelId){
                                var modelPinyin = _data.modelId.seomatchspell;
                                if(modelPinyin){
                                    _urlData.makeNameAndModelName=modelPinyin;
                                }
                            }
                        }
                    }else if(_data.modelId){
                        var modelPinyin = _data.modelId.seomatchspell;
                        if(modelPinyin){
                            _urlData.makeNameAndModelName=modelPinyin;
                        }
                    }
                }
            }
        },
        error: function (errorMsg) {
        }
    });
}
function goToUrl() {
    makeNameAndCityName();
    var _url = "/ershouche/"+_urlData.cityOrMakeName+"/"+_urlData.makeNameAndModelName+"-j"+_urlData.Sore
        +"-0-"+_urlData.CSUserType+"-"+_urlData.ModelLevel+"-"+_urlData.BsqSimpleValue+"-"+_urlData.carAge+"-"+_urlData.carMileage+"-"
        +_urlData.carExhaust+"-"+_urlData.beginPrice/10000+"-"+_urlData.endPrice/10000+"-"+_urlData.carType+"-"+_urlData.isLoan+"-"+_urlData.CountryId+"-"+_urlData.CarSourceFrom+"-"+_urlData.SeatCount+"t"+_urlData.StyleFullName+".html";
    window.location.href=_url;
}
function clearText() {
    $('#txtkeyword').val("");
    $('#clearText').hide();
}


