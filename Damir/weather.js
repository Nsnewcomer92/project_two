// /**

//  */

// After initial load
// let city = "Las Vegas";
// let startd = "2020-07-13";
// let endd = "2020-07-20";

// Initial load
let city = "Indianapolis";
// Today is start date
let today = new Date();
let startd = today.toISOString().split("T")[0];

// End date is in a week
let endDate = new Date(today.setDate(today.getDate() + 7));
let endd = endDate.toISOString().split("T")[0];

function weatherHistoryPlot(city, startd, endd) {
  const url = "/api/" + city + "/" + startd + "/" + endd;
  console.log(url);

  // Helper function to select data; returns an array of values
  //  index 0 - date     index 1 - tmin
  //  index 2 - tavg     index 3 - tmax
  function unpack(rows, index) {
    return rows.map(function (row) {
      return row[index];
    });
  }

  d3.json(url).then(function (response) {
    // Grab values from the response json object to build the plots
    let city = response.dataset.city;

    let startDate = response.dataset.start_date;
    let endDate = response.dataset.end_date;
    // Print the names of the columns
    console.log(response.dataset.column_names);
    // Print the data for each day
    console.log(response.dataset.data);
    // var dates = response.dataset.data.map((row) => row[0]);
    var dates = unpack(response.dataset.data, 0);

    let minTemp = unpack(response.dataset.data, 1);
    let avgTemp = unpack(response.dataset.data, 2);
    let maxTemp = unpack(response.dataset.data, 3);

    // console.log(dates, minTemp, avgTemp, maxTemp);

    let tminTrace = {
      type: "scatter",
      mode: "lines+markers",
      name: "Min. Temperature",
      x: dates,
      y: minTemp,
      hovertemplate: "%{y} F<extra>MINT</extra>",
      marker: {
        color: "#1773cf",
        size: 7,
      },
      line: {
        color: "#1773cf",
        width: 3,
      },
    };

    let tavgTrace = {
      type: "scatter",
      mode: "lines+markers",
      name: "Avg. Temperature",
      x: dates,
      y: avgTemp,
      hovertemplate: "%{y} F<extra>AVGT</extra>",
      marker: {
        color: "#009933",
        size: 7,
      },
      line: {
        color: "#009933",
        width: 3,
      },
    };

    let tmaxTrace = {
      type: "scatter",
      name: "Max. Temperature",
      x: dates,
      y: maxTemp,
      hovertemplate: "%{y} F<extra>MAXT</extra>",
      mode: "lines+markers",
      marker: {
        color: "#ff0000",
        size: 7,
      },
      line: {
        color: "#ff0000",
        width: 3,
      },
    };

    let data = [tmaxTrace, tavgTrace, tminTrace];

    let layout = {
      width: 900,
      height: 600,
      title: `Daily Normals (last 10 years) for Trip from <b>${startd}</b> to <b>${endd}</b> <br><b> ${city}</b>`,
      xaxis: {
        autorange: true,
        showgrid: true,
        // range: [dates[0], dates[dates.length - 1]],
        type: "date",
      },
      yaxis: {
        title: "Temperature (F)",
        autorange: true,
        type: "linear",
        showgrid: true,
      },
      shapes: [
        {
          type: "rect",
          xref: "x",
          yref: "paper",
          x0: startd,
          y0: 0,
          x1: endd,
          y1: 1,
          fillcolor: "#d3d3d3",
          opacity: 0.4,
          line: {
            width: 0,
          },
        },
      ],
    };

    Plotly.newPlot("plot", data, layout);
  });
}

weatherHistoryPlot(city, startd, endd);
