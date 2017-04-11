/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    author:{type:String},
    title:{type:String}
});

var mastermodel = db.model('master',bookschema)
module.exports = mastermodel