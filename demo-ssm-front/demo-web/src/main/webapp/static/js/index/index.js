//首页坐标轴
function drag(){
    var oBox = document.querySelector('.bchixbtn1');
    var oBox2 = document.querySelector('.bchixbtn2');
    var oCont = document.querySelector('.bchi');
    var oTxt = document.querySelector('.txt1');
    var otxtT = document.querySelector('.txt1t');
    var oTxt2 = document.querySelector('.txt2');
    var otxt2T = document.querySelector('.txt2t');
    var ohuiBg = document.querySelector('.bchixbghui');
    var oblueBg = document.querySelector('.bchixbgblue');
    var obudgetPrice = document.querySelector('.budget-price');
    var xW = oBox.offsetWidth;
    var xW2 = oBox2.offsetWidth;
    var ocW = oCont.offsetWidth;
    var x = -xW/2;
    var x2 =oCont.offsetWidth-11;
    var isInit = true, isInit2 = true;
    oTxt.innerHTML=0;
    oTxt2.innerHTML='100+';
    otxtT.style.display = 'none';
    otxt2T.style.display = 'none';
    oBox.style.WebkitTransform = 'translate3d('+x+'px,0,0)';
    oBox2.style.WebkitTransform = 'translate3d('+x2+'px,0,0)';
    oTxt2.style.WebkitTransformOrigin = 'left';
    var iNow = 4;
    oblueBg.style.zIndex = iNow;
    x2=98;
    var cookieX = Number($.cookie('xl'));
    var cookieX2 = Number($.cookie('xr'));
    if(!isNaN(cookieX)){
        x = Number(cookieX.toFixed(0));
    }

    if(!isNaN(cookieX2)){
        x2 = Number(cookieX2.toFixed(0));
    }
    touchMove();
    if(x2=="0"){
        oBox2.style.WebkitTransform = 'translate3d('+x2+'px,0,0)';
    }else{
        touchMove2();
    }
  //  touchMove2();
    touchEnd2();
    touchEnd();


    function touchMove(){
        var Num = 5;
        var oT=(x+xW/2)/(ocW/9)*Num;

        if(oT<=0){
            oT=0
        }
        if(oT>20&&oT<=30){
            Num=10
            oT=(x+xW/2)/(ocW/9)*Num-20;
        }
        if(oT>30&&oT<=70){
            Num=20;
            oT=(x+xW/2)/(ocW/9)*Num-70;
        }
        if(oT>70&&oT<=100){
            Num=30;
            oT=(x+xW/2)/(ocW/9)*Num-140;
        }
        oTxt.innerHTML=(oT.toFixed(0));
        if(oTxt.innerHTML>=100){
            x = oCont.offsetWidth-oCont.offsetWidth/9-xW/2;
            oTxt.innerHTML = '100';
            oTxt.style.WebkitTransformOrigin = '5px';
            oBox.style.WebkitTransform = 'translate3d('+x+'px,0px,0)';
        }else{
            if(x<=0){
                x=-xW/2;
            }
            if((x+xW)>ocW){
                x=ocW-xW;
            }
            oTxt.style.WebkitTransformOrigin = 'center';
            oBox.style.WebkitTransform = 'translate3d('+x+'px,0px,0)';
        }


        otxtT.style.display = 'block';
        otxtT.innerHTML = oTxt.innerHTML;
        oblueBg.style.zIndex = iNow-1;
        ohuiBg.style.width = x+xW/2+'px';
        oblueBg.style.width = x2+xW2/2+'px';
        move();
        if(x2<x+xW/4){
            x2=(x+xW/4);
            var Num = 5;
            var oT2=(x2+xW2/2)/(ocW/9)*Num;
            if(oT2>20&&oT2<=30){
                Num=10;
                oT2=(x2+xW2/2)/(ocW/9)*Num-20;
            }
            if(oT2>30&&oT2<=70){
                Num=20;
                oT2=(x2+xW2/2)/(ocW/9)*Num-70;
            }
            if(oT2>70&&oT2<=100){
                Num=30;
                oT2=(x2+xW2/2)/(ocW/9)*Num-140;
            }
            oTxt.innerHTML=oT.toFixed(0);
            oTxt2.innerHTML=(oT2).toFixed(0);
            if((x2-x)<=5.75){
                oTxt2.innerHTML=(oT+1).toFixed(0);
                x2=x+5.75;
            }
            oBox2.style.WebkitTransform = 'translate3d('+x2+'px,0px,0)';
        }
    }

    function touchEnd(){
        otxtT.style.display = 'none';
        end();
        lend();
        if(oTxt.innerHTML>0&&oTxt2.innerHTML=='100+'){
            obudgetPrice.innerHTML = '价格(<span class="col5087e3">'+oTxt.innerHTML+'万以上</span>)'
        }else if(oTxt.innerHTML>0&&oTxt2.innerHTML<100){
            obudgetPrice.innerHTML = '价格(<span class="col5087e3">'+oTxt.innerHTML+'-'+oTxt2.innerHTML+'万</span>)'
        }else if(oTxt.innerHTML<=0&&oTxt2.innerHTML=='100+'){
            obudgetPrice.innerHTML = '不限'
        }else if(oTxt.innerHTML<=0&&oTxt2.innerHTML!='100+'){

            obudgetPrice.innerHTML = '价格(<span class="col5087e3">'+oTxt2.innerHTML+'万以下</span>)'
        }
        $.cookie('xl',x,{expires:7*24*60*60,path: "/"});
        $.cookie('xr',x2,{expires:7*24*60*60,path: "/"});
    }

    function touchMove2(){
        var Num = 5;
        var oT=(x2+xW2/2)/(ocW/9)*Num;
        if(oT>20&&oT<=30){
            Num=10
            oT=(x2+xW2/2)/(ocW/9)*Num-20;
        }
        if(oT>30&&oT<=70){
            Num=20;
            oT=(x2+xW2/2)/(ocW/9)*Num-70;
        }
        if(oT>70&&oT<=100){
            Num=30;
            oT=(x2+xW2/2)/(ocW/9)*Num-140;
        }
        if(oTxt2.innerHTML<=5){
            x2 = oCont.offsetWidth-((oCont.offsetWidth/9*8)+xW2/2);
            oTxt2.innerHTML = '5';

            oBox2.style.WebkitTransform = 'translate3d('+x2+'px,0px,0)';

        }else{
            if((x2-xW)<=0){
                x2=xW;
            }
            if((x2)+xW>ocW){
                x2=ocW-xW+xW2/2;
            }

            oBox2.style.WebkitTransform = 'translate3d('+x2+'px,0px,0)';
        }
        oTxt2.innerHTML=(oT.toFixed(0));
        otxt2T.innerHTML=(oT.toFixed(0));
        otxt2T.style.display = 'block';
        oblueBg.style.width = x2+xW2/2+'px';
        ohuiBg.style.width = x+xW/2+'px';
        if(oTxt.innerText<100){
            oTxt.style.WebkitTransformOrigin = 'center';
        }
        move();
        lmove();
        if((x+xW/4)>x2){
            x=(x2-xW/4);
            var Num = 5
            var oT2=(x+xW/2)/(ocW/9)*Num
            if(oT2>20&&oT2<=30){
                Num=10
                oT2=(x+xW/2)/(ocW/9)*Num-20;
            }
            if(oT2>30&&oT2<=70){
                Num=20;
                oT2=(x+xW/2)/(ocW/9)*Num-70;
            }
            if(oT2>70&&oT2<=100){
                Num=30;
                oT2=(x+xW/2)/(ocW/9)*Num-140;
            }
            oTxt2.innerHTML=oT.toFixed(0);
            oTxt.innerHTML=Math.abs(oT2.toFixed(0));
            if((x2-x)<=5.75){
                oTxt.innerHTML=Math.abs((oT-1).toFixed(0));
                x2=x+5.75;
            }
            oBox.style.WebkitTransform = 'translate3d('+(x)+'px,0px,0)';
        }
    }

    function touchEnd2(){
        otxt2T.style.display = 'none';
        end();
        lend()
        if(oTxt.innerHTML>0&&oTxt2.innerHTML=='100+'){
            obudgetPrice.innerHTML = '价格(<span class="col5087e3">'+oTxt.innerHTML+'万以上</span>)'
        }else if(oTxt.innerHTML>0&&oTxt2.innerHTML<100){
            obudgetPrice.innerHTML = '价格(<span class="col5087e3">'+oTxt.innerHTML+'-'+oTxt2.innerHTML+'万</span>)'
        }else if(oTxt.innerHTML<=0&&oTxt2.innerHTML=='100+'){
            obudgetPrice.innerHTML = '不限'
        }else if(oTxt.innerHTML<=0&&oTxt2.innerHTML!='100+'){

            obudgetPrice.innerHTML = '价格(<span class="col5087e3">'+oTxt2.innerHTML+'万以下</span>)'
        }
        $.cookie('xr',x2,{expires:7*24*60*60,path: "/"});
        $.cookie('xl',x,{expires:7*24*60*60,path: "/"});
    }

    function move(){
        if(oTxt2.innerText>=100){
            oTxt2.innerHTML = '100+';
            oTxt2.style.WebkitTransformOrigin = 'left';
            otxt2T.innerHTML = '100+';
            oblueBg.style.width = oTxt2+'px';
            if(oTxt.innerText<100){
                oTxt.style.WebkitTransformOrigin = 'center';
            }
        }else if(oTxt2.innerText<100){
            oTxt2.style.WebkitTransformOrigin = 'center';

        }
    }
    function end(){
        if(oTxt2.innerText>=100||oTxt2.innerText=='100+'){
            x2=oCont.offsetWidth-xW2/2;
            oTxt2.innerHTML = '100+';
            oTxt2.style.WebkitTransformOrigin = 'left';
            oblueBg.style.width = x2+xW2/2+'px';
            oBox2.style.WebkitTransform = 'translate3d('+(x2)+'px,0px,0)';
        }else{
            oTxt2.style.WebkitTransformOrigin = 'center';
        }
    }
    function lmove(){
        if(oTxt2.innerText<=5){

            oTxt2.innerHTML = '5';
            otxt2T.innerHTML = '5';
        }
    }
    function lend(){
        if(oTxt.innerText<=4||oTxt.innerText=='0'){
            x=-xW/2;
            oTxt.innerHTML =0;
            ohuiBg.style.width = 0+'px';
            oBox.style.WebkitTransform = 'translate3d('+(x)+'px,0px,0)';

        }
    }
//            if(X){
//                oBox.style.WebkitTransform = 'translate3d('+X+'px,0,0)';
//                oTxt.innerHTML = ''
//            }


    oBox.addEventListener('touchstart',function(ev){
        var oTouch = ev.targetTouches[0];
        var id = oTouch.identifier;
        var disX = oTouch.pageX-(x);
        function fnMove(ev){
            var oTouch = ev.targetTouches[0];
            if(oTouch.identifier==id){
                if (isInit==false){
                    x = oTouch.pageX-disX;
                }
                touchMove();
                isInit = false;
            }
        }
        function fnEnd(ev){
            var oTouch = ev.changedTouches[0];
            touchEnd();

            if(oTouch.identifier==id){
                document.removeEventListener('touchmove',fnMove,false);
                document.removeEventListener('touchend',fnEnd,false);
            }
        }
        document.addEventListener('touchmove',fnMove,false);
        document.addEventListener('touchend',fnEnd,false);
        ev.preventDefault();
    },false);

    oBox2.addEventListener('touchstart',function(ev){
        var oTouch = ev.targetTouches[0];
        var id = oTouch.identifier;
        var disX = oTouch.pageX-(x2);
        function fnMove(ev){
            var oTouch = ev.targetTouches[0];
            if(oTouch.identifier==id){
                if (isInit2==false){
                    x2 = oTouch.pageX-disX;
                }

                touchMove2();
                isInit2=false;
            }
        }
        function fnEnd(ev){
            var oTouch = ev.changedTouches[0];
            touchEnd2();
            if(oTouch.identifier==id){
                document.removeEventListener('touchmove',fnMove,false);
                document.removeEventListener('touchend',fnEnd,false);
            }
        }
        document.addEventListener('touchmove',fnMove,false);
        document.addEventListener('touchend',fnEnd,false);
        ev.preventDefault();

    },false);
}
document.addEventListener('DOMContentLoaded',function(){
    drag();
})

$(document).ready(function () {

    $("#txtMile_Ks").DecimalTwo();
    $("#liSelectYear_Ks").bind("click", function () {
        if ($.trim($("#hdStyleId_Ks").val()) == "") {
            alert("请先选择品牌车型");
        }else{
            selectData();
        }
    });
    //保值率链接地址
    $(".sybzlli").click(function () {
        var hdCityId_Dw=$("#hdCityId_Dw").val();if(hdCityId_Dw=='' || hdCityId_Dw==0){hdCityId_Dw=201;}
        location.href="/buyappraise/gethedgeratioranking?cityid="+hdCityId_Dw+"&modellevelid=0";
    });
    if ($("#hdRegYear_Ks").val() != "" && $("#hdRegMonth_Ks").val() != "") {
        $("#liSelectYear_Ks").html($("#hdRegYear_Ks").val() + "年 " + $("#hdRegMonth_Ks").val() + "月").addClass("col3");
    }
    var ksPingguCar = new Mobile_SelectCar_v1(2, "liSelectCar_Ks", "SectionSelectCar_Ks", "sectionMakeOrModelSearch", false, false, true, true);

    ksPingguCar.initHidden("hdMakeId_Ks", "hdModelId_Ks", "hdStyleId_Ks", "hdStyleYear_Ks", "hdNextStyleYear_Ks");
    ksPingguCar.AfterSelectCar = function () {
        if ($("#hdRegYear_Ks").val() != "") {
            $("#liSelectYear_Ks").html("请选择上牌时间").removeClass("col3").siblings("i").show();
        }

        $("#hdRegYear_Ks").val("");
        $("#hdRegMonth_Ks").val("");
        $("#txtMile_Ks").val("请输入");
        var mindate = Number($("#hdStyleYear_Ks").val()) - 1 + "/6/1";
        var maxdate = new Date().getFullYear() + "/" + new Date().getMonth() + "/1";
        if (new Date().getMonth() == 0) {
            maxdate = Number(new Date().getFullYear()) - 1 + "/12/1";
        }
        // alert(maxdate);
        if ($.trim($("#hdNextStyleYear_Ks").val()) != "" && Number($.trim($("#hdNextStyleYear_Ks").val())) < Number(new Date().getFullYear() - 1)) {
            maxdate = Number($.trim($("#hdNextStyleYear_Ks").val())) + 1 + "/12/1";
        }


        var redate = new Mobile_SelectDate_v1("liSelectYear_Ks", "SectionSelectData_Ks", mindate, maxdate, false, false);
        redate.initHidden("hdRegYear_Ks", "hdRegMonth_Ks");
    };
    if($.trim($("#hdStyleId_Ks").val()) !="") {
        selectData();
    }
    var ksPingguArea = new Mobile_SelectCity_v1("liSelectArea_Ks", "SectionSelectArea_Ks", true, false);
    ksPingguArea.initHidden("hdProvenceId_Ks", "hdCityId_Ks");

    LocationCityCookie.GetLocationCityCookie("hdProvenceId_Dw", "hdCityId_Dw", "spandingwei");
    //定位i
    var dwArea = new Mobile_SelectCity_v1("spandingwei", "SectionSelectArea_Dw", false, false);
    dwArea.AfterSelectArea = function () {
        $("#spandingwei").removeClass("col3 al_tit_r10")
        LocationCityCookie.AddLocationCityCookie($("#hdProvenceId_Dw").val(), $("#hdCityId_Dw").val(), $("#spandingwei").html())
    }
    dwArea.initHidden("hdProvenceId_Dw", "hdCityId_Dw");


    $("#btnSellCarAppraise,#btnBuyCarAppraise").click(function () {
        var aptype = 1;
        var pgtype = $.trim($(this).attr("data"));
        var color = "";
        var kpje = "";
        var chesun = "";

        if (CheckKsInfo()) {
            GotoGuzhi(pgtype, aptype, color, kpje, chesun);
        }

    });

    //全款买车
    $(".buycarlist,.loanbuycarlist").click(function () {
        var begPrice = parseInt($(".begprice").html());
        var endPrice = $(".endprice").html();
        if (begPrice <= 0)begPrice = 0;
        if (endPrice =="100+") {
            endPrice = 9999;
        }
        var zdyprice = "-" + begPrice + "-" + endPrice;
        if($(this).hasClass("buycarlist")) {
            location.href = "/ershouche/c/-j2-0-0-0-0-0-0-0"+zdyprice+"t.html";
        }else{
            location.href = "/ershouche/c/-j2-0-0-0-0-0-0-0"+zdyprice+"-0-1-0-0-0t.html";
        }

    })
    $(".sectiontop1").show();
});
function GotoGuzhi(guzhitype, aptype, color, kpje, chesun) {
    var makeid = $.trim($("#hdMakeId_Ks").val());
    var modeid = $.trim($("#hdModelId_Ks").val());
    var styid = $.trim($("#hdStyleId_Ks").val());
    var regdate = $.trim($("#hdRegYear_Ks").val()) + "-" + $.trim($("#hdRegMonth_Ks").val()) + "-1"
    var mileage = (parseFloat($.trim($("#txtMile_Ks").val())) * 10000).toFixed(0);
    //alert(mileage);
    var provid = $.trim($("#hdProvenceId_Ks").val());
    var cityid = $.trim($("#hdCityId_Ks").val());
    var url = "";
    if (guzhitype == 1) {
        url = "/sale-s" + styid + "-r" + regdate + "-m" + mileage + "-c" + cityid + "-y" + color + "-j" + kpje + "-h" + chesun
    } else {
        url = "/buy-s" + styid + "-r" + regdate + "-m" + mileage + "-c" + cityid + "-y" + color + "-j" + kpje + "-h" + chesun
    }
    window.location.href = url;
}
function CheckKsInfo() {

    var Ispass = true;
    if (!($.trim($("#hdStyleId_Ks").val()) != "" && $.trim($("#hdStyleId_Ks").val()) > 0 && $.trim($("#hdMakeId_Ks").val()) != "")) {
        Ispass = false;
        alert("请选择品牌车型后开始估值")
        return false;
    }

    if (!($.trim($("#hdRegYear_Ks").val()) != "" && $.trim($("#hdRegMonth_Ks").val()) != "" && Number($.trim($("#hdRegYear_Ks").val())) > 0 && Number($.trim($("#hdRegMonth_Ks").val())) > 0)) {
        Ispass = false;
        alert("请选择上牌时间后开始估值")
        return false;

    }

    var regdate = $.trim($("#hdRegYear_Ks").val()) + "/" + $.trim($("#hdRegMonth_Ks").val()) + "/1"; //alert(regdate);
    var rg = /^(([1-9]+)|([1-6][0-9]+)|([0-9]+\.[0-9]{1,2}))$/;
    var mileage = $.trim($("#txtMile_Ks").val());
    var endDate = new Date();
    var monthNum = new Date(regdate).dateDiff('m', endDate);
    //alert(monthNum)
    if (mileage == "" || mileage == "请输入") {
        Ispass = false;
        alert("请填写行驶里程后开始估值");
        return false;
    } else if (!rg.test(mileage)) {
        Ispass = false;
        alert("请输入正确的行驶里程");
        return false;
    } else if (Number(mileage) > Number(monthNum)) {
        Ispass = false;
        alert("行驶里程不能超过" + monthNum + "万公里");
        return false;
    }
    if (!($.trim($("#hdCityId_Ks").val()) != "" && $.trim($("#hdCityId_Ks").val()) > 0)) {
        Ispass = false;
        alert("请选择上牌城市后开始估值")
        return false;
    }

    return Ispass
}
//选择时间
function selectData() {
    var mindate = Number($("#hdStyleYear_Ks").val()) - 1 + "/6/1";
    var maxdate = new Date().getFullYear() + "/" + new Date().getMonth() + "/1";
    if (new Date().getMonth() == 0) {
        maxdate = Number(new Date().getFullYear()) - 1 + "/12/1";
    }
    // alert(maxdate);
    if ($.trim($("#hdNextStyleYear_Ks").val()) != "" && Number($.trim($("#hdNextStyleYear_Ks").val())) < Number(new Date().getFullYear() - 1)) {
        maxdate = Number($.trim($("#hdNextStyleYear_Ks").val())) + 1 + "/12/1";
    }
    var redate = new Mobile_SelectDate_v1("liSelectYear_Ks", "SectionSelectData_Ks", mindate, maxdate, false, false);
    redate.initHidden("hdRegYear_Ks", "hdRegMonth_Ks");
}
