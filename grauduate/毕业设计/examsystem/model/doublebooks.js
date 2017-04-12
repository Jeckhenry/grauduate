/**
 * Created by sunshine on 2017/3/25.
 */
//存放双语教学教材
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    booksname:{type:String},
    bookpublisher:{type:String}
});

var doublebookmodel = db.model('doublebooks',bookschema)
module.exports = doublebookmodel