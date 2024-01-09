import Chart from "chart.js/auto";

export default class GuageController {
  constructor(canvas, panalData, datasets, config) {
    this.dataArray = datasets.manipulateData.map((e) => e.number);
    this.maxValue = this.dataArray.sort((a, b) => a - b)[
      this.dataArray.length - 1
    ];
    const baseElem = document.createElement("div");
    baseElem.style =
      "display: flex;flex-wrap: wrap;padding-left: 15px;padding-right: 15px;height: 100%;overflow-y: auto;";

    canvas.append(baseElem);

    datasets.manipulateData.forEach((gaugaData, index) => {
      const parentElem = document.createElement("div");
      parentElem.classList.add("gauge-box");
      parentElem.style = `width:
        ${
          datasets.length === 1
            ? "100%"
            : datasets.length === 2
            ? "50%"
            : datasets.length === 3
            ? "33.3%"
            : "25%"
        };max-height: 100%;padding: 10px;flex: 1 1 260px`;
      const mainDiv = document.createElement("div");
      const innerDiv = document.createElement("div");
      const canvasElem = document.createElement("canvas");

      mainDiv.style = "width: 100%; height: 100%; text-align: center;";
      canvasElem.style = "objectFit: contain;";
      canvasElem.id = `${gaugaData.id}`;
      innerDiv.style = "height: 100%; width: fit-content; margin: 0 auto";
      baseElem.append(parentElem);
      parentElem.append(mainDiv);
      mainDiv.append(innerDiv);
      innerDiv.append(canvasElem);

      const ctx = document.getElementById(gaugaData.id);
      const { label, number } = gaugaData;
      const gaugeChartText = {
        id: "gaugeChartText",
        afterDatasetsDraw(chart) {
          const { ctx } = chart;

          ctx.save();
          const xCoor = chart.getDatasetMeta(0).data[0].x;
          const yCoor = chart.getDatasetMeta(0).data[0].y;

          ctx.font = "2rem sans-serif";
          ctx.fillStyle =
            chart?.config?._config?.data?.datasets[0]?.color !== "undefined"
              ? chart.config._config.data.datasets[0].color
              : "gray";
          ctx.textAlign = "center";
          ctx.fillText(`${number}`, xCoor, yCoor - 40);

          ctx.font = "1.2rem sans-serif";
          ctx.fillStyle = "gray";
          ctx.textAlign = "center";
          ctx.fillText(`${label}`, xCoor, yCoor + 20);
        },
      };

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: number,
          datasets: [
            {
              data: this.renderBorderContent(panalData, "value"),
              backgroundColor: this.renderBorderContent(panalData, "color"),
              borderWidth: 1,
              cutout: "90%",
              circumference: 180,
              rotation: 270,
            },
            {
              data: this.handleChartDrow(panalData, number).value,
              ...config,
              backgroundColor: this.handleChartDrow(panalData, number).color,
              color: this.findChartColor(panalData, number),
              borderWidth: 0,
              cutout: "70%",
              circumference: 180,
              rotation: 270,
            },
          ],
        },

        options: {
          animation: {
            animateRotate: true,
            animateScale: false,
          },
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          cutoutPercentage: 80,
        },
        plugins: [gaugeChartText],
      });
    });
  }

  renderBorderContent = (panalData, key) => {
    if (
      panalData?.fieldConfig?.defaults?.color?.mode !== "undefined" &&
      panalData?.fieldConfig?.defaults?.color?.mode === "thresholds" &&
      panalData?.fieldConfig?.defaults?.thresholds?.steps !== "undefined"
    ) {
      if (key === "color") {
        const dataObject = (
          panalData?.fieldConfig?.defaults?.thresholds?.steps ?? []
        ).map((e) => e[key]);
        return dataObject;
      } else {
        const dataObject = (
          panalData?.fieldConfig?.defaults?.thresholds?.steps ?? []
        ).map((e, i, arr) => {
          if (i === arr.length - 1) {
            return this.maxValue;
          } else {
            return arr[i + 1][key];
          }
        });
        return dataObject;
      }
    }
    return [];
  };

  findChartColor = (panalData, number) => {
    let color = "#53CA43";
    if (
      panalData?.fieldConfig?.defaults?.color?.mode !== "undefined" &&
      panalData?.fieldConfig?.defaults?.color?.mode === "thresholds" &&
      panalData?.fieldConfig?.defaults?.thresholds?.steps !== "undefined"
    ) {
      color =
        JSON.parse(
          JSON.stringify(
            panalData?.fieldConfig?.defaults?.thresholds?.steps ?? []
          )
        )
          .reverse()
          .find((e) => e.value === number || e.value < number)?.color ??
        panalData?.fieldConfig?.defaults?.thresholds?.steps[0].color;
    }
    return color;
  };

  handleChartDrow = (panalData, number) => {
    if (
      panalData?.fieldConfig?.defaults?.color?.mode !== "undefined" &&
      panalData?.fieldConfig?.defaults?.color?.mode === "thresholds" &&
      panalData?.fieldConfig?.defaults?.thresholds?.steps !== "undefined"
    ) {
      const chartColor = this.findChartColor(panalData, number);
      const colorObject = ["#555", "#555", "#555", "#555"];
      const mainArray = this.renderBorderContent(panalData, "value");
      const arrObject = JSON.parse(JSON.stringify(mainArray));
      const foundIndex = JSON.parse(
        JSON.stringify(
          panalData?.fieldConfig?.defaults?.thresholds?.steps ?? []
        )
      ).findIndex((e, i, arr) => {
        if (i === arr.length - 1) return i;
        return arr[i + 1].value && number <= arr[i + 1].value;
      });
      if (foundIndex === arrObject.length - 1) {
        arrObject.splice(foundIndex - 1, 1, arrObject[foundIndex - 1] + number);
        arrObject.splice(foundIndex, 1, mainArray[foundIndex] - number);
      } else {
        arrObject.splice(foundIndex, 1, number);
        arrObject.splice(
          foundIndex + 1,
          1,
          arrObject[foundIndex + 1] + (mainArray[foundIndex] - number)
        );
      }
      return {
        value: arrObject,
        color: colorObject.map((colorElem, colorIndex) => {
          if (mainArray[mainArray.length - 1] === number) {
            return chartColor;
          } else {
            if (mainArray[mainArray.length - 2] < number) {
              if (colorIndex < foundIndex) {
                return chartColor;
              } else {
                return colorElem;
              }
            } else if (colorIndex <= foundIndex) {
              return chartColor;
            } else {
              return colorElem;
            }
          }
        }),
      };
    }
    return {
      value: [],
      color: [],
    };
  };
}
