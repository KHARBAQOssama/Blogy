const express = require('express')
const expressLayout = require('express-ejs-layouts')
require('dotenv').config();
const flash = require('connect-flash')
const session = require('express-session')
const viewRoutes = require('./Routes/viewRoutes')
const authRoutes = require('./Routes/authRoutes')
const articleRoutes = require('./Routes/articleRoutes')
const profileRoutes = require('./Routes/profileRoutes')
const passport = require('passport')
require('./Config/passport')(passport)
//App




const app = express();

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/public/assets/js'))

//EJS
app.use(expressLayout)
app.set('view engine', 'ejs')
// Body Parser
app.use(express.urlencoded({extended: false }));
app.use(express.json({limit:'10mb'}));
//expression session middleware
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash())

// global variable

app.use((req, res, next)=>{
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message')
    res.locals.error= req.flash('error')
    next()
})

//ROUTES
app.use('/', viewRoutes)
app.use('/auth', authRoutes)
app.use('/article', articleRoutes)
app.use('/profile', profileRoutes)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT} ...`)
})