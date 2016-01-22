var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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

  // db.collection('napstrs').remove({});

  // db.collection('napstrs').insert({
  //       name: 'Dana',
  //       username: 'DanaMC18',
  //       profilePic: 'image_url',
  //       aboutMe: 'Looking for a dude to cuddle with',
  //       availability: true,
  //       rating: 5,
  //       geolocation: {lat: '40.7411', lng: '-73.9897'},
  //       napPreferences: ['little spoon'],
  //       evnPreferences: ['dark', 'quiet'],
  //       reviews: [{name: 'Jon', content: 'would nap again'}],
  //       requests: [{name: 'Jon', pending: true, confirmed: false, denied: false, date: '2016-01-21'}]
  //     });

  // db.collection('napstrs').insert({
  //       name: 'Jon',
  //       username: 'JonnyCastle',
  //       profilePic: 'swazey',
  //       aboutMe: 'Looking for a lady...I promise you wont be in the corner',
  //       availability: true,
  //       rating: 5,
  //       geolocation: {lat: '40.7421', lng: '-73.9880'},
  //       napPreferences: ['big spoon'],
  //       envPreferences: ['rain noise', 'night light'],
  //       reviews: [{name: 'Baby', content: 'i had the time of my life'}],
  //       requests: [{name: 'Dana', pending: false, confirmed: true, denied: false, date: '2016-01-20'}]
  // });

  process.on('exit', db.close);
});



//routes
app.get('/', function (req, res){
  res.render('index');
})


app.get('/about', function (req, res){
  res.render('about');
})


app.get('/search', function (req, res){
  db.collection('napstrs').find({}).toArray(function (err, data){
    if (err) {
      console.log(err)
    } else {
      // console.log(data);
      res.render('search', 
        {napstrKey: process.env.NAPSTR_MAP_KEY, users: data});
    }
  })
})


app.post('/search', function (req, res){
  db.collection('napstrs').find({}).toArray(function (err, data){
    console.log(data);
    res.json(data);
  })
})


app.listen(process.env.PORT || 3000);











