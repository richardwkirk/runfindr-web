const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/api/user/:user_id', function(req, res) {
  console.log(`Querying for user: ${req.params.user_id}`);

  const aws = require('aws-sdk');
  aws.config.update({region: 'eu-west-1'});
  const docClient = new aws.DynamoDB.DocumentClient();
  const params = {
    TableName: 'runfindr-dev',
    Key: {
      'type': 'user',
      'uid': req.params.user_id
    }
  };
  
  docClient.get(params, function(err, data) {
    if (err) {
      console.log("Failed to load from dynamo db:", err);
      res.status(500).json(err);
    } else {
      res.json(data.Item);
    }
  });

});

app.post('/api/user', function(req, res) {
  console.log(req.body);
  console.log('Sorry, not implemented the user post request yet!');
  res.status(501).json('User post not implemented.');
});

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/runfindr-web/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5010);
