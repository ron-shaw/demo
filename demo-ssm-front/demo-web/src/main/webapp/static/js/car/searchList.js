/**
 * Created by jzg on 2017/1/3.
 */

/**
 * Created by wanglijun on 2016/12/29.
 */
var data ={
    "model.IsInternalCarSource":false,
    "model.MakeID":0,
    "model.ModelID":0,
    "model.StyleID":0,
    "model.ProvID":0,
    "model.CityID":0,
    "model.CityName":'',
    "model.PageIndex":1,
    "model.PageSize":10,
    "model.Sore":2,
    "carType":0,
    "isLoan":0,
    "model.CSUserType":0,
    "model.CarSourceFrom":0,
    "model.ModelLevel":0,
    "model.BeginSellPrice":0,
    "model.EndSellPrice":0,
    "model.BeginCarAge":0,
    "model.EndCarAge":0,
    "model.BeginMileage":0,
    "model.EndMileage":0,
    "model.BeginExhaust":0,
    "model.EndExhaust":0,
    "model.BsqSimpleValue":0,
    "model.StyleFullName":"",
    "model.SeatCount":0,
    "model.CountryId":0
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
$(function(){
    //车源
    $('#csUserType li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.CSUserType'] = _this.attr('data');
        _urlData.CSUserType = _this.attr('data');
        getCarSourceCount();
    });
    var _CSUserType=$('#csUserType li.active').attr('data');
    if(_CSUserType){
        data['model.CSUserType']=_CSUserType;
        _urlData.CSUserType = _CSUserType;
    }
    //平台
    $('#carSourceFrom li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.CarSourceFrom'] =_this.attr('data');
        _urlData.CarSourceFrom=_this.attr('data');
        getCarSourceCount();
    });
    var _CarSourceFrom = $('#carSourceFrom li.active').attr('data');
    if(_CarSourceFrom){
        data['model.CarSourceFrom']=_CarSourceFrom;
        _urlData.CarSourceFrom=_CarSourceFrom;
    }
    //车型
    $('#modelLevel li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.ModelLevel'] =_this.attr('data');
        _urlData.ModelLevel=_this.attr('data');
        getCarSourceCount();
    });
    var _ModelLevel=$('#modelLevel li.active').attr('data');
    if(_ModelLevel){
        data['model.ModelLevel']=_ModelLevel;
        _urlData.ModelLevel=_ModelLevel;
    }
    //价格
    $('#carPrice li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.BeginSellPrice'] = _this.attr('data-begin');
        data['model.EndSellPrice'] = _this.attr('data-end');
        _urlData.beginPrice = _this.attr('data-begin');
        _urlData.endPrice = _this.attr('data-end');
        getCarSourceCount();
    });
    var _BeginSellPrice = $('#carPrice li.active').attr('data-begin');
    var _EndSellPrice = $('#carPrice li.active').attr('data-end');
    if(_BeginSellPrice && _EndSellPrice){
        data['model.BeginSellPrice']=_BeginSellPrice;
        data['model.EndSellPrice']=_EndSellPrice;
        _urlData.beginPrice = _BeginSellPrice;
        _urlData.endPrice = _EndSellPrice;
    }
    //车龄
    $('#carAge li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.BeginCarAge'] = _this.attr('data-begin');
        data['model.EndCarAge'] = _this.attr('data-end');
        _urlData.carAge=_this.attr('data');
        getCarSourceCount();
    });
    var _BeginCarAge = $('#carAge li.active').attr('data-begin');
    var _EndCarAge = $('#carAge li.active').attr('data-end');
    if(_BeginCarAge && _EndCarAge){
        data['model.BeginCarAge']=_BeginCarAge;
        data['model.EndCarAge']=_EndCarAge;
        _urlData.carAge=$('#carAge li.active').attr('data');
    }
    //里程
    $('#carMileage li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.BeginMileage'] = _this.attr('data-begin');
        data['model.EndMileage'] = _this.attr('data-end');
        _urlData.carMileage = _this.attr('data');
        getCarSourceCount();
    });
    var _BeginMileage = $('#carMileage li.active').attr('data-begin');
    var _EndMileage = $('#carMileage li.active').attr('data-end');
    if(_BeginMileage && _EndMileage ){
        data['model.BeginMileage']=_BeginMileage;
        data['model.EndMileage']=_EndMileage;
        _urlData.carMileage = $('#carMileage li.active').attr('data');
    }
    //排量
    $('#carExhaust li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.BeginExhaust'] = _this.attr('data-begin');
        data['model.EndExhaust'] = _this.attr('data-end');
        _urlData.carExhaust = _this.attr('data');
        getCarSourceCount();
    });
    var _BeginExhaust = $('#carExhaust li.active').attr('data-begin');
    var _EndExhaust = $('#carExhaust li.active').attr('data-end');
    if(_BeginExhaust && _EndExhaust){
        data['model.BeginExhaust']=_BeginExhaust;
        data['model.EndExhaust']=_EndExhaust;
        _urlData.carExhaust = $('#carExhaust li.active').attr('data');
    }
    //变速箱
    $('#carBsq li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.BsqSimpleValue'] = _this.attr('data');
        _urlData.BsqSimpleValue = _this.attr('data');
        getCarSourceCount();
    });
    var _BsqSimpleValue = $('#carBsq li.active').attr('data');
    if(_BsqSimpleValue){
        data['model.BsqSimpleValue']=_BsqSimpleValue;
        _urlData.BsqSimpleValue = _BsqSimpleValue;
    }
    //座位数
    $('#carSeats li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.SeatCount'] = _this.attr('data');
        _urlData.SeatCount = _this.attr('data');
        getCarSourceCount();
    });
    var _SeatCount = $('#carSeats li.active').attr('data');
    if(_SeatCount){
        data['model.SeatCount']=_SeatCount;
        _urlData.SeatCount = _SeatCount;
    }
    //国别
    $('#country li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        data['model.CountryId'] = _this.attr('data');
        _urlData.CountryId = _this.attr('data');
        getCarSourceCount();
    });
    var _CountryId = $('#country li.active').attr('data');
    if(_CountryId){
        data['model.CountryId']=_CountryId;
        _urlData.CountryId = _CountryId;
    }
    //其他基础数据
    var _MakeID = $('#makeID').val();
    if(_MakeID){
        data['model.MakeID']=$('#makeID').val();
        _urlData.MakeID = $('#makeID').val();
    }
    var _ModelID = $('#modelID').val();
    if(_ModelID){
        data['model.ModelID']=_ModelID;
        _urlData.ModelID=_ModelID;
    }
    var _BeginSellPrice = $('#defaultCarPrice').attr('data-begin');
    var _EndSellPrice = $('#defaultCarPrice').attr('data-end');
    if(_BeginSellPrice && _EndSellPrice){
        data['model.BeginSellPrice']=_BeginSellPrice;
        data['model.EndSellPrice']=_EndSellPrice;
        _urlData.beginPrice=_BeginSellPrice;
        _urlData.endPrice=_EndSellPrice;
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
        _urlData.CityID= _CityID;
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
        _urlData.carType = _carType;
    }
    var _isLoan = $('#isLoan').val();
    if(_isLoan){
        data.isLoan=_isLoan;
        _urlData.isLoan=_isLoan;
    }
    if(data.carType == 2){
        $('.newCardisplay').hide();
    }else{
        $('.newCardisplay').show();
    }
    var _styleFullName = $('#styleFullName').val();
    if(_styleFullName){
        data['model.StyleFullName']=_styleFullName;
        _urlData.StyleFullName = _styleFullName;
    }
    getCarSourceCount();
})
function getCarSourceCount() {
    $.ajax({
        type:'POST',
        dataType:'json',
        data:data,
        url:"/ershouche/searchCarCount",
        success:function (e) {
            if(e.data){
                $('#totalNumber').html(e.data);
            }else{
                $('#totalNumber').html(0);
            }
        }
    });
}
function searchCarSource() {
    goToUrl();
}
function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
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
function clearConditon() {
    data ={
        "model.IsInternalCarSource":false,
        "model.CityName":'',
        "model.PageIndex":1,
        "model.PageSize":10,
        "model.Sore":2,
        "isLoan":0,
        "model.CSUserType":0,
        "model.CarSourceFrom":0,
        "model.ModelLevel":0,
        "model.BeginSellPrice":0,
        "model.EndSellPrice":0,
        "model.BeginCarAge":0,
        "model.EndCarAge":0,
        "model.BeginMileage":0,
        "model.EndMileage":0,
        "model.BeginExhaust":0,
        "model.EndExhaust":0,
        "model.BsqSimpleValue":0,
        "model.SeatCount":0,
        "model.CountryId":0
    }
    _urlData={
        "cityOrMakeName":"c",
        "makeNameAndModelName":"",
        "CarSourceFrom":0,
        "ModelLevel":0,
        "BsqSimpleValue":0,
        "carAge":0,
        "carMileage":0,
        "carExhaust":0,
        "beginPrice":0,
        "endPrice":0,
        "CountryId":0,
        "SeatCount":0,
        "isLoan":0,
        "CSUserType":0,
        "CityName":''
    }
    if($('#carType').val()){
        _urlData.carType=$('#carType').val();
        data.carType=$('#carType').val();
    }else{
        _urlData.carType=0;
        data.carType=0;
    }
    if($('#makeID').val()){
        _urlData.MakeID = $('#makeID').val();
        data['model.MakeID']=$('#makeID').val();
    }else{
        _urlData.MakeID = 0;
        data['model.MakeID']=0;
    }
    if($('#modelID').val()){
        _urlData.ModelID=$('#modelID').val();
        data['model.ModelID']=$('#modelID').val();
    }else{
        _urlData.ModelID=0;
        data['model.ModelID']=0;
    }
    if($('#provID').val()){
        data['model.ProvID']=$('#provID').val();
    }else{
        data['model.ProvID']=0;
    }
    if($('#styleID').val()){
        _urlData.StyleID=$('#styleID').val();
    }else{
        _urlData.StyleID=0;
    }
    if($('#cityID').val()){
        data['model.CityID']=$('#cityID').val();
    }else{
        data['model.CityID']=0;
    }
    if($('#isLoan').val()){
        data.isLoan=$('#isLoan').val();
    }else{
        data.isLoan=0;
    }
    var _styleFullName = $('#styleFullName').val();
    if(_styleFullName){
        data['model.StyleFullName']=_styleFullName;
        _urlData.StyleFullName = _styleFullName;
    }else{
        _urlData.StyleFullName="";
    }
    var _isLoan = $('#isLoan').val();
    if(_isLoan){
        data.isLoan=_isLoan;
        _urlData.isLoan=_isLoan;
    }else{
        data.isLoan=0;
        _urlData.isLoan=0;
    }
    var _Sore = $('#sore').val();
    if(_Sore){
        data['model.Sore']=_Sore;
        _urlData.Sore=_Sore;
    }else{
        data['model.Sore']=2;
        _urlData.Sore=2;
    }
    $("ul").each(function(){
        var li= $(this).children().first();
        li.addClass('active').siblings().removeClass('active');
    });
    getCarSourceCount();
}
function goToUrl() {
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
                console.log(_data);
                if(_data.cityId){
                    console.log(_data.cityId.seomatchspell)
                    var cityPinyin = _data.cityId.seomatchspell;
                    if(cityPinyin){
                        _urlData.cityOrMakeName='c'+cityPinyin;
                    }
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
                }else if(_data.makeId){
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
    var _url = "/ershouche/"+_urlData.cityOrMakeName+"/"+_urlData.makeNameAndModelName+"-j"+_urlData.Sore
        +"-0-"+_urlData.CSUserType+"-"+_urlData.ModelLevel+"-"+_urlData.BsqSimpleValue+"-"+_urlData.carAge+"-"+_urlData.carMileage+"-"
        +_urlData.carExhaust+"-"+_urlData.beginPrice/10000+"-"+_urlData.endPrice/10000+"-"+_urlData.carType+"-"+_urlData.isLoan+"-"+_urlData.CountryId+"-"+_urlData.CarSourceFrom+"-"+_urlData.SeatCount+"t"+_urlData.StyleFullName+".html";
    console.log(_url);
    window.location.href=_url;
}


