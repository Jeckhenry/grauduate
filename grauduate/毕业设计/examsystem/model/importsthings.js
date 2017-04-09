/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var classchema = new mongoose.Schema({
    chater:{type:String},
    imports:{type:String},
    difficulty:{type:String}
});

var importmodel = db.model('importsthing',classchema)
module.exports = importmodel