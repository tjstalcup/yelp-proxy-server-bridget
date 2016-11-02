var express = require('express');
var app = express();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '2U_kt6835XE97-emSYXJJw',
  consumer_secret: 'BwXZT63zoEllOWAnhInNVMrJXPw',
  token: 'zpwNq2qmjpl4bEOOHhYNc_bHpgiU5Itv',
  token_secret: '_5T-EJA8Bl4WUC_0-3H8eNayUW0',
});

app.get('/api/search/:radius/:location', function(req,res){
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/javascript; charset=UTF-8',
    'Cache-Control': 'public, max-age=28800'
  });
  yelp.search({ term: "lunch", location: req.params.location, limit: 10, sort: 1, radius_filter: req.params.radius })
  .then(function (data) {
    res.send(data);
  })
  .catch(function (err) {
    res.send(err);
  });
});

app.get('/api/business/:business', function(req,res){
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/javascript; charset=UTF-8',
    'Cache-Control': 'public, max-age=28800'
  });
  yelp.business(req.params.business)
  .then(function (data) {
    res.send(data);
  })
  .catch(function (err) {
    res.send(err);
  });
});

app.listen(process.env.PORT || 8080, function(){
  console.log('listening on http://localhost:8080');
});




// See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({ term: 'food', location: 'Montreal' })
// .then(function (data) {
//   console.log(data);
// })
// .catch(function (err) {
//   console.error(err);
// });

// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business('yelp-san-francisco')
//   .then(console.log)
//   .catch(console.error);

// yelp.phoneSearch({ phone: '+15555555555' })
//   .then(console.log)
//   .catch(console.error);

// // A callback based API is also available:
// yelp.business('yelp-san-francisco', function(err, data) {
//   if (err) return console.log(error);
//   console.log(data);
// });