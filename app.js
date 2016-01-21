var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//db
var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/napstr';

MongoClient.connect(mongoUrl, function (err, database){
  if (err) {throw err;}
  db = database;
  process.on('exit', db.close);
});

//routes
app.get('/', function (req, res){
  res.render('index');
})

app.get('/about', function (req, res){
  res.render('about');
})

app.listen(process.env.PORT || 3000);