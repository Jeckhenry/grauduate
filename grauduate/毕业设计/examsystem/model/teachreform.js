/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var teachchema = new mongoose.Schema({
    teachmethodmsg:{type:String},
    testmethod:{type:String},
    conmethod:{type:String}
});

var classmodel = db.model('teachreform',teachchema)
module.exports = classmodel