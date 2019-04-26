{{--{extend name="extra@admin/main"}--}}
@extends('extra.admin.main')

@section('style')
    <link rel="stylesheet" href="{{asset('theme/default/css/login.css')}}">
    <style>

        .loginImg{position: absolute;top: 0;left:0;width:100%;height: 100%;z-index: -1;object-fit: cover}
        .loginMin{position: absolute;top: 8px;left:12px;width:140px;height: 50px;}
        .login-container .content{z-index: 10}
        .login-container .container{background: none;}
        .login-container .content{background:#fff;width:390px;height: 420px;position: absolute;right:20%;margin: 60px auto auto auto;border-radius: 4px;}
        .login-container .content ul{margin: 0;padding: 0 30px}
        .login-container .login-input{border:none;border-bottom: 1px solid #e6e6e6;}
        .login-container .content ul li input{margin-bottom: 25px;}
        .loginLogo{width:390px;height: 78px;margin: 30px 0}
        .loginLogo img{width:236px;height: 61px;margin: 0 auto;display: block;}
        .layui-btn{width:330px;background: linear-gradient(to right, #0180ff  ,#0565c4);color:#fff;border-radius: 6px!important;margin-top: 20px;}
        .login-container .header ul li{padding-top: 20px;}
    </style>
 @endsection()



@section('body')
    <div class="login-container full-height" style="background:none;">
        <image class="loginMin" src="{{asset('theme/default/img/logo2.gif')}}" ></image>
            <image class="loginImg" src="{{asset('theme/default/img/light.jpg')}}" ></image>
                <!-- 动态云层动画 开始 -->
                <!--    <div class="clouds-container" >
                <div class="clouds clouds-footer"></div>
                        <div class="clouds"></div>
                <div class="clouds clouds-fast"></div>
                    </div>-->
                <!-- 动态云层动画 结束 -->

                <!-- 顶部导航条 开始 -->
                <div class="header">
                    <!--        <span class="title notselect">
                                欢迎登录 {:sysconf('app_name')} 后台管理 <sup>{:sysconf('app_version')}</sup>
                            </span>-->
                    <ul>
                        <!--            <li><a href="{:url('@')}">回首页</a></li>-->
                        <!--<li>
                            <a href="{:url('@wiki')}" target="_blank"><b style="color:#fff">API文档</b></a>
                        </li>
                        <li class="notselect"><a href="javascript:void(0)" target="_blank">帮助</a></li>-->
                        <li class="notselect">
                            <a href="http://sw.bos.baidu.com/sw-search-sp/software/4bcf5e4f1835b/ChromeStandalone_54.0.2840.99_Setup.exe">
                                <b>推荐使用谷歌浏览器</b>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- 顶部导航条 结束 -->

                <!-- 页面表单主体 开始 -->
                <div class="container" style="top:50%;margin-top:-300px">
                    <form onsubmit="return false;" data-time="0.001" data-auto="true" method="post"
                          class="content layui-form animated fadeInDown">
                        <!--            <div class="people">
                                         <div class="tou"></div>
                                        <div id="left-hander" class="initial_left_hand transition"></div>
                                        <div id="right-hander" class="initial_right_hand transition"></div>
                                    </div>-->
                        <div class="loginLogo">
                            <image  src="{{asset('theme/default/img/logo.png')}}"></image>
                        </div>
                        <ul>
                            <li>
                                <input name='username' class="hide"/>
                                <input required="required" pattern="^\S{4,}$" value="" name="username"
                                       autofocus="autofocus" autocomplete="off" class="login-input username"
                                       title="请输入4位及以上的字符" placeholder="请输入用户名"/>
                            </li>
                            <li>
                                <input name='password' class="hide"/>
                                <input required="required" pattern="^\S{4,}$" value="" name="password"
                                       type="password" autocomplete="off" class="login-input password"
                                       title="请输入4位及以上的字符" placeholder="请输入密码"/>
                            </li>
                            <li class="text-center">
                                <div id="embed-captcha" style="margin: 0 7% 0 7%;"></div>
                                <p id="wait" class="show">正在加载验证码......</p>
                                <p id="notice" class="hide">请先完成验证</p>
                            </li>
                            <li class="text-center" style="margin: -18px;">
                                <button type="submit" class="layui-btn layui-disabled" data-form-loaded="立 即 登 入">正 在 载 入</button>
                                <!--<a style="position:absolute;display:block;right:0" href="javascript:void(0)">忘记密码？</a>-->
                            </li>
                        </ul>
                    </form>
                </div>
                <!-- 页面表单主体 结束 -->

                <!-- 底部版权信息 开始 -->
                @if(1==1)
            <div class="footer notselect">{:sysconf('site_copy')}</div>
                @endif
                <!-- 底部版本信息 结束 -->

    </div>
@endsection

@section('script')
    <script src="{{asset('plugs/jquery/jquery-2.1.3.min.js')}}"></script>
    <script src="{{asset('admin/gt.js')}}"></script>
    <script>
        if (window.location.href.indexOf('#') > -1) {
            window.location.href = window.location.href.split('#')[0];
        }
        require(['jquery'], function ($) {
            $('[name="password"]').on('focus', function () {
                $('#left-hander').removeClass('initial_left_hand').addClass('left_hand');
                $('#right-hander').removeClass('initial_right_hand').addClass('right_hand')
            }).on('blur', function () {
                $('#left-hander').addClass('initial_left_hand').removeClass('left_hand');
                $('#right-hander').addClass('initial_right_hand').removeClass('right_hand')
            });
        });

        // 极验验证
        var handlerEmbed = function (captchaObj) {
            $("#embed-submit").click(function (e) {
                var validate = captchaObj.getValidate();
                if (!validate) {
                    $("#notice")[0].className = "show";
                    setTimeout(function () {
                        $("#notice")[0].className = "hide";
                    }, 2000);
                    e.preventDefault();
                }
            });
            captchaObj.appendTo("#embed-captcha");
            captchaObj.onReady(function () {
                $("#wait")[0].className = "hide";
            });
        };
        $.ajax({
            url: "{{asset('Login/gt')}}?t=" + (new Date()).getTime(),
            type: "get",
            dataType: "json",
            success: function (data) {
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    new_captcha: data.new_captcha,
                    product: "float",
                    offline: !data.success
                }, handlerEmbed);
            }
        });
    </script>
@endsection
