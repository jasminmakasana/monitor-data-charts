import { calculateChartJSData } from "../helpers";

export default class HeatMapConfig {
  static manipulateData = (chartData) => {
    let data = chartData.results;
    let manipulatedChartData = [[]];
    for (const key in data) {
      manipulatedChartData[0] = [];
      let heatMapData = [];
      data[key].frames[0].data.values[1].forEach((item, i) => {
        manipulatedChartData[0].push(data[key].frames[0].data.values[0][i]);
        heatMapData.push(item);
      });
      manipulatedChartData.push(heatMapData);
    }

    return manipulatedChartData;
  };
}
