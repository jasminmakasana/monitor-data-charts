import uPlot from "uplot";

export default class BarController {
  constructor(canvas, barData, config) {
    this._chart = new uPlot(
      { ...config, series: this.addSeries(barData) },
      barData,
      canvas
    );
    debugger
  }
  addSeries = (barData) => {
    let series = [];
    let colors = [
      "#bca01b",
      "#53CA43",
      "#FF708B",
      "#A65E2E",
      "#924E7D",
      "#5D9B9B",
      "#9C9C9C",
      "#E55137",
      "#354D73",
      "#384CFF",
    ];
    barData.forEach((item, index) => {
      if (index === 0) {
        series.push({});
      } else {
        series.push({
          stroke: colors[index - 1],
          paths: uPlot.paths.bars(),
        });
      }
    });
    return series;
  };
}
