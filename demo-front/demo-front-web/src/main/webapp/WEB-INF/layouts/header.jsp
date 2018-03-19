<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2016/12/2
  Time: 13:47
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!--app浮层开始-->
<%--<c:if test="${CookieHederNameValue==''}">--%>
<div class="ad-app z-10">
    <a href="javascript:;" class="ad-close z-2 closeheader"></a>
    <div class="ad-txt z-1">买卖、置换二手车 我用精真估APP</div>
    <a href="http://www.jingzhengu.com/app/jzgdownload.html?t=M" class="ad-btn-download">立即下载</a>
</div>
<script src="${jsBasePath}/jquery.cookie.js"></script>
<%--</c:if>--%>
<script type="text/javascript">
    var explorer = navigator.userAgent;
    var mydata = $.cookie("mydata");
    if (mydata == 1) {
        $(".ad-app").hide();
        $(".bannernav").css("top", "0");
    } else {
        $(".ad-app").show();
    }

    $(".closeheader").click(function () {
        $(".ad-app").hide();
        $(".bannernav").css("top", "0");
        $("#wrapper").css("top", "0");
        if (explorer.indexOf('Android') > -1 || explorer.indexOf('Adr') > -1) {
            //
            $.cookie("mydata", 1, {expires:24*60*60, path: "/"});
        } else {
            $.cookie("mydata", 1, {expires:"",path: "/"});
        }
    });
</script>
<!--app浮层结束-->
