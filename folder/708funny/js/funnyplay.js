/**
 * Created by yf2 on 2016/7/11.
 */
function navScroll(){
        var _top = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(_top);
        if(_top>600){
            $('#nav').attr('class','nav-fix');
            //console.log(2);

            //$('#nav').className = 'nav';
        }else{
            $('#nav').attr('class','nav');
            //console.log(1);
            //$('#nav').className = 'nav-fix';
        }
}
function fontSizeAuto(){
    var _width = document.documentElement.clientWidth;
    console.log(_width);
    var _html = document.getElementsByTagName('html')[0];
    if(_width>=640){
        _html.style.fontSize = "62.5%";
    }else{
        _html.style.fontSize = _width/640*62.5 + '%';
    }
}
$(window).on("scroll", function(){
    navScroll();
}).on('resize',function(){
    fontSizeAuto();
});
//添加监控
//navScroll();
//IE
//if(document.attachEvent){
//    console.log(3);
//    document.attachEvent('onmousewheel',navScroll);
//}
////火狐
//else if(document.addEventListener){
//    console.log(2);
//    document.addEventListener('DOMMouseScroll',navScroll,false);
//}else{//谷歌
//    window.onmousewheel=document.onmousewheel=navScroll;
//    console.log(1);
//}

//document.addEventListener('onmousewheel',function(event){
//    //clearInterval(navScroll.timer);
//    //navScroll.timer = setInterval(function(){
//    //
//    //},50);
//    navScroll();
//    alert(1);
//})
