import { calculateChartJSData } from "../helpers";

export default class GuageConfig {
  static manipulateData = (chartData, panalData) => {
    let manipulateData = [];
    let calcType = panalData.options.reduceOptions.calcs[0];
    let gaugeData = chartData.results;
    let length = Object.keys(gaugeData).length;
    const JSX = [];
    let index = 0;
    for (const property in gaugeData) {
      manipulateData.push({
        label: `${property}-Series`,
        number: calculateChartJSData(gaugeData[property], calcType),
        id: `Gauge-${index}`,
      });
      index++;
    }

    return {
      manipulateData,
      length,
    };
  };
}
