<%--
  Created by IntelliJ IDEA.
  User: JZG
  Date: 2017/7/27
  Time: 13:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
    <title>退款记录</title>
    <link type="text/css" href="${jsBasePath}/layui/css/layui.css" rel="stylesheet" />
</head>
<body>
    <%--<h1>退款记录</h1>--%>
    <div class="container">
        <div class="content-search"  style="margin-top:10px;">
            <form class="layui-form layui-form-pane" action="">
                <div class="layui-inline">
                    <label class="layui-form-label">支付流水号</label>
                    <div class="layui-input-block">
                        <input name="tradeId" autocomplete="off" class="layui-input" type="text"/>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">退款流水号</label>
                    <div class="layui-input-inline">
                        <input name="refundId" autocomplete="off" class="layui-input" type="text"/>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">退款状态</label>
                    <div class="layui-input-inline">
                        <input name="email" autocomplete="off" class="layui-input" type="text"/>
                    </div>
                </div>
                <button class="layui-btn layui-btn-small layui-btn-radius" data-url="add.html"><i class="layui-icon">&#xe615;</i> 查询 </button>
                <button class="layui-btn layui-btn-small layui-btn-primary layui-btn-radius" data-url="edit.html"><i class="layui-icon">&#xe633;</i> 重置 </button>
            </form>
        </div>
        <div class="handle-btn" style="margin-top:20px;">
            <button class="layui-btn layui-btn-mini" data-url="add.html"><i class="layui-icon">&#xe654;</i> 添加 </button>
            <button class="layui-btn layui-btn-mini layui-btn-normal" data-url="edit.html"><i class="layui-icon">&#xe642;</i> 编辑 </button>
            <button class="layui-btn layui-btn-mini layui-btn-danger" data-url="delete.html"><i class="layui-icon">&#xe640;</i> 删除 </button>
        </div>

        <div class="layui-form">
            <table class="layui-table">
                <colgroup>
                    <col width="50">
                    <col width="150">
                    <col width="150">
                    <col width="200">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th><input name="" lay-skin="primary" lay-filter="allChoose" type="checkbox"></th>
                    <th>退款流水号</th>
                    <th>民族</th>
                    <th>出场时间</th>
                    <th>格言</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input name="" lay-skin="primary" type="checkbox"></td>
                    <td>贤心</td>
                    <td>汉族</td>
                    <td>1989-10-14</td>
                    <td>人生似修行</td>
                </tr>
                <tr>
                    <td><input name="" lay-skin="primary" type="checkbox"></td>
                    <td>张爱玲</td>
                    <td>汉族</td>
                    <td>1920-09-30</td>
                    <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
                </tr>
                <tr>
                    <td><input name="" lay-skin="primary" type="checkbox"></td>
                    <td>Helen Keller</td>
                    <td>拉丁美裔</td>
                    <td>1880-06-27</td>
                    <td> Life is either a daring adventure or nothing.</td>
                </tr>
                <tr>
                    <td><input name="" lay-skin="primary" type="checkbox"></td>
                    <td>岳飞</td>
                    <td>汉族</td>
                    <td>1103-北宋崇宁二年</td>
                    <td>教科书再滥改，也抹不去“民族英雄”的事实</td>
                </tr>
                <tr>
                    <td><input name="" lay-skin="primary" type="checkbox"></td>
                    <td>孟子</td>
                    <td>华夏族（汉族）</td>
                    <td>公元前-372年</td>
                    <td>猿强，则国强。国强，则猿更强！ </td>
                </tr>
                </tbody>
            </table>
        </div>

        <%--<div class="table-list">
            <table class="layui-table" lay-skin="line">
                <thead>
                <tr>
                    <th>编号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>兴趣爱好</th>
                    <th>座右铭</th>
                </tr>
                </thead>
                <tbody>
                <tr data-assign="1">
                    <td>1</td>
                    <td>飞星</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="2">
                    <td>2</td>
                    <td>李四</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="3">
                    <td>3</td>
                    <td>王老五</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="4">
                    <td>4</td>
                    <td>张六哥</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="5">
                    <td>5</td>
                    <td>始发站</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="6">
                    <td>6</td>
                    <td>残花刘</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="7">
                    <td>7</td>
                    <td>新若瑄</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="8">
                    <td>8</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="9">
                    <td>9</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="10">
                    <td>10</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="9">
                    <td>9</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="10">
                    <td>10</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="9">
                    <td>9</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="10">
                    <td>10</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="9">
                    <td>9</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                <tr data-assign="10">
                    <td>10</td>
                    <td>张三</td>
                    <td>男</td>
                    <td>28</td>
                    <td>摄影 郊游</td>
                    <td>心若向阳便是晴天</td>
                </tr>
                </tbody>
            </table>
        </div>--%>
    </div>
    <div id="table-pages" style="text-align:center"></div>

    <%--<script type="text/javascript" src="layui/layui.js"></script>--%>
    <script type="text/javascript" src="${jsBasePath}/layui/layui.js"> </script>
    <script type="text/javascript" src="${jsBathPath}/payment/refundTrade.js" ></script>
    <script type="text/javascript">
        var totalPage = 10;
    </script>

</body>
