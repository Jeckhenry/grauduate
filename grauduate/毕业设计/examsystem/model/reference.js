/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var referencechema = new mongoose.Schema({
    bookmsg:{type:String},
});

var referenmodel = db.model('reference',referencechema)
module.exports = referenmodel