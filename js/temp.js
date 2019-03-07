const chart = dc.lineChart('#tempLine');
let tempDim;
let tempDimGroup;
let ndx;
let dayArr;
// set the dimensions and margins of the graph
const margin = {
  top: 20,
  right: 20,
  bottom: 10,
  left: 50,
};
const width = 960 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

d3.json('data/tempData.json').then((data) => {
  console.log(data.length);
  dayArr = [...new Set(data.map(x => x.day))];
  ndx = crossfilter(data);
  tempDim = ndx.dimension(d => (d.tmax ? d.tmax : 0));
  dayDim = ndx.dimension(d => d.date);
  dayDimGroup = dayDim.group().reduceSum(d => d.tmax);
  chart
    .width(width + margin.left + margin.right)
    .height(height + margin.top + margin.bottom)
    .x(d3.scaleBand())
    .mouseZoomable(true)
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .yAxisLabel('This is the Y Axis!')
    .dimension(dayDim)
    .group(dayDimGroup);
  chart.renderlet((chart) => {
    // rotate x-axis labels
    chart
      .selectAll('g.x text')
      .style('text-anchor', 'end')
      .attr('y', 0)
      .attr('x', -65)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(-70)')
      .style('text-anchor', 'start');
  });
  chart.render();
});
