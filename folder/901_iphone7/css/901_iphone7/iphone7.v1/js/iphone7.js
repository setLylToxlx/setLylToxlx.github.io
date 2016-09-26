$(function(){
	var iphone7 = {
		init:function(){
			$('#share').click(function(){
				iphone7.share();
			})
			this.carouselImg();
			this.loadImg();
			this.nav();
			$(window).scroll(function(){
				iphone7.nav();
			});
			$('.panel-list').eq(0).find('li').first().show();
			$('.panel-list').eq(1).find('li').first().show()
			$('.nav-list a').click(function(){
           		$(this).attr('class','nav-active').siblings().attr('class','nav-item');
           });
			$('.panel-change li').hover(function(){
				var _index = $(this).attr('data-list');
				$(this).attr('class','change-active').siblings().attr('class','change-normal');
				$(this).parent().siblings('.panel-list').find('li').eq(_index).show().siblings().hide();
			});
      $('.lose li').mouseleave(function(){
        $(this).attr('class','change-normal');
      })
      console.log($('.panel-change').eq(3));
		},
		loadImg:function(){
           $('.lazy').lazyload({
               time:200,
               effect:'fadeIn'
           });
       },
		share:function(){
	        (function (s, d, e) {
	            try {
	            } catch (e) {
	            }
	            var f = 'http://v.t.sina.com.cn/share/share.php?', u = d.location.href, p = ['url=', e(u), '&title=', e('全球最火爆的iPhone 7 开始预约啦！仅需1元抢购iPhone 7 百元预售券，即可成功预约。届时开放购买即可抵扣100元，数量有限，先到先得。赶紧来预约，做第一个抢鲜的人！'), '&appkey=2924220432',  e('')].join('');

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
	    //轮播动画
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
                   $('.carousel').stop().animate({'left':-currentIndex*890},1000);
               },3000);
           }
           circleImg();
           $('.carousel-right').click(function(){
               currentIndex ++;
               if(currentIndex == len){
                   currentIndex = 1;
                   $('.carousel').css('left',0);
               }
               $('.carousel').stop().animate({'left':-currentIndex*890},1000);
           });
           $('.carousel-right,.carousel,.carousel-left').hover(function(){
               clearInterval(timer);
           }).mouseleave(function(){
               circleImg();
           });
           $('.carousel-left').click(function(){
               currentIndex --;
               if(currentIndex < 0){
                   currentIndex = len -2;
                   $('.carousel').css({'left':-($('.carousel li').length-1)*890});
               }
               $('.carousel').stop().animate({'left':-currentIndex*890});
           });
       },
       //导航
       nav:function(){
           var Top = $('.head').height()-50,
               $Nav = $('.nav'),
               $top1 = $('#floor1').offset().top-20;
               $bottom1 = Number($('#floor1').offset().top)+Number($('#floor1').height())-20;
               $top2 = $('#floor2').offset().top-20;
               $bottom2 = Number($('#floor2').offset().top)+Number($('#floor2').height())-20;
               $top3 = $('#floor3').offset().top-20;
               $bottom3 = Number($('#floor3').offset().top)+Number($('#floor3').height())-20;
           if ($(window).scrollTop() > Top) {
               setTimeout(function () {
                   $Nav.show();
               }, 10);
           } else {
               setTimeout(function () {
                   $Nav.hide();
               }, 10);
           }
           if($(window).scrollTop()>$top1 && $(window).scrollTop()<$bottom1){
              $('.nav-list a').eq(0).attr('class','nav-active').siblings().attr('class','nav-item');
           }
           if($(window).scrollTop()>$top2 && $(window).scrollTop()<$bottom2){
              $('.nav-list a').eq(1).attr('class','nav-active').siblings().attr('class','nav-item');
           }
           if($(window).scrollTop()>$top3 && $(window).scrollTop()<$bottom3){
              $('.nav-list a').eq(2).attr('class','nav-active').siblings().attr('class','nav-item');
           }
       }
	}
	iphone7.init();
})