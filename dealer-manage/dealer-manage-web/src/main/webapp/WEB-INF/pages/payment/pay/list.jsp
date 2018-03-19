<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>支付流水查询</title>
    <script type="text/javascript" src="/static/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/static/js/common.js"></script>
    <script src="/static/js/jquery.autocomplete.js"></script>
    <script src="/static/js/template.js"></script>
    <script src="/static/js/payment/pay/pay.js"></script>
</head>
<body>
<!--查询-->
<div class="sscont clearfix z-2">
    <ul class="new_ul1 tan_ul hegauto clearfix">
        <li class="z-5">
            <span class="tan_name widauto">退款流水号</span>
        </li>
        <li class="z-1">
            <div class="tan_item_li left">
                <span class="tan_item_span wid150">
                    <input type="text" id="txtAdvertiseName"  value="" class="zit_inp inp198"/>
                </span>
            </div>
            <div class="btn ss-btn left ml10">
                <a class="bor-ra" id="btnSearch">查询</a>
            </div>
        </li>
    </ul>
</div>

<!--表格-->
<div class="cont">

    <div class="clearfix mt20">
        <div class="clearfix">
            <div class="list mt20 table_x">
                <table class="tablelist ztavw" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr class="tittrbg">
                        <td class="wid250">支付流水号</td>
                        <td class="wid250">商户订单号</td>
                        <td class="wid100">订单金额</td>
                        <td class="wid300">商品描述</td>
                        <td class="wid150">下单时间</td>
                        <td class="wid100">操作</td>
                    </tr>
                    </thead>
                    <tbody id="viewPayList"></tbody>
                    <tbody id="hidePayList" style="display: none;">
                        <tr class="zw_no_data"><td colspan="14">暂无数据！</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="page pad0">
                <div id="ucPager" class="pagebox clearfix">
                </div>
            </div>
        </div>
    </div>
</div>


</body>
</html>
