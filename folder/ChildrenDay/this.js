/**
 * Created by yf2 on 2016/6/29.
 */
var temp = 0;
var answerArr = [];
var arrjson = [
    {
        htmlcontent: '<h2 class="question">1.真相只有一个</h2><ul><li> <input id="answerone" value="1" type="checkbox"/> <label for="answerone">金田一少年事件簿</label> </li> <li> <input id="answerother" value="2" type="checkbox"/> <label for="answerother">名侦探柯南</label> </li> </ul> <a class="nextquestion" href="javascript:">下一题</a>',
        answer: 1
    },
    {
        htmlcontent: '<h2 class="question">1.真相只有一个</h2><ul><li> <input id="answerone" value="1" type="checkbox"/> <label for="answerone">金田一少年事件簿</label> </li> <li> <input id="answerother" value="2" type="checkbox"/> <label for="answerother">名侦探柯南1</label> </li> </ul> <a class="nextquestion" href="javascript:">下一题</a>',
        answer: 2
    },
{
        htmlcontent: '<h2 class="question">1.真相只有一个</h2><ul><li> <input id="answerone" value="1" type="checkbox"/> <label for="answerone">金田一少年事件簿</label> </li> <li> <input id="answerother" value="2" type="checkbox"/> <label for="answerother">名侦探柯南2</label> </li> </ul> <a class="nextquestion" href="javascript:">下一题</a>',
        answer: 1
    },
   {
       htmlcontent: '<h2 class="question">1.真相只有一个</h2><ul><li> <input id="answerone" value="1" type="checkbox"/> <label for="answerone">金田一少年事件簿</label> </li> <li> <input id="answerother" value="2" type="checkbox"/> <label for="answerother">名侦探柯南3</label> </li> </ul> <a class="nextquestion submit" href="javascript:">提交答案</a>',
        answer: 1
    }
];
var child_day = {
    init:function(){
        this.answer();
        this.nextquestion();
        this.eventClick();
        this.reloadHref();
        this.nav();
    },
    answer: function(){
        $('#answer').on('click',function(){
            var questionhtml = arrjson[temp].htmlcontent;
            $('.answerquestion').html(questionhtml);
            temp++;
        })
    },
    eventClick: function(){
        $('body').on('click','.answerquestion input',function(e){
            var radio = $('input[type="checkbox"]');
            var len = radio.length;
            var target = e.target;
            for(var i=0;i<len;i++){
                if(radio[i].checked == true){
                    radio[i].checked = false;
                }
            }
            target.checked = true;
            answerArr[temp] = target.value;
            console.log(answerArr);
        })
    },
    nextquestion: function(){
        $('body').on('click','.nextquestion',function(){
            var radio = $('input');
            var len = radio.length;
            var correctAnswer = [];
            var targetNum = 0;
            for(var i=0;i<len;i++){
                if(radio[i].checked == true){
                    targetNum++;
                }
            }
            if(temp<4 && targetNum==1){
                var questionhtml = arrjson[temp].htmlcontent;
                $('body .answerquestion').html(questionhtml);
                temp++;
            }else{
                if(temp<4){
                    alert('答题未完请继续！');
                }else{
                    for(var i=0;i<4;i++){
                        correctAnswer.push(arrjson[i].answer)
                    }
                    console.log(correctAnswer.join('')+':'+answerArr.join(''));
                    if(correctAnswer.join('') === answerArr.join('')){
                        $('.submit').css('display','none');
                        $('.hide').css('display','block');
                        $('.correct').css('display','block');

                    }else{
                        $('.submit').css('display','none');
                        $('.hide').css('display','block');
                        $('.error').css('display','block');
                    }
                }
            }

        })
    },
    reloadHref: function(){
        $('.again').on('click',function(){
            location.reload();
        });
        $('.getaward').on('click',function(){
            location.reload();
        });
        $('.gotosee').on('click',function(){
            location.reload();
        })
    },
    nav: function(){
        setInterval(function(){
            var top = $('.fixednav').offset().top;
            if(top>=850){
                $('.fixednav').css('display','block');
            }
            if(top<450){
                $('.fixednav').css('display','none');
            }
        },50);
    },
};
child_day.init();