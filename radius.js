var radius = (function(radius, undefined) {
	radius.init = function radius_init() {
		var mapOptions = {
			center: new google.maps.LatLng(45.417,-75.683),
			zoom: 4,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"),
									  mapOptions);
	}

	radius.drawCircle = function radius_drawCircle(centre, radius) {
		
	};

	return radius;
})(radius || {});
google.maps.event.addDomListener(window, 'load', radius.init);
