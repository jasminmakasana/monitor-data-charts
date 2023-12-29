import uPlot from "uplot";

export default class StatChartController {
  constructor(canvas, datasets, config) {
    this._chart = {};
    datasets.forEach((dataItem, index) => {
      const mainDivElem = document.createElement("div");
      const divElem = document.createElement("div");
      const strongElem = document.createElement("strong");
      const textElem = document.createElement("p");
      divElem.id = `statChartElement-${index}`;
      divElem.style = "height: 38.5%;";
      strongElem.style = `font-size: 5em;max-height: 40%;margin: 0;font-weight: bold;color: ${dataItem.color};text-align: center;display: block;width: 100%`;
      strongElem.innerHTML = dataItem.currentStat.toFixed(1);
      textElem.innerHTML = `${dataItem.key}-Series`;
      mainDivElem.classList.add = "stat-box";
      mainDivElem.style = `padding: 1px;flex: 1 1 160px;width:
      ${
        dataItem.length === 1
          ? "100%"
          : dataItem.length === 2
          ? "50%"
          : dataItem.length === 3
          ? "33.3%"
          : "25%"
      }`;
      mainDivElem.appendChild(textElem);
      mainDivElem.appendChild(strongElem);
      mainDivElem.appendChild(divElem);

      canvas.appendChild(mainDivElem);
      new uPlot(
        { ...config, series: this.addSeries(dataItem) },
        dataItem.manipulatedChartData,
        document.getElementById(`statChartElement-${index}`)
      );
    });
  }
  addSeries = (datasets) => {
    let series = [];
    datasets.manipulatedChartData.forEach((index) => {
      if (index === 0) {
        series.push({});
      } else {
        series.push({
          stroke: datasets.color,
          fill: `${datasets.color}60`,
          paths: uPlot.paths.linear(),
        });
      }
    });
    return series;
  };
}
