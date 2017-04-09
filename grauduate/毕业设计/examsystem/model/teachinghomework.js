/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var classchema = new mongoose.Schema({
    chater:{type:String},
    names:{type:String}
});

var homemodel = db.model('homework',classchema)
module.exports = homemodel