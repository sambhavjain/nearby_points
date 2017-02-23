var Client = require('../models/client');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.id = client.generateHash(req.body.id);
  client.secret = client.generateHash(req.body.secret);
  client.redirectUrl = req.body.redirectUrl;
  // Save the client and check for errors
  client.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Client added', data: client });
  });
};