	$(function () {
			// 延时加载图片
			var lazyload = function () {
				if (!!$.fn.lazyload) {
					$('img.lazy').lazyload({ 
						effect : 'fadeIn',
						threshold : 200
					});
				}
			};
			//导航条
			$(window).scroll(function(){
		        if($(window).scrollTop()>500)
		        {
		            if($('#sideFloatNav').hasClass("abs"))
		            {
		                $('#sideFloatNav').removeClass("abs").addClass("fix");
		            }
		        }else if($(window).scrollTop()<500)
		        {
		            if($('#sideFloatNav').hasClass("fix"))
		            {
		                $('#sideFloatNav').removeClass("fix").addClass("abs");
		            }
		        }
		    });
		    function countdown(t,callback,index){
                var timers=[], _t=t;
                timers[index]=null;
                var  timer = function(){
                    if(_t<=0 && t!==0) {
                        clearTimeout(timer[index]);
                        location.reload();
                        return;
                    }else if( t ==0){
                        return;
                    }                   
                    var msToDate = convertMs(_t);
                        callback(msToDate);
                        _t = _t-1000;
                        clearTimeout(timer[index]);
                        timer[index] = setTimeout(timer,1000);
                };
                timer();
                function convertMs( ms ){
                    var s, m, h, d;
                    s = Math.floor( ms / 1000 );
                    m = Math.floor( s / 60 );
                    h = Math.floor( m / 60 );
                    d = Math.floor( h / 24);

                    s = s % 60;
                    m = m % 60;
                    h = h % 24; 

                    s = formatNum(s);
                    m = formatNum(m);
                    h = formatNum(h);
                    d = formatNum(d);
                    return {d: d, h: h, m: m, s: s};
                }
                function formatNum( n ){
                    return n = n < 10 ? '0' + n : n+'';
                }
            }

            $('.counttime .state').each(function(index){
                var $self = $(this),
                    $t = parseInt($self.data('time'),10)*1000;

                    function callback(obj){
                        var d =(obj.d).split(''),
                            h = (obj.h).split(''),
                            m = (obj.m).split(''),
                            s = (obj.s).split('');
                            $self.find('.h01').text(h[0]);
                            $self.find('.h02').text(h[1]);
                            $self.find('.m01').text(m[0]);
                            $self.find('.m02').text(m[1]);
                            $self.find('.s01').text(s[0]);
                            $self.find('.s02').text(s[1]);
                    }
                    countdown($t, callback,index);
            });
			lazyload();
        var $coup,$status;
        $('.yh').click(function(){
            $coup=$(this).attr('data-coups');
            $status=$(this).attr('data-status');
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
                        if(data.code == 590){
                            OKHQB_sign.dialog({
                                sign_in_callback: function () {
                                    window.location.href = window.location.href;
                                }
                            });
                        }else{
                            art.dialog({
                                title:false,
                                content:data.msg,
                                noFn:true,
                                time:3,
                                icon:'error_s'
                            });
                        }
                    }
                })
            }

        });
    });
