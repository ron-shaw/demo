$(function () {

    //查询按钮增加响应事件
    $("#btnSearch").on("click", function(){
        var param = {
            "startTime" : "2017-07-18",
            "endTime" : "2017-07-19"
        };
        Pay.queryList(1, 10);
    });
});

var Pay = {
    queryList : function(pageIndex, pageSize) {
        Loading(1);
        $.ajax({
            type: "GET",
            dataType: "json",
            data: Pay.formSearchParam(),
            url: "/manage/payment/pay/list?pageNo=" + pageIndex + "&pageSize=" + pageSize + "&rand=" + new Date().getTime(),
            success: function (data) {
                console.log(data);
                Loading(2);
                if(200 != data.status || data.list.length <= 0){
                    $('#viewPayList').hide();
                    $('#hidePayList').show();
                    $("#ucPager").html("");
                    return;
                }

                var tableHtml = "";
                $.each(data.list, function(key, val) {
                    tableHtml += "<tr data=" + val.tradeId + ">";
                    tableHtml += "<td>" + val.tradeId + "</td>";
                    tableHtml += "<td>" + val.mchOrderNo + "</td>";
                    tableHtml += "<td>" + val.amount + "</td>";
                    tableHtml += "<td>" + val.description + "</td>";
                    tableHtml += "<td>" + val.createTime + "</td>";
                    tableHtml += "<td></td>";
                    tableHtml += "</tr>";
                });
                $("#viewPayList").html(tableHtml);
                if (data.pageNo == 1) {
                    $("#ucPager").NewPage({
                        pageDIV: "#ucPager",
                        TotalPages: data.pageCount,
                        TotalRecords: data.total,
                        PageSize: data.pageSize,
                        handlefun: "Pay.queryList",
                        argument: ""
                    });
                }
                $('#viewPayList').show();
                $('#hidePayList').hide();
            },
            error: function (request, status, errorThrown) {
                Loading(2);
            }
        });
    },

    formSearchParam : function() {
        var SearchOption = {};
        SearchOption = {
            "startTime" : "2017-07-18",
            "endTime" : "2017-07-19"
        };
        return SearchOption;
    }

}

//加载中
function Loading(type) {
    if (type == 1) {
        $("#divLoad").show();
        $("#zyybg").show();
    } else {
        $("#divLoad").hide();
        $("#zyybg").hide();
    }
}