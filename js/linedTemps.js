// Fill out our Div with an SVG

// set the dimensions and margins of the graph
const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50,
};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// parse the date / time
const parseTime = d3.timeParse('%Y-%M-%d');

// set the ranges
const xScale = d3.scaleTime().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

// define the line
const valueline = d3
  .line()
  .defined(d => d.tmin)
  .x(d => xScale(d.date))
  .y(d => yScale(d.tmin));

// define the line
const valueline2 = d3
  .line()
  .defined(d => d.tmax)
  .x(d => xScale(d.date))
  .y(d => yScale(d.tmax));

const svg = d3
  .select('#lineTemps')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// define some colors
const colors = ['#FBB65B', '#513551', '#de3163'];
function draw(data) {
  data.forEach((d) => {
    d.date = new Date(d.date);
    d.tmin = +d.tmin;
    d.tmax = +d.tmax;
  });
  console.log(data);
  // Scale the range of the data
  xScale.domain(d3.extent(data, d => d.date));
  yScale.domain([0, d3.max(data, d => Math.max(d.tmin, d.tmax))]);
  svg
    .append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', valueline);
  // Add the valueline path.
  svg
    .append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', valueline2);
  // Add the X Axis
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add the Y Axis
  svg.append('g').call(d3.axisLeft(yScale));
}

d3.json('data/getTemp.json').then((data) => {
  // 1) Create our Scale
  draw(data);
});
