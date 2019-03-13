const w = 600; // width of SVG
const h = 600; // height of SVG
const r = 100; // radius of a pieChart
const colorScale = d3
  .scaleOrdinal()
  .domain(['clay', 'sand', 'organic', 'other'])
  .range(['#A52A2A', '#F4A460', '#556B2F', '#87CEEB']);
// Make our SVG canvas
d3.select('#soilChart')
  .append('svg') // create the SVG element inside the <body>
  .attr('height', h)
  .attr('width', w); // set the width and height of our visualization (these will be attributes of the <svg> tag

// Function to add pieChart for each
function drawPie(pieData, index) {
  console.log(index);
  console.log(pieData);

  // Pie Generator made up of arc paths
  const pieGenerator = d3.pie().value(d => d.value);

  // arc Generator to make  Paths (d attribute)
  const arcGenerator = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100);

  // pass our data into the Pie Generator
  const arcData = pieGenerator(pieData);

  // Select the Parent SVG
  d3.select('svg')
    .append('g') // A g will hold the arc paths and labels
    .attr('class', index) // make a group to hold our pie chart
    .attr('transform', `translate(${index === 0 ? r : index * r * 2 + r}, ${100})`)
    .selectAll('path') // We'll bind all data to the paths
    .data(arcData)
    .enter()
    .append('path') // on enter, create new path
    .attr('d', arcGenerator) // shape of path is arc
    .attr('fill', (d, i) => colorScale(i)); // set the color for each slice to be chosen from the color function defined above

  //   // Labels
  // Labels
  d3.select('g')
    .selectAll('text')
    .data(arcData)
    .enter()
    .append('text')
    // eslint-disable-next-line func-names
    .each(function (d) {
      const centroid = arcGenerator.centroid(d);
      d3.select(this)
        .attr('x', centroid[0])
        .attr('y', centroid[1])
        .attr('dy', '0.33em')
        .text(d => d.data.label);
    });
}

d3.json('data/soilData.json').then((data) => {
  /*
  const chart = [
    { label: 'clay', value: 34 },
    { label: 'sand', value: 34 },
    { label: 'organic', value: 1 },
    { label: 'Other', value: 31 },
  ];
*/
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
