/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    author:{type:String},
    title:{type:String},
    magazine:{type:String},
    date:{type:String},
});

var thesismodel = db.model('thepage',bookschema)
module.exports = thesismodel