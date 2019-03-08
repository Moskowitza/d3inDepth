// OUR COLORS
const colors = ['#20639B  ', '#3CAEA3', '#F6D55C'];
// our data
const data = [
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

// Define our scales
const yScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([150, 0]);

// make an area generator
const areaGenerator = d3
  .area()
  .x((d, i) => i * 100) // x value is index
  .y0(d => yScale(d[0])) // baseline
  .y1(d => yScale(d[1])); // top line

// DEFINE THE STACK
const stack = d3
  .stack()
  .keys(['apricots', 'blueberries', 'cherries'])
  .offset(d3.stackOffsetExpand);
//   .order(d3.stackOrderDescending); // largest on the bottom

//   pass data to ourStack
const ourStack = stack(data);

d3.select('#stackGenerator')
  .append('svg')
  .attr('width', 700)
  .attr('height', 150)
  .append('g')
  .attr('transform', 'translate(20, 0)');

d3.select('g')
  .selectAll('path')
  .data(ourStack)
  .enter()
  .append('path')
  .style('fill', (d, i) => colors[i])
  .attr('d', areaGenerator);

// d3.select('g')
//   .selectAll('path')
//   .data(ourStack)
//   .enter()
//   .append('path')
//   .style('fill', (d, i) => colors[i])
//   .attr('d', areaGenerator);
