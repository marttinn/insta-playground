// Get packages
var express = require('express');
var path = require('path');
var app = express();

//for console logging
var morgan = require('morgan');
//get local config
var config = require('./config');
//instagram
var ig = require('instagram-node').instagram();

//config of ports
var port = process.env.PORT || 8080;
// later db
// mongoose.connect(config.database);
// app.set('superSecret', config.secret);
// ig.use({ access_token: '3037303639.1677ed0.c1397141d02c44ee8fbf63e19bf32588'});
ig.use({
  access_token: '3037303639.1677ed0.c1397141d02c44ee8fbf63e19bf32588',
  client_id: '30876deaf0354a749cb5cb5647ab194c',
  client_secret: '4928950871db4974b27a4e753a3e29e4'
 });

// for public assets
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

//config routes
app.get('/', function(req, res){
  // ig.media_popular(function(err, medias, remaining, limit) {});
  res.json({ message: 'welcome to insta cheat'});
});

//config routes
app.get('/user/:user_id', function(req, res){

    //do while pagination next ya las muestro
    ig.user_follows(req.params.user_id, function(err, users, pagination, remaining, limit) {

      if (err) res.render('error', {body: err.body});

      if(pagination.next){
        res.json({ still: remaining, of: limit, pagination: pagination, yey: users, count: users.length });
      }

    });
});


app.listen(port);
console.log('Express server running on: ' + port);
