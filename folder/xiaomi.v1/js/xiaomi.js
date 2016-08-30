$(function(){
    var mI = {
        init:function(){
            this.loadImg();
            this.bindClick();
            this.countDown();
            $(window).scroll(function () {
                mI.nav();

            });
        },
        loadImg:function(){
            $('.lazy').lazyload({
                time:250,
                effect:'fadeIn'
            });
        },
        bindClick:function(){
            $('#book').click(function(){
                var _isLogin = OKHQB_sign.isSignIn();
                if (!_isLogin) {
                    OKHQB_sign.dialog({
                        sign_in_callback: function () {
                            window.location.href = window.location.href;
                        }
                    });
                } else {
                    $.ajax({
                        type: 'Get',
                        url: 'http://my.okhqb.com/my/addSubscribeInfo.json?subscribeType=XM',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        success: function (data) {
                            if (data.code == 200) {
                                $('.hold').show();
                                $('.position').show();
                                setTimeout(function(){
                                    var _html = '成功预约 魅族MX6';
                                    $('.book-text').html(_html);
                                    $('.book').show();
                                },100);
                            }else if(data.code == 701373) {
                                $('.hold').show();
                                $('.position').show();
                                setTimeout(function(){
                                    var _html = '已经成功预约 魅族MX6';
                                    $('.book-text').html(_html);
                                    $('.book').show();
                                },100);
                            }else if(data.code == 590){
                                OKHQB_sign.dialog({
                                    sign_in_callback: function () {
                                        window.location.href = window.location.href;
                                    }
                                });
                            }
                        }
                    });
                }
            });
            $('.get-ticket').click(function(){
                var id = $(this).attr('data-id');
                mI.getCoups(id);
            });
            $('.nav-list').on('click','a',function(e){
                var e = e || window.event;
                var target = e.target;
                var index = target.className.substr(3);
                var len = $('.nav-list a').length;
                for(var i=1;i<=len;i++){
                    $('.nav'+i).removeClass('nav-active');
                }
                target.className = ('nav'+index+" "+'nav-active');
            });
        },
        //导航
        nav: function(){
            var This = this;
            var Top = $('.head').position().top;
            var Nav = $('.nav');
            var len = $('.nav-list a').length;
            if ($(window).scrollTop() > Top) {
                if($(window).scrollTop()>$('.title-one').position().top){
                    var len = $('.nav-list a').length;
                    for(var i=1;i<=len;i++){
                        $('.nav'+i).removeClass('nav-active');
                    }
                    $('.nav-list a')[0].className = ('nav1 nav-item nav-active');
                }
                if($(window).scrollTop()>$('.title-two').position().top){
                    var len = $('.nav-list a').length;
                    for(var i=1;i<=len;i++){
                        $('.nav'+i).removeClass('nav-active');
                    }
                    $('.nav-list a')[1].className = ('nav1 nav-item nav-active');
                }
                if($(window).scrollTop()>$('.title-three').position().top){
                    var len = $('.nav-list a').length;
                    for(var i=1;i<=len;i++){
                        $('.nav'+i).removeClass('nav-active');
                    }
                    $('.nav-list a')[2].className = ('nav1 nav-item nav-active');
                }
                if($(window).scrollTop()>$('.title-four').position().top){
                    var len = $('.nav-list a').length;
                    for(var i=1;i<=len;i++){
                        $('.nav'+i).removeClass('nav-active');
                    }
                    $('.nav-list a')[3].className = ('nav1 nav-item nav-active');
                }
                if($(window).scrollTop()>$('.title-five').position().top){
                    var len = $('.nav-list a').length;
                    for(var i=1;i<=len;i++){
                        $('.nav'+i).removeClass('nav-active');
                    }
                    $('.nav-list a')[4].className = ('nav1 nav-item nav-active');
                }
                if($(window).scrollTop()>$('.bottom-top').position().top){
                    var len = $('.nav-list a').length;
                    for(var i=1;i<=len;i++){
                        $('.nav'+i).removeClass('nav-active');
                    }
                    $('.nav-list a')[5].className = ('nav1 nav-item nav-active');
                }
                console.log($(window).scrollTop());
                setTimeout(function () {
                    Nav.show();
                }, 10);
            } else {
                setTimeout(function () {
                    Nav.hide();
                }, 10);
            }
        },
        //分享
        share:　function() {
            (function (s, d, e) {
                try {
                } catch (e) {
                }
                var f = 'http://v.t.sina.com.cn/share/share.php?', u = d.location.href, p = ['url=', e(u), '&title=', e('微博分享文案：  小米出新品啦！双摄像头十核处理器的红米旗舰之作红米Pro，能拍出像单反一样背景虚化的专业照片。小强家同步官网8月6号开售，快来来预约吧！'), '&appkey=2924220432',  e('')].join('');

                function a() {
                    if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))){u.href = [f, p].join('')};
                };
                if (/Firefox/.test(navigator.userAgent)) {
                    setTimeout(a, 0)
                } else {
                    a()
                }
            })(screen, document, encodeURIComponent);
        },
        //优惠券
        getCoups: function(couponId){
            $.ajax({
                url : "http://my.okhqb.com/my/getCoupons.json",
                data : {
                    'couponId' : couponId
                },
                type : "GET",
                dataType : 'jsonp',
                jsonp : 'callback',
                success : function (data) {
                    if(data.code == 200){
                        mI.share();
                    }else if(data.code == 590){
                        OKHQB_sign.dialog({
                            sign_in_callback: function(){ window.location.href = window.location.href; }
                        });
                    }else{
                        art.dialog({
                            id : '__tips',
                            title : '系统提示',
                            content : data.msg,
                            width : '600',
                            height : '400',
                            ok : true
                        });
                    }

                }
            });
        },
        countDown:function(){
            for(var i=0;i<$('#time-list li .li-time').length;i++){
                (function(i){
                    var OTimer = $('#time-list li .li-time')[i];
                    console.log(i);
                    var t = {};
                    var dt = Number(OTimer.getAttribute('data-time'));
                    var timer = null;
                    timer = setInterval(function(){
                        if(dt>0){dt --;}else{clearInterval(timer)}
                        t = {
                            h : parseInt(dt/3600%24),
                            m : parseInt(dt/60%60),
                            s : parseInt(dt%60)
                        }
                        for(var a in t){
                            if(t[a].toString().length<2){
                                t[a] = '0' + t[a];
                            }
                        }
                        OTimer.innerHTML = '<span class="time-syb"></span><span class="time-detail">'+t.h+'</span>:<span class="time-detail">'+t.m+'</span>:<span class="time-detail">'+ t.s+'</span>';
                    },1000)
                }(i))
            }
            }

    };
    mI.init();
});