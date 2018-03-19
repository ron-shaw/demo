<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2016/11/24
  Time: 21:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>测试登录页</title>
    <script type="text/javascript" src="${globalJsBasePath}/5.0/js/jquery-1.8.1.min.js?v=2016072801"></script>
    <link type="text/css" href="${globalCssBasePath}/6.0/css/comm.css" rel="stylesheet"/>
    <link type="text/css" href="${globalCssBasePath}/6.0/css/zqy.css" rel="stylesheet"/>
    <script>
        $(document).ready(function () {
            $("#login").click(function () {
                var username = $("#username").val();
                var password = $("#password").val();
                $.ajax({
                    type: "GET",
                    url: "/customer/login",
                    data: {username: username, password: password},
                    success: function (data) {
                        if (data.status == 200) {
                            window.location.href = "/customer/myindex";
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            });
        });
    </script>
</head>
<body>
<form>
    <div>
        <label>用户名：</label>
        <input type="text" id="username"/>
    </div>
    <div>
        <label>密码：</label>
        <input type="password" id="password">
    </div>
    <div>
        <input type="button" id="login" value="登录">
    </div>
</form>
</body>
</html>
