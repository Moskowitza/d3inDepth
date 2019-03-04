function update() {
  d3.selectAll('rect').attr('x', (d, i) => i * 40);
}
const rects = Array.from(document.querySelectorAll('rect'));
console.log(rects);
d3.selectAll('rect').on('click', (d, i) => {
  d3.select('.status').text(
    `You clicked on square ${i} and it has a position ${rects[i].x.animVal.value} `,
  );
});
d3.selectAll('circle').on('click', function (d, i) {
  d3.select(this).style('fill', 'pink');
});
// toggle class to flip between classes

// d3.select(this).classed("myCssClass", d3.select(this).classed("myCssClass") ? false : true)
