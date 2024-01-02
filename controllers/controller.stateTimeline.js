import uPlot from "uplot";
import { timelinePlugin } from "../helpers/quadtree";

export default class StateTimelineController {
  constructor(canvas, panalData, datasets, config) {
    this.chartElem = canvas;
    this._chart = {};
    const { height, width } = config;
    this._chart = this.init(panalData, datasets, config);
  }
  addSeries = (panalData, datasets) => {
    let series = [];
    datasets.forEach((item, index) => {
      if (index === 0) {
        series.push({
          label: "Time",
        });
      } else {
        series.push({
          label: `${
            datasets.length > 2 ? panalData.targets[index - 1].refId : "A"
          }-Series   `,
          fill: "#000",
          stroke: "#000",
          width: 4,
          value: (u, v) => v,
        });
      }
    });
    return series;
  };

  makeChart(option, panalData, datasets, config) {
    const opts = {
      ...config,
      drawOrder: ["series", "axes"],
      scales: {
        x: {
          time: option.time ?? true,
        },
      },
      axes: [{}, {}],
      legend: {
        show: true,
      },
      padding: [null, 0, null, 0],
      series: this.addSeries(panalData, datasets),
      plugins: [
        timelinePlugin({
          count: datasets.length - 1,
          panalData: panalData,
          ...option,
        }),
      ],
    };

    new uPlot(opts, datasets, this.chartElem);
  }

  init = (panalData, datasets, configData) => {
    this.chartElem.innerHTML = "";

    let newData = JSON.parse(JSON.stringify(datasets));

    for (let i = 0; i < newData.length; i++) {
      if (i === 0) {
        continue;
      }
      newData[i] = newData[i].map((item) => Number(item.toFixed(1)));
    }

    this.makeChart(
      {
        mode: 1,
        fill: (seriesIdx, dataIdx, value) => {
          const stepsArray =
            JSON.parse(
              JSON.stringify(
                panalData?.fieldConfig?.defaults?.thresholds?.steps
              )
            ).reverse() ?? [];

          if (Array.isArray(stepsArray) && stepsArray.length > 0) {
            const getColor = stepsArray.find((e) => {
              return e.value === value || e.value < value;
            });
            return getColor && getColor.color ? getColor.color : "green";
          } else {
            let r =
              value < 50
                ? 255
                : Math.floor(255 - ((value * 2 - 100) * 255) / 100);
            let g = value > 50 ? 255 : Math.floor((value * 2 * 255) / 100);
            return "rgb(" + g * (1 - 0.15) + "," + r * (1 - 0.15) + ",0)";
          }
        },
        stroke: (seriesIdx, dataIdx, value) => "none",
      },
      panalData,
      newData,
      configData
    );
  };
}
