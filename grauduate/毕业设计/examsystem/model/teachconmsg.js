/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    msglead:{type:String},
    msg:{type:String}
});

var bookmodel = db.model('teachconmsg',bookschema)
module.exports = bookmodel