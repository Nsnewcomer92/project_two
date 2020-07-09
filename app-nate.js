var country = "US";
var locale = "en-US";
var currencies = "USD";
var outbound = "IND-sky";
var inbound = "ORD-sky";
var outboundDate = "2020-09-01";
var inboundDate = "2020-12-31";

$("#destinations").change(function (e) {
	inbound = $("#destinations").children("option").filter(":selected").val();
	//console.log("Inbound", inbound)
	var inboundformatted = inbound.split("-");
	//console.log(inboundformatted)

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": (`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${country}/${currencies}/${locale}/${outbound}/${inbound}/${outboundDate}?inboundpartialdate=${inboundDate}`),
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": "68e3f8273fmshed3dde3b70a9127p1906b3jsn805b2870f3f4"
		}
	};
	$.ajax(settings).done(function (response) {
		console.log("Response", response);
		var xAxis = [];
		var yAxis = [];
		$.each(response.Quotes, function (index, value) {
			yAxis.push(value.MinPrice);
		});
		console.log(yAxis);

		$.each(response.Carriers, function (index, value) {
			xAxis.push(value.Name);
		});
		console.log(xAxis);

		var trace1 = [
			{
				x: xAxis,
				xaxis: { Title: "Airlines" },
				yaxis: { Title: "Minimum Price" },
				y: yAxis,
				type: 'bar'
			}
		];
		var layout = {
			title: `Cheapest Flights from IND to ${inboundformatted[0]}`,
			xaxis: { title: "Airline" },
			yaxis: { title: "Minimum Price" }
		};
		Plotly.newPlot('flightcost', trace1, layout);

		var xAxis2 = [];
		var yAxis2 = [];
		$.each(response.Quotes, function (index, value) {
			yAxis2.push(value.MinPrice);
		});
		//console.log(yAxis2);

		$.each(response.Quotes, function (index, value) {
			xAxis2.push(value.OutboundLeg.CarrierIds[0]);
		});
		//console.log(xAxis2);

		var trace2 = [
			{
				x: xAxis2,
				y: yAxis2,
				type: 'bar'
			}
		];
		var layout2 = {
			title: `Cheapest Flights from IND to ${inboundformatted[0]}`,
			xaxis: { title: "Airline" },
			yaxis: { title: "Minimum Price" }
		};

		Plotly.newPlot('flightcost2', trace2, layout2);


		//console.log(JSON.stringify(response, null, 2))

	});
});
