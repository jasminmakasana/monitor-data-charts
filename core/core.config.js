import * as _config from "../config/index";

class Config {
  constructor(grafanaData, type) {
    this.chartData = null;
    if (type === "bar") {
      this.chartData = _config.BarConfig.manipulateData(grafanaData);
    }
  }
}
export default Config;
