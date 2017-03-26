/**
 * Created by sunshine on 2017/3/15.
 */
const express = require('express')
const route = require('./routes_main')
const router = express.Router();

router.get('/main',route.showMain)
router.get('/',route.showIndex)
module.exports = router;