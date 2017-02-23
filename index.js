var express  = require('express');
var path     = require('path');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var http     = require('http')
// var fs       = require('fs')
// var passport = require('passport')
// var morgan       = require('morgan');
var bodyParser   = require('body-parser');

// var helmet = require('helmet');
// app.use(helmet());

// mongoose.connect('mongodb://localhost:27017/nearbyDb');
// Configuration
//app.set('view engine', 'html');
var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
// app.use(session({
//     store: new MongoStore({
//       url: 'mongodb://localhost:27017/mendnew',
//       ttl: 1 * 24 * 60 * 60 // = 1 day. Default
//     })
// }));
//var authenticate = require('./routes/authenticate')(passport);
//app.use('/auth', authenticate);
// require('./config/passport')(passport); // pass passport for configuration

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  next();
 });
app.use(express.static(path.join(__dirname, 'public')));

// app.use(passport.initialize());
// app.use(passport.session());          // persistent login sessions
// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var initPassport = require('./passport-init');
// initPassport(passport);
 // app.get('/*', function(req, res) {
 //        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 //    });
require('./routes/routes.js')(app);


app.listen(8000, function () {
  console.log('Nearby app listening on port 8000!')
})

