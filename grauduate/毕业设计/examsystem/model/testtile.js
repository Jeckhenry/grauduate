/**
 * Created by sunshine on 2017/3/25.
 */
//实验题目及参考答案
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    question:{type:String},
    answer:{type:String}
});

var testtitlemodel = db.model('testtitle',bookschema)
module.exports = testtitlemodel