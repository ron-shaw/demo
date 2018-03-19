<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2018/1/16
  Time: 15:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>客户列表</title>
</head>
<body>
<form>
    <table>
        <thead>
        <tr>
            <th>客户ID</th>
            <th>客户名称</th>
            <th>客户年龄</th>
            <th>创建时间</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="item" items="${customers}">
            <tr>
                    <%--<td><c:out value="${item.id}" ></c:out></td>
                    <td><c:out value="${item.loginName}" ></c:out></td>
                    <td><c:out value="${item.age}" ></c:out></td>--%>
                <td>${item.id}</td>
                <td>${item.loginName}</td>
                <td>${item.age}</td>
                <td>${item.indate}</td>
            </tr>
        </c:forEach>

        </tbody>
    </table>
</form>
</body>
</html>
