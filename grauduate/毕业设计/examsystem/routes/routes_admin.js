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
const teachreform = require('../model/teachreform')
const testref = require('../model/testref')
const interteach = require('../model/interteach')
const booksachieve = require('../model/booksachieve')
const thesis = require('../model/thesis')
const master = require('../model/master')
const teachieve = require('../model/teachachieve')
//双语教学
const doubleteacher = require('../model/doublelanteacher')//教师队伍
const doublebook = require('../model/doublebooks')//教材
const doublecourse = require('../model/doublecourse')//习题
const doubleware = require('../model/doubleteachware')//课件
const doubletests = require('../model/doubletests')//试卷
const doublerefe = require('../model/doublereference')//参考书
//实验教学
const testteach = require('../model/testteach')//实验教学指导思想和课程设计
const testtitle = require('../model/testtile')//实验教学题目及参考答案
const testcourse = require('../model/testcourse')//实验教学创新实践作业
const testexample = require('../model/testexample')//综合实例
const testware = require('../model/testteachware')//实验教学课件


function  adddatabase(database,message,res) {
    database.create(message,(err)=>{
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
function  showmessage(database,site,res) {
    database.find({}).then((result)=>{
        res.render(site,{
            $_result:result
        })
    })
}


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
    doubleteacher.find({}).then((result1)=>{
        doublebook.find({}).then((result2)=>{
            doubleware.find({}).then((result3)=>{
                doublecourse.find({}).then((result4)=>{
                    doubletests.find({}).then((result5)=>{
                        doublerefe.find({}).then((result6)=>{
                            res.render('index/doublelan',{
                                doubteacher:result1,
                                doublebook:result2,
                                doubleware:result3,
                                doublecourse:result4,
                                doubletest:result5,
                                doubleref:result6
                            })
                        })
                    })
                })
            })
        })
    })
}
exports.adddoubleteacher = (req,res)=>{
    resdata1.statusCode = 19
    adddatabase(doubleteacher,{name:req.body.doubleteachername,
             sex:req.body.doubleteachersex,
            birth:req.body.doubleteacherbirth,
             posts:req.body.doubleteacherposts,
             profession:req.body.doubleteacherprofession,
             works:req.body.doubleteacherwork},res)
}
exports.showdoubleteacher = (req,res)=>{
    showmessage(doubleteacher,'main/doubleteacher',res)
}
exports.adddoublebooks = (req,res)=>{
    resdata1.statusCode = 20
    adddatabase(doublebook,{
        booksname:req.body.doublebookname,
        bookpublisher:req.body.doublebookpub
    },res)
}
exports.showdoublebook = (req,res)=>{
    showmessage(doublebook,'main/doublebook',res)
}
exports.adddoubleware = (req,res)=>{
    resdata1.statusCode = 21
    if(req.url==='/adddoubleware'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var oldpath = files.doubleware.path
            var newpath = "./public/teachcourse/"+files.doubleware.name
            img_path = files.doubleware.name
            if(!files.doubleware.type.includes('application')){
                resdata1.msg = '请上传文档类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.doubleware.size/1000>3000){
                resdata1.msg = '文件不得大于3M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                //允许有同名同姓的教师存在
                doubleware.create({
                    teachname: img_path
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
exports.showdoubleware = (req,res)=>{
    showmessage(doubleware,'main/doubleware',res)
}
exports.adddoubleref = (req,res)=>{
    adddatabase(doublerefe,{ referencename:req.body.doubleref},res)
}
exports.showdoubleref = (req,res)=>{
    showmessage(doublerefe,'main/doubleref',res)
}
exports.adddoublecourse = (req,res)=>{
    resdata1.statusCode = 23
    if(req.url==='/adddoublecourse'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var oldpath = files.doublecourse.path
            var newpath = "./public/teachcourse/"+files.doublecourse.name
            img_path = files.doublecourse.name
            if(!files.doublecourse.type.includes('application')){
                resdata1.msg = '请上传文档类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.doublecourse.size/1000>3000){
                resdata1.msg = '文件不得大于3M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                //允许有同名同姓的教师存在
                doublecourse.create({
                    coursename: img_path
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
exports.adddoubletests = (req,res)=>{
    resdata1.statusCode = 24
    if(req.url==='/adddoubletest'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var oldpath = files.doubletest.path
            var newpath = "./public/teachcourse/"+files.doubletest.name
            img_path = files.doubletest.name
            if(!files.doubletest.type.includes('application')){
                resdata1.msg = '请上传文档类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.doubletest.size/1000>3000){
                resdata1.msg = '文件不得大于3M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                //允许有同名同姓的教师存在
                doubletests.create({
                    testsname: img_path
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
exports.showdoublecourse = (req,res)=>{
    showmessage(doublecourse,'main/doublecourse',res)
}
exports.showdoubletest = (req,res)=>{
    showmessage(doubletests,'main/doubletest',res)
}

//实验教学
exports.showtestteach = (req,res)=>{
    testteach.find({}).then((result1)=>{
        testtitle.find({}).then((result2)=>{
            testcourse.find({}).then((result3)=>{
                testexample.find({}).then((result4)=>{
                    testware.find({}).then((result5)=>{
                        res.render('index/testteach',{
                            $_1:result1,
                            $_2:result2,
                            $_3:result3,
                            $_4:result4,
                            $_5:result5
                        })
                    })
                })
            })
        })
    })
}
exports.addtestteach = (req,res)=>{
    resdata1.statusCode = 25
    adddatabase(testteach,{
        guiding:req.body.testguiding,
        design:req.body.testdesigin,
    },res)
}
exports.showtestteachs = (req,res)=>{
    showmessage(testteach,'main/testteach',res)
}
exports.addtestware = (req,res)=>{
    resdata1.statusCode = 26
    if(req.url==='/addtestware'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var oldpath = files.testware.path
            var newpath = "./public/teachcourse/"+files.testware.name
            img_path = files.testware.name
            if(!files.testware.type.includes('zip')){
                resdata1.msg = '请上传压缩包类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.testware.size/1000>3000){
                resdata1.msg = '文件不得大于3M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                //允许有同名同姓的教师存在
                console.log(img_path)
                testware.create({
                    warename: img_path
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
exports.showtestware = (req,res)=>{
    showmessage(testware,'main/testware',res)
}
exports.addtestcourse = (req,res)=>{
    resdata1.statusCode  =27
    if(req.url==='/addtestcourse'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var oldpath = files.testname.path
            var newpath = "./public/teachcourse/"+files.testname.name
            img_path = files.testname.name
            if(!files.testname.type.includes('application')){
                resdata1.msg = '请上传文档类型'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            if(files.testname.size/1000>3000){
                resdata1.msg = '文件不得大于3M'
                res.render('admin/details',{
                    mes:resdata1
                })
                return
            }
            fs.rename(oldpath,newpath,function(err){
                resdata1.msg = '上传成功'
                testcourse.create({
                    author:fields["testauthor"],
                    testname:img_path
                },(err)=>{
                    if (err){
                        resdata1.msg = '添加失败'
                        console.log(err)
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
exports.showtestcourse = (req,res)=>{
    showmessage(testcourse,'main/testcourse',res)
}
exports.addtesttitle = (req,res)=>{
    resdata1.statusCode = 28
    var img_path = new Array
    var i=0;
    //上传习题及答案
    if(req.url==='/addtesttitle'&&req.method.toLocaleLowerCase()=='post'){
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
            testtitle.create({question:img_path[0],
                answer:img_path[1]},(err)=>{
                if (err){
                    resdata1.msg = '添加失败'
                    return
                }
                resdata1.msg = '添加成功'
            })
        });
    }
    res.render('admin/details',{
        mes:resdata1
    })
}
exports.showtesttitle = (req,res)=>{
    showmessage(testtitle,'main/testtitle',res)
}
exports.showtestexample = (req,res)=>{
    showmessage(testexample,'main/testexample',res)
}
exports.addtestexample = (req,res)=>{
    resdata1.statusCode = 29
    var img_path = new Array
    var i=0;
    //上传习题及答案
    if(req.url==='/addtestexample'&&req.method.toLocaleLowerCase()=='post'){
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
            testexample.create({question:img_path[0],
                answers:img_path[1]},(err)=>{
                if (err){
                    resdata1.msg = '添加失败'
                    return
                }
                resdata1.msg = '添加成功'
            })
        });
    }
    res.render('admin/details',{
        mes:resdata1
    })
}


//网络教学
exports.showinterTeach = (req,res)=>{
    interteach.find({}).then((result1)=>{
        teachingcourse.find({}).then((result2)=>{
            res.render('index/interteach',{
                interteach:result1,
                course:result2
            })
        })
    })
}
exports.showinterteachs = (req,res)=>{
    interteach.find({}).then((result)=>{
        res.render('main/interteach',{
            $_result:result
        })
    })
}
exports.addintertach = (req,res)=>{
    resdata1.statusCode = 14
    interteach.create({ingcharac:req.body.ingcharacter,
        inglink:req.body.inglink},(err)=>{
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
//成果展示
exports.showachieve = (req,res)=>{
    booksachieve.find({}).then((result1)=>{
        thesis.find({}).then((result2)=>{
            teachieve.find({}).then((result3)=>{
                master.find({}).then((result4)=>{
                    res.render('index/achieve',{
                        achieveimg:result1,
                        thesismsg:result2,
                        teachieves:result3,
                        masters:result4
                    })
                })
            })
        })
    })
}
exports.showachievebookimg = (req,res)=>{
    booksachieve.find({}).then((result)=>{
        res.render('main/bookachieve',{
            builds:result
        })
    })
}
exports.addachieveimg = (req,res)=>{
    resdata1.statusCode = 15
    //上传书籍图片
    if(req.url==='/addachieveimg'&&req.method.toLocaleLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir='./tmp'
        form.parse(req, function(err, fields, files) {
            if (err){
                console.log(err)
                return
            }
            var newpath = "./public/img/"
                if(!files.bookimg.type.includes('image')){
                    resdata1.msg = '请上传图片类型'
                    res.render('admin/details',{
                        mes:resdata1
                    })
                    return
                }
                if(files.bookimg.size/1000>3000){
                    resdata1.msg = '文件不得大于3M'
                    res.render('admin/details',{
                        mes:resdata1
                    })
                    return
                }
                fs.rename(files.bookimg.path,newpath+files.bookimg.name,function(err){
                    resdata1.msg = '上传成功'
                    booksachieve.create({
                        bookname:files.bookimg.name,
                    },(err)=>{

                    })
                })
        });
    }
    res.render('admin/details',{
        mes:resdata1
    })
}
//添加论文---成果展示
exports.addthesis = (req,res)=>{
    resdata1.statusCode = 16
    thesis.create({
        author:req.body.thesisauthor,
        title:req.body.thesistitle,
        magazine:req.body.thesismage,
        date:req.body.thesisdate,
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
exports.showthesis = (req,res)=>{
    thesis.find({}).then((result)=>{
        res.render('main/thesis',{
            $_result:result
        })
    })
}
//添加教学成果奖项和证书
exports.addteachieves = (req,res)=>{
    resdata1.statusCode = 17
    teachieve.create({
        article:req.body.teachieveartile,
        award:req.body.teachieveaward,
        date:req.body.teachievedate,
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
exports.showteachieve = (req,res)=>{
    teachieve.find({}).then((result)=>{
        res.render('main/teachieve',{
            builds:result
        })
    })
}
exports.addmaster = (req,res)=>{
    master.create({ author:req.body.mastername,
        title:req.body.mastertitle},(err)=>{
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
exports.showmaster = (req,res)=>{
    master.find({}).then((result)=>{
        res.render('main/master',{
            user :result
        })
    })
}
//教学改革
exports.showteachingreform = (req,res)=>{
    teachreform.find({}).then((result)=>{
        res.render('index/teachingreform',{
            teachref:result
        })
    })
}
exports.showteachrefs = (req,res)=>{
    teachreform.find({}).then((result)=>{
        res.render('main/teachreform',{
            teachref:result
        })
    })
}
exports.addteachreform = (req,res)=>{
    resdata1.statusCode = 12
    var teach = req.body.methodref,
        test = req.body.testref,
        con = req.body.conref;
    teachreform.create({
        teachmethodmsg:teach,
        testmethod:test,
        conmethod:con
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
//考试改革
exports.showtestreform = (req,res)=>{
    testref.find({}).then((result)=>{
        res.render('index/testreform',{
            testresult :result
        })
    })
}
exports.showtestref = (req,res)=>{
    testref.find({}).then((result)=>{
        res.render('main/testref',{
            teacmsg:result
        })
    })
}
exports.addtestreform = (req,res)=>{
    resdata1.statusCode = 13
    testref.create({
        testarticle:req.body.testarti,
        testmethod:req.body.testmethod,
        gradesave:req.body.gradesave,
        testingmethod:req.body.testingmethod,
        testcharac:req.body.testchacr,
        refplan:req.body.testrefplan,
        testingadvantage:req.body.testadvan
    },(err)=>{
        if (err){
            console.log(err)
            resdata1.msg = '添加失败'
            return
        }
        resdata1.msg = '添加成功'
    })
    res.render('admin/details',{
        mes:resdata1
    })
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