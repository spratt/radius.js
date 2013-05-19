var radius = (function(radius, undefined) {
	var map;

	radius.init = function radius_init(centre) {
		var mapOptions = {
			center: centre,
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
			fillOpacity: 0.15,
			map: map,
			center: centre,
			radius: rad
		};
		return new google.maps.Circle(circleOptions);
	};

	return radius;
})(radius || {});
