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
