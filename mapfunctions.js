var map;
var event = new Event('mapInit');


      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.842601, lng: -88.133198},
		  mapTypeControl: true,
		  mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.TOP_RIGHT
		  },
          zoom: 10,
		  zoomControl: true,
		  streetViewControl: true,
		  scaleControl: true
        });
        /*infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');*/
        // Dispatch the event.
		dispatchEvent(event);
      }
      function getUserLocation(callback){
        // Try HTML5 geolocation.
		console.log("In getUserLocation");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            callback(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        /*infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');*/
      }
      function drawPolyLine(coordinates,color){
		  console.log(coordinates);
		  var path = new google.maps.Polyline({
			path: coordinates,
			geodesic: true,
			strokeColor: color,
			strokeOpacity: 1.0,
			strokeWeight: 2
		  });
		  path.setMap(map);
		  console.log("Done drawing");
	  }
	  function addMarker(coords,label){
		  var marker = new google.maps.Marker({
			position: coords,
			map: map,
			label: label
		 });
	  }
	  function geocodeAddress(geocoder, resultsMap, successCallback, failureCallback) {
		  console.log("In geocodeAddress");
		  var address = document.getElementById('address').value;
		  geocoder.geocode({'address': address}, function(results, status) {
			  console.log(results);
			if (status === google.maps.GeocoderStatus.OK) {
			  resultsMap.setCenter(results[0].geometry.location);
			  var marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location,
				animation: google.maps.Animation.DROP
			  });
			} else {
			  //alert('Geocode was not successful for the following reason: ' + status);
			}
		  });
		}
	function showLocation(location){
		map.setCenter(location);
		var marker = new google.maps.Marker({
				map: map,
				position: location,
				animation: google.maps.Animation.DROP
		});
	}
	function getAddresses(address,geocoder, successCallback, failureCallback){
		console.log("geocoder "+geocoder);
		geocoder.geocode({'address': address}, function(results, status) {
			  console.log(results);
			if (status === google.maps.GeocoderStatus.OK) {
				if(successCallback){successCallback(results);}
			} else {
			  //alert('Geocode was not successful for the following reason: ' + status);
			  if(failureCallback){failureCallback(results,status);}
			}
		  });
	}