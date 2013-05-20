google.maps.event.addDomListener(window, 'load', function() {
	var ottawa = new google.maps.LatLng(45.417,-75.683);
	radius.init('map3d',ottawa);
});
google.maps.event.addDomListener(window, 'load', function() {
	var range_of_a_cf18 = 3330000;
	var cold_lake = new google.maps.LatLng(54.40,-110.267);
	var bagotville = new google.maps.LatLng(48.317,-79.983);
	var cold_lake_range = radius.drawCircle(cold_lake,
											range_of_a_cf18/2,
											'#ff0000',
											'#ff0000');
	var bagotville_range = radius.drawCircle(bagotville,
											 range_of_a_cf18/2,
											 '#0000ff',
											 '#0000ff');
});
