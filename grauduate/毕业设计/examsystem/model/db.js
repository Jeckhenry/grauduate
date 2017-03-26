/**
 * Created by sunshine on 2017/3/14.
 */
const  mongoose = require('mongoose')
const  db = mongoose.createConnection('mongodb://127.0.0.1:27017/testdb')
db.once('open',(err)=>{
    if (err){
        console.log(err)
        return
    }
    console.log('1  连接成功数据库')
})

module.exports  =db