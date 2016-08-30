$(function(){
   var activityNow = {
       init:function(){
           this.loadImg();
           this.animateImg();
           this.bindEvent();
           this.nav();
           $(window).scroll(function () {
               activityNow.nav();
           });
       },
       //慢加载图片
       loadImg:function(){
           $('.lazy').lazyload({
               time:250,
               effect:'fadeIn'
           });
       },
       //导航
       nav:function(){
           var Top = $('.head').height()-50;
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
       //头部动画
       animateImg:function(){
          var timer = null,
          len = $('.animate-img li').length,
          currentIndex = 0;
          function showImg(index){
              $('.animate-img li').eq(index).fadeIn().siblings().fadeOut();
          }
          function circleImg(){
              clearInterval(timer);
              timer = setInterval(function(){
               currentIndex ++;
               if(currentIndex == len){
                  currentIndex = 0;
               } 
               showImg(currentIndex);
            },1500);
            }
            circleImg();
            $('.head-left').click(function(){
              currentIndex --;
              if(currentIndex < 0){
                currentIndex = len -1;
              }
              showImg(currentIndex);
            });
            $('.head-right,.head-center,.head-left').hover(function(){
              clearInterval(timer);
            }).mouseleave(function(){
              circleImg();
            });
            $('.head-right').click(function(){
              currentIndex ++;
              if(currentIndex == len){
                currentIndex = 0;
              }
              showImg(currentIndex);
            });
       },
       //事件绑定
       bindEvent:function(){
          $('.ticket-big div').click(function(){
            var ticketId = $(this).attr('data-id'),
                index = $(this).attr('data-index'),
                arrHtml = {50:'<p>恭喜您抢到<span>50元</span>神券一张，满<span>3999</span>可用，限指定苹果商品</p><a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>',
                    100:'<p>恭喜您抢到<span>100元</span>神券一张，满<span>4999</span>可用，限指定苹果商品</p> <a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>',
                    200:'<p>恭喜您抢到<span>200元</span>神券一张，满<span>6999</span>可用，限指定苹果商品</p> <a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>'},
                flag = 1,
                html = arrHtml[index];
            activityNow.getCoups(ticketId,html,flag);
          });
          $('.ticket-small div').click(function(e){
            var ticketId = $(this).attr('data-id'),
                index = $(this).attr('data-index'),
                arrHtml = {5:'<p>恭喜您成功领取<span>5元</span>优惠券</p><a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>',
                    15:'<p>恭喜您成功领取<span>15元</span>优惠券</p><a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>',
                    25:'<p>恭喜您成功领取<span>25元</span>优惠券</p><a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>',
                    35:'<p>恭喜您成功领取<span>35元</span>优惠券</p><a href="http://my.okhqb.com/my/coupons.html" target="_blank">去我的账户中查看详情</a>'},
                flag = 2,
                html = arrHtml[index];
              $('.pop').css('background','url("./images/pop1.png") no-repeat center');
              activityNow.getCoups(ticketId,html,flag);
          });
          $('.close').click(function(){
            $('.hold').hide(100);
            $('.position').hide(120);
          });
          $('.price-compare').hover(function(){
            $(this).animate({'top':'-80px'},250);
          }).mouseleave(function(){
            $(this).animate({'top':'-24px'},200);
          });
          $('.group-select').change(function(e){
            var selector = $(this),
                data = selector.find('option:selected').attr('data-alls'),
                groupImg = selector.siblings('.group-img').find('img'),
                parentNode = selector.parent(),
                groupBuy = parentNode.siblings('.group-buy'),
                buyPrice = groupBuy.find('.buy-price').find('span'),
                buySave = groupBuy.find('.buy-save').find('span'),
                form = parentNode.siblings('.group-buy').find('form');
            data = data.split('|');
            groupImg.src = data[3];
            buyPrice.html(data[1]);
            buySave.html(data[0])
            form.find('input[name="collocationId"]').val(data[4]);
            form.find('input[name="collocationSkuIds"]').val(data[2]);
          });
          $('.floor4-nav li').click(function(e){
              $(this).find('.triangle').show();
              $(this).attr('class','floorNav-active').siblings().attr('class','floorNav-none').find('.triangle').hide();
              index = $(this).attr('data-index');
              setTimeout(function(){
                $('.floor4-img li').eq(index).fadeIn().siblings().fadeOut();
              },100);
          });
          $('.nav-list a').click(function(e){
               var target = $(this),
                   index = target.attr('class').substr(3);
              target.attr('class','nav'+index+" "+'nav-active').siblings().removeClass('nav-active');
        });
       },
       //优惠券
       getCoups: function(couponId,html,flag){
           var _isLogin = OKHQB_sign.isSignIn();
           if (!_isLogin) {
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
                           $('.text').html(html);
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
                           $('.text').html('<p style="padding-top: 20px;">您已经领取过该优惠券咯</p>');
                           setTimeout(function () {
                               $('.position').show();
                           }, 20)
                       }else{
                           if(flag === 1){
                              if(data.code == 119054){
                                   $('.hold').show();
                                   $('.text').html('<p style="margin-left: 30px;padding-top: 30px;">活动未开始！</p>');
                                   setTimeout(function () {
                                       $('.position').show();
                                   }, 20)
                               }else if(data.code == 119031){
                                   $('.hold').show();
                                   $('.text').html('<p style="">今天的神券已经抢完咯，明早<sapn>9:30</sapn>再来吧</p>');
                                   setTimeout(function () {
                                       $('.position').show();
                                   }, 20)
                               }else{
                                   $('.hold').show();
                                   $('.text').html('<p style="margin-left: 30px;padding-top: 30px;">领取失败！</p>');
                                   setTimeout(function () {
                                       $('.position').show();
                                   }, 20)
                               }
                           }else{
                               $('.hold').show();
                               $('.text').html('<p style="margin-left: 30px;padding-top: 30px;">领取失败！</p>');
                               setTimeout(function () {
                                   $('.position').show();
                               }, 20)
                           }
                       }

                   }
               });
           }
       }
   };
    activityNow.init();
});
