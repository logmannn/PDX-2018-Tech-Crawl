// Need to separate in to separate JS files

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZHlydCIsImEiOiJjamg4NXE1aGQwZno5MnFwY2lmZHZ5NjJvIn0.O39NoR8r4VqzVRbFZ_yJDQ';

var map = new mapboxgl.Map({
  container: 'techcrawl-map',
  style: 'mapbox://styles/thedyrt/cjh6x4ls709to2rlge6htq6z1',
  scrollZoom: false,
  center: [-122.6801,45.5248],
  zoom: 15,
});

// mapObject = L.mapbox.map('mapDiv', undefined, options);
// 45.524837,-122.6801553
window.mapInstance = map;

// Map Nav buttons
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

var geoControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});
map.addControl(geoControl, 'top-left');

// adds items on to the map
window.companies.forEach(function(company, index) {
  var count = index+1;
  var el = document.createElement('div');
  // marker items
  el.innerHTML = '<div><a href="#'+count+'">'+count+'</a></div>';
  el.className = 'marker';
  el.id = 'mCount'+count;
  el.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
  el.style.width = 30 + 'px';
  el.style.height = 50 + 'px';

  var handleClick = function() {

    console.log(count);

    // get items to show up in the below screen when the screen is small
    // console.log(document.getElementsByClassName('side-bar-items')[index].innerHTML);
    document.getElementById('side-bar2').innerHTML = document.getElementsByClassName('side-bar-items')[index].innerHTML;

    // consider disabling centering of screen on mobile
    // map.flyTo({center: this.coordinates});

    window.companies.forEach(function(company) {
      company.isHighlighted = false;
    });
    this.isHighlighted = true;
    // window.scrollTo(0, 415);

    var all = document.getElementsByClassName('marker');
    // reset gold icons to normal
    for (var i = 0; i < all.length; i++) {
      all[i].style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
    }
    //set as gold icons when clicked
    el.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/gold-icon.png)';

  }.bind(company);

  el.addEventListener('click', handleClick);

  // add marker to map
  new mapboxgl.Marker(el)
    .setLngLat(company.coordinates)
    .addTo(map);
});

// rivets for simple handling of clicks and data modeling
rivets.formatters.increment = {
  read: function(value) {
    return value + 1;
  },
  publish: function(value) {
    return value - 1;
  }
}

rivets.bind(document.body, {
  model: {
    companies: window.companies,
    handleCompanyClick: function(event, data) {
      // sidebar clicks
      console.log('THIS COMPANY WAS CLICKED, ', data.index+1);
      map.flyTo({center: data.model.companies[data.index].coordinates});
      console.log(data.model.companies[data.index].coordinates);
      var item = data.index+1;
      data.model.companies.forEach(function(company) {
        company.isHighlighted = false;
      });
      data.company.isHighlighted = true;
      var all = document.getElementsByClassName('marker');
      for (var i = 0; i < all.length; i++) {
        all[i].style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
      }
      document.getElementById('mCount'+item).style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/gold-icon.png)';
      document.getElementById('side-bar2').innerHTML =  document.getElementsByClassName('side-bar-items')[data.index].innerHTML;
    },
  },
});
