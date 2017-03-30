/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var classchema = new mongoose.Schema({
    classmsg:{type:String},
    feater:{type:String},
    teaching:{type:String}
});

var classmodel = db.model('class',classchema)
module.exports = classmodel