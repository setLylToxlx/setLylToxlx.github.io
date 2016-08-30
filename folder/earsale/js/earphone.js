function navScroll(){
    var _top = 0;
    if(document.documentElement.scrollTop){
        _top = document.documentElement.scrollTop;
    }
    if(document.body.scrollTop){
        _top = document.body.scrollTop
    }
    console.log(_top);
    if(_top>=475){
        $('#nav').removeClass('nav');
        $('#nav').addClass('nav-fix');
    }else{
        $('#nav').removeClass('nav-fix');
        $('#nav').addClass('nav');
    }
}

    function loadImage() {
        $('.lazy').lazyload({
            time: 200,
            effect: 'fadeIn'
        });
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
    })
}
loadImage();
changeColor();
$(window).on("scroll", function(){
    navScroll();
    changeColor();
});