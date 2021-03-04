// acquiring_dependencies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const server = express();
require('./config/passport')(passport);

// DB_Config
const db = require('./config/db_key').mongoURI;

// static_folder_hold
const a = express.static(path.join(__dirname, 'views'));
server.use('/', a);
server.use('/home', a);
server.use('/add/electronics', a);
server.use('/add/toys', a);
server.use('/addcustomer', a);
server.use('/show/electronics_store', a);
server.use('/show/toys_store', a);
server.use('/update/customer_form_el', a);
server.use('/update/customer_form', a);

// Connect_to_MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// EJS
server.use(expressLayouts);
server.set('view engine', 'ejs');

// Express_body_parser
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Express_session
server.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );

// // Passport_middleware
server.use(passport.initialize());
server.use(passport.session());

// Connect_flash
server.use(flash());

// Flash_Global_variables
server.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  
// Routes

server.use('/', require('./routes/login'));
server.use('/', require('./routes/addcustomer'));
server.use('/', require('./routes/showdata'));

// Jquery_configuration

// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;
// var $ = require("jquery")(window);

//Sever_listen

const PORT = process.env.PORT || 1111;

//check
if(process.env.NODE_ENV === 'production'){
  server.use(express.static(path.join(__dirname, 'views')));
  server.use(express.static(path.join(__dirname, 'views/partials')));
}

server.listen(PORT, console.log(`Server started on port ${PORT}`));
