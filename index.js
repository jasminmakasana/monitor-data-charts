import Config from "./core/core.config.js";
import * as controllers from "./controllers/index";
import constants from "./constants/common";
import { _isDomSupported } from "./helpers";
import "uplot/dist/uPlot.min.css";

function getCanvas(item) {
  if (item instanceof HTMLElement) {
    item = item;
  } else if (halpers._isDomSupported() && typeof item === "string") {
    if (document.getElementById(item) instanceof HTMLElement) {
      item = document.getElementById(item);
    } else if (
      document.getElementsByClassName(item)[0] instanceof HTMLElement
    ) {
      item = document.getElementsByClassName(item)[0];
    } else if (document.getElementsByName(item)[0] instanceof HTMLElement) {
      item = document.getElementsByName(item)[0];
    } else if (document.getElementsByTagName(item)[0] instanceof HTMLElement) {
      item = document.getElementsByTagName(item)[0];
    } else if (document.querySelector(item) instanceof HTMLElement) {
      item = document.querySelector(item);
    } else if (document.querySelectorAll(item)[0] instanceof HTMLElement) {
      item = document.querySelectorAll(item)[0];
    }
  } else if (item && item.length && item[0] instanceof HTMLElement) {
    item = item[0];
  }
  return item;
}

export default class Ichart {
  constructor(item, grafanaResponse, chartConfig, panalData = {}) {
    this.chart = {};
    const initialCanvas = getCanvas(item);
    if (initialCanvas && initialCanvas instanceof HTMLElement) {
      const { chartData, options } = new Config(
        grafanaResponse,
        chartConfig || {},
        panalData
      );
      if (chartConfig.type === constants.ChartTypes.BAR_CHART) {
        this.chart = new controllers.BarController(
          initialCanvas,
          chartData,
          options
        )._chart;
      } else if (chartConfig.type === constants.ChartTypes.TIME_SERIES) {
        this.chart = new controllers.TimeSeriesController(
          initialCanvas,
          chartData,
          options
        )._chart;
      } else if (chartConfig.type === constants.ChartTypes.STAT) {
        this.chart = new controllers.StatChartController(
          initialCanvas,
          chartData,
          options
        )._chart;
      } else if (chartConfig.type === constants.ChartTypes.PIE_CHART) {
        if (
          Object.keys(panalData).length > 0 &&
          Object.prototype.hasOwnProperty.call(panalData, "options") &&
          Object.prototype.hasOwnProperty.call(
            panalData.options,
            "reduceOptions"
          ) &&
          panalData.options.reduceOptions.calcs
        ) {
          this.chart = new controllers.PieChartController(
            initialCanvas,
            chartData,
            options
          )._chart;
        }
      } else if (chartConfig.type === constants.ChartTypes.BAR_GUAGE) {
        if (
          Object.keys(panalData).length > 0 &&
          Object.prototype.hasOwnProperty.call(panalData, "options") &&
          Object.prototype.hasOwnProperty.call(
            panalData.options,
            "reduceOptions"
          ) &&
          panalData.options.reduceOptions.calcs
        ) {
          this.chart = new controllers.BarGuageController(
            initialCanvas,
            chartData,
            options
          )._chart;
        }
      }
      if (window !== undefined) {
        window.chart = this.chart;
      }
    } else {
      throw new Error("render element not available");
    }
  }
}
