<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2018/1/18
  Time: 13:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户首页</title>
</head>
<body>
<form method="post" action="/user/add">
    <label>用户名：</label>
    <input type="text" name="name">
    <br/>
    <label>密码：</label>
    <input type="password" name="pwd">
    <br/>
    <input type="submit" value="提交">
</form>

</body>
</html>
