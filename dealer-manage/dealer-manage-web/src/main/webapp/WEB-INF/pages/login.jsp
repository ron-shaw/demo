<%--
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link href="${globalCssBasePath}/css/comm.css" type="text/css" rel="stylesheet" />
    <link href="${globalCssBasePath}/css/zw.css" type="text/css" rel="stylesheet" />
    <link href="${globalCssBasePath}/css/style.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="${globalJsBasePath}/js/jquery-1.9.1.min.js?v=2016072801"></script>
    <script>
        $(function () {
            $("#btnLogin").click(function () {
                LoginIn();
            });
        });
        function LoginIn() {
            if (checklogin()) {
                $.ajax({
                    url: '/sysUser/loginJZG',
                    data: {
                        "userName": $.trim($("#txtLoginName").val()),
                        "password": $.trim($("#txtLoginPass").val()),
                    },
                    type: "post",
                    datatype: "json",
                    async: false,
                    //beforeSend: function () {
                    //},
                    success: function (data) {
                        //  alert(JSON.stringify(data));
                        if (data.status == 200) {
                            if($.trim($("#hdBackurl").val())!=""){
                                window.location.href = $.trim($("#hdBackurl").val());
                            }else {
                                window.location.href = "/sysUser/index";
                            }
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        }
        function checklogin() {

            var loginname = $('#txtLoginName').val();
            var loginpass = $('#txtLoginPass').val();

            if (loginname == '' || loginname == '请输入用户名') {
                alert('请输入用户名');
                return false;
            } else if (!checkLoginName()) {
                alert('用户名不存在');
                return false;
            }

            if (loginpass == '') {
                alert('请输入登录密码！');
                return false;
            }
            return true;
        }
        function checkLoginName() {
            var IsPsss = false;
            $.ajax({
                url: '/sysUser/checkLoginName',
                type: "post",
                data: {
                    "logincode": $.trim($("#txtLoginName").val()),
                },
                datatype: "json",
                async: false,
                //beforeSend: function () {
                //},
                success: function (data) {
                    if (data.status == 200) {
                        IsPsss = true;
                    }
                }
            });
            return IsPsss;
        }
    </script>
</head>
<form id="form1" runat="server">
    <input type="hidden" value="${backurl}" id="hdBackurl"/>
    <div class="login_body_bg" id="login_body">
        <!--中间内容开始-->
        <!--头部开始-->
        <div class="login_head" id="head">
            <div class="login_cont clearfix mt10">
                <div class="login_logo">
                    <img src="${globalImgBasePath}/images/login.png" alt="" />
                </div>
                <div class="login_tit">
                    <span><a href="javascript:;">经销商后台管理系统</a></span>
                </div>
            </div>
        </div>
        <!--头部结束-->

        <div class="login bor-ra">
            <div class="login_box">
                <div class="zw_log_tit col3e3">用户登录</div>
                <ul class="zw_log_ul clearfix">
                    <li>
                        <em class="zw_log_em"></em>
                        <input type="text" value="请输入用户名" maxlength="20" runat="server" onfocus="if($(this).val()=='请输入用户名'){$(this).val('')} $(this).removeClass('inp198'); " onblur="if($.trim($(this).val())==''){$(this).val('请输入用户名').addClass('inp198')}" class="inp198 zit_inp" id="txtLoginName" /><!--字体灰色zit_on-->
                    </li>
                    <li class="">
                        <em class="zw_log_em zw_log_em2"></em>
                        <input type="password" value="" runat="server" maxlength="20" class=" zit_inp" onfocus="$('.lbPwd').hide();" onblur="if($(this).val()==''){$('.lbPwd').show();}"  id="txtLoginPass" onkeydown="if(event.keyCode==13)LoginIn();" /><!--字体灰色zit_on-->
                        <label class="zxdml lbPwd" onclick="$(this).hide();$('#txtLoginPass').focus();">请输入密码</label>
                    </li>
                </ul>
                <div class="btn mt20 login_btn">
                    <a href="javascript:;" class="bor-ra" id="btnLogin">登录</a>

                </div>
            </div>
        </div>

        <div class="login_footer clearfix">
            <!--版权开始-->
            <div class="login_cont">
                <p>
                    <i>Copyright © 2016 精真估</i>
                </p>
            </div>
        </div>
        <!--版权结束-->
    </div>
    <!--中间内容结束-->
</form>
</body>
</html>
--%>







<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>


<!-- Mirrored from www.zi-han.net/theme/hplus/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 20 Jan 2016 14:18:23 GMT -->
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>H+ 后台主题UI框架 - 登录</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">

    <link rel="shortcut icon" href="favicon.ico"> <link href="/static/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="/static/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">

    <link href="/static/css/animate.min.css" rel="stylesheet">
    <link href="/static/css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>
    <script src="/static/js/jquery.min.js?v=2.1.4"></script>

    <script>
        $(function () {
            $("#btnLogin").click(function () {
                LoginIn();
            });
        });
        function LoginIn() {
            if (checklogin()) {
                $.ajax({
                    url: '/sysUser/loginJZG',
                    data: {
                        "userName": $.trim($("#txtLoginName").val()),
                        "password": $.trim($("#txtLoginPass").val()),
                    },
                    type: "post",
                    datatype: "json",
                    async: false,
                    //beforeSend: function () {
                    //},
                    success: function (data) {
                        //  alert(JSON.stringify(data));
                        if (data.status == 200) {
                            if($.trim($("#hdBackurl").val())!=""){
                                window.location.href = $.trim($("#hdBackurl").val());
                            }else {
                                window.location.href = "/sysUser/index";
                            }
                        } else {
                            //alert(data.msg);
                            parent.layer.msg(data.msg);
                        }
                    }
                });
            }
        }
        function checklogin() {

            var loginname = $('#txtLoginName').val();
            var loginpass = $('#txtLoginPass').val();

            if (loginname == '' || loginname == '请输入用户名') {
                //alert('请输入用户名');
                parent.layer.msg("请输入用户名");
                return false;
            } else if (!checkLoginName()) {
                //alert('用户名不存在');
                parent.layer.msg("用户名不存在");
                return false;
            }

            if (loginpass == '') {
                //alert('请输入登录密码！');
                parent.layer.msg("请输入登录密码");
                return false;
            }
            return true;
        }
        function checkLoginName() {
            var IsPsss = false;
            $.ajax({
                url: '/sysUser/checkLoginName',
                type: "post",
                data: {
                    "logincode": $.trim($("#txtLoginName").val()),
                },
                datatype: "json",
                async: false,
                //beforeSend: function () {
                //},
                success: function (data) {
                    if (data.status == 200) {
                        IsPsss = true;
                    }
                }
            });
            return IsPsss;
        }
    </script>
</head>

<body class="gray-bg">

<div class="middle-box text-center loginscreen  animated fadeInDown">
    <div>
        <div>

            <h1 class="logo-name">DM</h1>

        </div>
        <h3>欢迎使用 经销商后台管理系统</h3>

        <form class="m-t" role="form" action="http://www.zi-han.net/theme/hplus/index.html">
            <div class="form-group">
                <%--<input type="text" class="form-control" placeholder="用户名" required="">--%>
                <%--<input type="text" class="form-control" placeholder="用户名" required="" maxlength="20" runat="server" onfocus="if($(this).val()=='请输入用户名'){$(this).val('')} $(this).removeClass('inp198'); " onblur="if($.trim($(this).val())==''){$(this).val('请输入用户名').addClass('inp198')}" class="inp198 zit_inp" id="txtLoginName" /><!--字体灰色zit_on-->--%>
                    <input id="txtLoginName" name="txtLoginName" class="form-control" placeholder="用户名" type="text" aria-required="true" aria-invalid="true" required="" minlength="2">
            </div>
            <div class="form-group">
                <%--<input type="password" class="form-control" placeholder="密码" required="">--%>
                <input id="txtLoginPass" name="txtLoginPass" class="form-control" placeholder="密码" type="password" required="">
            </div>
            <%--<button type="submit" id="" class="btn btn-primary block full-width m-b">登 录</button>--%>
            <a id="btnLogin" class="btn btn-primary block full-width m-b">登 录</a>

            <%--<p class="text-muted text-center"> <a href="login.html#"><small>忘记密码了？</small></a> | <a href="register.html">注册一个新账号</a>
            </p>--%>

        </form>
    </div>
</div>

<script src="/static/js/bootstrap.min.js?v=3.3.6"></script>
<script src="/static/js/content.min.js?v=1.0.0"></script>
<script src="/static/js/plugins/validate/jquery.validate.min.js"></script>
<script src="/static/js/plugins/validate/messages_zh.min.js"></script>
<script src="/static/js/demo/form-validate-demo.min.js"></script>
<script src="/static/js/plugins/layer/layer.min.js"></script>
<script src="/static/js/content.min.js?v=1.0.0"></script>
<%--<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>--%>
</body>


<!-- Mirrored from www.zi-han.net/theme/hplus/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 20 Jan 2016 14:18:23 GMT -->
</html>







