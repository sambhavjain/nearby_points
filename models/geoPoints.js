var mongoose = require('mongoose')

var geoPointSchema = mongoose.Schema({
	name : String,
	lat : Number,
	lon : Number,
	loc: {
    type: Array,  		// [<longitude>, <latitude>]
    required: true,
    index: '2d'      	// create the geospatial index
    }
})

module.exports = mongoose.model('geoPoints', geoPointSchema);