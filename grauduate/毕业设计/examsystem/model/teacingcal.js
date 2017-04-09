/**
 * Created by sunshine on 2017/3/25.
 */
const mongoose = require('mongoose')
const db = require('./db')

var classchema = new mongoose.Schema({
    weeks:{type:String},
    teacing:{type:String},
    article:{type:String},
    methods:{type:String},
    example:{type:String},
    exercise:{type:String}
});

var calndermodel = db.model('calnder',classchema)
module.exports = calndermodel