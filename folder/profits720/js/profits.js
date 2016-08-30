
var profits = {
    init: function(){
        var This = this;
        This.loadImg();
        This.bindClick();
        This.nav();
        $(window).scroll(function () {
            This.nav();
        });
    },
    //慢加载图片
    loadImg: function(){
        $('.lazy').lazyload({
            time:250,
            effect:'fadeIn'
        });
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
                    art.dialog({
                        id : '__tips',
                        title : '系统提示',
                        content : '领取成功，优惠券已经发放至您的个人中心',
                        width : '600',
                        height : '400',
                        ok : true
                    });
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
    //页面点击事件
    bindClick: function(){
        var This = this;
        $('.ticket').on('click',function(){
            var id = $(this).attr('id');
            This.getCoups(id);
            console.log(id);
        });
        $('#share').on('click',function(){
                $.ajax({
                    url: "http://www.okhqb.com/api/hyhd/share.html",
                    type: "GET",
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (data) {
                    }
                });
            This.share();
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
    //分享
    share:　function() {
        (function (s, d, e) {
            try {
            } catch (e) {
            }
            var f = 'http://v.t.sina.com.cn/share/share.php?', u = d.location.href, p = ['url=', e(u), '&title=', e('爆品低价天天抢！分享即有机会获得魅蓝note3，赶快行动吧！'), '&appkey=2924220432',  e('')].join('');

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
    //导航
    nav: function(){
        var This = this;
        var Top = $('.head').position().top;
        var Nav = $('.nav');
        if ($(window).scrollTop() > Top) {
            setTimeout(function () {
                Nav.show();
            }, 10);
        } else {
            setTimeout(function () {
                Nav.hide();
            }, 10);
        }
    }
};
profits.init();