google.load("earth", "1.x");

var radius = (function(radius, undefined) {
	var ge;
	var range = 20000000.0;

	var pi = Math.PI;
	var pi2 = Math.PI * 2;

	var rEarth = 6371.01 // Earth's average radius in km
	var epsilon = 0.000001 // threshold for floating-point equality
	
	radius.Coord = function(lat, lng) {
		this.lat = lat;
		this.lng = lng;
		this.toString = function() {
			return '(' + this.lat + ',' + this.lng + ')';
		};
	};

	function deg2rad(angle) {
		return angle * pi / 180;
	}

	function rad2deg(angle) {
		return angle * 180 / pi;
	}

	
	// this code taken from
	// http://stackoverflow.com/questions/877524/calculating-coordinates-given-a-bearing-and-a-distance
	function getRadialDistance(coord, bearing, distance) {
		/*
		  Return final coordinates (lat2,lon2) [in degrees] given initial
		  coordinates (lat1,lon1) [in degrees] and a bearing [in radians]
		  and distance [in km]
		*/
		console.log('grd: ' + coord);
		var rlat1 = deg2rad(coord.lat);
		var rlon1 = deg2rad(coord.lng);

		console.log('rlat1: ' + rlat1);
		console.log('rlon1: ' + rlon1);

		// normalize linear distance to radian angle
		var rdistance = distance / rEarth;

		console.log('rdistance: ' + rdistance);

		var rlat = Math.asin( Math.sin(rlat1) * Math.cos(rdistance) +
							  Math.cos(rlat1) * Math.sin(rdistance) *
							  Math.cos(bearing) );

		// check if endpoint is a pole
		if(Math.cos(rlat) == 0 || Math.abs(Math.cos(rlat)) < epsilon)
    		var rlon = rlon1;
		else
    		var rlon = ( (rlon1 - Math.asin( Math.sin(bearing) *
											 Math.sin(rdistance) /
											 Math.cos(rlat) ) + pi ) %
						 pi2 ) - pi;
		
		var lat = rad2deg(rlat);
		var lng = rad2deg(rlon);
		return new radius.Coord(lat, lng);
	}
	
	radius.init = function radius_init(id,centre,success,error) {
		google.earth.createInstance(id,function radius_success(instance) {
			ge = instance;
			ge.getWindow().setVisibility(true);
			ge.getOptions().setFadeInOutEnabled(false);

			ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
			
			var lookAt = ge.createLookAt('');
			lookAt.setLatitude(centre.lat);
			lookAt.setLongitude(centre.lng);
			lookAt.setRange(range);
			ge.getView().setAbstractView(lookAt);

			success(instance);
		}, error);
	};

	function makeCircle(centre, rad) {
		var ring = ge.createLinearRing('');
		var steps = 25;
		for (var i = 0; i < steps; i++) {
			var coord = getRadialDistance(centre, i / steps * pi2, rad);
			console.log('coord: ' + coord);
			ring.getCoordinates().pushLatLngAlt(coord.lat, coord.lng, 0);
		}
		return ring;
	}

	radius.drawCircle = function radius_drawCircle(name, centre, rad, border, fill) {
		// label the centre of the circle
		var centreMark = ge.createPlacemark('');
		centreMark.setName(name);
		var point = ge.createPoint('');
		point.setLatitude(centre.lat);
		point.setLongitude(centre.lng);
		centreMark.setGeometry(point);
		ge.getFeatures().appendChild(centreMark);

		var polygonPlacemark = ge.createPlacemark('');
		
		// style the border
		polygonPlacemark.setStyleSelector(ge.createStyle(''));
		var polyStyle = polygonPlacemark.getStyleSelector().getPolyStyle();
		polyStyle.getColor().set(fill);
		var lineStyle = polygonPlacemark.getStyleSelector().getLineStyle();
		lineStyle.setWidth(2);
		lineStyle.getColor().set(border);

		// draw the circle
		polygonPlacemark.setGeometry(ge.createPolygon(''));
		polygonPlacemark.getGeometry().setOuterBoundary(makeCircle(centre, rad));
		ge.getFeatures().appendChild(polygonPlacemark);
	};

	return radius;
})(radius || {});
