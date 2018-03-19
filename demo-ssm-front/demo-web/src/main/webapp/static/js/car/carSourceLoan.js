
$(function () {
    if( $("#hdisCanBack").val()=="0"){
        if ($(".ad-app").length > 0) {
            $(".ad-app").hide();
        }
    }
    $(".disSelct span").click(function () {
        $(this).parent(".disSelct").siblings(".divSelct").slideToggle();
        $(this).parents(".jrbxl").siblings(".jrbxl").find(".divSelct").hide();
    });
    $(".divSelct ul li").click(function () {
        $(".divSelct").hide();
        var data = $(this).attr("data");
        var $sp = $(this).parents(".divSelct").siblings(".disSelct");
        $sp.find("span").html($(this).find("span").html());
        $sp.find(".hdSelct").val(data);
        AfterSelectLoan();
    });
    $("#div").on("click",".YhTJSQ", function () {
        var $YhInfo = $(this).parents(".YhTjInfo");
        var name = $.trim($YhInfo.find(".YhName").val());
        var mobile = $.trim($YhInfo.find(".YhPhone").val());
        var szyzm = $.trim($YhInfo.find(".YhSZYzm").val());
        var dxyzm = $.trim($YhInfo.find(".YhYzm").val());
        var csid = $("#hdCsid").val();
        var csfrom = $("#hdCsfrom").val();
        var sellprice = $("#hdSellPrice").val();
        var jigouid = $.trim($YhInfo.attr("jgid"));
        var companyName = $.trim($YhInfo.attr("cmpname"));
        var packName = $.trim($YhInfo.attr("packname"));
        var bili = $.trim($("#hdSelctBL").val());
        var zhouqi = $.trim($("#hdSelctQS").val());
        var provid = $.trim($("#hdProvId").val());
        var cityid = $.trim($("#hdCityId").val());
        var styleid = $.trim($("#hdstyleid").val());
        var rge = /^[1][34578][0-9]{9}$/;
        if (name == "") {
            alert("请输入姓名");
            return false;
        }
        if (!rge.test(mobile)) {
            alert("手机号码格式不正确");
            //$(".pmobile a").html("手机号码格式不正确").show();
            return false;
        }
        if (szyzm == "") {
            alert("请输入验证码");
            return false;
        }
        if (dxyzm == "") {
            alert("请输入短信验证码");
            return false;
        }
        $.ajax({
            url: '/carSourceLoan/submitApply',
            data: {
                'name': (name), 'mobile': (mobile),'szYzm':szyzm, 'dxYzm': (dxyzm), 'csid': (csid), 'csfrom': (csfrom),
                'sellprice': (sellprice), 'jigouid': (jigouid), 'bili': (bili), 'zhouqi': (zhouqi), 'provid': (provid),
                'cityid': (cityid), 'styleid': (styleid), 'companyName': (companyName), 'packName': (packName)
            },
            type: 'post',
            dataType: 'json',
            success: function (res) {
                // alert(JSON.stringify(res));
                if (res != null || res != "") {
                    var data = eval(res);
                    if (data.status == "100") {
                        alert("您的申请已提交，我们的工作人员会与您联系");
                        if( $("#hdisCanBack").val()=="1"){
                            window.history.go(-1);
                        }
                    }else  if (data.status == "101"||data.status == "104"||data.status == "106"){
                        alert("申请失败")
                    }else  if (data.status == "102") {
                        alert("验证码错误")
                        ReloadMPicVailcode($YhInfo.find(".yzmbtn2 img"))
                    } else  if (data.status == "103") {
                        alert("短信验证码错误")
                    }else  if (data.status == "105") {
                        alert(data.msg);
                    }
                }else{
                    alert("申请失败")
                }
            }
        });
    });
    $(document).click(function (event) {
        var eo = $(event.target);
        if (($(".divSelct").is(":visible"))&&!eo.parents("div").hasClass("disSelct")&&!eo.hasClass("disSelct")&&!eo.parents("div").hasClass("disSelct")) {

            $(".divSelct").hide();
        }
    });
    AfterSelectLoan();
});
function  InitSMSYZMInfo() {
    if($(".listLoanInfo").length>0){
        var mySms=new Array($(".listLoanInfo").length)
        $(".listLoanInfo").each(function (i,n) {
            new  MobileSMSVerificationcode($(n).find(".YhPhone"),$(n).find(".YhSZYzm"),$(n).find(".YhGetYzm"),"zyzm_on",$(n).find(".hdLevSecond"),$(n).find(".yzmbtn2 img"))
        });
    }
}
function AfterSelectLoan() {
    var SelctBL = $.trim($("#hdSelctBL").val());
    var SelctQS = $.trim($("#hdSelctQS").val());
    var styleid = $.trim($("#hdstyleid").val());
    var cityid = $.trim($("#hdCityId").val());
    var sellprice = $("#hdSellPrice").val();
    $.ajax({
        url: '/carSourceLoan/getFinanceProductList',
        data: {
            'pageindex': 1, 'pagesize': 10, 'styleid': (styleid), 'sellprice': (sellprice), 'bili': (SelctBL), 'zhouqi': (SelctQS)
            , 'cityid': (cityid),
        },
        type: 'post',
        dataType: 'json',
        async: false,
        beforeSend: function () {
            $("#div").html("<div class=\"loading\"><img src='http://res.jingzhengu.com/ptvm/6.0/images/loading.gif'></div>");

        },
        success: function (res) {
            // alert(res);
            var data=JSON.parse(res);
            if (data != null || data != "") {
                // var data = eval(data);
                if (data.status == "100") {
                    var FinancialProductList = data.FinancialProductList;
                    var strHtml = "";
                    if (FinancialProductList != "") {
                        $.each(FinancialProductList, function (i, n) {
                            var schel = n.PackageID + "_" + n.ProductID + "_";
                            if (n.ProductPromotionId == "") {
                                schel += 0;
                            } else {
                                schel += n.ProductPromotionId;
                            }
                            var PackageName = n.PackageName;
                            var compName = n.CompanyName;
                            var shoufu = n.DownPayment;
                            var yuegong = n.MonthlyPaymentText;

                            strHtml += "<div class=\"finance z-9 listLoanInfo\"><!--金融机构开始-->";
                            strHtml += "<div class=\"finance-t clearfix\"><!--上开始-->";
                            strHtml += "<div class=\"finance-c\"><span>" + compName + "</span><span class=\"ft12\">" + PackageName + "</span></div>";
                            strHtml += "<div class=\"finance-c finance-c1\"><span>首付</span><span class=\"ft16\">" + shoufu + "</span></div>";
                            strHtml += "<div class=\"finance-c finance-c1\"><span>月供</span><span class=\"ft16\">" + yuegong + "</span></div>";
                            strHtml += "</div><!--上结束-->";
                            strHtml += "<div class=\"finance-b clearfix\"><!--下拉开始-->";
                            strHtml += "<div class=\"finance-bc\">";
                            strHtml += "<div class=\"finance-bc-t\"><span class=\"left\">贷款人资料</span><div class=\"jtx jtx1\"></div></div>";
                            strHtml += "<div class=\"finance-bc-b YhTjInfo\" jgid=\"" + schel + "\" cmpname=\"" + compName + "\" packname=\"" + PackageName + "\"><!--下拉开始-->";
                            strHtml += "<div class=\"clearfix finance-bc-bc\">";
                            strHtml += "<ul >";
                            strHtml += "<li><div class=\"finance-bc-bname\">姓名</div><div class=\"finance-bc-binp\"><input class=\"inpgg YhName\" type=\"text\" value=\"\" maxlength=\"20\"/></div></li>";
                            strHtml += "<li><div class=\"finance-bc-bname\">手机号</div><div class=\"finance-bc-binp\"><input class=\"inpgg YhPhone\" type=\"text\"  value=\"\" maxlength=\"11\" style=\"ime-mode:disabled;\"/></div></li>";
                            strHtml += "<li><div class=\"finance-bc-bname\">验证码</div><div class=\"finance-bc-binp wid30_s\"><input class=\"inpgg YhSZYzm\" type=\"text\" value=\"\" maxlength=\"6\" style=\"ime-mode:disabled;\"/></div><div class=\" yzmbtn2\"><img alt=\"\" src=\"/validate/validatecode\" class=\"land-yzm1\"/></div></li>";
                            strHtml += "<li><div class=\"finance-bc-bname\">短信验证码</div><div class=\"finance-bc-binp wid30_s\"><input class=\"inpgg YhYzm\" type=\"text\" value=\"\" maxlength=\"6\" style=\"ime-mode:disabled;\"/><input type=\"hidden\" class=\"hdLevSecond\" value=\"60\" /></div><div class=\"btn zyzmbtn YhGetYzm\" style=\"cursor:pointer\">获取验证码</div></li>";
                            strHtml += "</ul>";
                            strHtml += "</div>";
                            strHtml += "<div class=\" financebtn\"><div class=\"btn wid90_s\"><a href=\"javascript:void(0);\" class=\"YhTJSQ\">提交申请</a></div>";
                            strHtml += "</div>";
                            strHtml += "</div><!--下拉结束-->";
                            strHtml += "</div>";
                            strHtml += "</div><!--下拉结束-->";
                            strHtml += "</div><!--金融机构结束-->";
                        });
                        $("#div").html(strHtml);
                        InitSMSYZMInfo();
                        btn();
                    } else {
                        $("#div").html("<div>暂时无法提供金融产品方案</div>");
                    }

                } else {
                    alert(data.mes);
                }
            }
        }
    });
}
function btn( ) {
    var oDiv = document.getElementById('div');
    var aDiv = oDiv.children;
    var oBtn = document.querySelectorAll('.finance-t');
    var oBox = document.querySelectorAll('.finance-b');
    // var oBtn1 = document.querySelectorAll('.jrbxl-t');
    // var oBox1 = document.querySelectorAll('.jrbxl-b');
    var oFinance = document.querySelectorAll('.finance-bc-bc');
    var ofinanceBtn = document.querySelectorAll('.financebtn');
    var bOk = true;
    var num = 0;
    var arrLi = [];

    for (var i = 0; i < oBtn.length; i++) {
        (function (index) {
            oBtn[i].onclick = function () {
                if (this.className == 'finance-t clearfix') {
                    for (var i = 0; i < oBtn.length; i++) {
                        oBox[i].style.height = 0;
                        oBtn[i].className = 'finance-t clearfix';
                        oBox[i].classList.remove('finance-show')
                    }
                    oBox[index].style.height = (oFinance[index].children[0].children[0].offsetHeight * oFinance[index].children[0].children.length + ofinanceBtn[index].offsetHeight) + 35 + 'px';
                    console.log(oBox[index].style.height + ',' + ofinanceBtn[index].offsetHeight)
                    oBox[index].classList.add('finance-show');
                    this.classList.add('active');

                    $(oBox[index]).find(".yzmbtn2 img").attr('src', '/validate/validatecode?' + Math.random());
                    //alert($(oBox[index]).find(".yzmbtn2 img").attr('src'));
                } else {
                    oBox[index].style.height = 0;
                    this.className = 'finance-t clearfix'
                    oBox[index].classList.remove('finance-show')
                    this.classList.remove('active')

                }
            }
        })(i)
    }
}
