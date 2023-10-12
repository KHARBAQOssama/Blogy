const express = require('express')
const expressLayout = require('express-ejs-layouts')
require('dotenv').config();
const flash = require('connect-flash')
const session = require('express-session')
const viewRoutes = require('./Routes/viewRoutes')
const authRoutes = require('./Routes/authRoutes')
const categoryRoutes = require('./Routes/categoryRoutes');
const articleRoutes = require('./Routes/articleRoutes')
const commentRoutes = require('./Routes/commentRoutes')
const profileRoutes = require('./Routes/profileRoutes')
const dashboardRoutes = require('./Routes/dashboardRoutes');
const passport = require('passport')
const csrf = require('csurf'); // Import the csurf middleware
const cookieParser = require('cookie-parser');
require('./Config/passport')(passport)
//App

let csrfProtection = csrf({ cookie: true });
console.log(express.Router());


const app = express();
//App

app.use(cookieParser());
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/public/assets/js'))
app.use('/css', express.static(__dirname + '/public/assets/css'))
app.use('/img', express.static(__dirname + '/public/images'))

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
app.use('/comment', commentRoutes)
app.use('/profile', profileRoutes)
app.use('/dashboard',dashboardRoutes)
app.use('/categories', categoryRoutes);

app.listen(3000, ()=>{
    console.log("yeeep");
})