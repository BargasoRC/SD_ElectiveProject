$(document).ready(function () {
  var mymap = "";
  var fireLocations = [];
  var markers = [];
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
  client.subscribe("flammes", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("subscribed")
    }
  })

  client.on("connect", function () {
    console.log("Successfully connected");
  })

  client.on("message", function (topic, payload) {
    let arr = new TextDecoder().decode(new Uint8Array(payload))
    let data = "{" + arr + "}"
    // console.log(data)
    // console.log([topic, payload].join(": "));
    // client.end();
    locate(data)
  })

  client.publish("mqtt/demo", "hello world!", function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("published")
    }
  })
  showMap();
  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.locationiq.com/v1/autocomplete.php?key=b672e47293ef40&q=Nasipit, Talamban Cebu City",
  //   "method": "GET"
  // }

  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  // var mymap = L.map('mapid').setView([10.3157, 123.8854], 13);
  function showMap() {
    mymap = L.map('mapid').setView([10.35792355, 123.91102580699], 11);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoibm90b25lIiwiYSI6ImNrMzZ4amt1MjA0YnAzbm96enl0ZmpzbTYifQ.4WiOkNt_Zor2YphZyI72fg'
    }).addTo(mymap);
    // var marker = L.marker([51.5, -0.09]).addTo(mymap);
    // var marker = L.marker([10.35792355, 123.91102580699]).addTo(mymap);
    // // var circle = L.circle([51.508, -0.11], {
    // //     color: 'red',
    // //     fillColor: '#f03',
    // //     fillOpacity: 0.5,
    // //     radius: 500
    // // }).addTo(mymap);
    // // var polygon = L.polygon([
    // //     [51.509, -0.08],
    // //     [51.503, -0.06],
    // //     [51.51, -0.047]
    // // ]).addTo(mymap);
    // var popup = L.popup()
    //   .setLatLng([10.35792355, 123.91102580699])
    //   .setContent("House Fire Detected!")
    //   .openOn(mymap);
  }

  function locate(location) {
    // mymap = L.map('mapid').setView([Location.latitude, Location.longitude], 12.5);
    let Location = JSON.parse(location)
    let confirmation = false
    if (Location.status !== '0') {
      console.log('alarm')
      fireLocations.push(Location)
    } else {
      for (var i = 0; i < fireLocations.length; ++i) {
        if (Location.latitude === fireLocations[i].latitude && Location.longitude === fireLocations[i].longitude) {
          fireLocations = fireLocations.splice(i, 1);
          confirmation = true
        }
      }
      // marker = L.marker([Location.latitude, Location.longitude]).addTo(mymap);
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
      // popup = L.popup()
      //   .setLatLng([Location.latitude, Location.longitude])
      //   .setContent("House Fire Detected!")
      //   .openOn(mymap);
    }
    mark(Location.latitude, Location.longitude, confirmation)
  }
  function mark(latitude, longitude, confirmation) {
    for (var i = 0; i < fireLocations.length; ++i) {
      var marker = L.marker([fireLocations[i].latitude, fireLocations[i].longitude]);
      markers.push(marker)
      var mark = L.layerGroup(markers).addTo(mymap)
      // var circle = L.circle([latitude, longitude], {
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
      var popup = L.popup()
        .setLatLng([latitude,longitude])
        .setContent("House Fire Detected!")
        .openOn(mymap);
      if (confirmation) {
        mark.clearLayers();
        var obj = {};
        for (var i = 0, len = markers.length; i < len; i++)
          obj[markers[i]['place']] = markers[i];
        var a = new Array();
        for (var key in obj)
          a.push(obj[key]);
        mark = L.layerGroup(a).addTo(mymap)
        markers = a;
      }
    }
  }
})