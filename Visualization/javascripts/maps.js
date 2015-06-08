	var timeout;
	var markers = [];
	var name = "";
	var focused = null;
	var center = new google.maps.LatLng(0, -75);
	
	/***************************/
	/*********** Map ***********/
	/***************************/
	var mapOptions = {
		zoom: 3,
		center: center,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	var map = new google.maps.Map(cvsmaps, mapOptions);
	
	/***************************/
	/********** Marker *********/
	/***************************/

function addMarker(lat, lon, nam, snd, loc, gen, sp, typ){
	var pos = new google.maps.LatLng(lat, lon);
	
	var marker = new google.maps.Marker({
		position: pos,
		map: map,
		title: 'Hello World!'
	});
	var infowindow = new google.maps.InfoWindow({
		content: '<h1>' + nam + '</h1><p>- ' + loc + '</p><p>Listen the ' + typ
		+ ' sound of it here.<br><audio controls autobuffer autoplay id="aud"><source src="' + snd + '"></audio>'
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
		focused = marker;
	});
	
	markers.push(marker);
}	

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		if(markers[i] == focused) continue;
		markers[i].setMap(null);
	}
}
	
	/***************************/
	/*********** Update ***********/
	/***************************/
	google.maps.event.addListener(map, 'center_changed', function() {
		clearTimeout(timeout);
		timeout = setTimeout(update, 1000);
	});

	function update() {
		var data;
		
		var bd = map.getBounds();
		var ne = bd.getNorthEast();
		var sw = bd.getSouthWest();
		var nelat = ne.lat();
		var nelon = ne.lng();
		var swlat = sw.lat();
		var swlon = sw.lng();
		var box = "%20box:" + swlat + "," + swlon + "," + nelat + "," + nelon;
		
		d3.json("http://www.xeno-canto.org/api/2/recordings?query=" + name + "%20area:america%20q:A" + box, function(json, error) {
			if (error) return console.warn(error);
			data = json;
			console.log(data);
			clearMarkers();
			
			var recs = data.recordings;
			for(var i = 0; i < recs.length; i++){
				var rec = recs[i];
				addMarker(rec.lat, rec.lng, rec.en, rec.file, rec.loc, rec.gen, rec.sp, rec.type);
			}
			
		});
		
		
	}