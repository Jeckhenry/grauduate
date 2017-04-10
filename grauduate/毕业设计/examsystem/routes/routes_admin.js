/**
 * Created by sunshine on 2017/3/15.
 */
const user = require('../model/user')
const test = require('../model/test')
const sites = require('../model/site')
const teachers = require('../model/teacher')
const bookbuild = require('../model/bookbuild')
const reference = require('../model/reference')
const summary = require('../model/summary')
const formidable = require('formidable')
const classes = require('../model/class')
const fs = require('fs')
const teaching = require('../model/teaching')//教学理念和注意点
const teacinghome = require('../model/teachinghomework')//作业习题
const cal = require('../model/teacingcal')//教学日历
const teachingcourse = require('../model/teacingcourseware')//教学课件
const important = require('../model/importsthings')//重点和难点
var url = require('url');
var http = require('http');
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
exports.addClass = (req,res)=>{
    resdata1.statusCode = 3
    var clasmsg = req.body.classmsg,
        clasfeater = req.body.feater,
        clasteaching = req.body.teaching;
    classes.create({
        classmsg:clasmsg,
        feater:clasfeater,
        teaching:clasteaching
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
}
exports.showClasses = (req,res)=>{
    classes.find({}).then((result)=>{
        res.render('main/classmsg',{
            clmsg:result
        })
    })
}
exports.showClassess = (req,res)=>{
    classes.find({}).then((result)=>{
        res.render('index/classmsg',{
            classmsg:result
        })
    })
}
//向数据库添加教材建设历程信息
exports.addbookbuild = (req,res)=>{
    resdata1.statusCode  = 4
    var author_ele = req.body.author,
        bookname_ele = req.body.bookname,
        publisher_ele = req.body.publish;
    bookbuild.create({
        author:author_ele,
        bookname:bookname_ele,
        publisher:publisher_ele
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
}
//向数据库添加教材简介和特色的信息
exports.addsummary = (req,res)=>{
    resdata1.statusCode = 6
    var summary_ele = req.body.booksum,
        pre_ele = req.body.premsg,
        after_ele = req.body.aftermsg,
        item_ele = req.body.bookitem;
    summary.create({
        summary:summary_ele,
        pre:pre_ele,
        after:after_ele,
        item:item_ele
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
}
//向数据库添加参考书信息
exports.addrefe = (req,res)=>{
    resdata1.statusCode = 5
    var bookmsg_e = req.body.bookmsg;
    reference.create({
        bookmsg:bookmsg_e
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
}
exports.showbuild = (req,res)=>{
    bookbuild.find({}).then((result)=>{
        res.render('main/build',{
            builds:result
        })
    })
}
exports.showsummary = (req,res)=>{
    summary.find({}).then((result)=>{
        res.render('main/summary',{
            summ:result
        })
    })
}
exports.showreferen = (req,res)=>{
    reference.find({}).then((result)=>{
        res.render('main/reference',{
            refe:result
        })
    })
}
exports.showBook = (req,res)=>{
    bookbuild.find({}).then((result1)=>{
        summary.find({}).then((result2)=>{
            reference.find({}).then((result3)=>{
                res.render('index/books',{
                    refelist:result3,
                    booklist:result1,
                    sumlist:result2,
                })
            })
        })
    })
}
//课堂教学
exports.showclassteach = (req,res)=>{
    teaching.find({}).then((result1)=>{
        cal.find({}).then((result2)=>{
            teacinghome.find({}).then((result3)=>{
                teachingcourse.find({}).then((result4)=>{
                    important.find({}).then((result5)=>{
                        res.render('index/classteach',{
                            $_teacing:result1,
                            $_cal:result2,
                            $_teachinghome:result3,
                            $_teachingcourse:result4,
                            $_impor:result5
                        })
                    })
                })
            })
        })
    })
}
exports.addteacing = (req,res)=>{
   resdata1.statusCode = 7
    var idea_ = req.body.teachidea,
        points = req.body.teachpoints;
    teaching.create({
        idea:idea_,
        points:points
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
}
exports.addcal = (req,res)=>{
    resdata1.statusCode = 8
    var $_1 = req.body.teachweeks,
        $_2 = req.body.teaching,
        $_3 = req.body.teacharticle,
        $_4 = req.body.teachmethod,
        $_5 = req.body.teachexample,
        $_6 = req.body.teachexercise;
    cal.create({
        weeks:$_1,
        teacing:$_2,
        article:$_3,
        methods:$_4,
        example:$_5,
        exercise:$_6
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
}
exports.addimports = (req,res)=>{
    resdata1.statusCode = 9
    var $_1 = req.body.charter,
        $_2 = req.body.imports,
        $_3 = req.body.difficulty;
    important.create({
        chater:$_1,
        imports:$_2,
        difficulty:$_3
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
}
exports.addteachcourse = (req,res)=>{
    resdata1.statusCode = 10
    var img_path
    //上传教师课件
    if(req.url==='/addteachcourse'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var oldpath = files.teachcourse.path
            var newpath = "./public/teachcourse/"+files.teachcourse.name
            img_path = files.teachcourse.name
            if(!files.teachcourse.type.includes('zip')){
                resdata1.msg = '请上传压缩包类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.teachcourse.size/1000>5000){
                resdata1.msg = '文件不得大于5M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                //允许有同名同姓的教师存在
                teachingcourse.create({
                    teacher: img_path
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
exports.addteachinghome = (req,res)=>{
    resdata1.statusCode = 11
    var img_path = new Array
    var i=0;
    //上传习题及答案
    if(req.url==='/addteachexer'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var newpath = "./public/teachcourse/"
            for (var k in files){
                img_path.push(files[k].name)
                if(!files[k].type.includes('application')){
                    resdata1.msg = '请上传文档类型'
                    res.render('admin/details',{
                        mes:resdata1
                    })
                    return
                }
                if(files[k].size/1000>3000){
                    resdata1.msg = '文件不得大于3M'
                    res.render('admin/details',{
                        mes:resdata1
                    })
                    return
                }
                    fs.rename(files[k].path,newpath+files[k].name,function(err){
                        resdata1.msg = '上传成功'
                    })
            }
            teacinghome.create({chater:img_path[0],
                names:img_path[1]},(err)=>{
                if (err){
                    resdata1.msg = '添加失败'
                    return
                }
                resdata1.msg = '添加成功'
            })
        });
        //
    }
    res.render('admin/details',{
        mes:resdata1
    })

}
exports.showteachmsg = (req,res)=>{
    teaching.find({}).then((result)=>{
        res.render('main/teachmsg',{
            teacmsg:result
        })
    })
}
exports.showcaldenrmsg = (req,res)=>{
    cal.find({}).then((result)=>{
        res.render('main/calender',{
            teacmsg:result
        })
    })
}
exports.showcoursemsg = (req,res)=>{
    teachingcourse.find({}).then((result)=>{
        res.render('main/courseware',{
            teacmsg:result
        })
    })
}
exports.showexercmsg = (req,res)=>{
    teacinghome.find({}).then((result)=>{
        res.render('main/exercise',{
            teacmsg:result
        })
    })
}
exports.showimportsmsg = (req,res)=>{
    important.find({}).then((result)=>{
        res.render('main/imports',{
            teacmsg:result
        })
    })
}


//双语教学
exports.showdouble = (req,res)=>{
    res.render('index/doublelan')
}
//实验教学
exports.showtestteach = (req,res)=>{
    res.render('index/testteach')
}
//网络教学
exports.showinterTeach = (req,res)=>{
    res.render('index/interteach')
}
//成果展示
exports.showachieve = (req,res)=>{
    res.render('index/achieve')
}
//教学改革
exports.showteachingreform = (req,res)=>{
    res.render('index/teachingreform')
}
//考试改革
exports.showtestreform = (req,res)=>{
    res.render('index/testreform')
}
//教学效果
exports.showteachresult  = (req,res)=>{
    res.render('index/teachresult')
}
//教学管理
exports.showteachcon = (req,res)=>{
    res.render('index/teachcontrolle')
}
//教学录像
exports.showteachmove = (req,res)=>{
    res.render('index/teachmove')
}