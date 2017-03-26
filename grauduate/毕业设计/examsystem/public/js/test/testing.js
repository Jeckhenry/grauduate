/**
 * Created by sunshine on 2017/3/14.
 */

document.onkeydown = function(ev){
    var event = ev || window.event
    if(event.keyCode==116) {
        event.keyCode=0;
        event.returnValue = false;
    }
}
//禁止页面使用右键（以下部分是）
if (window.Event){
    document.captureEvents(Event.MOUSEUP);
}
function nocontextmenu(ev){
    var event = ev || window.event
    event.cancelBubble = true
    event.returnValue = false;
    return false;
}
function norightclick(ev) {
    var event = ev || window.event
    if (window.Event) {
        if (event.which == 2 || event.which == 3)
            return false;
    } else if (event.button == 2 || event.button == 3){
        event.cancelBubble = true
        event.returnValue = false;
        return false;
    }
}
document.oncontextmenu = nocontextmenu; // for IE5+
document.onmousedown = norightclick; // for all others
//禁止页面上使用右键（上面代码是）




$(function(){
    $('#username').text(localStorage.getItem('name'))
    $('#out').click(()=>{
        $.ajax({
            url:'/api/logout',
            success:(res)=>{
                if (!res.statusCode){
                    window.location.href = 'http://127.0.0.1/main'
                }
            }
        })
    })
    var ques_arr = [];
    var $_suggest = $('#suggest')
    var $_test = $('#test')
    var $_label = $('div.testing').find('p.answerques').find('span')
    var index = 0;//题目索引
    var j;//题目数组长度
    var err;//错题数目
    var right;//正确的题目数
    function ques(i){
        $('input[name=ans]:radio:checked').prop('checked',false);
        $_test.find('div.testing').find('p.p1').text(i+1);
        $_test.find('div.testing').find('span.span1').text(ques_arr[i].ask);
        $_test.find('div.testing').find('span.span2').text(ques_arr[i].answers1)
        $_test.find('div.testing').find('span.span3').text(ques_arr[i].answers2)
        $_test.find('div.testing').find('span.span4').text(ques_arr[i].answers3)
        $_test.find('div.testing').find('span.span5').text(ques_arr[i].answers4)
    }
    var $_time = 3600;
    function ti(){
        if ($_time<=0){
            $('#waring').fadeOut();
            $('#next').prop('disabled',true)
        }
        $_time--;
        var $_min = parseInt($_time/60);//分钟数
        var $_sec = parseInt($_time-$_min*60);//秒数
        $('.daoji').text($_min+'分'+$_sec+'秒')
    }
    $('#begin').click(()=>{
        setInterval(ti,1000)
        $('#begin').prop('disabled',true)
        $_suggest.hide()
        $_test.show()
        index = 0
        err = 0;
        right = 0;
        $.ajax({
            url:'/admin/tests',
            async:false,
            success:(res)=>{
                for(var i=0;i<res.msg.length;i++){
                    ques_arr[i] = res.msg[i]
                }
                j = res.msg.length
            }
        })
        ques(index)
    })
    function test(i){
        var $_check = $('.answerques').find('input:radio:checked').next().text();
        if ($_check === ques_arr[i].rightanswer){
            right+=1;
        }else{
            err+=1;
        }
    }
    function comon(str){
        $('.comeon').html(str)
    }
    var $_input = $('div.testing').find('p.answerques').find('input')
    console.log($_input[0])
    $('#next').click(function(){
        var l=0;
        $('div.testing').find('p.answerques').find('input:radio').each(function(){
            if ($(this).is(':checked')){
                l++
            }
        })
        if (l===0){
            alert('请完成选择！')
            return
        }

        if (index<j-1){
            test(index)
            index++;
            ques(index)
        }else{
            test(index++)
            $('#waring').fadeIn()
            $('.rightan').html(right)
            $('.erran').html(err)
            var percent = right/j
            if (percent<0.6){
                comon('您还有一定的不足，继续努力！')
            }else if (percent<0.8){
                comon('您还可以更好，加油！')
            }else {
                comon('您做的很好，继续保持哦！')
            }
            $('#next').prop('disabled',true)
        }
        //禁止页面刷新，以确保用户只能测试一次
    })
    $('div.wartop').click(()=>{
        $('#waring').fadeOut()
    })
})