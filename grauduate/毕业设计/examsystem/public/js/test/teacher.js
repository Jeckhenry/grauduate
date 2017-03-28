/**
 * Created by sunshine on 2017/3/28.
 */
/**
 * Created by sunshine on 2017/3/26.
 */
$(function () {
    $('.abs').each(function () {
        $(this).text($(this).text().substring(0,20)+'.....')
    })
    $('.del').click(function(){
        $('#middle').val($(this).parent().parent().find('td:first').text())
        var $_middle = $('#middle').val()
        $.ajax({
            url:'/api/delteach',
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

    $('.cha').click(function() {
        var str = $(this).val() == "修改" ? "提交" : "修改";
        $(this).val(str);   // 按钮被点击后，在“编辑”和“确定”之间切换
        $(this).parent().siblings("td.ar").each(function () {  // 获取当前行的其他单元格
            var  obj_text = $(this).find("input:text");    // 判断单元格下是否有文本框
            if (!obj_text.length) {   // 如果没有文本框，则添加文本框使之可以编辑
                $(this).html("<input type='text' style='width: 100px;' value='" + $(this).text() + "'>");
            }else {   // 如果已经存在文本框，则将其显示为文本框修改的值
                $(this).html(obj_text.val());
            }
        })

        //ajax调用数据库进行数据更新
        if (str === '修改') {
            $('#middle').val($(this).parent().parent().find('td:first').text())
            var parent = $(this).parent().parent()
            var $_middle = $('#middle').val()
            var $_name = parent.find('[name="teachname"]').text()
            var $_sex = parent.find('[name="teachsex"]').text()
            var $_birth = parent.find('[name="teachbirth"]').text()
            var $_acade = parent.find('[name="teachacademic"]').text()
            var $_tel = parent.find('[name="teachtel"]').text()
            var $_email = parent.find('[name="teachemail"]').text()
            var $_abstrac = parent.find('[name="teachabstract"]').text()
            $.ajax({
                url: '/api/changeteach',
                method: 'post',
                async: false,
                data: {
                    middle: $_middle,
                    name:$_name,
                    sex:$_sex,
                    birth:$_birth,
                    academic:$_acade,
                    tel:$_tel,
                    emails:$_email,
                    abs:$_abstrac
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res.msg)
                },
                err: (err) => {

                }
            })

            alert('修改成功！')
        }
    })


})