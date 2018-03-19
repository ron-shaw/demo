<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <title><sitemesh:title default="【精真估二手车评估网】专业在线二手汽车评估_中国最精准、最真实的车辆价值评估平台"/></title>

    <meta content="" name="keywords"/>
    <meta content="" name="description"/>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <meta content="black" name="apple-mobile-web-app-status-bar-style"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta name="baidu-site-verification" content="H6od0XC7DJ"/>

    <script type="text/javascript" src="${globalJsBasePath}/js/jquery-1.9.1.min.js?v=2016072801"></script>
    <link rel="shortcut icon" href="${globalImgBasePath}/images/favicon.ico" />
    <link type="text/css" href="${globalCssBasePath}/css/comm.css" rel="stylesheet" />
    <link type="text/css" href="${globalCssBasePath}/css/style.css" rel="stylesheet" />
    <link type="text/css" href="${jsBasePath}/layui/css/layui.css" rel="stylesheet" />
    <link type="text/css" href="${cssBasePath}/admin.css" rel="stylesheet" />
    <%--<link id="layuicss-skinlayercss" rel="stylesheet" href="http://www.g-tf.cn/demo/admin/layui/css/modules/layer/default/layer.css?v=3.0.2302" media="all">--%>

    <sitemesh:head/>
</head>


<body>
<!-- 布局容器 -->
<div class="layui-layout layui-layout-admin">
    <!-- 头部 -->
    <jsp:include page="header.jsp"></jsp:include>
    <!-- 左侧菜单 -->
    <jsp:include page="/sysUser/menuList"></jsp:include>


    <!-- 主体 -->
    <div class="layui-body">
        <!-- 顶部切换卡 -->
        <div class="layui-tab layui-tab-card" lay-filter="top-tab" lay-allowClose="true">
            <ul class="layui-tab-title"></ul>
            <div class="layui-tab-button">
                <a href="javascript:;"><i class="layui-icon">&#x1002;</i></a>
            </div>
            <div class="layui-tab-content">
                <sitemesh:body/>
            </div>
        </div>
    </div>

    <!-- 底部 -->
    <jsp:include page="footer.jsp"></jsp:include>
</div>
<script type="text/javascript" src="${jsBasePath}/layui/layui.js"> </script>
<script type="text/javascript" src="${jsBasePath}/admin.js" ></script>
<script src="${globalJsBasePath}/js/onfocus.js"></script>
</body>
</html>
