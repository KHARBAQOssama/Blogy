const express = require('express')
const expressLayout = require('express-ejs-layouts')
require('dotenv').config();
const flash = require('connect-flash')
const session = require('express-session')
const viewRoutes = require('./Routes/viewRoutes')
const authRoutes = require('./Routes/authRoutes')
const categoryRoutes = require('./Routes/categoryRoutes');
const bodyParser = require('body-parser');

const app = express();
//App


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/assets/css'))

//EJS
app.use(expressLayout)
app.set('view engine', 'ejs')
app.use('/categories', categoryRoutes);
// Body Parser
app.use(express.urlencoded({ extended: false }));

//expression session middleware
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
);

// connect flash
app.use(flash())

// global variable

app.use((req, res, next)=>{
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message')
    next()
})

//ROUTES
app.use('/', viewRoutes)
app.use('/auth', authRoutes)


app.listen(3000, ()=>{
    console.log("yeeep");
})