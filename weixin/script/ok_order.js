$(function(){
    var $order = {
        //入口
        init:function(){
            var _W = $(window).width() > 750 ? 750 : $(window).width();
            $('html').css('fontSize',_W/7.5+'px');
            this.chooseAddress();
            this.chooseCoup();
            this.totalPrice();
            this.choosePay();
            this.submitPay();
        },
        //选择地址
        chooseAddress:function(){
            //下拉地址列表
            $('.ok_show_down').click(function(){
                var $this = $(this);
                if($this.hasClass('ok_show_up')){
                    $(this).removeClass('ok_show_up');
                    $('#ok_addAddress').addClass('ok_hide');
                    $('.ok_address_content .weui-cell').each(function(ind){
                        var _hasIcon = $(this).find('.weui-cell__hd').hasClass('ok_choose_icon');
                        if(!_hasIcon){
                            $(this).addClass('ok_hide');
                        }
                    });
                }else{
                    $('#ok_addAddress').removeClass('ok_hide');
                    $(this).addClass('ok_show_up').siblings('.weui-cell').removeClass('ok_hide');
                }
            });
            //选择地址
            $('.ok_address_content .weui-cell').click(function(){
                var $this = $(this);
                if($this.find('.weui-cell__hd').hasClass('ok_choose_icon')){return false;}
                $this.find('.weui-cell__hd').addClass("ok_choose_icon");
                $this.siblings('.weui-cell').find('.weui-cell__hd').removeClass("ok_choose_icon")
            });
            //点击新建地址
            $('.ok_address_add').click(function(){
                window.location.href = '../page/address.html';
            });
        },
        //选择优惠券
        chooseCoup:function(){
            var _arr = $order.defaultCoup();
            sureCoup(_arr[1],_arr[0]);
            $('.ok_coup_item').click(function(){
                var $this = $(this),
                    _ind = $this.index(),
                    _num = $this.find('.ok_left_num').text();
                sureCoup(_ind,_num);
            });
            $('.ok_default_coup').click(function(){
                var $coup = $('.ok_coup');
                if($coup.hasClass('ok_hide')){
                    $coup.removeClass('ok_hide');
                }else{
                    $coup.addClass('ok_hide');
                }

            });
            function sureCoup(ind,num){
                $('.ok_coup').find('.ok_coup_item').eq(ind).addClass('ok_coup_use').siblings().removeClass('ok_coup_use');
                $('.ok_default_coup span').text(num);
            }
        },
        //默认优惠券
        defaultCoup:function(){
            var _maxCoup = 0,
                _ind = 0,
                arr = [];
            $('.ok_left_num').each(function(ind){
                var _num = Number($(this).html());
                if(_num>_maxCoup){
                    _maxCoup = _num;
                    _ind = ind;
                }
            });
            arr.push(_maxCoup,_ind);
            return arr;
        },
        //计算总价格
        totalPrice:function(){
            var _totalPrice = 0;
            $('.ok_item_price').each(function(ind){
                _totalPrice += parseFloat($(this).find('span').text());
            });
            _totalPrice -= 2*Number($('#ok_item_coup').text());
            $('.ok_bottom_price span').text(_totalPrice.toFixed(2));
            $('.ok_total_price').text('￥'+_totalPrice.toFixed(2));
        },
        //选择支付方式
        choosePay:function(){
            $('.ok_pay_way').click(function(){
                var $this = $(this),
                    $parent = $(this).parent().parent();
                $parent.siblings().find('.ok_pay_way').removeClass('weui-icon-success');
                if($this.hasClass('weui-icon-success')){
                    $this.removeClass('weui-icon-success');
                }else{
                    $this.addClass('weui-icon-success');
                }

            });
        },
        //提交支付
        submitPay:function(){
            $('.ok_bottom_pay').tap(function(){
                window.location.href = '../page/pay.html';
            })
        }

    };
    $order.init();
});
