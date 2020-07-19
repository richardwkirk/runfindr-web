const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/runfindr-web'));

// Handle the environment request
app.get('/env', function(req, res) {
    res.json({ 
      environmentUrl: null,
      serverUrl: process.env.RUNFINDR_SERVER_URL || 'http://SERVER_URL_NOT_CONFIGURED',
      googleApiKey: process.env.GOOGLE_API_KEY || 'API_KEY_NOT_CONFIGURED',
      auth0Domain: process.env.AUTH0_DOMAIN || 'AUTH0_NOT_CONFIGURED',
      auth0ClientId: process.env.AUTH0_CLIENTID || 'AUTH0_NOT_CONFIGURED',
    });
});

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/runfindr-web/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
