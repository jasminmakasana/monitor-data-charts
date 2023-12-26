import * as controllers from "./controllers/index.js";
import Config from "./core/core.config.js";

export function _isDomSupported() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function getCanvas(item) {
  if (_isDomSupported() && typeof item === "string") {
    item = document.getElementById(item);
  } else if (item && item.length) {
    // Support for array based queries (such as jQuery)
    item = item[0];
  }

  if (item && item.canvas) {
    // Support for any object associated to a canvas (including a context2d)
    item = item.canvas;
  }
  return item;
}

export default class Ichart {
  constructor(item, grafanaResponse, chartConfig) {
    const initialCanvas = getCanvas(item);
    const data = new Config(grafanaResponse, chartConfig.type);
    const chart = new controllers.BarController(
      initialCanvas,
      data.chartData,
      chartConfig
    );
  }
}
module.export = getCanvas;
