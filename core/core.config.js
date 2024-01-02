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
      if (panalData?.options?.reduceOptions?.calcs !== undefined) {
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
      if (panalData?.options?.reduceOptions?.calcs !== undefined) {
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
    } else if (chartConfig.type === constants.ChartTypes.STATE_TIMELINE) {
      if (
        panalData?.targets !== undefined &&
        Array.isArray(panalData?.targets) &&
        panalData?.targets.length > 0
      ) {
        this.options = {
          ...constants.defaultOption[chartConfig.type],
          ...chartConfig.options,
        };
        this.chartData = AllConfigs.StateTimeline.manipulateData(grafanaData);
      } else {
        throw new Error("panal data not available please provide panal data");
      }
    }
  }
}
export default Config;
