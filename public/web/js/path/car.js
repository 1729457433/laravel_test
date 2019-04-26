var regular = function (code) {
    var pattern = /^1[3456789]\d{9}$/;
    if (pattern.test(code)) return true; return false;
}
var lay = function (html) {
    $('.loginTipsPop').html(html).show();
    setTimeout(function () {
        $('.loginTipsPop').hide();
    }, 2000)
}
$(function () {
    var opt = {
        'default': {
            theme: 'default',
            mode: 'scroller',
            display: 'modal',
            animate: 'fade',
            onSelect: function (v) {
                var address;
                $(".city_name").each(function(){
                    if($(this).html() == v){
                        address = $(this).val();
                        $("#names_dummy").val(v);
                    }
                })
                $(".carTabItem:first").attr('ar', address);
                var seriesId = $('.carName').attr('ad');
                var type_id = $(".carTypeLive").children('.car_type').attr('ti');
                var obj = { seriesId: seriesId, type_id: type_id, address: address };
                $.post('getDeal', obj, function (res) {
                    if (res.code == 1) {
                        var html = '';
                        html = getDeal(res.data);
                        $(".dealLive").html(html);
                        if (html == '') {
                            $(".firstBtn").attr('disabled', true);
                        }else{
                            $(".firstBtn").removeAttr('disabled');
                        }
                        var url = changeURLArg(location.href, 'address', address);
                        history.replaceState('', '', url);
                    }
                })
            },
        },
        'select-opt': {
            preset: 'select',
            group: true,
            width: 50
        }
    }
    $('.demo-test-select-opt').scroller($.extend(opt['select-opt'],opt['default']));
});
$(function(){
    $(".carClassifyTab .carTabItem").click(function () {
        var i = $(this).index();
        var url = changeURLArg(location.href, 'op', i+1);
        history.replaceState('', '', url);
        $(".carClassifyTab .carTabItem").removeClass("active").eq(i).addClass("active");
        $(".eventsTabContBox .eventsTabCont").hide().eq(i).show();
        if(i == 2){
            getCont(3); $(".questionFrame").show();
        }else if(i==1){
            getCont(2);$(".questionFrame").show();
        }else{
            getCont(1)
            $(".questionFrame").hide();
        }
    })
    $(".moreCar").click(function(){
        $(".carmodal").hide();
        $(".carSeries").show();
        $.post('carseries',function(res){
            if(res.code == 1){
                var data = res.data;
                var html = '';
                for(var i in data){
                    html += getSeries(data[i]);
                }
                $('.carTypeBox').html(html);
            }
        },'json')
    })
    $('.carSeries').on('click','.carTypeItem',function(){
        var ad = $(this).attr('a');
        var name = $(this).find('.carTypeName').html();
        var price = $(this).find('.carTypePrice').html();
        var img = $(this).children('.vehSelImg').attr('src');
        var address = $('.carTabItem:first').attr('ar');
        var op = GetQueryString('op');
        if(op == 2){
            $(".communityBox").html('');
        }else if(op == 3){
            $(".contentBox").html('');
        }
        var url = changeURLArg(location.href, 'id', ad);
        history.replaceState('', '', url);
        $(".carmodal").show();
        $(".carSeries").hide();
        $.post('getTypeDeal', { seriesId: ad, address:address},function(res){
            $('.scaleRule').attr('src', img);
            $('.serPrice').html(price);
            $('.carName').html(name).attr('ad', ad);
            $(".carmodal").show();
            var url = changeURLArg(location.href, 'type', res.data.type.type_id);
            history.replaceState('', '', url);
            $(".carSeries").hide();
            $('.car_type').html(res.data.type.name).attr('ti', res.data.type.type_id);
            getCont(op);
            var deal = res.data.deal;
            var htmls = getDeal(deal);
            if(htmls==''){
                $(".firstBtn").attr('disabled',true);
            } else {
                $(".firstBtn").removeAttr('disabled');
            }
            $('.dealLive').html(htmls);
            $(window).scrollTop(0);
        },'json')
        
    });
    $('.eventsTabContBox').on('click','.carTypeLive',function(){
        var aid = $('.carName').attr('ad')
        $.post('cartype', {seriesId:aid},function(res){
            if(res.code == 1){
                var html = '';
                for(var i in res.data){
                    html += getCartype(res.data[i])
                }
                $(".carmodal").hide();
                $(".carTypes").show().find('.carItemBox').html(html);
            }
        },'json')
    });
    $('.carTypes').on('click','.carModelItem',function(){
        var name = $(this).children('a').html();
        var id = $(this).attr('d');
        $('.carTypeLive .car_type').html(name).attr('ti',id);
        var url = changeURLArg(location.href, 'type', id);
        history.replaceState('', '', url);
        $(".carmodal").show(); $(".carTypes").hide()
    });
    $(".questionFloatBtn").click(function () {
        var user = document.body.getAttribute('eve');
        if (user == 0) { clickdown(); window.location.href = '/fawweb/login/index'; return; }
        var url = $(this).attr('at');
        var at = $(".carTabItem.active").attr('at');
        if (at == 3) {
            $(".PhotoGraph").show(); $(".content").focus().val('');
            setTimeout(function () {
                document.body.scrollTop = document.body.scrollHeight;
            }, 300);
        }
        else { 
            var id = $(".carName").attr('ad');
            clickdown();window.location.href = url+'?id='+id; 
        }
    })
    $(".submits").click(function () {
        var content = $(".content").val();
        var from_id = $(".carName").attr('ad');
        if (content == '') { lay('请填写内容'); return; }
        var obj = { from_id: from_id, type: 3, content: content, to_user_id: 0 }
        $.post('/fawweb/webapi/comment', obj, function (data) {
            if (data.code == 1) {
                $(".PhotoGraph").hide();
                lay('回复成功');
                data.data.content = content;
                var html = getCommenhtml(data.data);
                var objs = $('.eventsComment')
                $('.noCommentBox').hide();
                $(".PhotoGraph").hide();
                objs.show().prepend(html);
            } else { lay('回复失败'); }
        })
    })
    $(".carImgBox").click(function(){
        MtaH5.clickStat("6"); clickdown();
        var id = $(".carName").attr('ad');
        window.location.href = "/fawweb/carmodal/brightspot?sid="+id;
    })
    $(".configurationBtn").click(function(){
        MtaH5.clickStat("7"), clickdown();
        var id = $(".carName").attr('ad');
        window.location.href = "/fawweb/carmodal/parameter?series=" + id;
    })
    $(".applicationBox").on('click','.signupBtn',function(){
        var that = $(this);
        var lock = that.attr('lock');
        if(lock == 2) return;
        that.attr('lock',2);
        var name = $(".user_name").val();
        var sex = $(".sex:checked").val();
        var phone = $(".phone").val();
        var sale_name = $(".dealer:checked").attr('at');
        var sale = $(".dealer:checked").val();
        if (name == '' || phone == '' || sale_name == undefined) {
            that.attr('lock', 1); lay('请填写完整'); return false;
        }
        if (!regular(phone)) { that.attr('lock', 1); lay('请输入正确的手机号'); return false; }
        var id = $(".carName").attr('ad');
        var sn = $(".carName").html();
        var typeid = $(".car_type").attr('ti');
        var type_name = $(".car_type").html();
        var city = $(".carTabItem:first").attr('ar');
        var obj = {
            series_id: id, series_name: sn, type_id: typeid, type_name: type_name,
            sale_id: sale, name: name, sex: sex, phone: phone,city: city, sale_name: sale_name
        };
        $.post('applyDrive', obj, function (data) {
            if (data.code == 1) { clickdown(); window.location.href = "/fawweb/index/successtip?op=1" }
            else { that.attr('lock', 1);lay('申请失败，请重试!'); }
        })
    })
})
window.onload = function(){
    var city = $('.carTabItem:first').attr('an');
    $("#names_dummy").val(city);
    var op = GetQueryString('op') == null ? 1 : GetQueryString('op');
    $(".carClassifyTab .carTabItem").removeClass("active").eq(parseInt(op)-1).addClass("active");
    $(".eventsTabContBox .eventsTabCont").hide().eq(parseInt(op)-1).show();
    if(op == 1){$(".questionFrame").hide()}
    var url = changeURLArg(location.href, 'op', op);
    history.replaceState('', '', url);
    getCont(op);
}
function getCont(op){
    var param = GetRequest();
    $.ajax({
        url: 'index',
        data: param,
        type: "POST",
        dataType: "json",
        success: function (res) {
            var data = res.data;
            var html = '';
            if(op == 3){
                if (data.data.length == 0) {
                    html += '<div class="noCommentBox">'
                    html += '<img class="noCommentImg" src="/static/web/images/noComment.png">'
                    html += '<p style="color:#999">还没有问答，快来提一个吧</p>'
                    html += '</div>'
                    $(".eventsTabCont").last().html(html);
                } else {
                    for(var i in data.data){
                        html += threeHtml(data.data[i]);
                    }
                    $(".eventsTabCont").last().html(html);
                }
            }else if(op == 2){
                if(data.data.length==0){
                    html+='<div class="noCommentBox">'
                    html +='<img class="noCommentImg" src="/static/web/images/noComment.png">'
                    html +='<p style="color:#999">还没有问答，快来提一个吧</p>'
                    html +='</div>'
                    $(".communityBox").html(html)
                }else{
                    html = twoHtml(data.data);
                    $(".communityBox").html(html)
                }
            }else{
                html = oneHtml(data);
                $(".eventsTabCont:first").html(html)
            }
        }
    })
}
var oneHtml = function(data){
    var dealer = data.dealer;
    var type = data.type;
    var html = '';
    html+='<div class="applicationItem">'
    html+='<h4 class="aplItemTitle">试驾车型</h4>'
    html+='<div class="mt5 aplItemCnnt flex carTypeLive" >'
    html+='<a class="sub lineText car_type" ti="'+type.id+'">'+type.name+'</a>'
    html+='<a class="iconfont icon-right""></a>'
    html+='</div>'
    html+='</div>'
    html+='<div class="applicationItem">'
    html+='<h4 class="aplItemTitle">个人信息</h4>'
    html+='<div class="mt5 aplItemCnnt">'
    html+='<div class="signupInpItem flex">'
    html+='<span class="signupInpTit">姓名</span>'
    html +='<input class="signupInp sub user_name" type="text" placeholder="请输入您的姓名">'
    html+='</div>'
    html+='<div class="signupInpItem flex">'
    html+='<span class="signupInpTit">性别</span>'
    html+='<div class="sub">'
    html +='<label class="mr5"><input class="mr5 sex" type="radio" name="sex" value="0" checked><span>先生</span></label>&nbsp;&nbsp;&nbsp;'
    html+='<label><input class="mr5 sex" type="radio" name="sex" value="1"><span>女士</span></label>'
    html+='</div>'
    html+='</div>'
    html+='<div class="signupInpItem flex">'
    html+='<span class="signupInpTit">手机号</span>'
    html +='<input class="signupInp sub phone" type="text" placeholder="请输入您的手机号">'
    html+='</div>'
    html+='</div>'
    html+='</div>'
    html+='<div class="applicationItem">'
    html+='<h4 class="aplItemTitle">经销商</h4>'
    html +='<div class="mt5 aplItemCnnt dealLive" >'
    if(dealer!==null){
        for(var i in dealer){
            html += '<label class="businessItem flex">'
            html += '<input class="mr10 dealer" type="radio" name="dealer" value="'+dealer[i].id+'" at="'+dealer[i].name+'">'
            html += '<div class="sub">'
            html += '<p class="businessItemName">' + dealer[i].name +'</p>'
            html += '<p class="f12 mt10">地址：' + dealer[i].address +'</p>'
            html += '</div>'
            html += '</label>'
        }
    }
    html+='</div>'
    html+='</div>'
    html +='<div class="signupBtnBox" "><button class="signupBtn firstBtn" lock="1" '
    if(dealer==null){
        html+='disabled'
    }
    html +='>提交</button></div>'
    return html;
}
var twoHtml = function(list){
    var html = '';
    var item = '';
    for (var i in list) {
        item = list[i];
        html += '<li class="communityItem">'
        html += '<a class="comItemA" href="/fawweb/answer/answerinfo?aid=' + item.id + '" onclick="clickdown()">'
        html += '<div class="comItemUserBox flex">'
        html += '<div class="itemUserImg">'
        html += '<img class="imgFill" src="'
        html += item.head == '' ? '/static/web/images/default.png' : item.head
        html += '" mode="aspectFill" />'
        html += '</div>'
        html += '<div class="comItemUserInfo sub">'
        html += '<h3 class="itemUserName f14">'
        html += item.user_nick
        if (item.admin == 2) {
            html += '<i class="iconfont icon-v ml5 active"></i>';
        }
        html += '</h3>'
        html += '<p class="comitemTime">' + item.time + '</p>'
        html += '</div></div>'
        html += '<div class="comItemContBox mt10">'
        html += '<h3 class="itemContTitle f16">' + item.title + '</h3>'
        html += '<p class="comItemCont mt5">' + $.trim(item.txt) + '</p>'
        html += '</div>'
        if (item['imgs'] != null) {
            if (item['imgs'].length <= 3) {
                html += '<div class="comItemImgBox mt15">'
                for (var i = 0; i < item['imgs'].length; i++) {
                    html += '<div class="comImgItem"><div class="comImg"><img class="scaleRule" src="' + item['imgs'][i] + '" mode="aspectFill"></div></div>'
                }
                html += '</div>'
            } else {
                html += '<div class="FourSheet" >'
                html += '<div class="FourSheetLeft" style="">'
                html += '<img src="' + item['imgs'][0] + '" width="100%" height="100%;">'
                html += '</div>'
                html += '<div class="FourSheetRight" style="">'
                html += '<div class="FourSheetRightImg">'
                html += '<img src="' + item['imgs'][1] + '" width="100%" height="100%;" >'
                html += '</div>'
                html += '<div  class="FourSheetRightImg">'
                html += '<img src="' + item['imgs'][2] + '" width="100%" height="100%"> '
                html += '</div>'
                html += '</div>'
                html += '<div class="RightNnum">' + item['imgs'].length + '</div>'
                html += '</div>'
            }
        }
        html += '<div class="operatingBox mt10">'
        html += '<p class="operatingBtn">'
        html += '<i class="iconfont icon-liuyan f18"></i> '
        if (item.answer_count > 0) {
            html += '<span>'
            html += item.answer_count
            html += '</span>'
        }
        html += '</p>'
        html += '<p class="operatingBtn">'
        html += '<i class="iconfont f18 zan '
        // if (item.dig == 1) {
        //     html += 'active icon-appreciatefill '
        // } else {
        html += 'icon-appreciate'
        // }
        html += '" aid="' + item.id + '"></i> '

        html += '<span class="zan_count" style="'
        if (item.zan_count == 0) {
            html += 'display:none'
        }
        html += '">' + item.zan_count + '</span>'
        html += '</p></div></a>'
        if (item.answer != '') {
            html += '<div class="leaveMessage f14">'
            html += '<a href="/fawweb/answer/answerinfo?aid=' + item.id + '" onclick="clickdown()">'
            for (var p in item['answer']) {
                html += '<span class="leaveMsgItem" style="display: flex;flex-direction: row;"><span class="msgUserName">'
                html += item.answer[p].user_nick
                if (item.answer[p].admin == 2) {
                    html += '<i class="iconfont icon-v ml5 active"></i>'
                }
                html += '</span>'
                if (item.answer[p].to_user_id != 0) {
                    html += ' 回复 <span class="msgUserName">' + item.answer[p].to_user_nick
                    if (item.answer[p].to_admin == 2) {
                        html += '<i class="iconfont icon-v ml5 active"></i>'
                    }
                    html += '</span>'
                }
                html += '<pre class="preHtml">: ' + item.answer[p].content + '</pre>'
                html += '</span>'
            }
            if (item.answer_count > 3) {
                html += '<a href="/fawweb/answer/answerinfo?aid=' + item.id + '&anchor=1" onclick="clickdown()">'
                html += '<p class="leaveMsgMore">查看更多评论 ></p>'
                html += '</a>'
            }
            html += '</div>'
            html += '</a>'
        }
        html += '</li>'
    }
    return html;
}
var threeHtml = function(data){
    var html = '';
    html += '<div class="commentItem flex">'
    html += '<img class="commentUserImg" src="'
    if (data.user_headimg == '') { html += '/static/web/images/default.png' } else { html += data.user_headimg }
    html += '" mode="aspectFill">'
    html += '<div class="sub ml10">'
    html += '<div class="flex commentUserName">'
    html += '<p class="commentUserNameText sub mr10 lineText">' + data.user_nick
    if (data.admin == 2) {
        html += '<i class="iconfont icon-v ml5 active"></i>'
    }
    html += '</p>'
    html += '<p class="commentThumb" >'
    html += '<span class="commentThumbIco iconfont '
    if (data.dig == 1) {
        html += ' icon-appreciatefill active '
    } else {
        html += ' icon-appreciate '
    }
    html += '" aid="' + data.id + '" ></span>'
    html += '<span class="zan_count" style="'
    if (data.dignum == 0) {
        html += 'display: none'
    }
    html += '">' + data.dignum + '</span>'
    html += '</p>'
    html += '</div>'
    html += '<pre class="commentItemCont">'
    html += data.content
    html += '</pre>'
    html += '<div class="flex commentTimeBox" style="justify-content: space-between;">'
    html += '<div style="display: flex;align-items: center;">'
    html += '<p class="f12 commentTime">' + data.insert_time + '</p>'
    html += '<a class="commentReply" href="' + data.url + '" onclick="clickdown()">回复'
    if (data.count > 0) {
        html += '(' + data.count + ')'
    }
    html += '</a>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    return html;
}
var clickdown = function () {
    localStorage.setItem("retreat", location.href);
}
var getSeries = function(data){
    var html = '';
    html +='<li class="carTypeItem flex" a="'+data.series_id+'">'
        html +='<img class="vehSelImg" src="'+data.imgs+'" mode="aspectFill">'
            html+='<div class="vehSelIinfo sub ml10">'
                html +='<h3 class="carTypeName">'+data.name+'</h3>'
                html +='<p class="carTypePrice mt10">'+data.min_price+'-'+data.max_price+'万</p>'
            html +='</div>'
    html +='</li>'
    return html;
}
var getCartype = function(data){
    var html = '';
    html += '<dd class="carModelItem" d="'+data.type_id+'">'
        html +='<a href="javascript:;">'+data.name+'</a>'
    html +='</dd>'
    return html;
}
var getDeal = function(data){
    var html = '';
    if(data!=null){
        for(var i in data){
            html += '<label class="businessItem flex">'
            html += '<input class="mr10 dealer" type="radio" name="dealer" value="'+data[i].id+'" at="' + data[i].name+'">'
            html += '<div class="sub">'
            html += '<p class="businessItemName">' + data[i].name +'</p>'
            html += '<p class="f12 mt10">地址：' + data[i].address +'</p>'
            html += '</div>'
            html += '</label>'
        }
    }
    return html; 
}
var getCommenhtml = function (data) {
    var url = "/fawweb/answer/answer";
    var html = '';
    html += '<div class="commentItem flex pl">'
    html += '<img class="commentUserImg" src="'
    if (data.h == '') { html += '/static/web/images/default.png' } else { html += data.h }
    html += '" mode="aspectFill">'
    html += '<div class="sub ml10">'
    html += '<div class="flex commentUserName">'
    html += '<p class="commentUserNameText sub mr10 lineText">' + data.n
    if (data.admin == 2) {
        html += '<i class="iconfont icon-v ml5 active"></i>'
    }
    html += '</p>'
    html += '<p class="commentThumb" >'
    html += '<span class="commentThumbIco zan iconfont  icon-appreciate " aid="' + data.i + '" ></span>'
    html += '<span class="zan_count" style="display: none">0</span>'
    html += '</p>'
    html += '</div>'
    html += '<pre class="commentItemCont">'
    html += data.content
    html += '</pre>'
    html += '<div class="flex commentTimeBox" style="justify-content: space-between;">'
    html += '<div style="display: flex;align-items: center;">'
    html += '<p class="f12 commentTime">刚刚</p>'
    html += '<a class="commentReply" href="' + url + '?aid=' + data.i + '">回复</a>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    return html;
}
$('.contentBox').on('click', '.commentThumb', function () {
    var user = document.body.getAttribute('eve');
    var lock = $('.contentBox').attr('isLock');
    if (user == 0) { clickdown(); window.location.href = '/fawweb/login/index'; return; }
    if (lock == 1) return;
    $('.contentBox').attr('isLock', 1);
    var zan = $(this).children('.commentThumbIco'); var answer_id = zan.attr('aid');
    var obj = { comment_id: answer_id }
    $.post('/fawweb/webapi/car_zan', obj, function (res) {
        if (res.code == 1) {
            if (zan.hasClass('icon-appreciate')) {
                zan.removeClass('icon-appreciate').addClass('icon-appreciatefill active');
            } else {
                zan.removeClass('icon-appreciatefill active').addClass('icon-appreciate');
            }
            if (res.data.dig > 0) {
                zan.next('span').css('display', 'inline').html(res.data.dig)
            } else {
                zan.next('span').css('display', 'none')
            }
        }
        $('.contentBox').attr('isLock', 0);
    }, 'json')
})

