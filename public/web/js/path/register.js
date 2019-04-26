require(['jquery','common'],function($,common){
    var countdown=60;
    var code;
    //抬起事件
    $("[name='tel']").keyup(function(){
        var html = $(this).val();
        if(html != '' ){
            $('.closeIco').show();
            if(regulars(html)){
                $('.loginCodeBtn').removeAttr('disabled');
            }else{
                $('.loginCodeBtn').attr('disabled',true);
            }
        }else{
            $('.closeIco').hide();
            $('.loginCodeBtn').attr('disabled', true);
        }
    })
    //关闭按钮
    $('.closeIco').click(function(){
        $(this).hide();
        $("[name='tel']").val('');
        $('.loginCodeBtn').css('backgroundImage','linear-gradient(to right,#44B0EE,#07deef)').attr('disabled','true');
    })
    //发送手机号
    $('.loginCodeBtn').click(function(){
        if($(this).attr('code') == 1) return false;
        var phone = $("input[name='tel']").val();
        if(phone =='' || !regulars(phone)){
            prompt('请输入正确的手机号！');return false;
        }
        code = phone;
        $(this).attr('code',1);
        ajax('/fawweb/index/Message',{phone:phone},sendMsg)
    })
    //ajax
    function ajax(url,obj,callback){
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: obj,
            async: true,
            success: function(data){
                callback(data);
            },
            error: function(xhr, type){
                prompt('网络出错!');
            }
        })
    }
    //发送短信callback
    function sendMsg(data){
        var obj = $(".loginCodeBtn");
        if(data.code == 1){
            MtaH5.clickStat('2', { 'phone': code })
            prompt(data.msg);
            settime(obj);
        }else{
            obj.attr('code', 0);
            prompt('短信发送失败，请重试');
        }
    }
    //发送验证码倒计时
    function settime(obj) {
        if (countdown == 0) {
            obj.attr('code',0);
            var html = $("input[name='tel']").val();
            if(html =='' || !regulars(html)){
                $('.loginCodeBtn').css('backgroundImage','').attr('disabled',true);
                obj.html("发送验证码");
            }else{
                obj.html("重新获取");
            }
            countdown = 60;
            return;
        } else {
            obj.attr('code',1);
            obj.html(countdown+'秒');
            countdown--;
        }
        setTimeout(function() {
            settime(obj)
        },1000)
    }
    //正则
    function regulars(code) {
        var pattern = /^1[3456789]\d{9}$/;
        if (pattern.test(code)) return true; return false;
    }
})