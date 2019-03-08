// target #arcGenerator

// Data

const colors = ['#20639B  ', '#3CAEA3', '#F6D55C'];
const arcData = {
  startAngle: 0,
  endAngle: 0.25 * Math.PI,
  innerRadius: 50,
  outerRadius: 100,
};
// Arc Generator
const arcGenerator = d3
  .arc()
  .innerRadius(20)
  .outerRadius(100)
  .cornerRadius(4);
const pathData = arcGenerator(arcData);
const arc = d3
  .select('#arcGenerator')
  .append('svg')
  .attr('width', 700)
  .attr('height', 170)
  .append('g')
  .attr('transform', 'translate(300, 100)');

d3.select('g')
  .append('path')
  .attr('d', pathData)
  .style('fill', colors[0]);

//   Pie Chart
const pieData1 = [
  { startAngle: 0, endAngle: 0.2 },
  { startAngle: 0.2, endAngle: 0.6 },
  { startAngle: 0.6, endAngle: 1.4 },
  { startAngle: 1.4, endAngle: 3 },
  { startAngle: 3, endAngle: 2 * Math.PI },
];
// arc Generator
const arcGenerator1 = d3
  .arc()
  .innerRadius(20)
  .outerRadius(100)
  .padAngle(0.02)
  .padRadius(100)
  .cornerRadius(4);

d3.select('#pie1')
  .append('svg')
  .attr('width', 700)
  .attr('height', 170)
  .append('g')
  .classed('pie', true)
  .attr('transform', 'translate(300, 110)');
d3.select('g.pie')
  .selectAll('path')
  .data(pieData1)
  .enter()
  .append('path')
  .attr('d', arcGenerator1);
