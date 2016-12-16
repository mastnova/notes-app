const express = require('express');
var bodyParser = require('body-parser');
var Firebase = require('firebase');

var firebaseRef = new Firebase('https://notes-82906.firebaseio.com/notes');

const app = express();
const PORT = 8080;

app.use( express.static( __dirname + '/app') );
app.use( bodyParser.json({strict: false}) );

var notes = [];

app.get('/api/notes', function (req, res) {
  notes = [];
  firebaseRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      const note = {
        fb_id: childSnapshot.key(),
        timestamp: childSnapshot.val().note.timestamp,
        title: childSnapshot.val().note.title,
        description: childSnapshot.val().note.description
      };
      notes.push(note);
    });
    res.status(200);
    res.send(notes);
    res.end();
  });
});

app.post('/api/auth', function (req, res) {
  //should check user and generate token
  const token = 'bad18eba1ff45jk7858b8ae88a77fa30';
  res.status(200);
  res.send({token});
  res.end();
});

app.post('/api/add_note', function (req, res) {
  const note = {
    timestamp: req.body.timestamp,
    title: req.body.title,
    description: req.body.description
  }
  firebaseRef.push({note});
  res.status(200);
  res.end();
});

app.delete('/api/remove_note', function (req, res) {
  var note = notes.find( note => note.timestamp === req.body.timestamp);
  var firebaseRef = new Firebase('https://notes-82906.firebaseio.com/notes/'+note.fb_id);
  firebaseRef.remove();
  res.status(200);
  res.end();
});

app.get('*', function (req, res) {
  res.sendFile(__dirname +'/app/index.html')
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
