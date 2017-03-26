/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var siteschema = new mongoose.Schema({
    site:{type:String}
});

var sitemodel = db.model('site',siteschema)
module.exports = sitemodel