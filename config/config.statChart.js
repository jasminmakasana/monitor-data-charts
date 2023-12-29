export default class StatChartConfig {
  static manipulateData = (panelData) => {
    let data = panelData.results;
    let color = `#73bf69`;
    let length = Object.keys(data).length;
    const statDataSet = [];
    for (const key in data) {
      let currentStat;
      if (color === `#73bf69`) {
        color = `#f2495c`;
      } else {
        color = `#73bf69`;
      }
      let manipulatedChartData = [[]];
      let panelData = [];
      data[key].frames[0].data.values[1].forEach((item, i) => {
        manipulatedChartData[0].push(data[key].frames[0].data.values[0][i]);
        panelData.push(item);
        if (i === data[key].frames[0].data.values[1].length - 1) {
          currentStat = item;
        }
      });
      manipulatedChartData.push(panelData);
      statDataSet.push({
        manipulatedChartData,
        color,
        length,
        key,
        currentStat,
      });
    }
    return statDataSet;
  };
}
