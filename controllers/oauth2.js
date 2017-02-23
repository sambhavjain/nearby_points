var Client = require('../models/client')
var AuthCode = require('../models/authCode')
var Token = require('../models/token')
var http = require('http')
exports.authorization = function(req, res){
	var redirectUri = req.query.redirect_uri;
	Client.findOne({id: req.query.client_id}, 
		function(err, result){
			if(err)
				throw err;
			else if(result){
				var code = new AuthCode({
			    value: uid(16),
			    clientId: result.id,
			    redirectUri: redirectUri,
			    
			  });
				// http.get(redirectUri + '?code='+code.value)
			  res.json(redirectUri + '?code='+code.value)
			  // Save the auth code and check for errors
			  code.save(function(err,result) {
			    if (err)
			    	throw err;
				console.log('code = '+result)

			  });
			}
			else 
				res.json({message: 'wrong credentials'})
		})
}

exports.token = function(req, res){
	Client.findOne({id: req.query.client_id},
		function(err, result){
			if(err)
				throw err;
			if(result){
				if(req.query.client_secret){
					AuthCode.find({value : req.query.AUTHORIZATION_CODE}, 
						function(err, result){
							if(err)
								throw err;
							else if(result)
							{
								// Create a new access token
						      var token = new Token({
						        value: uid(256),
						        clientId: result.clientId,
						        
						      });
						      //sending response to application with access token
						      res.json({access_token : token.value})

						      // Saved the access token 
						      token.save(function (err) {
						        if (err) 
						        	throw err;
						      });
							}
						})
				}			
			}
		})
}

function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
