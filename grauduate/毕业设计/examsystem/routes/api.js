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
router.post('/changeclass',route.changeClass)
router.post('/delbuild',route.delbuild)
router.post('/changebuild',route.changebuild)
router.post('/changerefe',route.changerefe)
router.post('/delrefe',route.delrefe)
router.post('/changesum',route.changesum)
router.post('/changeteachmsg',route.changeteachmsg)
router.post('/delcal',route.delcal)
router.post('/changecal',route.changecal)
router.post('/delcourse',route.delcourse)
router.post('/changimportant',route.changeimportants)
router.post('/delexercise',route.delexercise)
router.post('/delimportant',route.delimportants)
router.post('/changeteachref',route.changeteachres)
router.post('/changetestref',route.changetestref)
router.post('/changeinterteach',route.changeinterteach)
router.post('/delbookachieve',route.delbookachieve)
router.post('/delthesis',route.delthesis)
router.post('/changethesis',route.changethesis)
router.post('/delteachieve',route.delteachieve)
router.post('/changeteachieve',route.changeteachieve)
router.post('/delmaster',route.delmaster)
router.post('/changemaster',route.changemaster)
router.post('/deldoubleteacher',route.deldoubleteacher)
router.post('/changedoubleteacher',route.changedoubleteacher)
router.post('/deldoublebook',route.deldoublebook)
router.post('/changedoublebook',route.changedoublebook)
router.post('/deldoubleware',route.deldoublewares)
router.post('/deldoubleref',route.deldoubleref)
router.post('/changedoubleref',route.changedoubleref)
router.post('/deldoublecourse',route.deldoublecourse)
router.post('/deldoubletest',route.deldoubletest)

module.exports = router