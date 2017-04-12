/**
 * Created by sunshine on 2017/3/26.
 */
$(function () {
    $('.del').click(function(){
        $('#middle').val($(this).parent().parent().find('td:first').text())
        var $_middle = $('#middle').val()
        $.ajax({
            url:'/api/deldoubletest',
            method:'post',
            data:{
                middle:$_middle
            },
            dataType:'json',
            success:(res)=>{

            },
            err:()=>{
                if (err){
                    console.log(err+'失败')
                }
            }
        })
        alert('删除成功')
        window.location.reload()
    });

})