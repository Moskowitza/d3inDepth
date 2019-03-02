const chart = dc.barChart('#bar');
let cardTypeDimension;
let cardTypeDimensionGroup;
let genderArray = [];
d3.csv('data/people.csv').then(people => {
  // Grab Our Stack Values
  genderArray = [...new Set(people.map(x => x.gender))];
  const mycrossfilter = crossfilter(people);

  // const ageDimension = mycrossfilter.dimension(data =>
  //   Math.floor((Date.now() - new Date(data.DOB)) / 31557600000)
  // );

  // const ageGroup = ageDimension.group().reduceCount();

  cardTypeDimension = mycrossfilter.dimension(data => data.CreditCardType);
  cardTypeDimensionGroup = cardTypeDimension.group().reduce(
    (p, v) => {
      // add
      p[v.gender] = (p[v.gender] || 0) + 1;
      return p;
    },
    (p, v) => {
      // remove
      p[v.gender] -= 1;
      return p;
    },
    () =>
      // initial
      ({})
  );

  function sel_stack(i) {
    return function(d) {
      return d.value[i];
    };
  }
  console.table(cardTypeDimensionGroup.all());
  chart
    .width(800)
    .height(300)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .margins({ left: 80, top: 20, right: 10, bottom: 20 })
    .brushOn(false)
    .clipPadding(10)
    .title(function(d) {
      return `${d.key}[${this.layer}]: ${d.value[this.layer]}`;
    })
    .dimension(cardTypeDimension)
    .group(cardTypeDimensionGroup, genderArray[0], d => d.value[genderArray[0]])
    // .stack(cardTypeDimensionGroup, 'Male', d => d.value.Male)
    .renderLabel(true)
    .yAxisLabel('Sex')
    .xAxisLabel('Card Type')
    .on('renderlet', chart => {
      chart.selectAll('rect').on('click', d => {
        console.log('click!', d);
      });
    });

  chart.legend(dc.legend());

  dc.override(chart, 'legendables', () => {
    const items = chart._legendables();
    return items.reverse();
  });
  // Stack out other values Need to make this Programically

  for (let i = 1; i < genderArray.length; ++i) {
    chart.stack(
      cardTypeDimensionGroup,
      ` ${genderArray[i]}`,
      sel_stack(genderArray[i])
    );
  }

  chart.render();
});
