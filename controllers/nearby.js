var geoPoint = require('../models/geoPoints')

exports.saveLocation = function(req, res){

	var gPoint = new geoPoint();
	var body = req.body;
	console.log(body)
	gPoint.name = req.body.name;
	gPoint.lat = req.body.lat;
	gPoint.lon = req.body.lon;
	gPoint.loc = [req.body.lon, req.body.lat];
	gPoint.save(function(err, done){
		if(err)
			throw err;
		res.send({point : gPoint, msg: 'successfully saved'})
	})
};

exports.getNearPointsByMongo = function(req, res){
	
	var lat = req.params.lat;
	var lon = req.params.lon;
	var radius = req.params.radius;
	geoPoint.find({
		loc: {
              $near: [lon, lat],
              $maxDistance: radius/111.2          //111.2 is earth radius in radians
            }
          
	}, function(err, result){
		if(err)
			throw err;
		res.json({total : result.length, docs : result})
	})
}

exports.getNearPointsBySelf = function(req, res){

	var lat = req.params.lat;
	var lon = req.params.lon;
	var radius = req.params.radius;
	var resultant = [];
	var count = 0;
	geoPoint.find(function(err, result){
		if(err)
			throw err;
		else if (result.length > 0){
			for(var i=0; i<result.length; i++){
				var d = greatCircleDistance(result[i].lat, lat, result[i].lon, lon);
				if(d <= radius){
					resultant.push(result[i])
					count++;
				}
			}
			if(i == result.length)
				res.json({count: count, result: resultant})
		}
	})
	
}

exports.getTotalDocCount = function(req, res){
	geoPoint.count(function(err, result){
		if(err)
			throw err;
		res.json({count : result})
	})
}

var greatCircleDistance = function(lat1, lat2, lon1, lon2){
    var R = 6371; // Km
    var φ1 = lat1*Math.PI/180;
    var φ2 = lat2*Math.PI/180;
    var Δφ = (lat2-lat1)*Math.PI/180;
    var Δλ = (lon2-lon1)*Math.PI/180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = (R * c);
   // debugger;
    return Math.ceil(d);
    
}