var Base = function(){
    this.RetStatus={
        Ok:200,
        Failure:202,
        InValid:204,
        Exception:500,
        NoLogin:700,
        NoAuth:701
    };

    this.WebConfig={
        imgPath:{
        }
    };
    this.gotoTop = function (top) {
        if ($('body').scrollTop() != undefined) {
            if(typeof top != undefined && top>0) $('body').scrollTop(top);
            else $('body').scrollTop(0);
        }
    };
}
var Common = {
    goBack :function () {
        if(window.history.length>1){
            window.history.go(-1);
        }else{
            window.location.href="/"
        }
    },
    showLoading:function () {
        var html = '<div class="zjzzq"><div><img src="/static/images/loading.gif" alt=""></div></div>';
        $("div.cont").append(html);
    },
    hideLoading:function () {
        $("div.zjzzq").remove()
    }
}