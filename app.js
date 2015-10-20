var express = require("express");
var app = express();
var fs = require("fs");
var Converter = require("csvtojson").Converter;
// var polyline = require("polyline");
var path = require("path");
// connect to models in db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lovely');
var ParkLocation = require('./db/models.js')
//Converter Class 
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));

app.get('/', function(req, res, next){
	var index = path.join(__dirname, 'index.html');
	res.sendFile(index);
})

//read from file 
fs.createReadStream("./park.csv").pipe(converter);

// helper function : push all elements of a JSON to the DB
function setToDB (arr) {
	for (var i = 0; i < arr.length; i++) {
		// modifiy data format for the following properties
		var address = arr[i]['Location 1'];
		var location = address.split('\n')[2].replace('(', '').replace(')', '').split(', ');
		var geoLocation = location.map(function (str) {
			return Number(str);
		})
		// create in db
		ParkLocation.create({
			ParkName: arr[i].ParkName,
			ParkType: arr[i].ParkType,
			ParkServiceArea: arr[i].ParkServiceArea,
			email: arr[i].email,
			Number: arr[i].Number,
			Zipcode: arr[i].Zipcode,
			Acreage: arr[i].Acreage,
			SupDist: arr[i].SupDist,
			ParkID: arr[i].parkID,
			Geo: geoLocation
		})
	}
}

// parse CSV to JSON array (end_parsed will be emitted once parsing finished)
converter.on("end_parsed", function (jsonArray) {
	ParkLocation.find({})
		.then(function(parklocation) {
			// check if the data has been seeded already
        	if (parklocation.length === 0) {
            // set in db
			return setToDB(jsonArray);
        } else {
            console.log('data already seeded!')
        }
	});
});

// get all data
app.get('/allData', function (req, res, next) {
	ParkLocation.find({}).exec()
		.then(function(location) {
			res.json(location);
		})
		.then(null, next);
})

 // get data by park type
app.get('/:parkType', function (req, res, next) {
	ParkLocation.find({ParkType: req.params.parkType}).exec()
		.then(function(miniParkList) {
			res.json(miniParkList);
		})
		.then(null, next);
})

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});	

var port = process.env.PORT || 3000
app.listen(port, function() {
	console.log("The server is listening on port ", port);
})