$(function(){
	var nanshen = {
		init:function(){
			this.loadImg();
			this.bindEvent();
			this.nav();
		},
		loadImg:function(){
			$('.lazy').lazyload({
				time: 150,
				effect: 'fadeIn'
			});
		},
		nav:function(){
			var _height = $('.head').height();
			$(window).scroll(function(){
				if(_height < $(this).scrollTop()){
					$('.nav-box').parent().attr('class','nav-fix');
				}else{
					$('.nav-box').parent().attr('class','nav-bar');
				}
			});
			$('.nav-box div').click(function(){
				var $Id = $(this).attr('data-id');
				var _top = Number($('#'+$Id).offset().top);
				if($('.nav-box').parent().hasClass('nav-fix')){
					_top = _top-$(this).height();
				}
				$(this).attr('class','nav-active').siblings().attr('class','nav-item');//此处如何写比较好
				$('html,body').animate({'scrollTop':_top},500);
			});
		},
		bindEvent:function(){
			$('.tab-nav .tab-item').click(function(){
				var tabId = $(this).attr('data-tab');
				var _top = Number($('#'+tabId).offset().top) - $('.nav-box').height()-10;
				$('html,body').animate({'scrollTop':_top},400);
			});
			$('.close').click(function(){
				$('.mskLayer').hide();
                $('.popUp').hide();
			});
			$('.title-item div').click(function(){
				var $coup = $(this).attr('data-coups');
                 $.ajax({
                       url : "http://my.okhqb.com/my/getCoupons.json",
                       data : {'couponId' : $coup},
                       type : "GET",
                       dataType : 'jsonp',
                       jsonp : 'callback',
                       success : function (data) {
                       	   if(data.code == 200){
                       	   		$('.mskLayer').show();
                       	   		$('.popUp').show();
                       	   		$('.txt p').html("领取成功，优惠券已经发放至您的个人中心");
                       	   }
                           if(data.code == 590){
                               window.location.href = 'http://m.okhqb.com/member/login.html?forward='+window.location.href;
                           }else{
                               $('.mskLayer').show();
                       	   	   $('.popUp').show();
                       	   	   $('.txt p').html(data.msg);
                           }
                       }
                 });
			});
		}
	}
	nanshen.init();
})