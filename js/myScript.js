const chart = dc.barChart('#bar');
let cardTypeDimension;
let cardTypeDimensionGroup;
d3.csv('data/people.csv').then(people => {
  const mycrossfilter = crossfilter(people);

  // const ageDimension = mycrossfilter.dimension(data =>
  //   Math.floor((Date.now() - new Date(data.DOB)) / 31557600000)
  // );

  // const ageGroup = ageDimension.group().reduceCount();

  cardTypeDimension = mycrossfilter.dimension(data => data.CreditCardType);
  cardTypeDimensionGroup = cardTypeDimension.group().reduceCount();
  // .reduce(
  //   (p, v) => {
  //     // add
  //     p[v.gender] = (p[v.gender] || 0) + 1;
  //     return p;
  //   },
  //   (p, v) => {
  //     // remove
  //     p[v.gender] -= 1;
  //     return p;
  //   },
  //   () =>
  //     // initial
  //     ({})
  // );
  // console.table(cardTypeDimensionGroup.all());
  chart
    .width(800)
    .height(300)
    .dimension(cardTypeDimension)
    .group(cardTypeDimensionGroup)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .yAxisLabel('Count')
    .xAxisLabel('Card Type')
    .on('renderlet', chart => {
      chart.selectAll('rect').on('click', d => {
        console.log('click!', d);
      });
    });
  chart.render();

  // chart
  //   .width(800)
  //   .height(300)
  //   .x(d3.scaleLinear().domain([15, 70]))
  //   .brushOn(false)
  //   .yAxisLabel('Count')
  //   .xAxisLabel('Age')
  //   .dimension(ageDimension)
  //   .group(ageGroup)
  //   .on('renderlet', chart => {
  //     chart.selectAll('rect').on('click', d => {
  //       console.log('click!', d);
  //     });
  //   });
  // chart.render();
});
