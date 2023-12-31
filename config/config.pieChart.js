import { calculateChartJSData } from "../helpers";

export default class PieChartConfig {
  static manipulateData = (chartData, panalData) => {
    let manipulateData = [];
    let calcType = panalData.options.reduceOptions.calcs[0];
    let pieData = chartData.results;
    let labels = [];
    let pieChartData = [];
    for (const property in pieData) {
      labels.push(`${property}-Series`);
      pieChartData.push(calculateChartJSData(pieData[property], calcType));
    }
    manipulateData.push(labels, pieChartData);
    return manipulateData;
  };
}
