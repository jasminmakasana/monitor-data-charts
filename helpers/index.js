export function _isDomSupported() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export const numberToFixed = (data) => {
  return Number(data.toFixed(2));
};

export const calculateChartJSData = (data, calcType) => {
  data = data.frames[0].data.values[1];
  if (calcType === "lastNotNull") {
    return numberToFixed(data.filter((x) => x !== null).slice(-1)[0]);
  } else if (calcType === "last") {
    return numberToFixed(data[data.length - 1]);
  } else if (calcType === "firstNotNull") {
    return numberToFixed(data.find((el) => el !== undefined || null));
  } else if (calcType === "first") {
    return numberToFixed(data[0]);
  } else if (calcType === "min") {
    return numberToFixed(Math.min(...data));
  } else if (calcType === "max") {
    return numberToFixed(Math.max(...data));
  } else if (calcType === "mean") {
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    return numberToFixed(avg);
  } else if (calcType === "variance") {
    const sum = data.reduce((acc, val) => acc + val);
    const length = data.length;
    const median = sum / length;
    let variance = 0;
    data.forEach((num) => {
      variance += (num - median) * (num - median);
    });
    variance /= length;
    return numberToFixed(variance);
  } else if (calcType === "stdDev") {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b) / n;
    return numberToFixed(
      Math.sqrt(
        data.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      )
    );
  } else if (calcType === "sum") {
    return numberToFixed(data.reduce((acc, val) => acc + val));
  } else if (calcType === "count") {
    return data.length;
  } else if (calcType === "range") {
    const min = numberToFixed(Math.min(...data));
    const max = numberToFixed(Math.max(...data));
    return numberToFixed(Math.abs(max - min));
  } else if (calcType === "diff") {
    const first = data[0];
    const last = data[data.length - 1];
    return numberToFixed(Math.abs(first - last));
  } else if (calcType === "diffperc") {
    const first = data[0];
    const last = data[data.length - 1];
    return numberToFixed(100 * Math.abs((first - last) / ((first + last) / 2)));
  }
};
