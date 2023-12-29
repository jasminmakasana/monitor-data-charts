import { calculateChartJSData } from "../helpers";

export default class BarGuageConfig {
  static manipulateData = (chartData, panalData) => {
    let manipulateData = [];
    let calcType = panalData.options.reduceOptions.calcs[0];
    let pieData = chartData.results;
    let labels = [];
    let barGuagechartData = [];
    for (const property in pieData) {
      labels.push(`${property}-Series`);
      barGuagechartData.push(calculateChartJSData(pieData[property], calcType));
    }
    manipulateData.push(labels, barGuagechartData);
    return manipulateData;
  };
}
