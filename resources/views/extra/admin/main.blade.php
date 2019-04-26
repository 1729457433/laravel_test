<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>title</title>
    <link rel="shortcut icon" href=""/>
    {{--{{asset('css/wangEditor.min.css')}}--}}
    <link rel="stylesheet" href="{{asset('plugs/awesome/css/font-awesome.min.css')}}">
    <link rel="stylesheet" href="{{asset('plugs/bootstrap/css/bootstrap.min.css')}}"/>
    <link rel="stylesheet" href="{{asset('plugs/layui/css/layui.2.3.css')}}"/>
    <link rel="stylesheet" href="{{asset('plugs/layui/css/layui.2.1.css')}}"/>
    <link rel="stylesheet" href="{{asset('theme/default/css/console.css')}}">
    <link rel="stylesheet" href="{{asset('theme/default/css/animate.css')}}">
    @yield('style')
    <script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=GFFBZ-Q5RH4-WMHUJ-XT37J-XLJ4T-T6BCA"></script>
    <script>window.ROOT_URL = '__PUBLIC__';</script>
    <script src="{{asset('plugs/jquery/jquery-3.2.1.min.js')}}"></script>
    <script src="{{asset('plugs/layui/layui.all.js')}}"></script>
    <script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js"></script>

    <script src="{{asset('plugs/require/require.js')}}"></script>
    <script src="{{asset('admin/app.js')}}"></script>

    <script>
        function copyText(txt) {
            var input = document.getElementById('copy_txt');
            input.value = txt; // 修改文本框的内容
            input.select(); // 选中文本
            document.execCommand("copy"); // 执行浏览器复制命令
            layer.msg("复制成功");
        }
    </script>
</head>
@yield('bodyTag')
<body>
<textarea id="copy_txt" style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"></textarea>
@yield('body')
@yield('script')
</body>
</html>