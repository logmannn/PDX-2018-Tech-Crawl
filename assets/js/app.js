mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZHlydCIsImEiOiJjamg4NXE1aGQwZno5MnFwY2lmZHZ5NjJvIn0.O39NoR8r4VqzVRbFZ_yJDQ';
var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo",
                "iconSize": [50, 50],
                "title": "Mapbox SF",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.6801,45.5248
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Bar",
                "iconSize": [50, 50],
                "title": "Mapbox SF",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.670719,
                    45.522955
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Baz",
                "iconSize": [50, 50],
                "title": "Mapbox SF",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -63.29223632812499,
                    -18.28151823530889
                ]
            }
        }
    ]
};
var map = new mapboxgl.Map({
  container: 'techcrawl-map',
  style: 'mapbox://styles/thedyrt/cjh6x4ls709to2rlge6htq6z1',
  scrollZoom: false,
  center: [-122.6801,45.5248],
  zoom: 15,
});
// 45.524837,-122.6801553
window.mapInstance = map;

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

var geoControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});
map.addControl(geoControl, 'top-left');

// loop through the companies
// var marker = new mapboxgl.Marker()
//   .setLngLat([-122.6801,45.5248])
//   .addTo(map);
// marker = new mapboxgl.Marker()
//   .setLngLat([-122.672913,45.5229])
//   .addTo(map);
  // 45.5229591,-122.672913


  var geocount = 0;
  geojson.features.forEach(function(marker) {
      geocount += 1;
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.innerHTML += geocount;
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';
      el.style.content = marker.properties.title;

      el.addEventListener('click', function() {
          window.alert(marker.properties.message);
          // window.alert(marker.properties.title);
      });

      // add marker to map
      new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
  });
