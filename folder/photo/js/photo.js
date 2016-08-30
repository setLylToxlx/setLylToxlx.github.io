$(function(){
    var photo = {
        init:function(){
            this.loadImg();
            this.bindClick();
            this.nav();
            this.selectGoods();
            $(window).scroll(function () {
                photo.nav();
            });
        },
        //慢加载图片
        loadImg:function(){
            $('.lazy').lazyload({
                time:250,
                effect:'fadeIn'
            });
        },
        //导航
        nav:function(){
            var Top = $('.head').position().top;
            var Nav = $('.nav');
            if ($(window).scrollTop() > Top) {
                setTimeout(function () {
                    Nav.show();
                }, 10);
            } else {
                setTimeout(function () {
                    Nav.hide();
                }, 10);
            }
        },
        //价格选择
        selectGoods:function(){
            $('.package-phone').change(function(){
                var $this = $(this),
                $Selector = $this.children('option:selected'),
                data = $Selector.attr('data-alls'),
                data = data.split('|'),
                $parent = $this.parent();
                $parent.find('.package-img img').attr('src',data[4]);
                $parent.find('.package-money').html(data[0]);
                var $packageBuy = $parent.parent().find('.package-buy'),
                    $form = $packageBuy.find('form');
                $packageBuy.find('.buy-price').html('<span>￥</span>'+data[2]);
                $packageBuy.find('.buy-save').html('为你省：'+data[1]+'元');
                $form.attr('id',data[3]);
            })
        },
        //点击事件绑定
        bindClick:function(){
            $('.nav-list').on('click','a',function(e){
                var e = e || window.event;
                var target = e.target;
                var index = target.className.substr(3);
                var len = $('.nav-list a').length;
                for(var i=1;i<=len;i++){
                    $('.nav'+i).removeClass('nav-active');
                }
                target.className = ('nav'+index+" "+'nav-active');
            });
        }
    };
    photo.init();
});
