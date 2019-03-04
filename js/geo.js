let geojson = {};

const context = d3
  .select('#content canvas')
  .node()
  .getContext('2d');

const projection = d3.geoOrthographic().scale(300);

const geoGenerator = d3
  .geoPath()
  .projection(projection)
  .pointRadius(4)
  .context(context);

let yaw = 300;

function update() {
  projection.rotate([yaw, -45]);

  context.clearRect(0, 0, 800, 600);

  context.lineWidth = 0.5;
  context.strokeStyle = '#333';

  context.beginPath();
  geoGenerator({ type: 'FeatureCollection', features: geojson.features });
  context.stroke();

  // Graticule
  const graticule = d3.geoGraticule();
  context.beginPath();
  context.strokeStyle = '#ccc';
  geoGenerator(graticule());
  context.stroke();

  yaw -= 0.2;
}

// REQUEST DATA
d3.json('data/geoData.json', (err, json) => {
  console.log(json);
  geojson = json;
  window.setInterval(update, 100);
});
