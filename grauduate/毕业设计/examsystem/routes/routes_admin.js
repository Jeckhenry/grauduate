/**
 * Created by sunshine on 2017/3/15.
 */
const user = require('../model/user')
const test = require('../model/test')
const sites = require('../model/site')
//此页面添加网站后台其他部分的路由
exports.showAdmin = (req,res)=>{
        user.find({}).then((result)=>{
            res.render('main/admin',{
                user: result
            })
        })
}
exports.showTest = (req,res)=>{
        test.find({}).then((result)=>{
        res.render('main/testmodel',{
            test: result
        })
    })
}

exports.showDetails = (req,res)=>{
        res.render('admin/details',{
            mes:resdata1
        })
}
var resdata1;
exports.message = (req,res,next)=>{
    resdata1 = {
        statusCode:0,
        msg:''
    }
    next()
}
exports.testAdd = (req,res)=>{
        test.findOne(req.body).then((result)=>{
            if(!result){
                test.create(req.body,(err)=>{
                    if (err){
                        console.log(err)
                        return
                    }
                    resdata1.msg = '添加成功'
                    res.render('admin/details',{
                        mes:resdata1
                    })
                })
            }else{
                resdata1.msg = '数据已存在'
                res.render('admin/details',{
                    mes:resdata1
                })
            }
        })
}
var resdata2;
exports.message2 = (req,res,next)=>{
    resdata2 = {
        statusCode:0,
        msg:''
    }
    next()
}
exports.showTesting = (req,res)=>{
    res.render('main/testing')
}
exports.showTestings = (req,res)=>{
    test.find({}).then((result)=>{
        resdata2.msg = result
        res.json(resdata2)
    })
}
//网址操作
exports.addSite = (req,res)=>{
    sites.findOne(req.body).then((result)=>{
        if (!result){
            sites.create(req.body,(err)=>{
                if (err){
                    console.log(err)
                    return
                }
                resdata1.msg = '添加成功'
                res.render('admin/details',{
                    mes:resdata1
                })
            })
        }else{
            resdata1.msg = '数据已存在'
            res.render('admin/details',{
                mes:resdata1
            })
        }
    })
}
exports.showInter = (req,res)=>{
    sites.find({}).then((result)=>{
        res.render('main/sites',{
            sites:result
        })
    })
}