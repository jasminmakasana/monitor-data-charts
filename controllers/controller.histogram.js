import uPlot from "uplot";

export default class HistorgramController {
  constructor(canvas, datasets, config) {
    let bucketIncr = 5;
    let histOffset = 0;
    const { height, width } = config;
    const histBucket = (v) =>
      this.incrRoundDn(v - histOffset, bucketIncr) + histOffset;
    const histFilter = [null];
    const histSort = (a, b) => a - b;
    const hist = this.aggAll(datasets, histBucket, histFilter, histSort);
    let bars = uPlot.paths.bars({ align: 1, size: [1, Infinity], gap: 1 });
    const opts = {
      ...config,
      width: width,
      height: height,
      scales: {
        x: {
          time: false,
          auto: false,
          dir: 1,
          range: (u) => [
            u.data[0][0],
            u.data[0][u.data[0].length - 1] + bucketIncr,
          ],
        },
      },
      axes: [
        {
          incrs: () =>
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mult) => mult * bucketIncr),
          splits: (u, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace) => {
            let minSpace = u.axes[axisIdx]._space;
            let bucketWidth =
              u.valToPos(u.data[0][0] + bucketIncr, "x") -
              u.valToPos(u.data[0][0], "x");
            let firstSplit = u.data[0][0];
            let lastSplit = u.data[0][u.data[0].length - 1] + bucketIncr;
            let splits = [];
            let skip = Math.ceil(minSpace / bucketWidth);
            for (
              let i = 0, s = firstSplit;
              s <= lastSplit;
              i++, s += bucketIncr
            )
              !(i % skip) && splits.push(s);
            return splits;
          },
        },
      ],
      series: [
        {},
        {
          paths: bars,
          points: {
            show: false,
          },
          fill: "rgba(82, 217, 0, 0.5)",
          stroke: "rgba(82, 217, 0, 0.5)",
          width: 1,
        },
      ],
    };
    new uPlot(opts, hist, canvas);
  }

  histogram(vals, bucket, filter, sort) {
    let hist = new Map();
    for (let i = 0; i < vals.length; i++) {
      let v = vals[i];
      if (v != null) v = bucket(v);
      let entry = hist.get(v);
      if (entry) entry.count++;
      else hist.set(v, { value: v, count: 1 });
    }

    filter && filter.forEach((v) => hist.delete(v));
    let bins = [...hist.values()];
    sort && bins.sort((a, b) => sort(a.value, b.value));
    let values = Array(bins.length);
    let counts = Array(bins.length);
    for (let i = 0; i < bins.length; i++) {
      values[i] = bins[i].value;
      counts[i] = bins[i].count;
    }
    return [values, counts];
  }

  aggAll(data = this.props.barData, round, filter, sort) {
    let allVals = [].concat(...data[1]);
    return this.histogram(allVals, round, filter, sort);
  }

  roundDec(val, dec = 0) {
    const { round } = Math;
    const isInt = Number.isInteger;
    if (isInt(val)) return val;
    let p = 10 ** dec;
    let n = val * p * (1 + Number.EPSILON);
    return round(n) / p;
  }

  fixFloat = (v) => this.roundDec(v, 14);

  incrRoundDn(num, incr) {
    const { floor } = Math;
    return this.fixFloat(floor(this.fixFloat(num / incr)) * incr);
  }
}
