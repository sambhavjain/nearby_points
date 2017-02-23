var geoPoint = require('../models/geoPoints');
var nearBy = require('../controllers/nearby');
module.exports = function (app) {
	
	app.post('/post_location', nearBy.saveLocation)
	app.get('/get_using_mongo/:lat/:lon/:radius', nearBy.getNearPointsByMongo)
	app.get('/get_using_self/:lat/:lon/:radius', nearBy.getNearPointsBySelf)
	app.get('/get_total_doc_count', nearBy.getTotalDocCount)
}