// Change colour of first circle
d3.select('circle').style('fill', 'orange');

// Change radius of all circles
d3.selectAll('circle').attr('r', 20);

// Add .selected class to 3rd circle
d3.select('circle:nth-child(3)').classed('selected', true);
d3.select('circle:nth-child(4)')
  .style('fill', 'bada55')
  .style('stroke', '#666')
  .style('stroke-width', '3px');
// Set checked property of checkbox
d3.select('input.robot-checkbox').property('checked', true);

// Set text on .title element
d3.select('.title').text('D3 in Depth selection example');
