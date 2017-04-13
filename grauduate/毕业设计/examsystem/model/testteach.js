/**
 * Created by sunshine on 2017/3/25.
 */
//实验教学的指导思想和课程设计
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    guiding:{type:String},
    design:{type:String},
});

var testteachmodel = db.model('testteach',bookschema)
module.exports = testteachmodel