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
router.post('/addtest',route.testAdd)
router.post('/addsite',route.addSite)
router.post('/addteacher',route.addTeacher)
router.post('/addclass',route.addClass)
router.post('/addbuild',route.addbookbuild)
router.post('/addreferen',route.addrefe)
router.post('/addsummary',route.addsummary)
module.exports = router