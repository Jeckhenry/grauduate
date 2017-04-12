/**
 * Created by sunshine on 2017/3/25.
 */
//存放双语教学的试卷
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    testsname:{type:String}
});

var doubletestmodel = db.model('doubletests',bookschema)
module.exports = doubletestmodel