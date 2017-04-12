/**
 * Created by sunshine on 2017/3/25.
 */
//存放双语教学队伍
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    name:{type:String},
    sex:{type:String},
    birth:{type:String},
    posts:{type:String},
    profession:{type:String},
    works:{type:String}
});

var doublemodel = db.model('doublelanteach',bookschema)
module.exports = doublemodel