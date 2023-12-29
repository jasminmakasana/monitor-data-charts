export default class PieChartConfig {
  static manipulateData = (chartData, panelData) => {
    let manipulateData = [];

    let calcType = chartData.options.reduceOptions.calcs[0];
    let pieData = panelData.results;
    for (const property in pieData) {
      manipulateData.push({
        name: `${property}-Series`,
        value: calculateData(pieData[property], calcType),
      });
    }

    return manipulateData;
  };
}
