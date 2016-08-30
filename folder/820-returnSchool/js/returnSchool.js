$(function(){
	var returnSchool = {
		init:function(){
			this.loadImg();
			this.getCoup();
			this.nav();
			$(window).scroll(function () {
               returnSchool.nav();
           });
		},
		loadImg:function(){
			$('.lazy').lazyload({
				time:200,
				effect:"fadeIn"
			});
		},
		//优惠券
       getCoup:function(){
           var $coup;
           $('.ticket li').click(function(){
               $coup=$(this).attr('data-coups');
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
                                 content : '领取成功，优惠券已发放至您的个人中心',
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
               };

           });
       },
       //导航
       nav:function(){
       	$('.nav-list a').click(function(){
       		var _nav = $(this).attr('data-nav');
       		$(this).attr('class','nav-item nav'+_nav).siblings().attr('class','nav-item');
       	});
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
	}
	returnSchool.init();
})