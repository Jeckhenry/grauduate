/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var bookschema = new mongoose.Schema({
   ingcharac:{type:String},
    inglink:{type:String}
});

var interteachmodel = db.model('interteach',bookschema)
module.exports = interteachmodel