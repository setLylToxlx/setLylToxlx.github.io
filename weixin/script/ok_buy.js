!(function(){
    var comebuy = {
        init:function(){
            var $width = $(window).width()>750?750:$(window).width();
            $('html').css('fontSize',$width/7.5+'px');
            $('.lazy').picLazyLoad();
            this.countTime();
        },
        countTime:function (){
            var $time = $('.ok_ms_box').attr('data-time'),
                timer = null;
            function zero(time){
                var $h = parseInt(time/3600),
                    $m = parseInt(time/60%60),
                    $s = parseInt(time%60);
                $h = $h>9?$h:'0'+$h;
                $m = $m>9?$m:'0'+$m;
                $s = $s>9?$s:'0'+$s;
                $('.ok_hour').text($h);
                $('.ok_min').text($m);
                $('.ok_sec').text($s);
            }
            clearInterval(timer);
            timer = setInterval(function(){
                $time --;
                if($time>-1){zero($time);}else{clearInterval(timer);}
            },1000);
    },
        getCartNum:function(){
            var _isLogin = '';
            if(_isLogin){
                $.ajax({
                    url:'',
                    type:'GET',
                    success:function(data){
                        $('.ok_cart_num').html(data.data.num);
                    }
                });
            }

        }
    };
    comebuy.init();
}());