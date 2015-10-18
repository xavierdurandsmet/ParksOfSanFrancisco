var map;
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

initialize()

function getData (type, fn) {
	$.ajax({
	    type: "GET",
	    url: "/" + type,
	    dataType: 'json',
	    success: function (arr) {
	    	// console.log(arr)
	    	arr.forEach(fn)
	    }
	});
} 

// helper function : add items to the map
function addToMap (point) {
	// add all points to the map
	var marker = L.marker(point.Geo).addTo(map);
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



