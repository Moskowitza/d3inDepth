const data = [
  { value: 10 },
  { value: 50 },
  { value: 30 },
  { value: 20 },
  { value: 40 },
  { value: 30 },
  { value: null },
  { value: 20 },
  { value: 70 },
  { value: 50 },
];
// Use "extent" to fill the domain with your data
const extent = d3.extent(data, d => d.value);
const xScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, 600]);

const yScale = d3
  .scaleLinear()
  .domain(extent)
  .range([150, 0]);

const lineGenerator = d3
  .line()
  .curve(d3.curveBasis)
  .defined(d => d.value !== null)
  .x((d, i) => xScale(i))
  .y(d => yScale(d.value));

const line = lineGenerator(data);

// Create a path element and set its d attribute
d3.select('g')
  .append('path')
  .attr('d', line);

//   draw to canvas

const context = d3
  .select('canvas')
  .node()
  .getContext('2d');

const lineGenerator2 = d3.line().context(context);

const points = [[0, 80], [100, 100], [200, 30], [300, 50], [400, 40], [500, 80]];

context.strokeStyle = '#999';
context.beginPath();
lineGenerator2(points);
context.stroke();
