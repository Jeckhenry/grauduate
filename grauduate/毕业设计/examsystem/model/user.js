/**
 * Created by sunshine on 2017/3/14.
 */
const  mongoose = require('mongoose')
const  db = require('./db')

var userschema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    isAdmin: {
        type: String,
        default: '否'
    }
});

var usermodel = db.model('user',userschema)

module.exports = usermodel