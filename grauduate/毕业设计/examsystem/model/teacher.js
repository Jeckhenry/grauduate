/**
 * Created by sunshine on 2017/3/28.
 */
const  mongoose = require('mongoose')
const  db = require('./db')

var teacherschema = new mongoose.Schema({
    teachname: {type: String},
    sex: {type: String},
    birth:{type:String},
    academic:{type:String},
    tel:{type:String},
    email:{type:String},
    abstract:{type:String},
    img:{type:String}//教师简介
});

var teachermodel = db.model('teacher',teacherschema)

module.exports = teachermodel