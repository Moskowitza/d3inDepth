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

  // Mouse Movement
  const mouseG = svg.append('g').attr('class', 'mouse-over-effects');

  mouseG
    .append('path') // this is the black vertical line to follow mouse
    .attr('class', 'mouse-line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .style('opacity', '0');

  const lines = document.getElementsByClassName('line');

  const mousePerLine = mouseG
    .selectAll('.mouse-per-line')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'mouse-per-line');

  mousePerLine
    .append('circle')
    .attr('r', 7)
    .style('stroke', colors[0])
    .style('fill', 'none')
    .style('stroke-width', '1px')
    .style('opacity', '0');

  mousePerLine.append('text').attr('transform', 'translate(10,3)');

  mouseG
    .append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', () => {
      // on mouse out hide line, circles and text
      d3.select('.mouse-line').style('opacity', '0');
      d3.selectAll('.mouse-per-line circle').style('opacity', '0');
      d3.selectAll('.mouse-per-line text').style('opacity', '0');
    })
    .on('mouseover', () => {
      // on mouse in show line, circles and text
      d3.select('.mouse-line').style('opacity', '1');
      d3.selectAll('.mouse-per-line circle').style('opacity', '1');
      d3.selectAll('.mouse-per-line text').style('opacity', '1');
    })
    .on('mousemove', (d, i, nodes) => {
      // mouse moving over canvas
      const mouse = d3.mouse(nodes[i]);
      d3.select('.mouse-line').attr('d', () => {
        let d = `M${mouse[0]},${height}`;
        d += ` ${mouse[0]},${0}`;
        return d;
      });

      d3.selectAll('.mouse-per-line').attr('transform', (d, i, nodes) => {
        console.log(width / mouse[0]);
        const xDate = xScale.invert(mouse[0]);
        const bisect = d3.bisector(d => d.date).right;
        idx = bisect(d.tmax, xDate);

        let beginning = 0;

        let end = lines[i].getTotalLength();
        let target = null;

        while (true) {
          target = Math.floor((beginning + end) / 2);
          pos = lines[i].getPointAtLength(target);
          if ((target === end || target === beginning) && pos.x !== mouse[0]) {
            break;
          }
          if (pos.x > mouse[0]) end = target;
          else if (pos.x < mouse[0]) beginning = target;
          else break; // position found
        }

        d3.select(nodes[i])
          .select('text')
          .text(yScale.invert(pos.yScale).toFixed(2));

        return `translate(${mouse[0]},${pos.y})`;
      });
    });
}

d3.json('data/getTemp.json').then((data) => {
  // 1) Create our Scale
  draw(data);
});
