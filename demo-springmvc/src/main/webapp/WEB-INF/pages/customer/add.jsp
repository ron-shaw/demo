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
</head>
<body>
<form method="post" action="/customer/add">
    <label>姓名:</label>
    <input type="text" id="loginName" name="loginName">
    <label>密码:</label>
    <input type="password" id="pwd" name="pwd">
    <input type="submit" name="submit"/>
</form>
</body>
</html>
