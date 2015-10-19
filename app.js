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
		var address = arr[i]['Location 1'];
		var location = address.split('\n')[2].replace('(', '').replace(')', '').split(', ');
		var final = location.map(function (str) {
			return Number(str);
		})
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
			Geo: final
		})
	}
}

//parse CSV to JSON array (end_parsed will be emitted once parsing finished)
converter.on("end_parsed", function (jsonArray) {
	// set in db
	setToDB(jsonArray);
});

// get all data
app.get('/allData', function (req, res, next) {
	ParkLocation.find({}).exec()
		.then(function(location) {
			res.json(location);
		});
})

 // test with mini park category
app.get('/:parkType', function (req, res, next) {
	ParkLocation.find({ParkType: req.params.parkType}).exec()
		.then(function(miniParkList) {
			res.json(miniParkList);
		});
})

var port = process.env.PORT || 3000
app.listen(port, function() {
	console.log("The server is listening on port ", port);
})