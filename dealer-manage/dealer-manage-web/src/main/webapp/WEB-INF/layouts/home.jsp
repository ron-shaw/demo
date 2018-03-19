<%--
  Created by IntelliJ IDEA.
  User: long
  Date: 2017/3/24
  Time: 13:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="${globalCssBasePath}/css/comm.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="../../static/js/common.js"></script>
    <script type="text/javascript">
        $(function () {
//            getUserInfo();
            $("#btnLogigout").click(function () {
                $.ajax({
                    url: '/sysUser/logout',
                    data: {},
                    type: "post",
                    datatype: "json",
                    async: false,
                    //beforeSend: function () {
                    //},
                    success: function (data) {
                        //  alert(JSON.stringify(data));
                        if (data.status == 200) {
                            window.location.href = "/sysUser/login"
                        } else {
                            alert(data.mes);
                        }
                    }
                });
            });
        });

        function getUserInfo() {
            $.ajax({
                url: "/sysUser/getUserInfo",
                data: {},
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
//                    if (data.status == 200) {
//                        $("#usercode").html(data.data.usercode);
//                        //菜单权限
//                        if (data.data != null && data.data.roleid == 1) {
//                            $(".liAdmin").show();
//                        }
//                    }
                }
            })
        }
    </script>

</head>
<body class="body-bg">
<!--头部和导航开始-->
<div class="header clearfix">
    <div class="logoWrap clearfix">
        <div class="logoLeft"></div>
        <%-- <div class="logoRig"></div>--%>
    </div>
    <ul id="zpuli" class="zdaohan clearfix">
        <%--  <li><a href="javascript:;">工作台</a> </li>--%>
        <li class="liAdmin" style="display:none;">
            <a href="javascript:;">管理员</a>
            <ul class="zjkg_ul">
                <li><a href="/userinfo/userInfoChnnelList">账号权限管理</a></li>
                <li><a href="/userChannel/userChnnelList">渠道管理</a></li>
                <li><a href="${pageContext.request.contextPath}/platFormAttrManag/index">平台管理</a></li>

            </ul>
        </li>
        <li class="liAdmin" style="display:none;">
            <a href="javascript:;">线索管理</a>
            <ul class="zjkg_ul">
                <li class="liAdmin"><a href="${pageContext.request.contextPath}/clueManag/clueManaListIndex">线索分发</a>
                </li>
                <li><a href="/clueStatus/clueStatusImportIndex">状态导入</a></li>
                <li><a href="/admin/CluePushResultList.aspx">线索反馈</a></li>


            </ul>
        </li>
        <%--  <li>
            <a href="javascript:;">数据统计</a>
            <ul class="zjkg_ul">
                <li><a href="javascript:;">分渠道</a> </li>
                <li><a href="javascript:;">分平台</a> </li>
            </ul>
        </li>--%>
        <li>
            <a href="javascript:;">线索查询</a>
            <ul class="zjkg_ul">
                <li style="display:none;"><a href="/clueStatus/allClueStatusListIndex">全部状态</a></li>
                <li><a href="/clueStatus/clueStatusListIndex">线索状态</a></li>
                <li><a href="/clueimport/clueimportexcel">线索导入</a></li>

                <%-- <li><a href="javascript:;">数据统计</a> </li>--%>
            </ul>
        </li>
        <%--<li><a href="javascript:;">系统管理</a> </li>--%>
    </ul>
    <dl class="zyhm_dl clearfix">
        <dt>
            <img src="${globalImgBasePath}/images/z.jpg" alt=""/>
            <label></label>
        </dt>
        <dd id="usercode">${userInfo.usercode}</dd>
        <dd><a href="javascript:void(0)" class="baizt" id="btnLogigout">退出</a></dd>
    </dl>
</div>

<script type="text/javascript">
    $("#zpuli li").each(function () {
        $this = $(this);
        $.SelectUl({"showid": $this, "hideid": $this.find(".zjkg_ul")});
    });

</script>
</body>
</html>

