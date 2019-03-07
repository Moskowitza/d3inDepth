const scores = [
  {
    name: 'Andy',
    score: 25,
  },
  {
    name: 'Beth',
    score: 39,
  },
  {
    name: 'Craig',
    score: 42,
  },
  {
    name: 'Diane',
    score: 35,
  },
  {
    name: 'Evelyn',
    score: 48,
  },
];
const s = d3.selectAll('circle');
s.data(scores)
  .attr('r', d => d.score)
  .classed('high', d => d.score >= 40)
  .attr('cx', (d, i) => i * 120);
