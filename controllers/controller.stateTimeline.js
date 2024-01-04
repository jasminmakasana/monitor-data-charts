import uPlot from "uplot";
import { legendPlugin } from "../plugins/plugin.legend";
import { tooltipsPlugin } from "../plugins/plugin.tooltip";
import { fmtDate, timeconversion } from "../helpers";

export default class StateTimelineController {
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
    return `
    <ul class="css-14m29r0">
      ${(
        JSON.parse(
          JSON.stringify(panalData?.fieldConfig?.defaults?.thresholds?.steps)
        ) ?? []
      )
        .map((e, index, arr) => {
          return `<li class="css-1baulvz">
        <div
            class="css-olan4g-LegendItemWrapper"
            aria-label="VizLegend series < 90"
            style="padding-right: 10px; display: flex; align-items: center;"
          >
            <div
              data-testid="series-icon"
              class="css-140ea9t"
              style="
                background: ${e.color};
                width: 14px;
                height: 4px;
                border-radius: 9999px;
                display: inline-block;
                margin-right: 8px;
                margin-top: 3px
              "
            ></div>
            <div
              class="css-efzvgr-LegendLabel"
            >
              ${index === 0 ? `&lt; ${arr[1].value}` : `${e.value}+`}
            </div>
          </div>
        
      </li>`;
        })
        .join("")}
    </ul>
`;
  };

  tooltipRenderContent = (chartInstance, panalData, idx) => {
    return `
    <div style="font-size: 0.857143rem; background: rgb(34, 37, 43); padding: 8px ; text-align:left;" >
      ${chartInstance.series
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
                background: ${
                  (
                    JSON.parse(
                      JSON.stringify(
                        panalData?.fieldConfig?.defaults?.thresholds?.steps
                      )
                    ).reverse() ?? []
                  ).find((e) => {
                    return (
                      e.value === chartInstance.data[index][idx] ||
                      e.value < chartInstance.data[index][idx]
                    );
                  })?.color ?? "rgb(234, 184, 57)"
                };
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
      <div  style="color:white;">From <strong>${
        chartInstance.scales.x.time
          ? fmtDate(new Date(chartInstance.data[0][idx - 1]))
          : chartInstance.data[0][idx - 1].toFixed(2)
      }</strong> to
      <strong>${
        chartInstance.scales.x.time
          ? fmtDate(new Date(chartInstance.data[0][idx]))
          : chartInstance.data[0][idx].toFixed(2)
      }</strong><br /><strong>Duration:</strong>${
      chartInstance.scales.x.time
        ? timeconversion(
            chartInstance.data[0][idx] - chartInstance.data[0][idx - 1]
          )
        : timeconversion(
            (
              chartInstance.data[0][idx] - chartInstance.data[0][idx - 1]
            ).toFixed(2)
          )
    }</div>
    </div>
  </div>
  `;
  };

  makeChart(option, panalData, datasets, config) {
    const opts = {
      ...config,
      id: "stateTimelineChart",
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
