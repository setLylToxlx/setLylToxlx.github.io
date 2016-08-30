$(function(){
    nav();
    changeColor();
    popUp();
    $(window).scroll(function () {
        nav();
    });
    var rotateFunc = function(awards,angle,text){  //awards:奖项，angle:奖项对应的角度
        $('.pointer').stopRotate();
        $(".pointer").rotate({
            angle:0,
            duration: 5000,
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                if(awards == 4){
                    $('.hold').css('display','block');
                    setTimeout(function(){
                        var _html = "<div class='popup'><div class='thanks'></div><div class='close'></div></div>";
                        $('.position').html(_html).css('display','block');
                        popUp();
                    },100);
                }else{
                    $('.hold').css('display','block');
                    setTimeout(function(){
                        var _html = "<div class='popup'><div class='get'><div class='pop-info'> <p  class='info-one'>恭喜您</p> <p class='info-two'>"+text+"</p> <p class='info-three'>已到您的账户，请尽量使用哦！</p></div></div><div class='close'></div></div>";
                        $('.position').html(_html).css('display','block');
                        popUp();
                    },100);
                }


            }
        });
    };
    $("#pointer").click(function(e){
            var e = e || window.event;
            e.preventDefault();
            //var _isLogin = OKHQB_sign.isSignIn();
            //if (!_isLogin) {
            //   OKHQB_sign.dialog({
            //        sign_in_callback: function () {
            //            window.location.href = window.location.href;
            //        }
            //    });
            //} else {
                $.ajax({
                    type: 'Get',
                    url: 'http://my.okhqb.com/my/getRotaryRewardNew.json?rotaryType=BPL',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (data) {
                        data = {code:701367}
                        if (data.code == 200) {
                            var arrText = [{angle: 10, text: '中了20元购物券'},
                                {angle: 54, text: '手气不好，下次再来'},
                                {angle: 89, text: '中了30元购物券'},
                                {angle: 120, text: '谢谢惠顾'},
                                {angle: 170, text: '手气不好，下次再来'},
                                {angle: 210, text: '中了50元购物券'},
                                {angle: 229, text: '中了80元购物券'},
                                {angle: 263, text: '中了100元购物券'},
                                {angle: 301, text: '手气不好，下次再来'},
                                {angle: 344, text: '中了10元购物券'}];//后台传入参数
                            rotateFunc(data.data.location, arrText[data.data.location - 1].angle, arrText[data.data.location - 1].text);
                        }
                        else if (data.code == 701370) {
                            $('.hold').css('display', 'block');
                            setTimeout(function () {
                                $('.position').html("<div class='popup'><div class='not-enough'></div><div class='close'></div></div>").css('display','block');
                            }, 100)
                        }
                        else if (data.code == 701367) {
                            $('.hold').css('display', 'block');
                            setTimeout(function () {
                                $('.position').html("<div class='popup'><div class='use-out'></div><div class='close'></div></div>").css('display','block');
                            }, 100)
                        }else if(data.code == 590){
                               OKHQB_sign.dialog({
                                    sign_in_callback: function () {
                                        window.location.href = window.location.href;
                                    }
                                });
                        }else{
                            $('.hold').css('display', 'block');
                            setTimeout(function () {
                                $('.position').html("<div class='popup'><div class='use-out'></div><div class='close'></div></div>").css('display','block');
                            }, 100)
                        }
                    },
                    error: function(){
                        alert('请求失败！');
                    }
                });
            //}
    });
    $('.lazy').lazyload({
        time:200,
        effect:'fadeIn'
    });
    })

function nav(){
    var Top = $('.head').position().top;
    var Nav = $('.nav');
    if ($(this).scrollTop() > Top) {
        setTimeout(function () {
            Nav.show();
        }, 10);
    } else {
        setTimeout(function () {
            Nav.hide();
        }, 10);
    }
}
function changeColor(){
    $('.nav-list').on('click','a',function(e){
        var e = e || window.event;
        var target = e.target;
        var index = target.className.substr(3);
        for(var i=1;i<6;i++){
            $('.nav'+i).removeClass('nav-active');
        }
        target.className = ('nav'+index+" "+'nav-active');
    })
}
function popUp(){
    $('body').on('click','.close',function(){
        $('.position').css('display','none');
        $('.hold').css('display','none');
    })
}