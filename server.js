const express = require('express')
const expressLayout = require('express-ejs-layouts')
require('dotenv').config();
const flash = require('connect-flash')
const session = require('express-session')
const viewRoutes = require('./Routes/viewRoutes')
const authRoutes = require('./Routes/authRoutes')
//App

const app = express();
//EJS
app.use(expressLayout)
app.set('view engine', 'ejs')
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

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT} ...`)
})