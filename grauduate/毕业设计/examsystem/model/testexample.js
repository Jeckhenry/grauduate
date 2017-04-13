/**
 * Created by sunshine on 2017/3/25.
 */
//综合实例
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    question:{type:String},
    answers:{type:String}
});

var testexamplemodel = db.model('testexample',bookschema)
module.exports = testexamplemodel