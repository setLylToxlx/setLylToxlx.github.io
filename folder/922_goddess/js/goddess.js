$(function(){
	var goddess = {
		init:function(){
			this.bindEvent();
			this.loadImg();
			var $top = Number($('.head').height()) - 10;
			$(window).scroll(function(){
				if($(this).scrollTop() > $top){
					$('.nav').show();
				}else{
					$('.nav').hide();
				}
			})
		},
		bindEvent:function(){
			$('.nav-list .nav-item').click(function(){
				$(this).addClass('nav-active').siblings().removeClass('nav-active');
				var index = Number($(this).index() + 1);
				$('html,body').animate({'scrollTop':$('#sec'+index).offset().top},500);
			});
			$('.ticket-coup').click(function(){
				var $coup = $(this).attr('data-coup');
				var _isLogin = OKHQB_sign.isSignIn();
	                if (!_isLogin) {
	                    OKHQB_sign.dialog({
	                        sign_in_callback: function () {
	                           window.location.href = window.location.href;
	                        }
	                    });
	                } else {
	                	$.ajax({
	                       url : "http://my.okhqb.com/my/getCoupons.json",
	                       data : {'couponId' : $coup},
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
	                       	   }
	                           if(data.code == 590){
	                                OKHQB_sign.dialog({
		                            sign_in_callback: function () {
		                                window.location.href = window.location.href;
		                            }
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
	                }
			});
		},
		loadImg:function(){
			$('.lazy').lazyload({
				'time': 200,
				'effect': 'fadeIn'
			});
		}
	}
	goddess.init();
})