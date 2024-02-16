import { _isDomSupported } from "../helpers";

export const ChartTypes = {
  BAR_CHART: "barchart",
  TIME_SERIES: "timeseries",
  TABLE: "table",
  PIE_CHART: "piechart",
  STAT: "stat",
  GAUGE: "gauge",
  BAR_GUAGE: "bargauge",
  STATE_TIMELINE: "state-timeline",
  HEATMAP: "heatmap",
  HISTOGRAM: "histogram",
  CANDLESTICK: "candlestick",
};

const calculateHeight = (height = false) => {
  if (height) {
    return height;
  } else if (_isDomSupported()) {
    const calHeight = window.screen.height;
    if (calHeight) {
      return calHeight - 500;
    } else {
      return 300;
    }
  }
  return 300;
};

export const defaultOption = {
  barchart: {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
    pxAlign: false,
    select: {
      show: true,
    },
    scales: {
      x: {
        time: false,
      },
    },
    legend: {
      show: false,
    },
    axes: [
      {
        show: false,
      },
      {
        show: true,
      },
    ],
  },
  timeseries: {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
    select: {
      show: true,
    },
    scales: {
      x: {
        time: false,
      },
    },
    legend: {
      show: false,
    },
    axes: [
      {
        show: true,
        values(self, splits) {
          return splits.map((s) => {
            const time = new Date(s);
            return `${String(time.getHours()).padStart(2, "0")} : ${String(
              time.getMinutes()
            ).padStart(2, "0")} `;
          });
        },
      },
      {
        show: true,
      },
    ],
  },
  stat: {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
    cursor: {
      show: false,
    },
    select: {
      show: false,
    },
    legend: {
      show: false,
    },
    scales: {
      x: {
        time: false,
      },
    },
    axes: [
      {
        show: false,
      },
      {
        show: false,
      },
    ],
  },
  piechart: {
    backgroundColor: [
      "#bca01b",
      "#53CA43",
      "#384CFF",
      "#FF708B",
      "#A65E2E",
      "#924E7D",
      "#5D9B9B",
      "#9C9C9C",
      "#E55137",
      "#354D73",
    ],
    borderWidth: 1,
  },
  bargauge: { backgroundColor: ["#53CA43"], borderWidth: 1 },
  "state-timeline": {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
  },
  gauge: { backgroundColor: ["#53CA43"], borderWidth: 1 },
  "state-timeline": {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
  },
  heatmap: {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
  },
  histogram: {
    height: calculateHeight(),
    width: window !== undefined ? window.innerWidth : 300,
  },
};
export default {
  ChartTypes,
  defaultOption,
};
