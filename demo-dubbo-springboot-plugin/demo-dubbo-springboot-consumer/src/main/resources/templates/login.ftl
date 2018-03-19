<html>
<head>
    <title>测试登录页</title>
    <script type="text/javascript" src="/static/js/jquery-1.9.1.min.js?v=2016072801"></script>
    <link type="text/css" href="/static/css/comm.css" rel="stylesheet"/>
    <link type="text/css" href="/static/css/zqy.css" rel="stylesheet"/>
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
