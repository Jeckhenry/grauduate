/**
 * Created by sunshine on 2017/3/25.
 */
//存放双语教学课件
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    teachname:{type:String},
});

var waremodel = db.model('doubleteachware',bookschema)
module.exports = waremodel