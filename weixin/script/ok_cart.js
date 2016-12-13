$(function(){
    var $cart = {
        init:function(){
            var _W = $(window).width() > 750 ? 750 : $(window).width();
            $('html').css('fontSize',_W/7.5+'px');
            $('.lazy').picLazyLoad();
            this.deleteCart();
            this.countPrice();
            this.choosePorduct();
            this.optionNum();
        },
        //删除购物车商品
        deleteCart:function(){
            $('.ok_cart_delete').click(function() {
                var $this = $(this);
                $('.ok_dialog').css('display', 'block');
                $('.weui-dialog__btn_default').click(function(){
                    $('.ok_dialog').hide();
                });
                $('.weui-dialog__btn_primary').click(function(){
                    $.ajax();
                // 回调操作 删除
                    $('.ok_dialog').hide();
                    $this.parent().remove();
                    var _len = $('.ok_cart_item').length;
                    console.log(_len);
                    if(_len == 0){
                        $('.ok_cart_box').addClass('ok_cart_clear').html('购物车已清空！');
                    }
                    $cart.countPrice();
                });
            });
        },
        //统计价格
        countPrice:function(){
            var _countPrice = 0;
            $('.ok_checked').each(function(index){
                var _num = parseFloat($(this).find('.ok_num').html()),
                    _discount = $(this).find('.ok_discount_desc span').html()&&_num>0?parseFloat($(this).find('.ok_discount_desc span').html()):0;
                _countPrice += parseFloat($(this).find('.ok_price').html().substr(1))*_num - _discount;
            });
            $('.ok_total_price').html('￥'+parseFloat(_countPrice).toFixed(2));
        },
        //全选商品
        choosePorduct:function(){
            $('.ok_choose').on('click',function(){
                if($(this).hasClass('ok_all')){
                    $(this).removeClass('ok_all');
                    $('.ok_cart_box').find('.ok_cart_item').removeClass('ok_checked');
                    $cart.countPrice();
                }else{
                    $(this).addClass('ok_all');
                    $('.ok_cart_box').find('.ok_cart_item').addClass('ok_checked');
                    $cart.countPrice();
                }
            });
            $('.ok_cart_check').click(function(){
                if($(this).parent().hasClass('ok_checked')){
                    $(this).parent().removeClass('ok_checked');
                    $cart.countPrice();
                }else{
                    $(this).parent().addClass('ok_checked');
                    $cart.countPrice();
                }

            });
        },
        //调节商品数量
        optionNum:function(){
            $('.ok_num_desc').click(function(){
                var $num = $(this).parent().find('.ok_num'),
                    _num = parseFloat($num.html())>0?parseFloat($num.html()):1;
                $num.html(_num-1);
                $cart.countPrice();
            });
            $('.ok_num_asc').click(function(){
                var $num = $(this).parent().find('.ok_num'),
                    _num = parseFloat($num.html());
                $num.html(_num+1);
                $cart.countPrice();
            });
        }
    };
    $cart.init();
});
