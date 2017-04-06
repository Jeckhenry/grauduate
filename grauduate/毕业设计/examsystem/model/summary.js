/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var summarychema = new mongoose.Schema({
    summary:{type:String},
    pre:{type:String},
    after:{type:String},
    item:{type:String}
});

var sumarymodel = db.model('summary',summarychema)
module.exports = sumarymodel