$(function(){
   var $activityNow = {
       init:function(){
           this.loadImg();
           this.carouselImg();
           this.nav();
           this.mySetInterval();
           $(window).scroll(function(){
               $activityNow.nav();
           });
           this.bindEvent();
       },
       mySetInterval:function(){
           var $time = $('#countDown').attr('data-time'),
               $timer = null;
           clearInterval($timer);
           $timer = setInterval(function(){
               if($time>0){
                   $time --;
                   var d = parseInt($time/60/60/24),
                       h = parseInt($time/60/60%24),
                       m = parseInt($time/60%60),
                       s = parseInt($time%60);
                   d = d>10?d:'0'+d;
                   h = h>10?h:'0'+h;
                   m = m>10?m:'0'+m;
                   s = s>10?s:'0'+s;
                   $('.count-days').html(d);
                   $('.count-hours').html(h);
                   $('.count-minutes').html(m);
                   $('.count-seconds').html(s);
               }else{
                   clearInterval($timer);
               }
           },1000)
       },
       loadImg:function(){
           $('.lazy').lazyload({
               time:200,
               effect:'fadeIn'
           });
       },
       //绑定事件
       bindEvent:function(){
           $('.nav-list a').click(function(e){
               var target = $(this),
                   index = target.attr('class').substr(3,10);
               target.attr('class','nav'+index+" "+'nav-active').siblings().removeClass('nav-active');
           });
           $('.ticket div').click(function(){
               var id = $(this).attr('data-id');
               var _html = {'1000001515':10,'1000001516':15,'1000001517':25,'1000001518':35,'1000001519':50};
               $activityNow.getCoups(id,_html[id]);
           });
           $('.close').click(function(){
              $('.hold, .position').hide();
           });
           $('.productTag-tab li').mouseover(function(){
               var porId = $(this).attr('data-id') - 1;
               $(this).find('.bottom-triangle').show();
               $(this).css('background-color','#dc0c51').siblings().css('background-color','#f7f7f7').find('.bottom-triangle').hide();
               $('.desc-box ul').eq(porId).fadeIn(1000).siblings().fadeOut(500);
               $('.desc-box ul').eq(porId).find('.lazy').trigger("appear");
           })
       },
       //优惠券
       getCoups: function(couponId,html){
           var _isLogin = OKHQB_sign.isSignIn();
           if (_isLogin) {
               OKHQB_sign.dialog({
                   sign_in_callback: function () {
                       window.location.href = window.location.href;
                   }
               });
           } else {
               $.ajax({
                   url: "http://my.okhqb.com/my/getCoupons.json",
                   data: {
                       'couponId': couponId
                   },
                   type: "GET",
                   dataType: 'jsonp',
                   jsonp: 'callback',
                   success: function (data) {
                       if (data.code == 200) {
                           $('.hold').show();
                           $('.pop-html').html('<div class="pop-success"><span>领取成功</span></div>' +
                               '<p><strong>'+html+'</strong>元优惠券</p><p>已经发放到您的账户中</p>');
                           setTimeout(function () {
                               $('.position').show();
                           }, 100)
                       } else if (data.code == 590) {
                           OKHQB_sign.dialog({
                               sign_in_callback: function () {
                                   window.location.href = window.location.href;
                               }
                           });
                       }else if(data.code == 119034){
                           $('.hold').show();
                           $('.pop-html').html('<div class="pop-fail"><p>大人，您已经领取过</p><p>该优惠劵了~</p></div>');
                           setTimeout(function () {
                               $('.position').show();
                           }, 20)
                       }else{
                           $('.hold').show();
                           $('.pop-html').html('<div class="pop-fail"><p>领取失败！</p></div>');
                           setTimeout(function () {
                               $('.position').show();
                           }, 20)
                       }

                   }
               });
           }
       },
       //头部动画
       carouselImg:function(){
           var timer = null,
               currentIndex = 0,
               firstImg = $('.carousel li').first().clone();
           $('.carousel').append(firstImg).width($('.carousel li').length*$('.carousel img').width());
           var len = $('.carousel li').length;
           function circleImg(){
               clearInterval(timer);
               timer = setInterval(function(){
                   currentIndex ++;
                   if(currentIndex == len){
                       currentIndex = 1;
                       $('.carousel').css({'left':0});
                   };
                   $('.carousel').stop().animate({'left':-currentIndex*260},1000);
               },3000);
           }
           circleImg();
           $('.carousel-left').click(function(){
               currentIndex ++;
               if(currentIndex == len){
                   currentIndex = 1;
                   $('.carousel').css('left',0);
               }
               $('.carousel').stop().animate({'left':-currentIndex*260},1000);
           });
           $('.carousel-right,.carousel-center,.carousel-left').hover(function(){
               clearInterval(timer);
           }).mouseleave(function(){
               circleImg();
           });
           $('.carousel-right').click(function(){
               currentIndex --;
               if(currentIndex < 0){
                   currentIndex = len -2;
                   $('.carousel').css({'left':-($('.carousel li').length-1)*260});
               }
               $('.carousel').stop().animate({'left':-currentIndex*260});
           });
       },

       //导航
       nav:function(){
           var Top = $('.head').height()-50,
               $Nav = $('.nav');
           if ($(window).scrollTop() > Top) {
               setTimeout(function () {
                   $Nav.show();
               }, 10);
           } else {
               setTimeout(function () {
                   $Nav.hide();
               }, 10);
           }
       }
   };
    $activityNow.init();
});