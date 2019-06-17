const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/runfindr-web'));

// Handle the environment request
app.get('/env', function(req, res) {
    res.json({ serverUrl: process.env.RUNFINDR_SERVER_URL || 'http://NOT_CONFIGURED' });
});

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/runfindr-web/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
