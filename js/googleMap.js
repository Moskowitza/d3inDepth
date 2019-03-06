// Create the Google Map…
const map = new google.maps.Map(d3.select('#map').node(), {
  zoom: 8,
  center: new google.maps.LatLng(37.76487, -122.41948),
  mapTypeId: google.maps.MapTypeId.TERRAIN,
});
let tryThis;
// Load the station data. When the data comes back, create an overlay.
d3.json('data/tryThis.json', (error, data) => {
  if (error) throw error;
  console.log(data[0].Longitude);
  const overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function onAdd() {
    const layer = d3
      .select(this.getPanes().overlayLayer)
      .append('div')
      .attr('class', 'stations');

    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function draw() {
      const projection = this.getProjection();
      const padding = 10;

      const marker = layer
        .selectAll('svg')
        .data(d3.entries(data))
        .each(transform) // update existing markers
        .enter()
        .append('svg')
        .each(transform)
        .attr('class', 'marker');

      // Add a circle.
      marker
        .append('circle')
        .attr('r', 4.5)
        .attr('cx', padding)
        .attr('cy', padding);

      // Add a label.
      marker
        .append('text')
        .attr('x', padding + 7)
        .attr('y', padding)
        .attr('dy', '.31em')
        .text(d => d.value.Grower);

      function transform(d) {
        tryThis = JSON.parse(d.value.FIELD_GEOM_GMAPS).coords;
        d = new google.maps.LatLng(d.value.Latitude, d.value.Longitude);
        d = projection.fromLatLngToDivPixel(d);
        return d3
          .select(this)
          .style('left', `${d.x - padding}px`)
          .style('top', `${d.y - padding}px`);
      }
    };
  };
  console.log(`tryThis ${tryThis}`);
  // Bind our overlay to the map…
  overlay.setMap(map);
});
