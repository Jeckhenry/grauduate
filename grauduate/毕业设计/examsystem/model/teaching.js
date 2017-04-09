/**
 * Created by sunshine on 2017/3/25.
 */
//教学理念和讲授中注意的点
const mongoose = require('mongoose')
const db = require('./db')

var teachingchema = new mongoose.Schema({
    idea:{type:String},
    points:{type:String}
});

var teachingmodel = db.model('teaching',teachingchema)
module.exports = teachingmodel