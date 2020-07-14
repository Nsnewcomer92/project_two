# Travel Tips Dashboard

### Objective

To combine different data sources to plan a trip to a list of 5 US destinations.  The charts will display minimum flight prices, historical weather temps and attractions on a leaflet map.

### Data Source

- Flight data: https://rapidapi.com/skyscanner/api/skyscanner-flight-search
- Historical weather data:  Visual Crossing Corporation](https://www.visualcrossing.com/</br>
-Google Maps for Museum Data: https://maps.googleapis.com/maps/api/place/textsearch/json?



### ETL for Historical Weather

- Historical weather data was downloaded for five chosen cities plus Indianapolis for years 2010 - 2019 inclusive.
- Due to limitation to the number of results per query, we downloaded data to 4 CSV files.
- The following steps could bee seen in details in the notebook *ETL_for_Travel_Tips_Dashboard.ipynb*:
  - The files were loaded to Pandas dataframe and then joined.
  - We removed not needed columns and sorted dataframe per location and date in ascending order.
  - The index was named so it could be used as a primary key in a database table.
  - The Python library **Pandabase** was used to create SQLite database from our dataframe.
  - We checked the database with SQLAlchemy by running several queries.



### Flask and API

There are two routes in the script *app.py*:

- ***/*** 

  This route renders our *index.html*.

  

- ***/api/\<city>/\<startd>/\<endd>*** 

  For the selected city and the range of dates, the script first calculates daily normals (minimum, maximum and average temperature for a particular month-day through the collected period of years) from the last 10 years of historical data in our SQLite database.
  
  The script then returns a dictionary that is jsonified and this API can be reached in the above endpoint (route):
  
  ```
  {
    "dataset": {
      "city": "Indianapolis", 
      "column_names": [
        "date", 
        "tmin", 
        "tavg", 
        "tmax"
      ], 
      "data": [
        [
          "2020-07-04", 
          67.8, 
          76.4, 
          88.1
        ], 
        [
          "2020-07-05", 
        ...
  ```



### Plotting Daily Normals 

After data submission on the web page, *index.html* uses 

>  onclick="optionChanged()"

to run the function **optionChanged** in the script .*./static/js/main_template.js*. 

This function will pull the selected text variables from html and start the function **weatherHistoryPlot** that will first create a URL for our API using selected data. The plot will be created with Plotly using data retrieved from our API.

The function plots data for the selected date range plus 1 week before and after. For the initial load, the plotting function assumes Indianapolis as a city and for the date range a week starting with the current day.
