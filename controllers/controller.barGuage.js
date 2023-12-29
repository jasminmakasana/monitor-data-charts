import Chart from "chart.js/auto";

export default class BarGuageController {
  constructor(canvas, datasets, config) {
    const mainDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const canvasElem = document.createElement("canvas");

    mainDiv.style = "width: 100%; height: 100%; text-align: center;";
    canvasElem.style = "objectFit: contain;";
    canvasElem.id = `pieChart${Math.random() + Math.random()}`;
    innerDiv.style = "height: 100%; width: fit-content; margin: 0 auto";

    canvas.append(mainDiv);
    mainDiv.append(innerDiv);
    innerDiv.append(canvasElem);

    this._chart = new Chart(canvasElem, {
      type: "bar",
      data: {
        labels: datasets[0],
        datasets: [
          {
            label: "",
            data: datasets[1],
            ...config,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
