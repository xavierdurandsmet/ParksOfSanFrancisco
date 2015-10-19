var map;
var currentDataArr = [];
initialize()

// itinerary tracker array for location A and B
var itineraryArr = [];
var trackerOpen = false;
var currentRoute;

// define map
function initialize () {
	map = L.map('map').setView([37.78184397, -122.46809908], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'xavierdurandsmet.cifrt177d0kpclfkrmlu617sj',
	    accessToken: 'pk.eyJ1IjoieGF2aWVyZHVyYW5kc21ldCIsImEiOiJjaWZydDE4aHMwa3Vpb2VrcmUzb3kzbXM3In0.DoEPjbGQyixQv69OX9t63g'
	}).addTo(map);
}

function findNameByLocation (locationArr) {
	var locationToGet = {};
	currentDataArr.forEach(function (location) {
		if (Number(location.Geo[0]) == Number(locationArr[0]) 
			&& Number(location.Geo[1]) == Number(locationArr[1])) {
			locationToGet = location
		}
	})
	return locationToGet;
}

// give itinerary from A to B
function createRoute (arrOfLocations) {
	currentRoute = L.Routing.control({
	  waypoints: [
	    L.latLng(arrOfLocations[0].Geo[0], arrOfLocations[0].Geo[1]),
	    L.latLng(arrOfLocations[1].Geo[0], arrOfLocations[1].Geo[1])
	  ]
	}).addTo(map);
}

// tracks both locations of an itinerary
function trackLocations () {
	var pointSelected = [this._latlng.lat, this._latlng.lng]
	if (trackerOpen && itineraryArr.length < 2) {
		var location = findNameByLocation(pointSelected)
		itineraryArr.push(location)
	}
	// display names of parks A and B on front-end
	if (itineraryArr[0]) $( '#pointA' ).html(itineraryArr[0].ParkName)
	if (itineraryArr[1]) $( '#pointB' ).html(itineraryArr[1].ParkName)
	if (itineraryArr.length === 2) {
		// build the route on the interface
		createRoute(itineraryArr)
	}
}

function getData (type, fn) {
	$.ajax({
	    type: "GET",
	    url: "/" + type,
	    dataType: 'json',
	    success: function (arr) {
	    	// reinitinialize tracker arr and push values to it
			currentDataArr = []
	    	arr.forEach(fn)
	    }
	});
} 

// helper function : add items to the map
function addToMap (point) {
	currentDataArr.push(point)
	// add points to the map
	var marker = L.marker(point.Geo).addTo(map);
	// add popup on each marker
	marker.bindPopup(point.ParkName)
	// add click event for itinerary
	marker.on('click', trackLocations)
}

// on clicking button 'getAll', fetch data from API, and add to map
$( "#getAll" ).click(function() {
  getData('allData', addToMap)
});

// fetch data for one parktype from API, and add to map
$( ".type" ).on('click', function() {
  // clear map
  map.remove();
  initialize();
  // fetch data
  getData($(this).attr('id'), addToMap)
});

// clear the map
$( "#remove" ).on('click', function() {
	map.remove();
    initialize();
});

// open tracker to start tracking or itinerary
$( "#itinerary" ).on('click', function() {
	trackerOpen = true;
	$( '.trip, #clearItinerary' ).css({ 'display' : 'block'});
	// $( '#clearItinerary' ).css({ 'display' : 'block'});
});

// clear the itinerary
$( "#clearItinerary" ).on('click', function() {
	$( '.trip, #clearItinerary' ).css({ 'display' : 'none'});
	// $( '#clearItinerary' ).css({ 'display' : 'none'});
	itineraryArr = [];
	map.removeControl(currentRoute);
});