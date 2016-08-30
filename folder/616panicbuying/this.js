/**
 * Created by yf2 on 2016/6/27.
 */
var init = {
    nav: function(){
        setInterval(function(){
            var top = $('.navtop').offset().top;
            if(top>=850){
                $('.navtop').css('display','block');
            }
            if(top<450){
                $('.navtop').css('display','none');
            }
        },50);
        console.log($('.navtop').offset().top);
    },
    ufo: function(){
        $('.ufo').animate({
            top:'265px',
            left:'330px'
        },1200);
    }
};
init.ufo();
init.nav();