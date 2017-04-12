/**
 * Created by sunshine on 2017/3/25.
 */
//存放双语教学参考书籍
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    referencename:{type:String}
});

var doublereference = db.model('doublereference',bookschema)
module.exports = doublereference