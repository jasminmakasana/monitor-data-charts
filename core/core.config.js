import * as AllConfigs from "../config/index";
import constants from "../constants/common";

class Config {
  constructor(grafanaData, chartConfig) {
    this.chartData = {};
    this.options = {};
    if (chartConfig.type === constants.ChartTypes.BAR_CHART) {
      this.options = {
        ...constants.defaultOption[chartConfig.type],
        ...chartConfig.options,
      };
      this.chartData = AllConfigs.BarConfig.manipulateData(grafanaData);
    } else if (chartConfig.type === constants.ChartTypes.TIME_SERIES) {
      this.options = {
        ...constants.defaultOption[chartConfig.type],
        ...chartConfig.options,
      };
      this.chartData = AllConfigs.TimeSeriesConfig.manipulateData(grafanaData);
    } else if (chartConfig.type === constants.ChartTypes.STAT) {
      this.options = {
        ...constants.defaultOption[chartConfig.type],
        ...chartConfig.options,
      };
      this.chartData = AllConfigs.StatChartConfig.manipulateData(grafanaData);
    }
  }
}
export default Config;
