<!DOCTYPE html>
<html>
<head lang="en">
    <title>Spring Boot Demo - FreeMarker</title>
    <link href="/css/index.css" rel="stylesheet">
    <script type="text/javascript" src="/jars/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/js/index.js"></script>
</head>
<body>
<form>
    <h2>客户列表<h2>
    <table>
        <thead>
        <tr>
            <th>客户ID</th>
            <th>客户名称</th>
            <th>客户年龄</th>
        </tr>
        </thead>
        <tbody>
            <#list list as item>
            <tr>
                <td>${item.id}</td>
                <td>${item.loginName}</td>
                <td>${item.age}</td>
            </tr>
            </#list>

        </tbody>
    </table>
</form>
</body>
</html>