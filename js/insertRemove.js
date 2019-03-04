// d3.selectAll('g.item')
//   .insert('text', 'circle')
//   .text((d, i) => i + 1)
//   .attr('y', 50)
//   .attr('x', 30);

// EACH AND CALL
// EACH-> selections elements
// CALL-> selection itself
function addNumberedCircle(d, i) {
  d3.select(this)
    .append('circle')
    .attr('r', 40);

  d3.select(this)
    .append('text')
    .text(i + 1)
    .attr('y', 50)
    .attr('x', 30);
}
d3.selectAll('g.item').each(addNumberedCircle);

// CALL on Selection, NO THIS, (d,i)
// function addNumberedCircle(selection) {
//   selection.append('circle').attr('r', 40);

//   selection
//     .append('text')
//     .text((d, i) => i + 1)
//     .attr('y', 50)
//     .attr('x', 30);
// }
// // HERE WE use CALL, NO THIS
// d3.selectAll('g.item').call(addNumberedCircle);

// EACH with an anonamous callback
// d3.selectAll('circle').each(function (d, i) {
//   const odd = i % 2 === 1;

//   d3.select(this)
//     .style('fill', odd ? 'orange' : '#ddd')
//     .attr('r', odd ? 40 : 20);
// });
