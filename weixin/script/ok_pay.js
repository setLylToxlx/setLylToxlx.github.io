$(function(){
    var $pay = {
        init:function(){
            var _W = $(window).width() > 750 ? 750 : $(window).width();
            $('html').css('fontSize',_W/7.5+'px');
        }
    };
    $pay.init();
});
