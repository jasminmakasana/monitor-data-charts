import { calculateChartJSData } from "../helpers";

export default class StateTimelineConfig {
  static manipulateData = (chartData) => {
    let data = chartData.results;
    let manipulatedChartData = [[]];
    for (const key in data) {
      manipulatedChartData[0] = [];
      let StateTimelineData = [];
      data[key].frames[0].data.values[1].forEach((item, i) => {
        manipulatedChartData[0].push(data[key].frames[0].data.values[0][i]);
        StateTimelineData.push(item);
      });
      manipulatedChartData.push(StateTimelineData);
    }
    return manipulatedChartData;
  };
}
