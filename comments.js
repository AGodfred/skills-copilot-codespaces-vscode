var express = require('express');
var app = express();

// Set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set up body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set up session
var session = require('express-session');
app.use(session({secret: 'SuperSecretPassword'}));

// Set up mysql
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'student',
  password: 'default',
  database: 'student'
});

// Set up the port number
app.set('port', 3000);

// Set up the public directory
app.use(express.static(__dirname + '/public'));

// Set up the home page
app.get('/', function(req, res) {
  res.render('home');
});

// Set up the comments page
app.get('/comments', function(req, res) {
  var context = {};
  pool.query('SELECT * FROM comments', function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('comments', context);
  });
});

// Set up the insert page
app.get('/insert', function(req, res) {
  pool.query('INSERT INTO comments (`comment`) VALUES (?)', [req.query.comment], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    pool.query('SELECT * FROM comments', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      res.send(JSON.stringify(rows));
    });
  });
});

// Set up the delete page
app.get('/delete', function(req, res) {
  pool.query('DELETE FROM comments WHERE id = ?', [req.query.id], function