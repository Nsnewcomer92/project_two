var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2020-09-01?inboundpartialdate=2020-12-01",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "68e3f8273fmshed3dde3b70a9127p1906b3jsn805b2870f3f4"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});