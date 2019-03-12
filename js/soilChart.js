const pieCharts = [];
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

  data.forEach((d) => {
    const pieChart = `[{"label":"clay","value":${d.claypct}},
      {"label":"sand","value":${d.sandpct}},
      {"label":"organic","value":${d.ompct}},
      {"label":"Other","value":${100 - d.claypct - d.sandpct - d.ompct}}]`;
    pieCharts.push(pieChart);
  });

  const newData = [
    { label: 'clay', value: 34 },
    { label: 'sand', value: 34 },
    { label: 'organic', value: 1 },
    { label: 'Other', value: 31 },
  ];
  console.log(newData[0]);
  const vis = d3
    .select('#soilChart')
    .append('svg:svg') // create the SVG element inside the <body>
    .data([newData]) // associate our data with the document
    .attr('width', w) // set the width and height of our visualization (these will be attributes of the <svg> tag
    .attr('height', h)
    .append('svg:g') // make a group to hold our pie chart
    .attr('transform', `translate(${r},${r})`); // move the center of the pie chart from 0, 0 to radius, radius

  const arc = d3
    .arc() // this will create <path> elements for us using arc data
    .outerRadius(r);

  const pie = d3
    .pie() // this will create arc data for us given a list of values
    .value(d => d.value); // we must tell it out to access the value of each element in our data array

  const arcs = vis
    .selectAll('g.slice') // this selects all <g> elements with class slice (there aren't any yet)
    .data(pie) // associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
    .enter() // this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
    .append('svg:g') // create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
    .attr('class', 'slice'); // allow us to style things in the slices (like text)

  arcs
    .append('svg:path')
    .attr('fill', d => colorScale(d.label)) // set the color for each slice to be chosen from the color function defined above
    .attr('d', arc); // this creates the actual SVG path using the associated data (pie) with the arc drawing function

  arcs
    .append('svg:text') // add a label to each slice
    .attr('transform', (d) => {
      // set the label's origin to the center of the arc
      // we have to make sure to set these before calling arc.centroid
      d.innerRadius = 0;
      d.outerRadius = r;
      return `translate(${arc.centroid(d)})`; // this gives us a pair of coordinates like [50, 50]
    })
    .attr('text-anchor', 'middle') // center the text on it's origin
    .text((d, i) => newData[i].label); // get the label from our original data array
});
