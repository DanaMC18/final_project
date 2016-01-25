var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo')(session);

//MIDDLEWARE CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

//DB
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
  //       email: 'DanaCzinsky@gmail.com',
  //       password_digest: '$2a$08$QlbmpKgTCLWiqnNWAoN7nen0FJT.YBF..vlH0n4vO3sVh1AzhtMNG',
  //       profilePic: 'http://i.imgur.com/hLdC6sb.jpg',
  //       aboutMe: 'Looking for a dude to cuddle with',
  //       availability: true,
  //       rating: 3,
  //       location: {type: 'Point', coordinates: [40.7411, -73.9897]},
  //       napPreferences: ['little spoon'],
  //       envPreferences: ['dark', 'quiet'],
  //       reviews: [{name: 'Jon', content: 'would nap again'}],
  //       requests: [{name: 'Jon', pending: true, confirmed: false, denied: false, date: '2016-01-21'}]
  //     });

  // db.collection('napstrs').insert({
  //       name: 'Jon',
  //       username: 'JonnyCastle',
  //       password_digest: '$2a$08$QlbmpKgTCLWiqnNWAoN7nen0FJT.YBF..vlH0n4vO3sVh1AzhtMNG',
  //       profilePic: 'https://redlightnaps.files.wordpress.com/2007/05/dd20_img_13.jpg',
  //       aboutMe: 'I\'d never put you in the corner',
  //       availability: true,
  //       rating: 3,
  //       location: {type: 'Point', coordinates: [40.7421, -73.9880]},
  //       napPreferences: ['big spoon'],
  //       envPreferences: ['rain noise', 'night light'],
  //       reviews: [{name: 'Baby', content: 'i had the time of my life'}],
  //       requests: [{name: 'Dana', pending: false, confirmed: true, denied: false, date: '2016-01-20'}]
  // });

  process.on('exit', db.close);
});

//SESSION & AUTHENTICATE SET UP
app.use(session({
  secret: 'whispers',
  store: new MongoStore({url: mongoUrl})
}))

var authenticateUser = function(username, password, callback) {
  db.collection('napstrs').findOne({username: username}, function (err, data){
    if (err) {throw err;}
    bcrypt.compare(password, data.password_digest, function(err, passwordsMatch) {
      if (passwordsMatch) {
        callback(data);
      } else {
        callback(false);
      }
    })
  })
}


//ROUTES


//index, check if user is logged in and send username to index.ejs
app.get('/', function (req, res){
  var userId = req.session.userId || false;
  res.render('index', {userId: userId});
})


//login existing user
app.post('/login', function (req, res){
  authenticateUser(req.body.username, req.body.password, function (user){
    if (user) {
      req.session.username = user.username;
      req.session.userId = user._id;
      res.redirect('/search');
    } else {
      res.redirect('/');
    }
  })
})


//logout
app.get('/logout', function (req, res){
  req.session.username = null;
  req.session.userId = null;
  res.redirect('/');
})


//sign up
app.post('/user', function (req, res) {
  if (req.body.password === req.body.password_confirm) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, 8);
    
    db.collection('napstrs').insert({
      name: name, 
      username: username, 
      email: email, 
      password_digest: password
    }, function (err, data) {
      // console.log(data); 
    });
    //log in new user and redirect them to their profile page
    authenticateUser(username, req.body.password, function (user) {
      if (user) {
        req.session.username = user.username;
        req.session.userId = user._id;
        res.redirect('/profiles/' + req.session.userId);
      }
    })
  }
})


// user profile
app.get('/profiles/:id', function (req, res){
  var username = req.session.username || false;
  var userId = req.session.userId || false;
  db.collection('napstrs').findOne({_id: ObjectId(req.params.id)}, function (err, data){
    res.render('profile', {username: username, userId: userId, user: data});
  })
})


// edit user profile
app.patch('/profiles/:id', function (req, res){
  db.collection('napstrs').update({_id: ObjectId(req.params.id)},
    {$set: {
            name: req.body.name, 
            username: req.body.username,
            email: req.body.email,
            profilePic: req.body.profilePic,
            aboutMe: req.body.aboutMe,
            napPreferences: req.body.napPref,
            envPreferences: req.body.envPref}},
    function (err, data) {
      res.redirect('/profiles/' + req.params.id)  
    })
})


//delete user
app.delete('/profiles/:id', function (req, res){
  db.collection('napstrs').remove({_id: ObjectId(req.params.id)}, function (err, data){
    req.session.username = null;
    req.session.userId = null;
    res.redirect('/');
  })
})


//about page
app.get('/about', function (req, res){
  var username = req.session.username || false;
  res.render('about', {username: username});
})


//search page: render map and list of users next to map
app.get('/search', function (req, res){
  var username = req.session.username || false;
  var userId = req.session.userId || false;
  res.render('search', {napstrKey: process.env.NAPSTR_MAP_KEY, username: username, userId: userId});
})


//renders users ON map, sets users's location
app.post('/search', function (req, res){
  var userId = req.session.userId || false;
  var lat = parseFloat(req.body.lat);
  var lng = parseFloat(req.body.lng);
  userLocation = {type: 'Point', coordinates: [lat, lng]};

  //update users's location based on browser geolocation as defined above
  db.collection('napstrs').update(
    {_id: ObjectId(userId)},
    {$set: {location: userLocation}},
    function (err, data) {
      // find all users and send them back to ajax call in main.js to plot on map
      db.collection('napstrs').find({}).toArray(function (err, data){
        res.json(data);
      }) // end of finding all napstrs
  }) // end of update
})


//sort all napstrs based on user's geolocation
app.get('/users', function (req, res){
  var userId = req.session.userId || false;
 
  if (!userId) {
    res.redirect('/'); // only logged in users can see search page
  } else {
    //find logged in user
    db.collection('napstrs').findOne({_id: ObjectId(userId)},
      function (err, data){
        var lat = parseFloat(data.location.coordinates[0]);
        var lng = parseFloat(data.location.coordinates[1]);
        var userLocation = [lat, lng];
       
        // sort napstrs based on logged in user's geolocation as defined above and
        // send them back sorted to $http in fetch() in UsersController
        db.collection('napstrs').find({
          location: 
          { $near: 
            {
              $geometry: {type: 'Point', coordinates: userLocation},
              $minDistance: 0,
              // $maxDistance: 16093
              $maxDistance: 100000
            }
          }
        }).toArray(function (err, data){
          if (err) {
            console.log(err)
          } else {
            res.json(data);
          }
        }) // end: sorting all napstrs
      }) // end: finding logged-in napstr
  } // end: first if/else
})


app.post('/requests/:id/create', function (req, res){
  var username = req.session.username || false;
  var newRequest = {
    name: username, 
    pending: true,
    confirmed: false,
    denied: false};

  db.collection('napstrs').update({_id: ObjectId(req.params.id)},
    {$addToSet: {requests: newRequest}}, 
    function (err, data){
      res.end();
  })
})



app.listen(process.env.PORT || 3000);











