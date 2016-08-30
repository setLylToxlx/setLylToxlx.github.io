$(function(){
    var newPeopleGift = {
        init:function(){
            this.loadImg();
            this.bindClick();
        },
        loadImg:function(){
            $('.lazy').lazyload({
                time:250,
                effect:'fadeIn'
            });
        },
        bindClick:function(){
            $('.get-ticket').click(function(){
                var id = $(this).attr('data-id');
                newPeopleGift.getCoups(id);
            });
            $('.guide-title li').click(function(e){
                var e = e || window.event;
                var target = e.target;
                var len = $('.guide-title li').length;
                var index = target.getAttribute('data-id');
                var oldClass = target.className.substr(0,10);
                for(var i=1;i<=len;i++){
                    $('.noneCheck'+i).removeClass('check'+i);
                    $('.checkList'+i).hide();
                }
                var newClass = 'check'+index;
                target.className = (oldClass+" "+newClass);
                $('.checkList'+index).show();
            });
            $('.close').click(function(){
                $('.hold').hide();
                $('.position').hide();
            });
            $('.pop-content').on('click','#goBuy',function(){
                $('.hold').hide();
                $('.position').hide();
            }).on('click','#share',function(){
                newPeopleGift.share();
                setTimeout(function(){
                    $('.hold').hide();
                    $('.position').hide();
                },100)
            });
            $('#sendVeriCode').click(function(){
                newPeopleGift.sentPhoneCode($('#phoneNum'));
                //if(!newPeopleGift.verifyCode($('#phoneNum'))){
                //    $('._iptTip').html('号码格式不正确！').show();
                //}else{
                //    $('._iptTip').html('号码格式正确！').show();
                //}
            });
        },
        //校验电话号码
        verifyCode:function(code){
            var myReg = /^((1[3|4|5|7|8])+\d{9})$/;
            return myReg.test($.trim(code.val()));
        },
        //获取验证码
        sentPhoneCode:function(obj){
            var _v = $.trim(obj.val());
            $.ajax({
                url : 'http://my.okhqb.com/my/sendMobileBindMsg.json?tel='+_v,
                dataType : "jsonp",
                jsonp: 'callback',
                success: function(d){
                    if(d.code === 200){
                        $('#sendVeriCode').addClass('disabled');
                        $('.time_down').show();
                        countLtime();
                    }
                    else if (d.code === 500) {
                        art.dialog({
                            id : '__tips',
                            title : '系统提示',
                            content : '领取成功，优惠券已经发放至您的个人中心',
                            width : '600',
                            height : '400',
                            ok : true
                        });
                    }
                    else {
                        art.dialog({
                            title:false,
                            content:d.msg,
                            noFn:true,
                            time:3,
                            icon:'error_s',
                            close: function(){
                                location.reload();

                            }
                        });
                    }

                }
            });
        },
        //验证领券
        getVerify:function(){
            var _v = $.trim($('#veriCode').val());
            if(!_v){
                $('#veriCode').siblings('.veri_tip').html('请输入验证码!');
            }else{

                $.ajax({
                    url : 'http://my.okhqb.com/my/validateMobileBindMsg.json?randCode='+_v,
                    dataType : "jsonp",
                    jsonp: 'callback',
                    success: function(d){
                        if(d.code == 200){
                            art.dialog.get('checkPhone').close();
                            //验证手机成功即领券成功
                            //$('.coupon').addClass('received');
                            //$('#popupWrap').show();
                            successSubmit();

                        }else{
                            $('#veriCode').siblings('.veri_tip').html(d.msg).show();
                            //art.dialog.get('checkPhone').time(2);
                        }
                    }
                });
            }
        },
        //
        countLtime:function(){
            var time = 60,
                _ct = null;
            _ct = setInterval(function(){
                time--;
                $('.time_down b').html(time);
                if(time == 0){
                    clearInterval(_ct);
                    //重新发送
                    $('#sendCodeAgain').click(function() {
                        var $phoneNum = $('#phoneNum');
                        sendtel($phoneNum);
                    });
                }
            },1000);
        },
        //分享
        share:　function() {
            (function (s, d, e) {
                try {
                } catch (e) {
                }
                var random = Math.random()*3;
                var arrText = ['不再剁手！','不再神秘！','不再什么鬼！'];
                var f = 'http://v.t.sina.com.cn/share/share.php?', u = d.location.href, p = ['url=', e(u), '&title=', e('老板太任性！一言不合就发钱！我已近抢到180元大红包啦！'+arrText[random]+'小强给我发了180元大红包！数量有限！赶快来抢咯！小强家发红包啦！小手一抖，180元红包送到手！再也不用天天吃土啦！'), '&appkey=2924220432',  e('')].join('');

                function a() {
                    if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))){u.href = [f, p].join('')};
                }
                if (/Firefox/.test(navigator.userAgent)) {
                    setTimeout(a, 0)
                } else {
                    a()
                }
            })(screen, document, encodeURIComponent);
        },
        //优惠券
        getCoups: function(couponId){
            var _isLogin = OKHQB_sign.isSignIn();
            if (_isLogin) {
                OKHQB_sign.dialog({
                    sign_in_callback: function () {
                        window.location.href = window.location.href;
                    }
                });
            } else {
                $.ajax({
                    url: "http://my.okhqb.com/my/registCoupons.json",
                    data: {
                        'couponId': couponId
                    },
                    type: "GET",
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (data) {
                        //data = {code:'119054'};
                        if (data.code == 200) {
                            $('.hold').show();
                            $('.position').show();
                            setTimeout(function () {
                                $('.pop-content').html('<p class="pop-title">恭喜大人</p>' +
                                    '<p class="pop-info"><span>80</span>元礼包已收入囊中，首购再送<span>100</span>大元哦！</p>' +
                                    '<a href="http://my.okhqb.com/my/coupons.html" target="_blank" class="pop-btn">查看我的优惠券</a>' +
                                    '<a href="#go-buy" id="goBuy" class="pop-btn">去逛逛</a>')
                            }, 100)
                        } else if (data.code == 590) {
                            OKHQB_sign.dialog({
                                sign_in_callback: function () {
                                    window.location.href = window.location.href;
                                }
                            });
                        }else if (data.code == 119054) {
                            window.location.href = "http://my.okhqb.com/my/security/smsVarify.html?verifyType=SMS";
                        }
                        else if (data.code == 119034) {
                            $('.hold').show();
                            $('.position').show();
                            setTimeout(function () {
                                $('.pop-content').html('<p class="pop-title">启禀大人</p>' +
                                    '<p class="pop-info">您已领取过新人礼包，好东西要跟好朋友共享哟！</p>' +
                                    '<a href="JavaScript:;" id="share" class="pop-btn">马上分享</a>' +
                                    '<a href="#go-buy" id="goBuy" class="pop-btn">不分享，马上购</a>')
                            }, 100)
                        }else{
                            art.dialog({
                                title:false,
                                content:data.msg,
                                noFn:true,
                                time:3,
                                icon:'error_s'
                            });
                        }

                    }
                });
            }
        }
    };
    newPeopleGift.init();
});

