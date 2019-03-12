const w = 600; // width
const h = 600; // height
const r = 100; // radius
const colorScale = d3
  .scaleOrdinal()
  .domain(['clay', 'sand', 'organic', 'other'])
  .range(['#A52A2A', '#F4A460', '#556B2F', '#87CEEB']);
// Make our SVG canvas
d3.select('#soilChart')
  .append('svg') // create the SVG element inside the <body>
  .attr('width', w) // set the width and height of our visualization (these will be attributes of the <svg> tag
  .attr('height', h);

function drawPie(pieData, index) {
  console.log(index);
  console.log(pieData);
  const pieGenerator = d3.pie().value(d => d.value);
  // .sort((a, b) => a.label.localeCompare(b.label));
  const arcGenerator = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100);

  const arcData = pieGenerator(pieData);

  d3.select('svg')
    .append('g')
    .attr('class', index) // make a group to hold our pie chart
    .attr('transform', `translate(${(index + 1) * 140}, ${100}  )`)

  // Create a path element and set its d attribute

    .selectAll('path')
    .data(arcData)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', (d, i) => colorScale(i)) // set the color for each slice to be chosen from the color function defined above

    // Labels
    // d3.select(`g${index}`)
    //   .selectAll('path')
    //   .selectAll('text')
    //   .data(arcData)
    //   .enter()
    .append('text')
    .attr('transform', (d) => {
      // set the label's origin to the center of the arc
      // we have to make sure to set these before calling arc.centroid
      d.innerRadius = 0;
      d.outerRadius = r;
      return `translate(${arc.centroid(d)})`; // this gives us a pair of coordinates like [50, 50]
    })
    .attr('text-anchor', 'middle') // center the text on it's origin
    .text((d, i) => d.pieData[i].label); // get the label from our original data array

  // .each((d, i, nodes) => {
  //   const centroid = arcGenerator.centroid(d);
  //   d3.select(nodes[i])
  //     .attr('x', centroid[0])
  //     .attr('y', centroid[1])
  //     .attr('dy', '0.33em')
  //     .text(d.pieData.label);
  // });
}

d3.json('data/soilData.json').then((data) => {
  // Make a pie chart of percentages

  // const color = d3.schemeCategory20; // builtin range of colors
  const pieCharts = [];
  data.forEach((d) => {
    pieCharts.push([
      {
        label: 'clay',
        value: d.claypct,
      },
      { label: 'sand', value: d.sandpct },
      { label: 'organic', value: d.ompct },
      { label: 'Other', value: 100 - d.claypct - d.sandpct - d.ompct },
    ]);
    // pieCharts.push(pieChart);
  });
  console.log(pieCharts);
  pieCharts.forEach((chart, i) => drawPie(chart, i));
});
