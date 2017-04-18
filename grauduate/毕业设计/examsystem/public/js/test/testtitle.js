/**
 * Created by sunshine on 2017/3/28.
 */
/**
 * Created by sunshine on 2017/3/26.
 */
$(function () {
    $('.del').click(function(){
        $('#middle').val($(this).parent().parent().find('td:first').text())
        var $_middle = $('#middle').val()
        $.ajax({
            url:'/api/deltesttitle',
            method:'post',
            data:{
                middle:$_middle,
                file1:$(this).parent().prev().prev().text(),
                file2:$(this).parent().prev().text()
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