
var meiZu = {
    init:function(){
        this.nav();
        this.nav();
        this.loadImg();
        this.bindClick();
        if($(".scrollList li").length>8){
            this.scrollUp();
        }
        $(window).scroll(function () {
            meiZu.nav();
        });
    },
    //慢加载图片
    loadImg: function(){
        $('.lazy').lazyload({
            time:250,
            effect:'fadeIn'
        });
    },
    rotateFunc:function(awards,angle,text,img){  //awards:奖项，angle:奖项对应的角度
    $('.lottery').stopRotate();
        $(".lottery").rotate({
            angle:0,
            duration: 5000,
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                var Text = text.split('|');
                if(awards == 2 || awards == 5 || awards == 7){
                    $('.hold').show();
                    $('.position').show();
                    $('.lottery-product').show();
                    setTimeout(function(){
                        var _html = '<p class="lottery-name">'+Text[0]+'</p><p class="lottery-info">'+Text[1]+'</p><img src="'+img+'" class="lottery-img">';
                        $('.lottery-box2').html(_html).show();
                    },100);
                }else if(awards == 4){
                    $('.hold').show();
                    $('.position').show();
                    setTimeout(function(){
                       $('.thanks').show();
                    },100);
                }else{
                    $('.hold').show();
                    $('.position').show();
                    $('.lottery-product').show();
                    setTimeout(function(){
                        var _html = '<p class="lottery-name">'+Text[0]+'</p><p class="lottery-info">'+Text[1]+'</p>'+img+'<a href="#go-look" class="go-look">去逛逛 ></a>';
                        $('.lottery-box2').html(_html).show();
                    },100);
                }
            }
        });
    },
    //页面点击事件
    bindClick: function(){
        var This = this;
        $("#lottery").click(function(){
            //var _isLogin = OKHQB_sign.isSignIn();
            //        if (!_isLogin) {
            //            OKHQB_sign.dialog({
            //                sign_in_callback: function () {
            //                    window.location.href = window.location.href;
            //                }
            //            });
            //        } else {
            $.ajax({
                type: 'Get',
                url: 'http://my.okhqb.com/my/subscribeLottery.json?rotaryType=MX6',
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    data = {code: 200, msg: "登录超时，请重新登录", data: {location:3}}
                    if (data.code == 200) {
                        var arrText = [{angle: 20, text: '无',img:''},
                            {angle: 80, text: '抽到EP-51蓝牙耳机|稍后我们将安排客服与您联系',img:'images/earphone3.png'},
                            {angle: 120, text: '抽到满2000减200优惠券|魅族Pro5专用券',img:'<span class="total-four"></span>'},
                            {angle: 160, text: '谢谢惠顾',img:''},
                            {angle: 210, text: '抽到EP-21线控耳机|稍后我们将安排客服与您联系',img:'images/earphone2.png'},
                            {angle: 250, text: '抽到满1000减30优惠券|魅族专用券',img:'<span class="total-five"></span>'},
                            {angle: 301, text: '抽到10000mAh移动电源|稍后我们将安排客服与您联系',img:'images/charge.png'},
                            {angle: 343, text: '抽到满500减20优惠券|魅族专用券',img:'<span class="total-six"></span>'}];//后台传入参数
                        This.rotateFunc(data.data.location+1, arrText[data.data.location].angle, arrText[data.data.location ].text,arrText[data.data.location].img);
                    }
                    else if (data.code == 701370) {
                        $('.hold').show();
                        $('.position').show();
                        $('.not-enough').show();
                        setTimeout(function(){
                            var _html = '<p class="lottery-name not-enough-name">购买场内任意商品即可抽奖!</p> <a href="#go-look" class="go-look not-enough-look">去逛逛 ></a><div class="close close3"></div>';
                            $('.not-enough').html(_html).show();
                        },100);
                    }else if(data.code == 590){
                        OKHQB_sign.dialog({
                            sign_in_callback: function () {
                                window.location.href = window.location.href;
                            }
                        });
                    }
                },
                error: function(){
                    alert('请求失败！');
                }
            });
            //}
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
        $('.btn-book').on('click',function(){
            //var _isLogin = OKHQB_sign.isSignIn();
            //if (!_isLogin) {
            //    OKHQB_sign.dialog({
            //        sign_in_callback: function () {
            //            window.location.href = window.location.href;
            //        }
            //    });
            //} else {
                $.ajax({
                    type: 'Get',
                    url: 'http://my.okhqb.com/my/addSubscribeInfo.json',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (data) {
                        //data = {code: 200, msg: "登录超时，请重新登录", data: {location:3}}
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
            //}
        });
        $('.close1').on('click',function(){
            $('.book').hide();
            $('.position').hide();
            $('.hold').hide();
        });
        $('.close2').on('click',function(){
            $('.position').hide();
            $('.hold').hide();
            $('.lottery-product').hide();
        });
        $('.close4').on('click',function(){
            $('.position').hide();
            $('.hold').hide();
            $('.thanks').hide();
        });
        $('body').on('click','.close3',function(){
            $('.position').hide();
            $('.hold').hide();
            $('.not-enough').hide();
        }).on('click','.go-look',function(){
            $('.position').hide();
            $('.lottery-product').hide();
            $('.hold').hide();
            $('.not-enough').hide();
            $('.book').hide();
            $('.thanks').hide();
        });
    },
    //导航
    nav: function(){
        var This = this;
        var Top = $('.head').position().top;
        var Nav = $('.nav');
        var len = $('.nav-list a').length;
        if ($(window).scrollTop() > Top) {
            setTimeout(function () {
                Nav.show();
            }, 10);
        } else {
            setTimeout(function () {
                Nav.hide();
            }, 10);
        }
    },
    //轮播
    scrollUp:function(){
        var ticker = $(".scrollList");
        ticker.css("overflow", "hidden");
        function animator(currentItem) {
            var distance = currentItem.height();
            duration = (distance + parseInt(currentItem.css("marginTop"))) /0.025;
            currentItem.animate({ marginTop: -distance }, duration, "linear", function() {
                currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
                animator(currentItem.parent().children(":first"));
            });
        }
        animator(ticker.children(":first"));
        ticker.hover(function() {
            ticker.children().stop();
        });
        ticker.mouseleave(function() {
            animator(ticker.children(":first"));

        });
    }


};
meiZu.init();