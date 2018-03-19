<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
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
    <title>修改客户信息</title>
</head>
<body>
<form method="post" action="/customer/update">
    <label>ID:</label>
    <input type="text" id="id" name="id" value="${customer.id}">
    <br>
    <label>姓名:</label>
    <input type="text" id="loginName" name="loginName" value="${customer.loginName}">
    <br>
    <label>年龄:</label>
    <input type="text" id="age" name="age" value="${customer.age}">
    <br>
    <label>时间:</label>
    <input type="text" id="indate" name="indate" value="<fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${customer.indate}"/>">
    <br>

    <input type="submit" name="submit"/>
</form>
</body>
</html>
