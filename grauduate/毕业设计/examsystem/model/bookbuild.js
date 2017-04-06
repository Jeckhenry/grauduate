/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    author:{type:String},
    bookname:{type:String},
    publisher:{type:String}
});

var bookmodel = db.model('book',bookschema)
module.exports = bookmodel