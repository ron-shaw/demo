var LoginUserId=0;
$(function(){
    LoadRightMenuList();
    //LoadInfo();
});
function LoadInfo() {
    $.ajax({
        url: '/user/getLoginUserInfo',
        type: 'post',
        dataTtype: 'json',
        //async: false,
        success: function (data) {
            // alert(JSON.stringify(data))
            var data = eval(data);
            if (data != null && data != "") {
                LoginUserId= data.id;
                $("#imgLoginUser").attr("src", data.avatorpicpath);
                $("#lbLoginUser").html("<em>"+data.mobile+"</em>").show();
                $("#btnLoginUser").hide();
                $(".dvLoginOut").show();
            }
        }
    });
}

function LoginOutJZG() {
    $.ajax({
        url: '/user/loginOut',
        type: 'post',
        dataTtype: 'json',
        //async: false,
        success: function (data) {
            //alert(JSON.stringify(data))
            var data = eval(data);
            if (data.status==100) {
                LoginUserId=0;
                $(".dvLoginOut").hide();
                $("#imgLoginUser").attr("src", $("#hdDefaultImg").val());
                $("#lbLoginUser").hide();
                $("#btnLoginUser").show();
            }
        }
    });
}
function LoadRightMenuList(){
    var oSan=document.querySelector('.nav-btn-rb');
    var oChw=document.querySelector('.zchwrap');
    var oYx=document.querySelector('.zyxzz');
    var oSim=document.querySelector('.nav');
    var oH=document.documentElement.clientHeight||document.body.clientHeight;
    var oHtnl=document.getElementsByTagName('html')[0];
    oSan.onclick=function(){
        LoadInfo();
        // oChw.style.transform='translate3d(0,0,0)';//不支持UC浏览器
        oChw.style.webkitTransform='translate3d(0,0,0)';
        oYx.style.display='block';
        oSim.style.height=oH+'px';
        oSim.style.overflow='hidden';
        document.body.style.height=oH+'px';
        document.body.style.overflow='hidden';
        oHtnl.style.height=oH+'px';
        oHtnl.style.overflow='hidden';
        oYx.onclick=function(){
            // oChw.style.transform='translate3d(100%,0,0)';//不支持UC浏览器
            oChw.style.webkitTransform='translate3d(100%,0,0)';
            oYx.style.display='none';
            oSim.style.height='auto';
            oSim.style.overflow='visible';
            document.body.style.height='auto';
            document.body.style.overflow='visible';
            oHtnl.style.height='auto';
            oHtnl.style.overflow='visible';
        }
    }
}
function  GotoUrl(url) {
if(LoginUserId>0){
    window.location.href=url;
}else{
    window.location.href="/user/login?backurl="+url;
}

}