/**
 * Created by yf2 on 2016/7/1.
 */
//var init = {
//    exchange: function(){
//        $('#nav1').on('click',function(){
//            var e = e || window.event;
//            target = e.target || e.srcElement;
//            //target.css('top','10px');
//            //alert(target.css('top','10px'));
//            $('.boy1').offsetLeft = 100 +'px';
//            console.log($('#nav1').offsetLeft);
//        })
//    }
//}
//init.exchange();
function exchange(Odiv){
    var temp = 0,
        cookies = [{top:0,left:0},{top:0,left:0}],
        obj = [];
    Odiv.addEventListener('click',function(e){
        temp++;
        var e = e || window.event;
        target = e.target || e.srcElement;
        var Oimg = document.getElementById(target.id);
        if(temp<2){
            cookies[temp-1].top = Oimg.offsetTop +'px';
            cookies[temp-1].left = Oimg.offsetLeft +'px';
            obj.push(target.id);
        }else{
            cookies[temp-1].top = Oimg.offsetTop +'px';
            cookies[temp-1].left = Oimg.offsetLeft +'px';
            obj.push(target.id);
            var Oimg0 = document.getElementById(obj[0]);
            var Oimg1 = document.getElementById(obj[1]);
            Oimg0.style.top = cookies[1].top;
            Oimg0.style.left = cookies[1].left;
            Oimg1.style.top = cookies[0].top;
            Oimg1.style.left = cookies[0].left;
            obj = [];
            cookies = [{top:0,left:0},{top:0,left:0}];
            temp = 0;
        }
    })
}
var Odiv = document.getElementById('nav1');
exchange(Odiv);