console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const index = require('./routes/index');
const about = require('./routes/about');
const tests = require('./routes/tests');
const create = require('./routes/create');

const cookieParser = require('cookie-parser');
//const flash = require('connect-flash');
const session = require('express-session');
//const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
//const jwt = require('jwt-simple');
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;
app.use(methodOverride('_method'))
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

app.use('/', index)
app.use('/about', about)
app.use('/tests', tests)
app.use('/create', create)

db.on('error', error => {
    console.error(error)
});
db.once('open', () => {
    console.log('Connected to Mongoose')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})