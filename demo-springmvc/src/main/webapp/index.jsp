<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2018/1/16
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>首页</title>
</head>
<body>

<div>
    <span>*******************************参数传递*******************************</span>
    <br/>
    <a href="view/toParam" target="_blank">向后端传参</a>
    <br/>
    <a href="view/index" target="_blank">向页面传值</a>
    <br/>
    <a href="view/redirect?id=120&loginName=test251" target="_blank">页面跳转</a>
    <br/>
    <a href="view/redirectWithParam?id=150&loginName=test251" target="_blank">页面跳转带参数</a>
    <br/>
    <span>**********************************************************************</span>
</div>


<div>
    <span>********************************用户示例******************************</span>
    <br/>
    <a href="customer/toAdd.html" target="_blank">注册用户</a>
    <br/>
    <a href="customer/toAdd2.html" target="_blank">注册用户(Ajax)</a>
    <br/>
    <a href="customer/toInfo/100.html" target="_blank">用户信息</a>
    <br/>
    <a href="customer/toUpdate.html?id=100" target="_blank">编辑用户</a>
    <br/>
    <a href="customer/toList.html" target="_blank">用户列表</a>
    <br/>
    <span>**********************************************************************</span>
</div>

</body>
</html>
