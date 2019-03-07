const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let i = 25;
function update(data) {
  const u = d3
    .select('#content')
    .selectAll('div')
    .data(data, d => d); // this is a KEY function, binding data the div

  u.enter()
    .append('div')
    .merge(u)
    .transition()
    .style('left', (d, i) => `${i * 32}px`)
    .text(d => d);
}
function doInsert() {
  if (i < 0) return;
  const myData = letters.slice(i).split('');
  i -= 1;
  update(myData);
}

doInsert();
doInsert();
