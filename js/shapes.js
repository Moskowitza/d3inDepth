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

const radialLineGenerator = d3.radialLine();

const radpoints = [
  [0, 80],
  [Math.PI * 0.25, 80],
  [Math.PI * 0.5, 30],
  [Math.PI * 0.75, 80],
  [Math.PI, 80],
  [Math.PI * 1.25, 80],
  [Math.PI * 1.5, 80],
  [Math.PI * 1.75, 80],
  [Math.PI * 2, 80],
];

const radialLine = radialLineGenerator(radpoints);

d3.select('#radial')
  .append('svg')
  .attr('width', '200px')
  .attr('height', '200px')
  .append('g')
  .attr('transform', 'translate(100, 100)')
  .append('path')
  .attr('d', radialLine);

// Area Generator
const areaGenerator = d3.area().y0(150);

const areapoints = [[0, 80], [100, 100], [200, 30], [300, 50], [400, 40], [500, 80]];

const pathData = areaGenerator(areapoints);
d3.select('#area')
  .append('svg')
  .attr('width', '700px')
  .attr('height', '200px')
  .append('g')
  .attr('transform', 'translate(100, 100)')
  .append('path')
  .attr('d', pathData);

// Area generator with top and bottom values
const yScale2 = d3
  .scaleLinear()
  .domain([0, 100])
  .range([200, 0]);

const areaGenerators2 = d3
  .area()
  .x(d => d.x)
  .y0(d => yScale2(d.low))
  .y1(d => yScale2(d.high));

const highLow = [
  { x: 0, low: 30, high: 80 },
  { x: 100, low: 80, high: 100 },
  { x: 200, low: 20, high: 30 },
  { x: 300, low: 20, high: 50 },
  { x: 400, low: 10, high: 40 },
  { x: 500, low: 50, high: 80 },
];
const pathData2 = areaGenerators2(highLow);
d3.select('#area2')
  .append('svg')
  .attr('width', '700px')
  .attr('height', '200px')
  .append('g')
  .append('path')
  .attr('d', pathData2);
// radialarea

// Our Generator
const radialAreaGenerator = d3
  .radialArea()
  .angle(d => d.angle)
  .innerRadius(d => d.r0)
  .outerRadius(d => d.r1);
// Our Data
const radialPoints = [
  { angle: 0, r0: 20, r1: 80 },
  { angle: Math.PI * 0.25, r0: 20, r1: 40 },
  { angle: Math.PI * 0.5, r0: 20, r1: 80 },
  { angle: Math.PI * 0.75, r0: 20, r1: 40 },
  { angle: Math.PI, r0: 20, r1: 80 },
  { angle: Math.PI * 1.25, r0: 20, r1: 40 },
  { angle: Math.PI * 1.5, r0: 20, r1: 80 },
  { angle: Math.PI * 1.75, r0: 20, r1: 40 },
  { angle: Math.PI * 2, r0: 20, r1: 80 },
];
const radialPath = radialAreaGenerator(radialPoints);
d3.select('#radialArea')
  .append('svg')
  .attr('width', '700px')
  .attr('height', '200px')
  .append('g')
  .attr('transform', 'translate(100, 100)')
  .append('path')
  .attr('d', radialPath);

// stackedChart
const colors = ['#FBB65B', '#513551', '#de3163'];
const stackedData = [
  {
    day: 'Mon',
    apricots: 120,
    blueberries: 180,
    cherries: 100,
  },
  {
    day: 'Tue',
    apricots: 60,
    blueberries: 185,
    cherries: 105,
  },
  {
    day: 'Wed',
    apricots: 100,
    blueberries: 215,
    cherries: 110,
  },
  {
    day: 'Thu',
    apricots: 80,
    blueberries: 230,
    cherries: 105,
  },
  {
    day: 'Fri',
    apricots: 120,
    blueberries: 240,
    cherries: 105,
  },
];
// KEYS are defined here explicitly
const stack = d3.stack().keys(['apricots', 'blueberries', 'cherries']);
const stackedSeries = stack(stackedData);
// Create a g element for each series
const g = d3
  .select('#stackedChart')
  .append('svg')
  .attr('width', '700px')
  .attr('height', '200px')
  .selectAll('g.series')

// Create a g element for each series

  .data(stackedSeries)
  .enter()
  .append('g')
  .classed('series', true)
  .style('fill', (d, i) => colors[i]);
// For each series create a rect element for each day
g.selectAll('rect')
  .data(d => d)
  .enter()
  .append('rect')
  .attr('width', d => d[1] - d[0])
  .attr('x', d => d[0])
  .attr('y', (d, i) => i * 20)
  .attr('height', 19);
