<html>
<head>
    <title>测试客户列表</title>
    <script type="text/javascript" src="/static/js/jquery-1.9.1.min.js?v=2016072801"></script>
    <link type="text/css" href="/static/css/comm.css" rel="stylesheet"/>
    <link type="text/css" href="/static/css/zqy.css" rel="stylesheet"/>
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
