// d3.json is asynchronous: the rest of the page will render while we wait for the TopoJSON file to download.
const width = 960;
const height = 1160;

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

d3.json('/data/trythis.json').then(
  (json) => {
    const polygons = [];
    json.forEach((element) => {
      console.log(element.FIELD_GEOM_GMAPS.coords);
      polygons.push(element.FIELD_GEOM_GMAPS.coords);
    });

    svg
      .append('path')
      .data(polygons)
      .attr('d', d3.geo.path().projection(d3.geo.mercator()));
  },
  (err) => {
    if (err) return console.error(err);
  },
);
