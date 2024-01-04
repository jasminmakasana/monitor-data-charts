import { timeconversion } from "../helpers";
import uPlot from "uplot";

export function tooltipsPlugin(opts) {
  let cursortt;
  let seriestt;

  function init(u, opts, data) {
    let over = u.over;

    let tt = (cursortt = document.createElement("div"));
    tt.className = "tooltip";
    tt.textContent = "(x,y)";
    tt.style.pointerEvents = "none";
    tt.style.position = "absolute";
    tt.style.background = "rgba(0,0,255,0.1)";
    over.appendChild(tt);

    seriestt = opts.series.map((s, i) => {
      if (i == 0) return;

      let tt = document.createElement("div");
      tt.className = "tooltip";
      tt.textContent = "Tooltip!";
      tt.style.pointerEvents = "none";
      tt.style.position = "absolute";
      tt.style.background = "rgba(0,0,0,0.1)";
      tt.style.color = s.color;
      over.appendChild(tt);
      return tt;
    });

    function hideTips() {
      cursortt.style.display = "none";
      seriestt.forEach((tt, i) => {
        if (i == 0) return;

        tt.style.display = "none";
      });
    }

    function showTips() {
      cursortt.style.display = null;
      seriestt.forEach((tt, i) => {
        if (i == 0) return;

        let s = u.series[i];
        tt.style.display = s.show ? null : "none";
      });
    }

    over.addEventListener("mouseleave", () => {
      if (!u.cursor._lock) {
        //	u.setCursor({left: -10, top: -10});
        hideTips();
      }
    });

    over.addEventListener("mouseenter", () => {
      showTips();
    });

    if (u.cursor.left < 0) hideTips();
    else showTips();
  }

  function setCursor(u) {
    const { left, top, idx } = u.cursor;
    let fmtDate = uPlot.fmtDate("{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}");

    opts?.cursorMemo?.set(left, top);

    // this is here to handle if initial cursor position is set
    // not great (can be optimized by doing more enter/leave state transition tracking)
    //	if (left > 0)
    //		u.cursortt.style.display = null;

    cursortt.style.left = left + "px";
    cursortt.style.top = top + "px";
    cursortt.innerHTML = opts?.tooltipRenderContent(u, opts?.panalData, idx);

    // can optimize further by not applying styles if idx did not change
    seriestt.forEach((tt, i) => {
      if (i == 0) return;

      let s = u.series[i];

      if (s.show) {
        // this is here to handle if initial cursor position is set
        // not great (can be optimized by doing more enter/leave state transition tracking)
        //	if (left > 0)
        //		tt.style.display = null;

        let xVal = u.data[0][idx];
        let yVal = u.data[i][idx];

        tt.textContent = "(" + xVal + ", " + yVal + ")";

        tt.style.left = Math.round(u.valToPos(xVal, "x")) + "px";
        tt.style.top = Math.round(u.valToPos(yVal, s.scale)) + "px";
      }
    });
  }

  return {
    hooks: {
      init,
      setCursor,
      setScale: [
        (u, key) => {
          console.log("setScale", key);
        },
      ],
      setSeries: [
        (u, idx) => {
          console.log("setSeries", idx);
        },
      ],
    },
  };
}
