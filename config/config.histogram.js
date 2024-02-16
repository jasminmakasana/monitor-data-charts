export default class HistogramConfig {
  static manipulateData = (chartData) => {
    let data = chartData.results;
    let manipulatedChartData = [[], []];
    for (const key in data) {
      manipulatedChartData[0] = [];
      let maniputedContent = [];
      data[key].frames[0].data.values[1].forEach((item, i) => {
        manipulatedChartData[0].push(data[key].frames[0].data.values[0][i]);
        maniputedContent.push(item);
      });
      manipulatedChartData[1].push(maniputedContent);
    }

    return manipulatedChartData;
  };
}
