<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2018/1/16
  Time: 15:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>客户</title>
    <script type="text/javascript" src="/static/js/jquery-1.9.1.min.js?v=2016072801"></script>
    <script>
        function add() {//页面异步请求
            var customer = {};
            customer.loginName = $('#loginName').val();
            customer.pwd = $('#pwd').val();
            var jsonData = JSON.stringify(customer);

            $.ajax({
                type : 'POST',
                contentType : 'application/json',
                url : "/customer/add2",
                dataType : 'json',
                /*data : {
                    loginName: $('#loginName').val(),
                    pwd: $('#pwd').val()
                },*/
                data : jsonData,
                success : function(result) {
                    alert("注册成功" + result.id + "," + result.loginName + "," + result.age);
                },
                error : function() {
                    alert('内部错误！');
                }
            });
        };
    </script>
</head>
<body>
<form>
    <label>姓名:</label>
    <input type="text" id="loginName" name="loginName">
    <label>密码:</label>
    <input type="password" id="pwd" name="pwd">
    <input type="button" value="注册" onclick="add()"/>
</form>
</body>
</html>
