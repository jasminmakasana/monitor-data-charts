# monitor-data-charts
A charting library that creates charts using the data from monitoring systems like grafana.

Not need to manipulate data just send API data to monitor-data-charts and it will print the result chart
on the given HTML tag id.
## Installation

Install my-project with npm

```bash
  npm install monitor-data-charts
```
    
## Usage/Examples For Class Component

```javascript
import React, { Component } from 'react';
import Ichart from "monitor-data-charts";
class App extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new Ichart(
      "myChart",
      {
        results: {
          A: {
            status: 200,
            frames: [
              {
                schema: {
                  refId: "A",
                  fields: [
                    {
                      name: "time",
                      type: "time",
                      typeInfo: {
                        frame: "time.Time",
                        nullable: true,
                      },
                      config: {
                        interval: 30000,
                      },
                    },
                    {
                      name: "A-series",
                      type: "number",
                      typeInfo: {
                        frame: "float64",
                        nullable: true,
                      },
                      labels: {},
                    },
                  ],
                },
                data: {
                  values: [
                    [
                      77.54606498472347, 77.44941299717483, 77.39960055372991,
                      76.94715071445286, 77.01309343330284, 77.3344009882772,
                      77.12359809310284, 76.99216841719064, 76.82127405964737,
                      76.34810849957591, 76.14611749250756, 76.22802486863894,
                      76.21261091921188, 76.22104899632482, 76.20528694407074,
                      76.31529216132624, 76.42076414175222, 76.33209285611859,
                      76.01749640310649, 76.3723468020387, 76.16469445952566,
                    ],
                  ],
                },
              },
            ],
          },
        },
      },
      {
        type: "stat",
      }
    );
  }

  render() {
    return (
      <div
            className="App"
            id="myChart"
            style={{ width: "100%", height: "100%" }}
            >
        </div>
    );
  }
}

```


## Usage/Examples For Functional Component

```javascript
import { useEffect } from "react";
import Ichart from "monitor-data-charts";
function App() {

useEffect(() => {
      new Ichart(
      "myChart",
      {
        results: {
          A: {
            status: 200,
            frames: [
              {
                schema: {
                  refId: "A",
                  fields: [
                    {
                      name: "time",
                      type: "time",
                      typeInfo: {
                        frame: "time.Time",
                        nullable: true,
                      },
                      config: {
                        interval: 30000,
                      },
                    },
                    {
                      name: "A-series",
                      type: "number",
                      typeInfo: {
                        frame: "float64",
                        nullable: true,
                      },
                      labels: {},
                    },
                  ],
                },
                data: {
                  values: [
                    [
                      77.54606498472347, 77.44941299717483, 77.39960055372991,
                      76.94715071445286, 77.01309343330284, 77.3344009882772,
                      77.12359809310284, 76.99216841719064, 76.82127405964737,
                      76.34810849957591, 76.14611749250756, 76.22802486863894,
                      76.21261091921188, 76.22104899632482, 76.20528694407074,
                      76.31529216132624, 76.42076414175222, 76.33209285611859,
                      76.01749640310649, 76.3723468020387, 76.16469445952566,
                    ],
                  ],
                },
              },
            ],
          },
        },
      },
      {
        type: "stat",
      }
    );
  }, []);

 return (
      <div
            className="App"
            id="myChart"
            style={{ width: "100%", height: "100%" }}
            >
        </div>
    );
}

```


## Demo



https://github.com/jasminmakasana/monitor-data-charts/assets/78531888/a58e9409-7935-4ba5-86c3-0b730ca768ad




## Documentation

[Documentation](https://linktodocumentation)


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## License

[MIT](https://choosealicense.com/licenses/mit/)

