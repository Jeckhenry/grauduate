/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var classchema = new mongoose.Schema({
    teacher:{type:String}
});

var coursewaremodel = db.model('courseware',classchema)
module.exports = coursewaremodel