/**
 * Created by sunshine on 2017/3/15.
 */
const express = require('express')
const router = express.Router();
const route = require('./routes_admin')
var multipart=require('connect-multiparty');
var multipartMidd=multipart();

router.use(route.message)
router.use(route.message2)
router.get('/admin',route.showAdmin)
router.get('/test',route.showTest)
router.get('/details',route.showDetails)
router.get('/testing',route.showTesting)
router.get('/tests',route.showTestings)
router.get('/site',route.showInter)
router.get('/sites',route.showInters)
router.get('/teachers',route.showTeachers)
router.get('/teacher',route.showTeacher)
router.get('/class',route.showClasses)
router.get('/classes',route.showClassess)
router.get('/book',route.showBook)
router.get('/build',route.showbuild)
router.get('/refe',route.showreferen)
router.get('/summary',route.showsummary)
router.get('/classteach',route.showclassteach)
router.get('/double',route.showdouble)
router.get('/testteach',route.showtestteach)
router.get('/interteach',route.showinterTeach)
router.get('/achieve',route.showachieve)
router.get('/teachreform',route.showteachingreform)
router.get('/testreform',route.showtestreform)
router.get('/teachresult',route.showteachresult)
router.get('/teachcon',route.showteachcon)
router.get('/teachmove',route.showteachmove)



router.post('/addtest',route.testAdd)
router.post('/addsite',route.addSite)
router.post('/addteacher',route.addTeacher)
router.post('/addclass',route.addClass)
router.post('/addbuild',route.addbookbuild)
router.post('/addreferen',route.addrefe)
router.post('/addsummary',route.addsummary)
module.exports = router