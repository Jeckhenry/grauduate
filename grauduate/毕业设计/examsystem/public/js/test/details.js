/**
 * Created by sunshine on 2017/3/14.
 */
$(function(){
    $('input[type="file"]').wrap('<a href="javascript:;" class="file">选择文件</a>')
    $('#back').click(()=>{
        window.location.href = 'http://127.0.0.1/main'
    })
    var $_msg = $('.msg').text()
    function canl(){
        if ($_msg){
            setTimeout(function(){
                $('.msg').text('')
            },2000)
        }
    }
    setInterval(canl,3000)
    $('#up').click(function () {
        $('body').animate({"scroll-top":0},500)
        $("html").animate({"scroll-top":0},500);
    })
})