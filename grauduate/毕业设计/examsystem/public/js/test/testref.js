/**
 * Created by sunshine on 2017/3/28.
 */
/**
 * Created by sunshine on 2017/3/26.
 */
$(function () {

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
            var $_1 = parent.find('[name="week"]').text()
            var $_2 = parent.find('[name="weeks"]').text()
            var $_3 = parent.find('[name="teacing"]').text()
            var $_4 = parent.find('[name="article"]').text()
            var $_5 = parent.find('[name="methods"]').text()
            var $_6 = parent.find('[name="example"]').text()
            var $_7 = parent.find('[name="exercise"]').text()
            $.ajax({
                url: '/api/changetestref',
                method: 'post',
                data: {
                    middle: $_middle,
                    testarticle_$:$_1,
                    testmethod_$:$_2,
                    gradesave_$:$_3,
                    testingmethod_$:$_4,
                    testcharac_$:$_5,
                    refplan_$:$_6,
                    testingadvantage_$:$_7
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