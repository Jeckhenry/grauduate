/**
 * Created by sunshine on 2017/3/15.
 */
const express = require('express')
const router = express.Router();
const route = require('./routes_admin')

router.use(route.message)
router.use(route.message2)
router.get('/admin',route.showAdmin)
router.get('/test',route.showTest)
router.get('/details',route.showDetails)
router.get('/testing',route.showTesting)
router.get('/tests',route.showTestings)
router.get('/site',route.showInter)
router.get('/sites',route.showInters)
router.post('/addtest',route.testAdd)
router.post('/addsite',route.addSite)
module.exports = router