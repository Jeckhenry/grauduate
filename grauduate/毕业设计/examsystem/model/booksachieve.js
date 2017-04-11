/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    bookname:{type:String}
});

var bookachievemodel = db.model('bookachieve',bookschema)
module.exports = bookachievemodel