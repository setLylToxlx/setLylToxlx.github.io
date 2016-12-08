$(function(){
	var iphoneSync = {
		init:function(){
			this.loadImg()
			// $('html').css('font-size','62.5%');
			// iphoneSync.listenScreen();
			// $(window).resize(function(){
			// 	iphoneSync.listenScreen();
			// });
        var iWidth=document.documentElement.clientWidth;
        if(iWidth>=640){
            $('html').css('font-size',10);
        }else{
            $('html').css('font-size',iWidth/60);
        }

			this.nav();
      this.bindEvent();
      this.carouselImg();
      $('.carousel-center').height($('.carousel li').height() || 400);
      $('.carousel').height($('.carousel li').height() || 400);
      console.log($('.carousel li').height())
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
        //轮播动画
        carouselImg:function(){
          var _start = 1,
          timer = null;
          clearInterval(timer);
          timer = setInterval(function(){
            if(_start === 1){
                  $('.carousel li').eq(0).fadeIn().siblings().fadeOut();
                  _start = 2;
              }else{
                  $('.carousel li').eq(1).fadeIn().siblings().fadeOut();
                  _start = 1;
              }
          },2500)
            $('.carousel-right,.carousel-left').click(function(){
              clearInterval(timer);
                if(_start === 1){
                  $('.carousel li').eq(0).fadeIn().siblings().fadeOut();
                  _start = 2;
              }else{
                  $('.carousel li').eq(1).fadeIn().siblings().fadeOut();
                  _start = 1;
              }
              timer;
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
          var _top = Number($($obj).offset().top)-Number($('.nav-box').parent().height()*2.0);
          console.log($obj);
          $('html,body').animate({'scrollTop':_top},300);
    		});
    	},
        bindEvent:function(){
            $('.select-tag').on('click',function(){
                var _close = $(this).attr('data-close');
                var _this = this;
                if(_close === 'true'){
                  $(_this).siblings('.major-list').show();
                  $(_this).attr('data-close','false');
                }else{
                  $(_this).siblings('.major-list').hide();
                  $(_this).attr('data-close','true');
                }
                console.log(1);
            });
            $('.major-list dt').click(function(){
                $(this).parent().siblings('.select-tag').html($(this).html());
                $(this).parent().hide();
                $('.select-tag').attr('data-close','true');
                var _parent = $(this).parent().parent().parent(),
                    data = $(this).attr('data-alls'),
                    _panic = _parent.parent().parent().parent().find('.package-panic'),
                    $form = _panic.find('form');
                data = data.split("|");
                _parent.find('.major-img').find('img').attr('src',data[5])
                _parent.find('.major-price').find('span').html(data[1]);
                _parent.find('.major-price').find('span').html(data[1]);
                _parent.find('.major-img').attr('href','http://m.okhqb.com/item/'+data[3]+'.html');
                _panic.find('.panic-save').html("为您省："+data[0]+"元");
                _panic.find('.panic-package').find('span').html(data[2]);
                $form.find('input[name=collocationId]').val(data[3]);
                $form.find('input[name=quantity]').val(1);
                $form.find('input[name=collocationSkuIds]').val(data[4]);
            });
            $('.ticket-right').click(function(){
               var $coup=$(this).attr('data-coups'),
                    _this = this,
                    _isLogin = OKHQB_sign.isSignIn();
               if (_isLogin) {
                   window.location.href = 'http://m.okhqb.com/member/login.html';
               } else {
                   $.ajax({
                       url : "http://my.okhqb.com/my/getCoupons.json",
                       data : {'couponId' : $coup},
                       type : "GET",
                       dataType : 'jsonp',
                       jsonp : 'callback',
                       success : function (data) {
                        data = {code:200};
                        if(localStorage.getItem($coup)){
                          $(_this).unbind();
                        }
                            if(data.code == 200){
                              $(_this).find('img').attr('src','images/ticketGet.jpg');
                              localStorage.setItem($coup,'true');
                            }
                           if(data.code == 590){
                                window.location.href = 'http://m.okhqb.com/member/login.html';
                           }
                       }
                   })
               }
             }).each(function(index,dom){
              $localStorage = $(this).attr('data-coups');
              if(localStorage.getItem($localStorage)){
                $(this).find('img').attr('src','images/ticketGet.jpg');
              }
             });
        }    
	}
	iphoneSync.init();
});