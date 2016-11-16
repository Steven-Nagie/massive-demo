var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var db = massive.connectSync({
  connectionString : 'postgres://postgres:bbNLtrc99@localhost/massive_demo'
});

var app = express();
app.use(bodyParser.json());
app.set('db', db);
console.log(db.get_all_injuries);

var port = 3000;

app.get('/incidents', function(req, res) {
  var cause = req.query.cause;
  console.log(cause);

  if(cause) {
    db.get_incidents_by_cause([cause], function(err, incidents){
      if (err) {
        res.status(500).send(err);
      }
      res.json(incidents);
    });
  } else {
    db.get_all_incidents(function(err, incidents){
      if (err) {
        res.status(500).send(err);
      }
      res.json(incidents);
    });
  }
});

app.post('/incidents', function(req, res) {
  console.log(req.body);
  db.post_incidents([req.body.us_state, req.body.injury_id, req.body.cause_id], function(err, incidents) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(incidents);
    }
  });
  console.log('POST /incidents');
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
