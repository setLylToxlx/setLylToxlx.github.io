$(function(){
   var _yhq = {
       init:function(){
           this.loadImg();
           this.getCoup();
       },
       //慢加载图片
       loadImg:function(){
           $('.lazy').lazyload({
               time:250,
               effect:'fadeIn'
           });
       },
       //优惠券
       getCoup:function(){
           var $coup;
           $('.ticket').click(function(){
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
       }
   }
    _yhq.init();
});
