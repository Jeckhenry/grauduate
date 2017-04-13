/**
 * Created by sunshine on 2017/3/25.
 */
//实验课件
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    warename:{type:String}
});

var testwaremodel = db.model('testware',bookschema)
module.exports = testwaremodel