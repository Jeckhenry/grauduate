/**
 * Created by sunshine on 2017/3/14.
 */
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const user = require('./model/user')
const app = express()

app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extend:true}))
app.set('view engine','ejs')


app.use('/admin',require('./routes/admin'))
app.use('/api',require('./routes/api'))
app.use('/',require('./routes/main'))

app.listen(80)