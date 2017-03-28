/**
 * Created by sunshine on 2017/3/15.
 */
const express = require('express')
const route = require('./routes_api')
const router = express.Router()

router.use(route.initData)
//注册
router.post('/register',route.register)

//登录
router.post('/login',route.login)

//登出
router.get('/logout',route.logout)
router.post('/delete',route.deletemsg)
router.post('/delete2',route.deletemsg2)
router.post('/changemsg',route.changemsg)
router.post('/changemsg2',route.changemsg2)
router.post('/delsite',route.deletesite)
router.post('/changesite',route.changesite)
router.post('/changeteach',route.changeTeach)
router.post('/delteach',route.delTeacher)
module.exports = router