
$(function () {
    var SeleCar = new Mobile_SelectCar_v1(0, "selectCar", "SectionSelectCar", "sectionMakeOrModelSearch", true, true, true, false);
    SeleCar.initHidden("hdMakeId", "hdModelId");
    SeleCar.AfterSelectCar = function () {
        $("#selectCar").html($("#selectCar").html().substr(0, 4));
        $("#selectCar").siblings("i").show();
        GotoList();
        //  loadList();
    };
    var ksPingguArea = new Mobile_SelectCity_v1("liSelectArea_Ks", "SectionSelectArea_Ks", true, true);
    ksPingguArea.initHidden("hdProvenceId_Ks", "hdCityId_Ks");
    ksPingguArea.AfterSelectArea = function () {
        $("#selectCar").html($("#selectCar").html().substr(0, 4));
        $("#selectCar").siblings("i").show();
        GotoList();

    }
    $("#selectCar").html($("#selectCar").html().substr(0, 4));

});
function GotoList() {
    var makeid = $.trim($("#hdMakeId").val());
    var modelid = $.trim($("#hdModelId").val());
    var provid = $.trim($("#hdProvenceId_Ks").val());
    var cityid = $.trim($("#hdCityId_Ks").val());
    $.ajax({
        url: "/ershouche/seoPinyin",
        data: {
            "makeId": makeid,
            "modelId": modelid,
            "provId": provid,
            "cityId": cityid
        },
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (msg) {
            //alert(JSON.stringify(msg))
            if (msg != null || msg != "") {
                var _data = msg.data;
                var url = "/gujia/";
                var citySpell = "", makeSpell = "", modelSpell = "";

                if (_data.cityId) {
                    citySpell = _data.cityId.seomatchspell;
                }
                if (_data.makeId) {
                    makeSpell = _data.makeId.seomatchspell;
                }
                if (_data.modelId) {
                    modelSpell = _data.modelId.seomatchspell;
                }
                //alert("citySpell:" + citySpell + "\nmakeSpell:" + makeSpell + "\nmodelspell:" + modelSpell)
                if (citySpell != "") {
                    url += "c" + citySpell + "/";
                    if (makeSpell != "") {
                        url += makeSpell;
                        if (modelSpell != "") {
                            url += "-" + modelSpell;
                        }
                        url += ".html";
                    }
                } else {
                    if (makeSpell != "") {
                        url += "m" + makeSpell + "/";
                        if (modelSpell != "") {
                            url += modelSpell + ".html";
                            ;
                        }

                    }
                }
                // alert(url);
                window.location.href = url;
            }
        }
    });
}