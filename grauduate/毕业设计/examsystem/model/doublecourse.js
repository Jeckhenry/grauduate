/**
 * Created by sunshine on 2017/3/25.
 */
//存放双语教学的作业习题
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    coursename:{type:String},
});

var doublecoursemodel = db.model('doublecourse',bookschema)
module.exports = doublecoursemodel