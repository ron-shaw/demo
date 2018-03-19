<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2018/1/17
  Time: 11:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>前端向后端传参</title>
</head>
<body>
<form method="post" action="/view/getComObject">
    <h1>自定义复合对象</h1>
    <br>
    <label>ID:</label>
    <input type="text" name="id" value="251" />
    <br>
    <label>姓名:</label>
    <input type="text" name="loginName" value="test251">
    <br>


    <label>手机号:</label>
    <input type="text" name="contact.mobile" value="130111122222"/>
    <br>
    <label>地址:</label>
    <input type="text" name="contact.address" value="北京市海淀区苏州街"/>
    <br>

    <input type="submit" name="submit" value="提交"/>
</form>


<form method="post" action="/view/getListObject">
    <h1>List对象</h1>
    <br>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>姓名</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><input name="customers[0].id" value="12" /></td>
            <td><input name="customers[0].loginName" value="张三" /></td>
        </tr>
        <tr>
            <td><input name="customers[1].id" value="13" /></td>
            <td><input name="customers[1].loginName" value="lisi" /></td>
        </tr>
        <tr>
            <td><input name="customers[2].id" value="15" /></td>
            <td><input name="customers[2].loginName" value="王五" /></td>
        </tr>

        <%--下标连续，请注意--%>
        <%--<tr>
            <td><input name="customers[10].id" value="25" /></td>
            <td><input name="customers[10].loginName" value="测试" /></td>
        </tr>--%>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="2"><input type="submit" value="提交" /></td>
        </tr>
        </tfoot>
    </table>
</form>





<form method="post" action="/view/getMapObject">
    <h1>Map对象</h1>
    <br>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>姓名</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><input name="customerMap['test12'].id" value="12" /></td>
            <td><input name="customerMap['test12'].loginName" value="张三" /></td>
        </tr>
        <tr>
            <td><input name="customerMap['test13'].id" value="13" /></td>
            <td><input name="customerMap['test13'].loginName" value="lisi" /></td>
        </tr>
        <tr>
            <td><input name="customerMap['test15'].id" value="15" /></td>
            <td><input name="customerMap['test15'].loginName" value="王五" /></td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="2"><input type="submit" value="提交" /></td>
        </tr>
        </tfoot>
    </table>
</form>


<form method="post" action="/view/redirectWithParam">
    <h1>页面跳转</h1>
    <br>
    <label>ID:</label>
    <input type="text" name="id" value="251" />
    <br>
    <label>姓名:</label>
    <input type="text" name="loginName" value="test251">
    <br>

    <input type="submit" name="submit" value="提交"/>
</form>

</body>
</html>
