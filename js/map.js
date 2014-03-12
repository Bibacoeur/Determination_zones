// JavaScript Document
google.maps.event.addDomListener(window, 'load', initialize);
	
function initialize() {
	
	//On crée un objet comportant la position du joueur	
	var  joueur_position = {};
	
	//le style de la carte
	var myStyles =[
    	{
        	featureType: "poi",
        	elementType: "labels",
        	stylers: [
       					{ visibility: "off" }
       				 ]
    	}
	];

	
	function loadmap(position) {
		
		
	
		var mapOptions = {
    	zoom: 18,
    	center: new google.maps.LatLng(position.currentlat, position.currentlong),
		styles : myStyles,
		streetViewControl: false
  		};
	
	 	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	 
	 	var position_options = {
	  		strokeColor: '#FF0000',
      		strokeOpacity: 0.8,
      		strokeWeight: 2,
      		fillColor: '#FF0000',
      		fillOpacity: 0.35,
      		map: map,
      		center: mapOptions.center,
      		radius: 35,
   	 	};
	
  		var ZoneCoords = [
    		new google.maps.LatLng(45.783499406850495,4.870751805279497),
			new google.maps.LatLng(45.78383610511515,4.8722484599105655),
			new google.maps.LatLng(45.783013085753154,4.872623932926899),
			new google.maps.LatLng(45.78269129148316,4.871159420623826)
  		];
  
  		

  		// On construit les zones
  		var GI = new google.maps.Polygon({
    		path : ZoneCoords,
    		strokeColor: '#00FFFF',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#00FFFF',
    		fillOpacity: 0.35,
			editable : true,
			draggable: true,
  		});
  
   		var BMC = new google.maps.Polygon({
    		path : ZoneCoords,
    		strokeColor: '#FF0000',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#FF0000',
    		fillOpacity: 0.7,
			editable : true,
			draggable: true,
  		});

		var GMD = new google.maps.Polygon({
    		path : ZoneCoords,
    		strokeColor: '#00FFFF',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#00FFFF',
    		fillOpacity: 0.35,
			editable : true,
			draggable: true,
  		});


  		GI.setMap(map);
  		BMC.setMap(map);
		GMD.setMap(map);
		
  
  		google.maps.event.addListener(GI, 'click', showArrays);
		google.maps.event.addListener(GMD, 'click', showArrays);
		google.maps.event.addListener(BMC, 'click', showArrays);
  		infoWindow = new google.maps.InfoWindow();
		
		function showArrays(event) {

  			// Since this polygon has only one path, we can call getPath()
  			// to return the MVCArray of LatLngs.
  			var vertices = this.getPath();

  			var contentString = '<b>Zone polygon</b><br>' +'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +'<br>';

  			// Iterate over the vertices.
  			for (var i =0; i < vertices.getLength(); i++) {
    				var xy = vertices.getAt(i);
    				contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
        			xy.lng();
  			}

  			// Replace the info window's content and position.
  			infoWindow.setContent(contentString);
  			infoWindow.setPosition(event.latLng);

  			infoWindow.open(map);
			}


		};

  	navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
  	//géolocalisation : off
    function onError(error) {
		alert(' activer geolocalisation');
		joueur_position.currentlat = 45.78272115660313;
		joueur_position.currentlong = 4.872586727142334;
		loadmap(joueur_position);
 	} 
  

  	//géolocalisation : on
  	function onSuccess(position) { 
 		joueur_position.currentlat = position.coords.latitude;
		joueur_position.currentlong = position.coords.longitude;
		loadmap(joueur_position);
	}
	
//fin initialize
}
