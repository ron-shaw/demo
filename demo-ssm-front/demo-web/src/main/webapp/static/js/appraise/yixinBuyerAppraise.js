/**
 * Created by dara on 2017/1/16.
 */

function initData(carCostObj, carCostPercent){
    bindEvent();

    LoadHistoryCj();

    loadCostInfo(carCostObj, carCostPercent);
}

function bindEvent() {
    tabjh("al_tit", "tab_body");
    $("#txtIputMileage").numeral();

    $("#btnGoChengben").click(function () {
        var mil = $.trim($("#txtIputMileage").val());
        var regdate = $.trim($("#hdRegDate").val());
        var styleId = $.trim($("#hdStyleid").val());
        var cityId = $.trim($("#hdCityId").val());
        var provId = $.trim($("#hdProvId").val());
        var Mile = 0;
        var reg = /^\+?[1-9][0-9]*$/;
        if (mil == "") {
            alert("请输入行驶里程");
            return false;
        }
        if (!reg.test(mil)) {
            alert("里程格式不正确");
            return false;
        } else {
            var endDate = new Date();
            var monthNum = new Date(regdate).dateDiff('m', endDate);
            Mile = (Number(mil) / 12).toFixed(0) * Number(monthNum>0?monthNum:1);
        }
        $.ajax({
            url:'/yixin/getCarCostInfo',
            data:{styleId:styleId,mileage:Mile,cityId:cityId,regDate:regdate},
            datatype:'json',
            success:function (data) {
                if(data.status==200){
                    loadCostInfo(data.data.carCost, $.parseJSON(data.data.carCostPercent));
                }else{
                    alert("查询失败");
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
//                    alert("查询失败");
                console.log(XMLHttpRequest);
                console.log(errorThrown);
            }
        });

    });
}

function loadCostInfo(carCost,carCostPercent) {
    LoadTbCost(carCostPercent);
    var totalCostAmount = carCost.avgTaxAmount+ carCost.avgInsuranceAmount+carCost.avgMaintenceAmount+
        carCost.avgOilAmount+carCost.avgC2BDepreciationsAmount;
    var oilPercent = (carCost.avgOilAmount/totalCostAmount*100).toFixed(0);
    var taxPercent = (carCost.avgTaxAmount/totalCostAmount*100).toFixed(0);
    var insurancePercent = (carCost.avgInsuranceAmount/totalCostAmount*100).toFixed(0);
    var maintencePercent = (carCost.avgMaintenceAmount/totalCostAmount*100).toFixed(0);
    $(".lbYeartotal").html((totalCostAmount / 10000.00).toFixed(2) + "万/年")
    $(".lbMonthtotal").html((totalCostAmount/12/ 10000.00).toFixed(2) + "万/月")
    $(".lbYearOil").html((carCost.avgOilAmount / 10000.00).toFixed(2) + "万/年")
    $(".lbYearOilPer").html("燃油(" + oilPercent + "%)")
    $(".lbYearMaintain").html((carCost.avgMaintenceAmount / 10000.00).toFixed(2) + "万/年")
    $(".lbYearMaintainPer").html("保养(" + maintencePercent + "%)")
    $(".lbYearInsurance").html((carCost.avgInsuranceAmount / 10000.00).toFixed(2) + "万/年")
    $(".lbYearInsurancePer").html("保险(" + insurancePercent + "%)")
    $(".lbYearTax").html((carCost.avgTaxAmount / 10000.00).toFixed(2) + "万/年")
    $(".lbYearTaxPer").html("税费(" + taxPercent + "%)")
    $(".lbYearDepreciation").html((carCost.avgC2BDepreciationsAmount / 10000.00).toFixed(2) + "万/年")
    $(".lbYearDepreciationPer").html("折旧(" + (100-oilPercent-taxPercent-insurancePercent-maintencePercent).toFixed(0) + "%)")
}

$.fn.numeral = function () {
    $(this).css("ime-mode", "disabled");
    this.bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
        if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下不能使用退格键
        {
            return;
        }
        return code >= 48 && code <= 57;
    });
    this.bind("blur", function () {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    });
    this.bind("paste", function () {
        var s = clipboardData.getData('text');
        if (!/\D/.test(s));
        value = s.replace(/^0*/, '');
        return false;
    });
    this.bind("dragenter", function () {
        return false;
    });
    this.bind("keyup", function () {
        if (/(^0+)/.test(this.value)) {
            this.value = this.value.replace(/^0*/, '');
        }
    });
};

/* 计算两日期相差的日期年月日等 */
Date.prototype.dateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
}

function LoadHistoryCj() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('zhe'));

    var HistoryTitl = $.trim($("#hdAvTitle").val()).split(',');
    var HistoryPer = $.trim($("#hdAvPeson").val()).split(',');
    var HistroryBus = $.trim($("#haAvBus").val()).split(',');
    // 指定图表的配置项和数据
    optionZhe = {
        baseOption: {
            tooltip: {
                show: false
            },
            legend: {
                left: 'right',
                data: ['车商车源', '个人车源'],
                selectedMode: false,
                textStyle: {
                    fontSize: 12
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    minInterval: 1,
                    axisTick: { show: false },
                    data: HistoryTitl,
                    axisLine: { lineStyle: { color: '#999' } },
                    axisLabel: {
                        interval: 0,
                        margin: 22
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: { lineStyle: { color: '#999' } },
                    scale: true,
                    axisTick: { show: false },
                    axisLabel: {
                        textStyle: {
                            color: '#9e9a94'
                        }
                    }
                }
            ],
            textStyle: {
                color: '#555',
                fontSize: '14'
            },
            series: [
                {
                    name: '车商车源',
                    type: 'line',
                    symbolSize: 10,
                    label: {
                        normal: {
                            show: true,
                            position: [-1, -15],
                            textStyle: { fontSize: 10 }
                        }
                    },

                    itemStyle: {
                        normal: {
                            color: 'rgb(255,164,48)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            shadowColor: 'rgb(255,164,48)',
                            opacity: 0.3
                        }
                    },

                    data: HistroryBus
                },
                {
                    name: '个人车源',
                    type: 'line',
                    symbolSize: 10,
                    label: {
                        normal: {
                            show: true,
                            position: [-1, 10],
                            textStyle: { fontSize: 10 }
                        }
                    },
                    areaStyle: {
                        normal: {
                            shadowColor: 'rgb(0,156,242)',
                            opacity: 0.3
                        }
                    },

                    itemStyle: {
                        normal: {
                            color: 'rgb(0,156,242)'
                        }
                    },
                    data: HistoryPer
                }
            ]
        },
        media: [ // 这里定义了 media query 的逐条规则。
            {
                query: { maxWidth: 640, minWidth: 200 },                   // 这条里没有写规则，表示『默认』，
                option: {
                    tooltip: {
                        show: false
                    },
                    legend: {
                        data: ['车商车源', '个人车源'],
                        selectedMode: false,

                        left: 'right'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        width: "90%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: { lineStyle: { color: '#999' } },
                            minInterval: 1,
                            nameLocation: 'middle',
                            nameGap: 10,
                            interval: {
                                length: 5
                            },
                            splitLine: {
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0,
                                margin: 22
                            },
                            splitNumber: 6,
                            axisTick: { show: false },
                            data: HistoryTitl


                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#999' } },
                            scale: true,
                            axisTick: { show: false }
                        }
                    ],
                    textStyle: {
                        color: '#555',
                        fontSize: '14'
                    },

                    series: [
                        {
                            name: '商家车源',
                            type: 'line',
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: [-1, -15],
                                    textStyle: { fontSize: 10 }

                                }
                            },

                            itemStyle: {
                                normal: {
                                    color: 'rgb(255,164,48)'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    shadowColor: 'rgb(255,164,48)',
                                    opacity: 0.3
                                }
                            },
                            clipOverflow: false,
                            data: HistroryBus
                        },
                        {
                            name: '个人车源',
                            type: 'line',
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: [-1, 10],
                                    textStyle: { fontSize: 10 }
                                }
                            },
                            areaStyle: {
                                normal: {
                                    shadowColor: 'rgb(0,156,242)',
                                    opacity: 0.3
                                }
                            },

                            itemStyle: {
                                normal: {
                                    color: 'rgb(0,156,242)'
                                }
                            },
                            clipOverflow: false,
                            data: HistoryPer
                        }
                    ]
                }
            }
        ]

    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(optionZhe);
}

function LoadTbCost(costObj) {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{b}:({d}%)"
        },
        legend: {
            show: false,
            left: 100,
        },
        grid: {
            width: '90%',
            left: 0,
            right: 0
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['65%', '50%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,

                label: {
                    normal: {
                        show: false

                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: costObj
            }

        ],
        color: ['rgb(134,194,38)', 'rgb(255,204,0)', 'rgb(255,169,18)', 'rgb(255,101,92)', 'rgb(71,116,184)']
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}