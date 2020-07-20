const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

function corsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);

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

app.put('/api/user/:user_id', function(req, res) {
  if (!req.body) {
    console.error('Misisng body from user profile write request.');
  }

  console.log(`Writing user profile: ${req.body.user_id}`);

  const aws = require('aws-sdk');
  aws.config.update({region: 'eu-west-1'});
  const docClient = new aws.DynamoDB.DocumentClient();
  const params = {
    TableName: 'runfindr-dev',
    Item: req.body
  };
  
  docClient.put(params, function(err, data) {
    if (err) {
      console.log("Failed to write to dynamo db:", err);
      res.status(500).json(err);
    } else {
      res.json(data.Item);
    }
  });

});

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/runfindr-web/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5010);
