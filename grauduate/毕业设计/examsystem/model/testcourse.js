/**
 * Created by sunshine on 2017/3/25.
 */
//学生创新实践作业
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    author:{type:String},
    testname:{type:String}
});

var testcoursemodel = db.model('testcourse',bookschema)
module.exports = testcoursemodel