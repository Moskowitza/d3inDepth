const map = new google.maps.Map(document.getElementById('map-container'), {
  center: {
    lat: -33.89296209,
    lng: 151.1163801,
  },
  scrollwheel: false,
  zoom: 14,
});

const overlay = new google.maps.OverlayView();
overlay.onAdd = function () {};
overlay.draw = function () {};
overlay.setMap(map);

function googleProjection(prj) {
  return function (lnglat) {
    ret = prj.fromLatLngToDivPixel(new google.maps.LatLng(lnglat[1], lnglat[0]));
    return [ret.x, ret.y];
  };
}

map.addListener('idle', () => {
  // code to initialize svg and path
  let svg;
  let path;
  if (!svg) {
    const projection = googleProjection(overlay.getProjection());
    var northWest = projection([139.499822, -27.183773]);
    const southEast = projection([155.642935, -38.559921]);
    const width = southEast[0] - northWest[0];
    const height = southEast[1] - northWest[1];
    svg = d3
      .select(overlay.getPanes().overlayMouseTarget)
      .append('svg')
      .style('position', 'absolute')
      .style('top', northWest[1])
      .style('left', northWest[0])
      .attr('height', height)
      .attr('width', width);
    path = d3.geo.path().projection(projection);
  }

  // add handler to clear svg contents on zoom change
  map.addListener('zoom_changed', () => {
    if (svg) {
      svg.selectAll('*').remove();
    }
  });

  // add handler to clear svg contents on drag drop
  map.addListener('dragend', () => {
    if (svg) {
      svg.selectAll('*').remove();
    }
  });

  d3.json('travelzone.json', (error, data) => {
    svg
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('transform', `translate(${-northWest[0]} ${-northWest[1]})`)
      .attr('d', path)
      .attr('fill', '#666666')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'black')
      .on('mouseover', mapMouseOver)
      .on('mouseout', mapMouseOut);
  });
});

const tipSvg = d3
  .select('body')
  .append('div')
  .style('position', 'absolute')
  .style('max-width', '400px')
  .style('height', 'auto')
  .style('background-color', '#ffffff')
  .style('opacity', 0)
  .style('width', 600);

function mapMouseOver(d) {
  const tip = `<p>${d.properties.nsw_loca_2}</p>`;
  tipSvg
    .html(tip)
    .style('left', `${d3.event.pageX}px`)
    .style('top', `${d3.event.pageY}px`);
  tipSvg
    .transition()
    .duration(500)
    .style('opacity', 1);
}

function mapMouseOut(d) {
  tipSvg
    .transition()
    .duration(500)
    .style('opacity', 0);
}
