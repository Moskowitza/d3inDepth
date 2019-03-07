const linearScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, 700]);

const sqrtScale = d3
  .scaleSqrt()
  .domain([0, 100])
  .range([0, 30]);

const myData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

d3.select('#wrapper')
  .selectAll('circle')
  .data(myData)
  .enter()
  .append('circle')
  .attr('r', d => sqrtScale(d))
  .attr('cx', d => linearScale(d));
