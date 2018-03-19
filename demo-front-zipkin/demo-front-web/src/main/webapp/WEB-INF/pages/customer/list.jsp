<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2016/11/28
  Time: 9:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>测试客户列表</title>
    <script type="text/javascript" src="${globalJsBasePath}/5.0/js/jquery-1.8.1.min.js?v=2016072801"></script>
    <link type="text/css" href="${globalCssBasePath}/6.0/css/comm.css" rel="stylesheet"/>
    <link type="text/css" href="${globalCssBasePath}/6.0/css/zqy.css" rel="stylesheet"/>
</head>
<body>
<form>
    <table>
        <thead>
        <tr>
            <th>客户ID</th>
            <th>客户名称</th>
            <th>客户年龄</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="item" items="${list}">
            <tr>
                    <%--<td><c:out value="${item.id}" ></c:out></td>
                    <td><c:out value="${item.loginName}" ></c:out></td>
                    <td><c:out value="${item.age}" ></c:out></td>--%>
                <td>${item.id}</td>
                <td>${item.loginName}</td>
                <td>${item.age}</td>
            </tr>
        </c:forEach>

        </tbody>
    </table>

</form>

</body>
</html>
