var geoPoint = require('../models/geoPoints');
var nearBy = require('../controllers/nearby');
var clientController = require('../controllers/client')
var oauth2Controller = require('../controllers/oauth2')
module.exports = function (app) {
	
	app.post('/post_location', nearBy.saveLocation)
	app.get('/get_using_mongo/:lat/:lon/:radius', nearBy.getNearPointsByMongo)
	app.get('/get_using_self/:lat/:lon/:radius', nearBy.getNearPointsBySelf)
	app.get('/get_total_doc_count', nearBy.getTotalDocCount)

	//endpoint handlers for /clients
	app.post('/save_client',  clientController.postClients)
  	
	//endpoint handlers for oauth2 authorize
	app.get('/oauth2/authorize', oauth2Controller.authorization)
 
  	// endpoint handlers for oauth2 token
    app.post('/oauth2/token', oauth2Controller.token);
}