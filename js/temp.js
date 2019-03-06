const chart = dc.lineChart('#tempLine');
let tempDim;
let tempDimGroup;
let ndx;
let dayArr;

d3.json('data/tempData.json').then((data) => {
  console.log(data.length);
  dayArr = [...new Set(data.map(x => x.day))];
  ndx = crossfilter(data);
  tempDim = ndx.dimension(d => (d.tmax ? d.tmax : 0));
  dayDim = ndx.dimension(d => d.date);
  dayDimGroup = dayDim.group().reduceSum(d => d.tmax);
  chart
    .width(768)
    .height(480)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .yAxisLabel('This is the Y Axis!')
    .dimension(dayDim)
    .group(dayDimGroup);
  chart.render();
});
