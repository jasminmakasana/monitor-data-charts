export default class TimeSeriesConfig {
  static manipulateData = (chartData) => {
    let data = chartData.results;
    let manipulatedChartData = [[]];
    for (const key in data) {
      manipulatedChartData[0] = [];
      let panelData = [];
      data[key].frames[0].data.values[1].forEach((item, i) => {
        manipulatedChartData[0].push(data[key].frames[0].data.values[0][i]);
        panelData.push(item);
      });
      manipulatedChartData.push(panelData);
    }
    return manipulatedChartData;
  };
}
