/**
 * Created by sunshine on 2017/3/14.
 */
$(function(){
    //阻止页面的回退
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);

    var $loginbox = $('#loginBox'),
        $regisbox = $('#registerBox')
    //注册事件
    $('#register').click(()=>{
        $.ajax({
            url:'/api/register',
            method:'post',
            data:{
              username:$regisbox.find('[name="username"]').val(),
                password:$regisbox.find('[name="password"]').val(),
                repassword:$regisbox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:(res)=>{
                if (res.msg){
                    $('#regis').text(res.msg)
                }
            },
            err:(err)=>{
                if (err){
                    console.log(err+'失败')
                }
            }
        })
    })
    //登录事件
    $('#login').click(()=>{
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:{
                username:$loginbox.find('[name="username"]').val(),
                password:$loginbox.find('[name="password"]').val()
            },
            dataType:'json',
            success:(res)=>{
                //alert(JSON.stringify(res))   colWarning   res ->  后台返回给你的resData
                if(res.msg){
                    $loginbox.find('p.colWarning').text(res.msg)  //登录提示信息
                }
                if(!res.statusCode){
                    //登录成功了
                    var username = res.userInfo.username
                    localStorage.setItem('name',username)
                    if (username == 'admin'){
                        window.location.href = 'http://127.0.0.1/admin/details'
                        return
                    }
                    // window.location.reload(); //自动刷新, 发起第二次请求,就可以取到cookie了
                    window.location.href = 'http://127.0.0.1/admin/testing'
                }
            },
            error:(err)=>{
                console.log(err)
            }
        })
    })
    $('.colMint').click(()=>{
        $loginbox.hide()
        $regisbox.show()
    })
    $('.colMint2').click(()=>{
        $loginbox.show()
        $regisbox.hide()
    })



})