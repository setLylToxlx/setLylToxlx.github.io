$(function(){
	var travel = {
		init:function(){
			this.loadImg();
			this.nav();
			this.bindEvent();
			if($(".show-box dl dt").length > 8){
				this.scrollUp();
			}
		},
		loadImg:function(){
			$('.lazy').lazyload({
				time:200,
				effect:'fadeIn'
			});
		},
		nav:function(){
			var _top = $('.head').height()-20;
			var $nav = $('.nav');
			$(window).scroll(function(){
				if($(this).scrollTop() > _top){
					$nav.show();
				}else{
					$nav.hide();
				}
			});
			$('.nav-list div').click(function(){
				$(this).attr('class','nav-active').siblings().attr('class','nav-item');
			});

			var arrDiv = [$('.lottery').offset().top,$('.floor1').offset().top,$('.floor2').offset().top,$('.floor3').offset().top,$('.floor4').offset().top,$('.floor5').offset().top,$('.head').offset().top];
			$('.nav-list div').click(function(){
				$('body, html').animate({'scrollTop':arrDiv[$(this).index()]},500);
				console.log($(this).index()+":"+arrDiv[$(this).index()]);
				// if($(this).index() == 0){
				// 	$('body, html').animate({'scrollTop':$('.lottery').offset().top},500);
				// }else if($(this).index() == 6){
				// 	$('body, html').animate({'scrollTop':$('.head').offset().top},500);
				// }else{
				// 	$('body, html').animate({'scrollTop':$('.floor'+$(this).index()).offset().top},500);
				// }
			});


		},
		//列表轮播
	    scrollUp:function(){
	        var lottery = $(".show-box dl");
	        lottery.css("overflow", "hidden");
	        function animator(currentItem) {
	            var distance = currentItem.height();
	            duration = (distance + parseInt(currentItem.css("marginTop"))) /0.025;
	            currentItem.animate({ marginTop: -distance }, duration, "linear", function() {
	                currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
	                animator(currentItem.parent().children(":first"));
	            });
	        }
	        animator(lottery.children(":first"));
	        lottery.hover(function() {
	            lottery.children().stop();
	        });
	        lottery.mouseleave(function() {
	            animator(lottery.children(":first"));

	        });
	    },
	    rotateFunc:function(awards,angle,text,img,popClass){  
		    $('.pointer').stopRotate();
		        $(".pointer").rotate({
		            angle:angle,
		            duration: 5000,
		            animateTo: angle+1440, 
		            callback:function(){
		                var Text = text.split('|');
		                	$('.popUp').attr('class','popUp'+" "+popClass);
		                    $('.hold').show();
		                    $('.position').show();
		                    setTimeout(function(){
		                    	if(awards == 3){
		                        	var _html = '<p class="lottery-name">'+Text[0]+'</p><p class="lottery-info">'+Text[1]+'<span>'+Text[2]+'</span></p>';	
		                    	}else{
		                        	var _html = '<p class="lottery-name">'+Text[0]+'</p><p class="lottery-info">'+Text[1]+'<span>'+Text[2]+'</span></p><img src="'+img+'" class="lottery-img"/>';	
		                    	}
		                        $('.text').html(_html);
		                    },100);
		                }
		        });
		    },
		    bindEvent:function(){
		    	$('.close').click(function(){
		    		$('.position').hide();
		    		$('.hold').hide();
		    	});
		    	$("#pointer").click(function(){
		    		if('\v'=='v'){
		    			alert('IE版本过低，请使用其他浏览器，或者升级IE！');
		    		}
	            var _isLogin = OKHQB_sign.isSignIn();
	                if (_isLogin) {
	                    OKHQB_sign.dialog({
	                        sign_in_callback: function () {
	                           window.location.href = window.location.href;
	                        }
	                    });
	                } else {
	            $.ajax({
	                type: 'Get',
	                url: 'http://my.okhqb.com/my/getRotaryRewardNew.json?rotaryType=TRAVEL',
	                dataType: 'jsonp',
	                jsonp: 'callback',
	                success: function (data) {
	                	data = {code:200,data:{location:5}}
	                    if (data.code == 200) {
	                    	 var arrText = [{text: '恭喜您！|抽中了|30元优惠券',img:'images/ticket30.jpg',popClass:'popUp2'},
	                            {text: '||',img:'',popClass:'popUp2'},
	                            {text: '恭喜您！|抽中了|优加自拍杆',img:'images/takePhone.jpg',popClass:'popUp2'},
	                            {text: '很遗憾~|本次没有中奖，下单就可继续抽奖哟！加油哟！|',img:'',popClass:'popUp1'},
	                            {text: '||',img:'',popClass:'popUp2'},
	                            {text: '恭喜您！|抽中了|20元优惠券',img:'images/ticket20.png',popClass:'popUp2'},
	                            {text: '||',img:'',popClass:'popUp2'},
	                            {text: '||',img:'',popClass:'popUp2'}];
	                            var angle = Math.random()*45;
	                        	travel.rotateFunc(data.data.location,(data.data.location)*45 +  angle, arrText[data.data.location ].text,arrText[data.data.location ].img,arrText[data.data.location ].popClass);
	                    }
	                    else if (data.code == 701370) {
	                        $('.hold').show();
	                        $('.position').show();
	                        setTimeout(function(){
	                            var _html = '<p class="lottery-name">很遗憾~</p><p class="lottery-info">不满足抽奖条件，下单就可抽奖哟，加油哟！</p>';
	                            $('.popUp').attr('class','popUp popUp1');
	                            $('.text').html(_html);
	                        },100);
	                    }else if (data.code == 701369) {
	                        $('.hold').show();
	                        $('.position').show();
	                        setTimeout(function(){
	                            var _html = '<p class="lottery-name">很遗憾~</p><p class="lottery-info">继续下单就可抽奖哟，加油哟！</p>';
	                            $('.popUp').attr('class','popUp popUp1');
	                            $('.text').html(_html);
	                        },100);
	                    }else if(data.code == 590){
	                        OKHQB_sign.dialog({
	                            sign_in_callback: function () {
	                                window.location.href = window.location.href;
	                            }
	                        });
	                    }else{
	                    	$('.hold').show();
	                        $('.position').show();
	                        setTimeout(function(){
	                            var _html = '<p class="lottery-name">'+data.msg+'</p>';
		                        $('.popUp').attr('class','popUp popUp1');
		                        $('.text').html(_html);
	                        },100);
	                    	
	                    }
	                }
	            });
            }
        });
		    }
	}
	travel.init();
})