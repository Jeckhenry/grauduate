/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
    testarticle:{type:String},
    testmethod:{type:String},
    gradesave:{type:String},
    testingmethod:{type:String},
    testcharac:{type:String},
    refplan:{type:String},
    testingadvantage:{type:String}
});

var testrefmodel = db.model('testref',bookschema)
module.exports = testrefmodel