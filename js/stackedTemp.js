// Fill out our Div with an SVG
d3.select('#tempChart')
  .append('svg')
  .attr('width', 700)
  .attr('height', 150)
  .append('g')
  .classed('temp', true)
  .attr('transform', 'translate(20, 10)');

// define some colors
const colors = ['#FBB65B', '#513551', '#de3163'];
d3.json('data/getTemp.json').then((data) => {
  // 1) Create our Scale
  const yScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 100]);

  // 2) Area Generator
  const areaGenerator = d3
    .area()
    .x((d, i) => i * 20)
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));

  // key our data

  const stack = d3.stack().keys(['tmin', 'tavg', 'tmax']);
  const stackedSeries = stack(data);
  d3.select('g.temp')
    .selectAll('path')
    .data(stackedSeries)
    .enter()
    .append('path')
    .style('fill', (d, i) => colors[i])
    .attr('d', areaGenerator);
});
