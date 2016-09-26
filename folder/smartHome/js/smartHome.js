$(function(){
	var _smartHome = {
		init:function(){
			this.loadImg()
			$('html').css('font-size','62.5%');
			_smartHome.listenScreen();
			$(window).resize(function(){
				_smartHome.listenScreen();
			});
			this.nav();
		},
		listenScreen:function(){
			var $width = $(window).width();
				if($width<320){
					$width = 320;
				}else if($width > 640){
					$width = 640;
				}
				$scale = $width/640*0.625;
				$scale = $scale.toFixed(4)*100+'%';
				$('html').css('font-size',$scale);
		},
		//慢加载图片
    	loadImg:function(){
        $('.lazy').lazyload({
            time:150,
            effect:'fadeIn'
        });
    	},
    	nav:function(){
    		var top = $('.head').height();
    			if($(this).scrollTop()>top){
    				$('.nav-bar').attr('class','nav-fix');
    			}else{
    				$('.nav-fix').attr('class','nav-bar');
    			}
    		$(window).scroll(function(){
    			if($(this).scrollTop()>top){
    				$('.nav-bar').attr('class','nav-fix');
    			}else{
    				$('.nav-fix').attr('class','nav-bar');
    			}
    		});
    		$('.nav-box a').click(function(){
    			$(this).attr('class','nav-active').siblings().attr('class','nav-item');
    			var $obj = $(this).attr('href');
    			var _top = Number($($obj).offset().top)-Number($('.nav-box').parent().height()*2.2);
    			console.log($obj);
    			$('html,body').animate({'scrollTop':_top},300);
    		});
    	}
	}
	_smartHome.init();
});