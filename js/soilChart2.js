d3.json('data/soilData.json').then((data) => {
  // Make a pie chart of percentages
  const w = 300; // width
  const h = 300; // height
  const r = 100; // radius
  const colorScale = d3
    .scaleOrdinal()
    .domain(['clay', 'sand', 'organic', 'other'])
    .range(['#A52A2A', '#F4A460', '#556B2F', '#87CEEB']);
  // const color = d3.schemeCategory20; // builtin range of colors

  // data.forEach((d) => {
  //   const pieChart = `[{"label":"clay","value":${d.claypct}},
  //     {"label":"sand","value":${d.sandpct}},
  //     {"label":"organic","value":${d.ompct}},
  //     {"label":"Other","value":${100 - d.claypct - d.sandpct - d.ompct}}]`;
  //   pieCharts.push(pieChart);
  // });

  const newData = [
    { label: 'clay', value: 34 },
    { label: 'sand', value: 34 },
    { label: 'organic', value: 1 },
    { label: 'Other', value: 31 },
  ];
  const pieGenerator = d3
    .pie()
    .value(d => d.value)
    .sort((a, b) => a.label.localeCompare(b.label));

  const arcData = pieGenerator(newData);

  // Create an arc generator with configuration
  const arcGenerator = d3
    .arc()
    .innerRadius(20)
    .outerRadius(100);

  d3.select('#soilChart')
    .append('svg') // create the SVG element inside the <body>
    .attr('width', w) // set the width and height of our visualization (these will be attributes of the <svg> tag
    .attr('height', h)
    .append('g') // make a group to hold our pie chart
    .attr('transform', `translate(${r},${r})`);
  // Create a path element and set its d attribute
  d3.select('g')
    .selectAll('path')
    .data(arcData)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', (d, i) => colorScale(i)); // set the color for each slice to be chosen from the color function defined above

  // Labels
  d3.select('g')
    .selectAll('text')
    .data(arcData)
    .enter()
    .append('text')
    .each(function (d) {
      const centroid = arcGenerator.centroid(d);
      d3.select(this)
        .attr('x', centroid[0])
        .attr('y', centroid[1])
        .attr('dy', '0.33em')
        .text(d.data.label);
    });
});
