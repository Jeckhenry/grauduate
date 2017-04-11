/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    article:{type:String},
    award:{type:String},
    date:{type:String},
});

var teachieve = db.model('teachieve',bookschema)
module.exports = teachieve