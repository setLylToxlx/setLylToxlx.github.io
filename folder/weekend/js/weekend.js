function navScroll(){
    var _top = document.documentElement.scrollTop || document.body.scrollTop;
    var _topHead = $('.head').height()+$('.head').offset().top;
    //console.log(_topHead);
    if(_top>_topHead){
        $('#nav').attr('class','nav-fix');
    }else{
        $('#nav').attr('class','nav');
    }
}
function changeColor(){
    $('#nav ul').on('click','li a',function(e){
        var e = e || window.event;
        var target = e.target;
        var index = target.className.substr(3);
        for(var i=1;i<5;i++){
            $('.nav'+i).removeClass('nav-active');
        }
        target.className = ('nav'+index+" "+'nav-active');
        console.log(target.className);
    })
}
function fontSizeAuto(){
    var _width = document.documentElement.clientWidth;
    var _html = document.getElementsByTagName('html')[0];
    if(_width>=640){
        _html.style.fontSize = "62.5%";
    }else{
        _html.style.fontSize = _width/640*62.5 + '%';
    }
}
//changeColor();
//$(window).on("scroll", function(){
//    navScroll();
//});

//滚动导航
$(function(){
    var CG = {
        navBar: $('.nav'),
        init: function(){
            this.windowScrollNavFix();
            this.action();
        },
        action: function(){
            $('.nav ul li').on('click',function(){
                var $this = $(this),
                    pos = $this.attr('data-pos'),
                    $sib = $this.siblings(),
                    top = 0,
                    $h = $('.nav').outerHeight(true),
                    $l = $('.nav-fix').length;
                if($l > 0){
                    top = $('#'+pos).offset().top - $h;
                }else{
                    top = $('#'+pos).offset().top - $h * 1.8;
                }
                $sib.removeClass('nav-active');
                $this.addClass('nav-active');
                $('html,body').animate({'scrollTop':top+'px'},500);
            });
        },
        windowScrollNavFix:function(){
            var initTop = $('.nav').position().top+20;
            $(window).scroll(function(){
                if($(this).scrollTop()>initTop){
                    CG.navBar.addClass('nav-fix');
                }else{
                    CG.navBar.removeClass('nav-fix');
                }
            });
        },
    };
    CG.init();
});