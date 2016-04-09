var dep = require('https://maps.googleapis.com/maps/api/js?key=AIzaSyCqbr5FiJlB0I3W35dtXS43yhmgQ5fLRRM&libraries=places');

var placeResults;
var durationResults;
//TEMP DATA FOR TESTING
var userEnteredTime = 60;
//----
var distanceResults;
var destinationResults;


dep.performSearch();{
  var request = {
    bounds: userEnteredTime*50/60,
    keyword: 'best view'
  };
  dep.service.radarSearch(request, callback);
}

dep.callback(dep.results, dep.status);{


  if (dep.status !== dep.google.maps.places.PlacesServiceStatus.OK) {
    console.error(dep.status);
    return;
  }
  for (var i = 0; i < dep.results.length; i++) {
     placeResults.push(dep.results[i]);
  }
}

//----------------

//THINGS TO NOTE: 
//Maximum of 25 origins or 25 destinations per request; and
//At most 100 elements (origins times destinations) per request.
var origin = dep.locationFound;
dep.service = new dep.google.maps.DistanceMatrixService();
dep.service.getDistanceMatrix(
  {
    origins: origin,
    destinations: placeResults,
    travelMode: dep.google.maps.TravelMode.DRIVING,
    transitOptions: dep.TransitOptions,
    drivingOptions: dep.DrivingOptions,
    unitSystem: dep.UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  if (status == dep.google.maps.DistanceMatrixStatus.OK) {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      for (var j = 0; j < destinations.length; j++) {
        var element = destinations[j];
        var distance = element.distance.text;
        var duration = element.duration.text;

        if(duration > userEnteredTime-3 && duration <= userEnteredTime){
          distanceResults.push(distance);	
          durationResults.push(duration);
          destinationResults.push(element);
        }
//Do we need to convert duration from text to # form?
      }
    }
  }
}
