import uPlot from "uplot";

export default class TimeSeriesController {
  constructor(canvas, datasets, config) {
    this._chart = new uPlot(
      { ...config, series: this.addSeries(datasets) },
      datasets,
      canvas
    );
  }
  addSeries = (datasets) => {
    let series = [];
    let colors = [
      "#bca01b",
      "#53CA43",
      "#384CFF",
      "#FF708B",
      "#A65E2E",
      "#924E7D",
      "#5D9B9B",
      "#9C9C9C",
      "#E55137",
      "#354D73",
    ];
    datasets.forEach((item, index) => {
      if (index === 0) {
        series.push({});
      } else {
        series.push({
          stroke: colors[index - 1],
          paths: uPlot.paths.linear(),
        });
      }
    });
    return series;
  };
}
