(function(undefined) {
	var mapID = 'map3d';
	var ottawa = new radius.Coord(45.417,-75.683);
	var range_of_a_cf18 = 3330;
	var cold_lake = new radius.Coord(54.40,-110.267);
	var bagotville = new radius.Coord(48.317,-79.983);
	
	function noop() {}
	function drawRanges() {
		var cold_lake_range = radius.drawCircle('CFB Cold Lake',
												cold_lake,
												range_of_a_cf18 / 2,
												'99ffff00',
												'60ffff00');
		var bagotville_range = radius.drawCircle('CFB Bagotville',
												 bagotville,
												 range_of_a_cf18 / 2,
												 '9900ffff',
												 '6000ffff');
	}

	radius.init('map3d',ottawa,drawRanges,noop);
})();
