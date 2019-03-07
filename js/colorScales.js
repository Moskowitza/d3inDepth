const linearScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, 600]);
const sequentialScale = d3.scaleSequential().domain([0, 100]);
// https://github.com/d3/d3-scale-chromatic/blob/master/README.md
const interpolators = [
  'interpolateViridis',
  'interpolateInferno',
  'interpolateMagma',
  'interpolatePlasma',
  'interpolateWarm',
  'interpolateCool',
  'interpolateRainbow',
  'interpolateCubehelixDefault',
];
// myData is every even number between 0 and 100, not including 100
const myData = d3.range(0, 100, 2);

function dots(d) {
  sequentialScale.interpolator(d3[d]);

  //   This is the label
  d3.select(this)
    .append('text')
    .attr('y', -10)
    .text(d);

  // Add Rect SVG
  d3.select(this)
    .selectAll('rect')
    .data(myData)
    .enter() // create a rect for each myData (50 of them)
    .append('rect')
    .attr('x', d => linearScale(d)) // data passed into linear Scale with domain 0-100, range 0-600
    .attr('width', 11)
    .attr('height', 30)
    .style('fill', d => sequentialScale(d));
}
d3.select('#wrapper')
  .selectAll('g.interpolator')
  .data(interpolators) // our array of 8 interpolators
  .enter()
  .append('g')
  .classed('interpolator', true)
  .attr('transform', (d, i) => `translate(0, ${i * 70})`)
  .each(dots); // for each value in our data, run dots()
