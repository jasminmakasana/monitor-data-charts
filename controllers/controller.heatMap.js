import uPlot from "uplot";
import { legendPlugin } from "../plugins/plugin.legend";
import { tooltipsPlugin } from "../plugins/plugin.tooltip";
import { fmtDate, timeconversion } from "../helpers";

export default class HeatMapController {
  constructor(canvas, panalData, datasets, config) {
    this.chartElem = canvas;
    this._chart = {};
    this._chart = this.init(panalData, datasets, config);

    this.cursorMemo = {
      set: (left, top) => {
        cursLeft = left;
        cursTop = top;
      },
      get: () => ({ left: cursLeft, top: cursTop }),
    };
  }

  getColorForChart = (value) => {
    let colors = [
      "rgb(127, 39, 4)",
      "rgb(163, 53, 3)",
      "rgb(204, 69, 3)",
      "rgb(232, 94, 14)",
      "rgb(247, 125, 42)",
      "rgb(253, 156, 81)",
      "rgb(253, 185, 126)",
      "rgb(253, 212, 171)",
      "rgb(254, 231, 207)",
      "rgb(255, 245, 235)",
    ];
    if (value < 0 || (value > 0 && value < 5)) {
      return colors[0];
    } else if (value > 5 && value < 15) {
      return colors[1];
    } else if (value > 15 && value < 25) {
      return colors[2];
    } else if (value > 25 && value < 35) {
      return colors[3];
    } else if (value > 35 && value < 45) {
      return colors[4];
    } else if (value > 45 && value < 55) {
      return colors[5];
    } else if (value > 55 && value < 65) {
      return colors[6];
    } else if (value > 65 && value < 75) {
      return colors[7];
    } else if (value > 75 && value < 85) {
      return colors[8];
    } else if (value > 85) {
      return colors[9];
    }
  };

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
          }-Series`,
          fill: "#000",
          stroke: "#000",
          width: 4,
          value: (u, v) => v,
        });
      }
    });
    return series;
  };

  legendRenderContent = (panalData) => {
    return "";
  };

  tooltipRenderContent = (chartInstance, panalData, idx) => {
    return `
    <div style="font-size: 0.857143rem; background: rgb(34, 37, 43); padding: 8px ; text-align:left;" >
    <div  style="color:white;">${
      chartInstance.scales.x.time
        ? fmtDate(new Date(chartInstance.data[0][idx - 1]))
        : chartInstance.data[0][idx - 1].toFixed(2)
    } <br/>${
      chartInstance.scales.x.time
        ? fmtDate(new Date(chartInstance.data[0][idx]))
        : chartInstance.data[0][idx].toFixed(2)
    }</div>${chartInstance.series
      .map((item, index) => {
        if (index == 0) return null;
        return `<div  style="display: flex ; align-items: center;"><div style="color:white; padding-right:8px">${
          item.label
        }</div>
        <div data-testid="SeriesTableRow" class="css-1jryhhc" style="display: flex ; align-items: center;">
            <div
              data-testid="series-icon"
              class="css-1b6zmiv"
              style="
                background: ${this.getColorForChart(
                  chartInstance.data[index][idx]
                )};
                width: 14px;
                height: 4px;
                border-radius: 9999px;
                display: inline-block;
                margin-right: 8px;
                margin-top: 3px;
              "
            ></div>
            <div class="css-10mpqg5" style="color:white;">${
              chartInstance.data[index][idx]
            }</div>
        </div>
        </div>`;
      })
      .join("")}
      
    </div>
  </div>
  `;
  };

  makeChart(option, panalData, datasets, config) {
    const opts = {
      ...config,
      id: "heatmapChart",
      cursor: this.cursorMemo?.get(),
      drawOrder: ["series", "axes"],
      scales: {
        x: {
          time: option.time ?? true,
        },
      },
      axes: [{}, {}],
      legend: {
        show: true,
        markers: {
          width: 0,
        },
      },
      padding: [null, 0, null, 0],
      series: this.addSeries(panalData, datasets),
      plugins: [
        legendPlugin({
          count: datasets.length - 1,
          panalData: panalData,
          legendRenderContent: this.legendRenderContent,
          ...option,
        }),
        tooltipsPlugin({
          cursorMemo: this.cursorMemo,
          panalData: panalData,
          tooltipRenderContent: this.tooltipRenderContent,
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
          return this.getColorForChart(value);
        },
        stroke: (seriesIdx, dataIdx, value) => "none",
      },
      panalData,
      newData,
      configData
    );
  };
}
