/**
 * Created by sunshine on 2017/3/14.
 */
$(function(){
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
})