$(function(){
    var $payResult = {
        init:function(){
            var _W = $(window).width() > 750 ? 750 : $(window).width();
            $('html').css('fontSize',_W/7.5+'px');
            this.choosePay();
        },
        //选择支付方式
        choosePay:function(){
            $('.ok_pay_way').click(function(){
                var $this = $(this),
                    $parent = $(this).parent().parent();
                $parent.siblings().find('.ok_pay_way').removeClass('weui-icon-success');
                if($this.hasClass('weui-icon-success')){
                    $this.removeClass('weui-icon-success');
                }else{
                    $this.addClass('weui-icon-success');
                }

            });
        }
    };
    $payResult.init();
});
