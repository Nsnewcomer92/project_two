// /**
//  * Helper function to select stock data
//  * Returns an array of values
//  * index 0 - date
//  * index 1 - tmin
//  * index 2 - tavg
//  * index 3 - tmax
//  */

// // Submit Button handler
// function handleSubmit() {
//   // Prevent the page from refreshing
//   d3.event.preventDefault();

//   // Select the input value from the form
//   var stock = d3.select("#stockInput").node().value;
//   console.log(stock);

//   // clear the input value
//   d3.select("#stockInput").node().value = "";

//   // Build the plot with the new stock
//   buildPlot(stock);
// }

// function buildPlot(stock) {
// var apiKey = "YOUR KEY HERE";

let city = "Las Vegas";
let startd = "2020-07-13";
let endd = "2020-07-20";

function weatherHistoryPlot(city, startd, endd) {
  const url = "/api/" + city + "/" + startd + "/" + endd;
  console.log(url);

  function unpack(rows, index) {
    return rows.map(function (row) {
      return row[index];
    });
  }

  d3.json(url).then(function (response) {
    // Grab values from the response json object to build the plots
    var city = response.dataset.city;

    var startDate = response.dataset.start_date;
    var endDate = response.dataset.end_date;
    // Print the names of the columns
    console.log(response.dataset.column_names);
    // Print the data for each day
    console.log(response.dataset.data);
    // var dates = response.dataset.data.map((row) => row[0]);
    var dates = unpack(response.dataset.data, 0);

    var minTemp = response.dataset.data.map((row) => row[1]);
    var avgTemp = response.dataset.data.map((row) => row[2]);
    var maxTemp = response.dataset.data.map((row) => row[3]);
    console.log(dates, minTemp, avgTemp, maxTemp);

    let tmin = {
      type: "scatter",
      mode: "lines",
      name: "Tmin",
      x: dates,
      y: minTemp,
      line: {
        color: "#1773cf",
      },
    };

    let tavg = {
      type: "scatter",
      mode: "lines",
      name: "Tavg",
      x: dates,
      y: avgTemp,
      line: {
        color: "#cc9900",
      },
    };

    let tmax = {
      type: "scatter",
      mode: "lines",
      name: "Tmax",
      x: dates,
      y: maxTemp,
      line: {
        color: "#ff0000",
      },
    };

    let data = [tmin, tavg, tmax];

    var layout = {
      width: 900,
      height: 600,
      title: `${city}: Daily Normals for ${startd} - ${endd}`,
      xaxis: {
        range: [dates[0], dates[dates.length - 1]],
        type: "date",
      },
      yaxis: {
        autorange: true,
        type: "linear",
      },
    };

    Plotly.newPlot("plot", data, layout);
  });
}

weatherHistoryPlot(city, startd, endd);

// // Add event listener for submit button
// d3.select("#submit").on("click", handleSubmit);
