$(function(){
	var game = {
		init:function(){
			this.loadImg();
      this.bindEvent();
			this.nav();
			$(window).scroll(function () {
               game.nav();
           });
		},
		loadImg:function(){
			$('.lazy').lazyload({
				time:200,
				effect:"fadeIn"
			});
		},
    //导航
       nav:function(){
       	$('.nav-list a').click(function(){
       		$(this).attr('class','nav-active').siblings().attr('class','nav-item');
       	});
       	var Top = $('.head').height()-50,
               $Nav = $('.nav');
           if ($(window).scrollTop() > Top) {
               setTimeout(function () {
                   $Nav.show();
               }, 10);
           } else {
               setTimeout(function () {
                   $Nav.hide();
               }, 10);
           }
       },
       bindEvent:function(){
        $('.nav-box a').click(function(){
            $(this).attr('class','nav-panleActive').siblings().attr('class','nav-panle');
        });
        $('.package-select').change(function(){
            var $this = $(this);
            var $dataFirst = $this.attr('data-first');
                $skuId = $this.children('option:selected').attr('data-alls');
                $skuId = $skuId.split('|');
            var $parent = $this.parent(),
                $parentBro = $parent.siblings('.package-item'),
                $otherSelect = $parentBro.children('.package-select'),
                $total = $parent.siblings('.package-bottom').find('.package-save b'),
                $save = $parent.siblings('.package-bottom').find('.package-saveText span'),
                $form = $parent.siblings('.package-bottom').find('form');
                $thisData = $this.children('option:selected').attr('data-alls');
                $thisData = $thisData.split('|');
                $parent.find('.package-img img').attr('src',$thisData[3]);
                $parent.find('.package-img').attr('href','http://www.okhqb.com/item/'+$thisData[2]+'.html');
                $parent.find('.package-price span').html($thisData[0]);
                $otherData = $otherSelect.children('option:selected').attr('data-alls');
                $otherData = $otherData.split('|');
                $total.html(Number($thisData[0])+Number($otherData[0]));
                $save.html(Math.abs(Number($thisData[0])+Number($otherData[0])-Number($thisData[1])-Number($otherData[1])));
                if($dataFirst == 'true'){ 
                    $parent.find('.package-name').html($thisData[5]);
                    $parent.find('.package-info').html($thisData[6]);
                    $form.find('input[name=collocationId]').val($thisData[4]);
                    $form.find('input[name=collocationSkuIds]').val($thisData[2]+','+$otherData[2]);
                }else{
                    $parent.find('.package-name').html($thisData[4]);
                    $parent.find('.package-info').html($thisData[5]);
                    $form.find('input[name=collocationSkuIds]').val($otherData[2]+','+$thisData[2]);
                }           
        });
     }
	}
	game.init();
})