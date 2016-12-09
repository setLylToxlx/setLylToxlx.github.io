$(function(){
    var _W = $(window).width() > 750 ? 750 : $(window).width();
    $('html').css('fontSize',_W/7.5+'px');
    $('.lazy').picLazyLoad();
    var _H = _W / 640 * 346;
    var $slider = $('.ok_slider');
    var _Li = $slider.find('li').length;
    $slider.height(_H);
    if(_Li > 1){
        var $dot = '<div class="dot">';
        for(var i = 0; i <_Li; i++){
            $dot +='<span></span>';
        }
        $dot += '</div>';
        $slider.append($dot);
        $slider.swipeSlide({
            continuousScroll:true,
            speed : 1500,
            transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
            firstCallback : function(i,sum,me){
                me.find('.dot').children().first().addClass('cur');
            },
            callback : function(i,sum,me){
                me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
            }
        });
    }
});