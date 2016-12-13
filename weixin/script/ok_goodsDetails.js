$(function(){
    var $detail = {
        init:function(){
            var _W = $(window).width() > 750 ? 750 : $(window).width();
            $('html').css('fontSize',_W/7.5+'px');
            $('.lazy').picLazyLoad();
            var _H = _W / 640 * 620;
            var $slider = $('.ok_slider');
            var _Li = $slider.find('li').length;
            $slider.height(_H);
            if(_Li > 1){
                var $dot = '<div class="dot">';
                for(var i = 0; i <_Li; i++){
                    $dot +='<span></span>';
                }
                $dot += '</div>';
                $slider.append($dot);
                $slider.swipeSlide({
                    continuousScroll:true,
                    speed : 1500,
                    transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                    firstCallback : function(i,sum,me){
                        me.find('.dot').children().first().addClass('cur');
                    },
                    callback : function(i,sum,me){
                        me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                    }
                });
            }
            this.addCart();
            this.addCollect();
            this.checkBox();
            this.optionNum();
            this.submitBuy();
        },
        checkBox:function(){
            $('.ok_checkBox').click(function(){
                var _id = $(this).attr('data-id');
                $(this).addClass('ok_checkBox_selected').siblings().removeClass('ok_checkBox_selected');
                $('#'+_id).val($(this).html());
            });
        },
        flyToCart:function(c){
            
        },
        addCart:function(){
            $('.ok_add_cart').click(function(){
                $('.ok_num').html(Number($('.ok_num').text())+1);
            });
        },
        optionNum:function(){
          $('#ok_option_add').click(function(){$('.ok_goods_num').html(Number($('.ok_goods_num').text())+1);});
          $('#ok_option_desc').click(function(){$('.ok_goods_num').html(Number($('.ok_goods_num').text()>0?Number($('.ok_goods_num').text()):1)-1);});
        },
        addCollect:function(){
            $('.ok_detail_collect').click(function(){
               var _charge = $(this).attr('data-collect');
                if(_charge == 'true'){
                    $(this).attr('src','../images/goods_detalil/collect.jpg').attr('data-collect','false');
                    //sent 请求改变存储
                }else{
                    $(this).attr('src','../images/goods_detalil/collected.png').attr('data-collect','true');
                }
            });
        },
        submitBuy:function(){
            $('#ok_submit').click(function(){
                $('#ok_detail_form').submit();
                window.location.href = '../page/home.html'
            })
        }
    };
    $detail.init();
});
