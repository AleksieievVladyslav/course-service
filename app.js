const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./app/routers/indexRouter');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use('/', indexRouter)

module.exports = app;