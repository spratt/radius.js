var radius = (function(radius, undefined) {
	radius.init = function radius_init() {
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"),
									  mapOptions);
	}

	return radius;
})(radius || {});
google.maps.event.addDomListener(window, 'load', radius.init);