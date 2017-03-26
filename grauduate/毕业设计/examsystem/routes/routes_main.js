/**
 * Created by sunshine on 2017/3/15.
 */
exports.showMain = (req,res)=>{
    var userinfo = null;
    if (req.cookies.userInfo && !req.cookies.userInfo.includes('null')){
        userinfo = JSON.stringify(req.cookies.userInfo);
        res.render('main/index',{
            user:userinfo
        })
    }else{
        res.render('main/index',{
            user:userinfo
        })
    }
}
exports.showIndex = (req,res)=>{
    res.render('index/index')
}
