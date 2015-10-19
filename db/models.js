'use strict';
var mongoose = require('mongoose');
var ParkLocation = new mongoose.Schema({
	ParkName: {type: String},
	ParkType: {type: String},
	ParkServiceArea: {type: String},
	PSAManager: {type: String},
	email: {type: String},
	Number: {type: String},
	Zipcode: {type: Number},
	Acreage: {type: Number},
	SupDist: {type: Number},
	ParkID: {type: String},
	Geo: {type: [Number], index: '2d'} 
});

var ParkLocation = mongoose.model('ParkLocation', ParkLocation);

module.exports = ParkLocation;