// Initialize and add the map
function initMap() {
  // The map, centered
  const mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(37.76487, -122.41948),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
  };

  const bounds = new google.maps.LatLngBounds();

  // define map
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  polyline = new google.maps.Polyline({ map });

  d3init();
}
let context;
let width;
let height;
let Path2D;
let gratucule;
let equator;
let projection;
PolylineContext.prototype.beginPath = function () {};
PolylineContext.prototype.moveTo = function () {
  if (this.currentPath) {
    const latLng = new google.maps.LatLng(y, x);
    this.currentPath.setAt(this.currentIndex, latLng);
    this.currentIndex++;
  }
};
PolylineContext.prototype.lineTo = function () {
  const latLng = new google.maps.LatLng(y, x);
  this.currentPath.setAt(this.currentIndex, latLng);
  this.currentIndex++;
};

PolylineContext.prototype.arc = function (x, y, radius, startAngle, endAngle) {};
PolylineContext.prototype.closePath = function () {};
function d3init() {
  width = map.getDiv().offsetWidth;
  height = map.getDiv().offsetHeight;

  projection = d3.geo
    .equirectangular()
    .translate([0, 0])
    .scale(57.29578)
    .precision(2);
  context = new PolylineContext();
  path = d3.geo
    .path()
    .projection(projection)
    .context(context);
  equator = {
    type: 'lineString',
    coordinates: [[-180, 20], [-90, 0], [0, -20], [90, 0], [180, 20]],
  };
  render();
}
function render() {
  polyline.setOptions({
    strokeColor: 'red',
    strokeWeight: 2,
  });
  context.setCurrent(polyline.getPath());
  path(equator);
}
