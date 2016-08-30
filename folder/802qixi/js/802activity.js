
var qiXi = {

  init:function(){
      this.loadImg();
      this.nav();
      this.bindClick();
      if($(".lottery-list li").length>4){
          this.scrollUp();
      }
      $(window).scroll(function () {
          qiXi.nav();
      });
  },
    //慢加载图片
    loadImg:function(){
        $('.lazy').lazyload({
            time:250,
            effect:'fadeIn'
        });
    },
    bindClick:function(){
        $('#godate').click(function(){
            //alert(1);
            var _isLogin = OKHQB_sign.isSignIn();
            if (_isLogin) {
                OKHQB_sign.dialog({
                    sign_in_callback: function () {
                        window.location.href = window.location.href;
                    }
                });
            } else {
            $.ajax({
                type:'Get',
                //http://my.okhqb.com/my/addSubscribeInfo.json?subscribeType=XM
                url:'http://my.okhqb.com/my/addSubscribeInfo.json?subscribeType=XM',
                dataType:'jsonp',
                jsonp:'callback',
                success:function(data)
                {
                    data={"code":200,"msg":"SUCCESS","data":{"location":"4","involvementNum":"2","rotaryRewardNewEnum":"THANK_YOU_D7"}};
                    if (data.code == 200) {
                        var pop = [{text:'',className:''},
                            {text:'恭喜你宠幸了貂蝉，获得了电影兑换劵2张',className:'pop1|hold-text pt170'},
                            {text:'恭喜你宠幸了妲己，获得了盒装幸福套',className:'pop3|hold-text pt170'},
                            {text:'恭喜你宠幸了王昭君，获得了小米移动电源',className:'pop4|hold-text pt170'},
                            {text:'很遗憾你选中了东施，感谢您的参与!',className:' |hold-text pt230'},
                            {text:'恭喜你宠幸了赵飞燕，获得了30元现金红包!',className:'pop2|hold-text pt170'}];
                        var startPosition = qiXi.startPosition || 0;
                        var stopPosition  = data.data.location;
                        var text = pop[data.data.location-1].text;
                        var className = pop[data.data.location-1].className;
                        $('.hold').show();
                        $('.pop').html('<p class="hold-text pt230">皇上，臣妾等你好久了！</p><a href="javascript:;" target="_blank" id="sure" class="hold-link">去宠幸</a>')
                        setTimeout(function(){
                            $('.popup').show();
                        },100);
                        $('#sure').on('click',function(){
                            $('.awards-box').show();
                            $('.lottery-img').hide();
                            $('.hold').hide();
                            $('.popup').hide();
                            $('.awards-box li').css({'opacity':.5,'filter':'alpha(opacity=50)'});
                            setTimeout(function(){
                                qiXi.run(130,startPosition,stopPosition,text,className);
                            },600)
                        });
                    }
                    else if(data.code == 701370){
                        $('.hold').show();
                        $('.pop').html('<p class="hold-text pt230">很遗憾你选中了东施，感</p><p class="hold-text">谢您的参与!</p>')
                        setTimeout(function(){
                            $('.popup').show();
                        },100);
                    }
                    else if(data.code == 701367){
                        $('.hold').show();
                        $('.pop').html('<p class="hold-text pt230 f24">皇上，请先赐臣妾一个订单吧！</p><a href="#nav1" id="toBuy" class="hold-link">去购买</a>')
                        setTimeout(function(){
                            $('.popup').show();
                        },100);
                    }else{
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
        $('.close').click(function(){
            $('.hold').hide();
            $('.popup').hide();
            $('.awards-box').hide();
            $('.lottery-img').show();
        });
        $('body').on('click','#toBuy',function(){
            $('.hold').hide();
            $('.popup').hide();
        })
        $('#navClick').click(function(){
            window.open('http://im.okhqb.com/client','OKHQBIM','width=340,height='+window.screen.height+'，menubar=no,location=no,status=no,toolbar=no,left=0,top=0');
        });
    },
    //跑马灯
    run:function(speed,startPosition,stopPosition,text,className) {
        var Oli = $('.awards-box li');
        var start = startPosition;//开始位置
        var stop = 0; //停止条件
        var popup = '';//响应元素
        var className = className.split('|');
        var stopPositionNow = 18+Number(stopPosition)+6-Number(startPosition);
        clearInterval(qiXi.run.timer);
        qiXi.run.timer = setInterval(function () {
            stop++;
            if (start < 6) {
                for (var i = 0; i < Oli.length; i++) {
                    Oli.eq(i).css('opacity', 0.3);
                }
                Oli.eq(start).css('opacity', 1);
                start++
            }
            if (stop == stopPositionNow) {//停止的地方
                clearInterval(qiXi.run.timer);
                setTimeout(function(){
                    $('.hold').show();
                    $('.pop').html('<div class="'+className[0]+'"></div><p class="'+className[1]+'">'+text+'</p>')
                    setTimeout(function(){
                        $('.popup').show();
                    },100);
                    qiXi.startPosition = stopPosition-1;
                },500)

            }
            if(start==6){
                start = 0;
            }
        }, speed)
    },
    //导航
    nav:function(){
        var Top = $('.head').height();
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
    },
    //轮播
    scrollUp:function(){
        var ticker = $(".lottery-list");
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
qiXi.init();