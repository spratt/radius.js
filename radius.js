var radius = (function(radius, undefined) {
	var map;

	radius.range_of_a_cf18 = 3330000;
	radius.ottawa = new google.maps.LatLng(45.417,-75.683);
	radius.cold_lake = new google.maps.LatLng(54.45,-110.167);
	radius.bagotville = new google.maps.LatLng(48.317,-79.983);
	
	radius.init = function radius_init() {
		var mapOptions = {
			center: radius.ottawa,
			zoom: 3,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map-canvas"),
								  mapOptions);
	}

	radius.drawCircle = function radius_drawCircle(centre, rad, border, fill) {
		var circleOptions = {
			strokeColor: border,
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: fill,
			fillOpacity: 0.35,
			map: map,
			center: centre,
			radius: rad
		};
		return new google.maps.Circle(circleOptions);
	};

	return radius;
})(radius || {});
google.maps.event.addDomListener(window, 'load', radius.init);
google.maps.event.addDomListener(window, 'load', function() {
	var cold_lake_range = radius.drawCircle(radius.cold_lake,
											radius.range_of_a_cf18,
											'#ff0000',
											'#ff0000');
	var cold_lake_range = radius.drawCircle(radius.cold_lake,
											radius.range_of_a_cf18/2,
											'#ff0000',
											'#ff0000');
	var bagotville_range = radius.drawCircle(radius.bagotville,
											 radius.range_of_a_cf18,
											 '#0000ff',
											 '#0000ff');
	var bagotville_range = radius.drawCircle(radius.bagotville,
											 radius.range_of_a_cf18/2,
											 '#0000ff',
											 '#0000ff');
});
