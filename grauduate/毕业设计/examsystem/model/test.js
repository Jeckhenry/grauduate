/**
 * Created by sunshine on 2017/3/14.
 */
const  mongoose = require('mongoose')
const  db = require('./db')

var testschema = new mongoose.Schema({
    ask:{type:String},
    answers1: {type: String},
    answers2: {type: String},
    answers3: {type: String},
    answers4: {type: String},
    rightanswer:{type:String}
});

var testmodel = db.model('test',testschema)

module.exports = testmodel