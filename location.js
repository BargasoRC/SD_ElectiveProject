var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.locationiq.com/v1/autocomplete.php?key=b672e47293ef40&q=Nasipit, Talamban Cebu City",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
console.log('testing')

// var mymap = L.map('mapid').setView([10.3157, 123.8854], 13);
var mymap = L.map('mapid').setView([10.35792355, 123.91102580699], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoibm90b25lIiwiYSI6ImNrMzZ4amt1MjA0YnAzbm96enl0ZmpzbTYifQ.4WiOkNt_Zor2YphZyI72fg'
}).addTo(mymap);
// var marker = L.marker([51.5, -0.09]).addTo(mymap);
var marker = L.marker([10.35792355, 123.91102580699]).addTo(mymap);
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);
// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);