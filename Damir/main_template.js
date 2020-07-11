//
// Function to plot daily normals for +/- 1 week extended range
//  from last 10 years
//===========================
function weatherHistoryPlot(city, startd, endd) {
  //
}

// Function ...
//===========================
function functionOne(city, startd, endd) {
  //
}

// Function ...
//===========================
function functionTwo(city, startd, endd) {
  //
}

// Function ...
//===========================
function functionThree(city, startd, endd) {
  //
}

// Function for initial load
//===========================
function init() {
  // Set variables for initial load
  let initCity = "Indianapolis";
  // Today is a start date
  let today = new Date();
  let initStartd = today.toISOString().split("T")[0];

  // End date is in a week
  let endDate = new Date(today.setDate(today.getDate() + 7));
  let initEndd = endDate.toISOString().split("T")[0];

  functionOne(initCity, initStartd, initEndd);

  functionTwo(initCity, initStartd, initEndd);

  functionThree(initCity, initStartd, initEndd);

  weatherHistoryPlot(initCity, initStartd, initEndd);
}

// Function to run after every change
//===========================
function optionChanged(newCity, newStartd, newEndd) {
  //
  functionOne(newCity, newStartd, newEndd);

  functionTwo(newCity)(newCity, newStartd, newEndd);

  functionThree(newCity, newStartd, newEndd);

  weatherHistoryPlot(newCity, newStartd, newEndd);
}

// Initialize the dashboard
//===========================
init();
