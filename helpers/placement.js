"use strict";
var NAMES = {
  size: ["height", "width"],
  clientSize: ["clientHeight", "clientWidth"],
  offsetSize: ["offsetHeight", "offsetWidth"],
  maxSize: ["maxHeight", "maxWidth"],
  before: ["top", "left"],
  marginBefore: ["marginTop", "marginLeft"],
  after: ["bottom", "right"],
  marginAfter: ["marginBottom", "marginRight"],
  scrollOffset: ["pageYOffset", "pageXOffset"],
};
function normalizeRect(e) {
  return { top: e.top, bottom: e.bottom, left: e.left, right: e.right };
}
function index(e, t, o, r, a) {
  void 0 === o && (o = "bottom"),
    void 0 === r && (r = "center"),
    void 0 === a && (a = {}),
    (t instanceof Element || t instanceof Range) &&
      (t = normalizeRect(t.getBoundingClientRect()));
  var f = Object.assign(
      { top: t.bottom, bottom: t.top, left: t.right, right: t.left },
      t
    ),
    i = {
      top: 0,
      left: 0,
      bottom: window.innerHeight,
      right: window.innerWidth,
    };
  a.bound &&
    ((a.bound instanceof Element || a.bound instanceof Range) &&
      (a.bound = normalizeRect(a.bound.getBoundingClientRect())),
    Object.assign(i, a.bound));
  var n = getComputedStyle(e),
    s = {},
    l = {};
  for (var m in NAMES)
    (s[m] = NAMES[m]["top" === o || "bottom" === o ? 0 : 1]),
      (l[m] = NAMES[m]["top" === o || "bottom" === o ? 1 : 0]);
  (e.style.position = "absolute"),
    (e.style.maxWidth = ""),
    (e.style.maxHeight = "");
  var b = parseInt(n[l.marginBefore]),
    g = parseInt(n[l.marginAfter]),
    d = b + g,
    c = i[l.after] - i[l.before] - d,
    p = parseInt(n[l.maxSize]);
  (!p || c < p) && (e.style[l.maxSize] = c + "px");
  var u = parseInt(n[s.marginBefore]) + parseInt(n[s.marginAfter]),
    h = f[s.before] - i[s.before] - u,
    x = i[s.after] - f[s.after] - u;
  ((o === s.before && e[s.offsetSize] > h) ||
    (o === s.after && e[s.offsetSize] > x)) &&
    (o = h > x ? s.before : s.after);
  var S = o === s.before ? h : x,
    z = parseInt(n[s.maxSize]);
  (!z || S < z) && (e.style[s.maxSize] = S + "px");
  var y = window[s.scrollOffset],
    v = function (t) {
      return Math.max(
        i[s.before],
        Math.min(t, i[s.after] - e[s.offsetSize] - u)
      );
    };
  o === s.before
    ? ((e.style[s.before] = y + v(f[s.before] - e[s.offsetSize] - u) + "px"),
      (e.style[s.after] = "auto"))
    : ((e.style[s.before] = y + v(f[s.after]) + "px"),
      (e.style[s.after] = "auto"));
  var w = window[l.scrollOffset],
    M = function (t) {
      return Math.max(
        i[l.before],
        Math.min(t, i[l.after] - e[l.offsetSize] - d)
      );
    };
  switch (r) {
    case "start":
      (e.style[l.before] = w + M(f[l.before] - b) + "px"),
        (e.style[l.after] = "auto");
      break;
    case "end":
      (e.style[l.before] = "auto"),
        (e.style[l.after] =
          w +
          M(document.documentElement[l.clientSize] - f[l.after] - g) +
          "px");
      break;
    default:
      var R = f[l.after] - f[l.before];
      (e.style[l.before] =
        w + M(f[l.before] + R / 2 - e[l.offsetSize] / 2 - b) + "px"),
        (e.style[l.after] = "auto");
  }
  (e.dataset.side = o), (e.dataset.align = r);
}
module.exports = index;
