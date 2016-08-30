/**
 * Created by yf2 on 2016/7/5.
 */
//function lottery(){
function run(speed,startPosition,stopPosition) {
        var Oli = $('.lotterybox ul li');
        var start = startPosition;//开始位置
        var stop = 0; //停止条件
        var popup = '';//响应元素
        //var circcleNum = 0;
        stopPositionNow = 18+stopPosition-startPosition;
        clearInterval(run.timer);
        run.timer = setInterval(function () {
            stop++;
            if (start < 6) {
                for (var i = 0; i < Oli.length; i++) {
                    Oli.eq(i).css('opacity', 0.3);
                }
                Oli.eq(start).css('opacity', 1);
                start++
            }
            //console.log(startPosition);
            //console.log(start);
            //console.log(stopPositionNow);
            if(stopPosition==4){
                popup = '.popup6';
                stopPosition = 6;
            }else{
                if(stopPosition==6){
                    popup = '.popup4';
                    stopPosition = 4;
                }else{
                    popup = '.popup'+ stopPosition;
                }
            }
            if (stop == stopPosition) {//停止的地方
                clearInterval(run.timer);
                //stopPositionNow = stopPositionNow + 1;
                $('.popup').css('display','block');
                //$('.popup').css('display','block');

                console.log(popup);
                setTimeout(function(){
                    $(popup).css('display','block');
                    setCookie('startPosition',stopPosition-1);
                },500)

            }
            if(start==6){
                start = 0;
            }
        }, speed)
    }
function nav(){
        var Top = $('.head').position().top;
        var Nav = $('.nav');
        $(window).scroll(function () {
            if ($(this).scrollTop() > Top) {
                setTimeout(function () {
                    Nav.show();
                }, 500);
            } else {
                setTimeout(function () {
                    Nav.hide();
                }, 500);
            }
        });
}
function startRun(){
    var startPosition = 0;
    $('#godate').on('click',function(){
        var _isLogin = OKHQB_sign.isSignIn();
        if (!_isLogin) {
            OKHQB_sign.dialog({
                sign_in_callback: function () {
                    window.location.href = window.location.href;
                }
            });
        } else {
            $('.lotterybox ul li').css({'opacity':.5,'filter':'alpha(opacity=50)'});
            $.ajax({
                type:'Get',
                url:'http://my.okhqb.com/my/getRotaryRewardNew.json?rotaryType=717Q',
                dataType:'jsonp',
                jsonp:'callback',
                success:function(data)
                {
                    if (data.code == 200) {
                        var startPosition = getCookie("startPosition") || 0;
                        var stopPosition  = data.data.location;
                        //alert(stopPosition);
                        run(130,startPosition,stopPosition);
                    }
                    else if(data.code == 701370){
                        $('.notenough').css('display','block');
                    }
                    else if(data.code == 701367){
                        $('.useout').css('display','block');
                    }
                }
            });
        }
    });
        popdown($('.popup1 p'),$('.popup1'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.popup2 p'),$('.popup2'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.popup3 p'),$('.popup3'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.popup4 p'),$('.popup4'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.popup5 p'),$('.popup5'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.popup6 p'),$('.popup6'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.useout p'),$('.useout'),$('.popup'),$('.lotterybox ul li'));
        popdown($('.notenough p'),$('.notenough'),$('.popup'),$('.lotterybox ul li'));
    }
function popdown(obj1,obj2,obj3,obj4){
    obj1.on('click',function(){
        obj2.hide();
        obj3.hide();
        for(var i = 0; i < obj4.length; i++) {
            obj4.eq(i).css('opacity', 1);
        }
    })
}
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//startRun();
//nav();