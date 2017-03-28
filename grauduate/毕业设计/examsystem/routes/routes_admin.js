/**
 * Created by sunshine on 2017/3/15.
 */
const user = require('../model/user')
const test = require('../model/test')
const sites = require('../model/site')
const teachers = require('../model/teacher')
const formidable = require('formidable')
const fs = require('fs')
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
        statusCode:'',
        msg:''
    }
    next()
}
exports.testAdd = (req,res)=>{
        resdata1.statusCode = 0
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
    resdata1.statusCode = 1
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
exports.showInters = (req,res)=>{
    sites.find({}).then((result)=>{
        res.render('index/internet',{
            sites:result
        })
    })
}
//教师模块
exports.showTeachers = (req,res)=>{
    teachers.find({}).then((result)=>{
        res.render('index/teachers',{
            teachman:result
        })
    })
}
exports.showTeacher = (req,res)=>{
    teachers.find({}).then((result)=>{
        res.render('main/teacher',{
            teachmen:result
        })
    })
}
exports.addTeacher = (req,res)=>{
    resdata1.statusCode = 2
    var img_path
    //上传教师图片
    if(req.url==='/addteacher'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            var oldpath = files.file.path
            var newpath = "./public/img/"+files.file.name
            img_path = files.file.name
            console.log(img_path)
            if(!files.file.type.includes('image')){
                resdata1.msg = '请上传图片类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.file.size/1000>3000){
                resdata1.msg = '图片不得大于3M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                //允许有同名同姓的教师存在
                var name = fields["teachname"],
                    sexs = fields["teachsex"],
                    births = fields["teachbir"],
                    academics = fields["teachacade"],
                    tel = fields["teachtel"],
                    email = fields["teachemail"],
                    img = img_path,
                    abstract = fields["teachabs"];
                teachers.create({
                    teachname:name,
                    sex:sexs,
                    birth:births,
                    academic:academics,
                    tel:tel,
                    email:email,
                    abstract:abstract,
                    img:img
                },(err)=>{
                    if (err){
                        resdata1.msg = '添加失败'
                        return
                    }
                    resdata1.msg = '添加成功'
                })
                res.render('admin/details',{
                    mes:resdata1
                })
            })
        });
    }
}