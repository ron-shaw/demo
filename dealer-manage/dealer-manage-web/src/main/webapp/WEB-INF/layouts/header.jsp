<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2016/12/2
  Time: 13:47
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<div class="header clearfix">
    <div class="logoWrap clearfix">
        <a href="/sysUser/index">
        <div class="logoLeft"></div>
        </a>
        <a href="javascript:;" class="menu-flexible">
            <i class="layui-icon"></i>
        </a>
    </div>
    <dl class="zyhm_dl clearfix">
        <dt>
            <img src="${globalImgBasePath}/images/z.jpg" alt=""/>
            <label></label>
        </dt>
        <dd>admin</dd>
        <dd><a href="javascript:void(0)" class="baizt" id="btnLogigout">退出</a></dd>
    </dl>
    <%--<div class="layui-inline">--%>
        <%--<img src="http://cdn.layui.com/avatar/168.jpg?t=1490352249902" class="layui-circle">--%>
    <%--</div>--%>
</div>
<script type="text/javascript">
    $(function () {
        //getUserInfo();
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
                    //alert(JSON.stringify(data));
                    if (data.status == 100) {
                        window.location.href = "/sysUser/login"
                    } else {
                        //alert(data.msg);
                        window.location.href = "/sysUser/login"

                    }
                }
            });
        });
    });
</script>