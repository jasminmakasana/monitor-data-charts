import * as AllConfigs from "../config/index";
import constants from "../constants/common";

class Config {
  constructor(grafanaData, chartConfig, panalData = {}) {
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
        this.options = {
          ...constants.defaultOption[chartConfig.type],
          ...chartConfig.options,
        };
        this.chartData = AllConfigs.PieChartConfig.manipulateData(
          grafanaData,
          panalData
        );
      } else {
        throw new Error("panal data not available please provide panal data");
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
        this.options = {
          ...constants.defaultOption[chartConfig.type],
          ...chartConfig.options,
        };
        this.chartData = AllConfigs.BarGuageConfig.manipulateData(
          grafanaData,
          panalData
        );
      } else {
        throw new Error("panal data not available please provide panal data");
      }
    }
  }
}
export default Config;
