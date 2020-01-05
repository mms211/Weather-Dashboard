var weather = "";
var iconPlaceholder = "";
var weather1 = "";

if ("geolocation" in navigator){ //check geolocation available 
	//try to get user current location using getCurrentPosition() method
	navigator.geolocation.getCurrentPosition(function(position){ 
			console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
		});
}else{
	console.log("Browser doesn't support geolocation!");
};

function weatherIcon() {
    iconPlaceholder = $("<i></i>");

    if (weather === "Drizzle") {
        iconPlaceholder.addClass("fas fa-cloud-rain");
    } else if (weather === "Clouds") {
        iconPlaceholder.addClass("fas fa-cloud");
    } else if (weather === "Thunderstorm") {
        iconPlaceholder.addClass("fas fa-bolt");
    } else if (weather === "Rain") {
        iconPlaceholder.addClass("fas fa-cloud-showers-heavy");
    } else if (weather === "Snow") {
        iconPlaceholder.addClass("far fa-snowflake");
    } else if (weather === "Clear") {
        iconPlaceholder.addClass("far fa-sun");
    } else if (weather === "Tornado") {
        iconPlaceholder.addClass("fas fa-wind");
    } else {
        iconPlaceholder.addClass("fas fa-smog");
    };
};

function weatherIcon1() {
    iconPlaceholder = $("<i></i>");

    if (weather1 === "Drizzle") {
        iconPlaceholder.addClass("fas fa-cloud-rain");
    } else if (weather1 === "Clouds") {
        iconPlaceholder.addClass("fas fa-cloud");
    } else if (weather1 === "Thunderstorm") {
        iconPlaceholder.addClass("fas fa-bolt");
    } else if (weather1 === "Rain") {
        iconPlaceholder.addClass("fas fa-cloud-showers-heavy");
    } else if (weather1 === "Snow") {
        iconPlaceholder.addClass("far fa-snowflake");
    } else if (weather1 === "Clear") {
        iconPlaceholder.addClass("far fa-sun");
    } else if (weather1 === "Tornado") {
        iconPlaceholder.addClass("fas fa-wind");
    } else {
        iconPlaceholder.addClass("fas fa-smog");
    };
};

function currentWeather() {
    var city = $("#city").val();

    // AJAX call for current weather 
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=456a54d6b9485de0873f0e16f7e15315";

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        var todaysWeather = "";
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        var cityName = response.name;
        var date = response.dt;
        weather = response.weather[0].main;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var dateString = moment.unix(date).format("MM/DD/YYYY");

        // call function to convert weather to icons
        weatherIcon();

        // AJAX call for UV Index
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=456a54d6b9485de0873f0e16f7e15315&lat=" + latitude + "&lon=" + longitude;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            uvIndex = response.value;
            todaysWeather.append($("<p>UV Index: " + uvIndex + "</p>"));
        });

        // current weather added to page
        todaysWeather = $("#current-city").html("<h2>" + cityName + " (" + dateString + ")</h2>");
        todaysWeather.append($(iconPlaceholder));
        todaysWeather.append($("<p>Temperature: " + temp + "°F</p>"));
        todaysWeather.append($("<p>Humidity: " + humidity + "%</p>"));
        todaysWeather.append($("<p>Wind Speed: " + windSpeed + " MPH</p>"));
    });

};


function fiveDayForecast() {
    var city = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=456a54d6b9485de0873f0e16f7e15315";

    // AJAX call for 5 day forcast
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var iteration = 0; iteration < response.list.length; iteration = iteration + 8) {
            var date1 = response.list[iteration].dt;
            var dateString1 = moment.unix(date1).format("MM/DD/YYYY");
            weather1 = response.list[iteration].weather[0].main;
            var temp1 = response.list[iteration].main.temp;
            var humidity1 = response.list[iteration].main.humidity;
            var currentDay = $("#" + iteration);
            
            // Call function to convert weather to icons
            weatherIcon1();

            // 5 day forecast added to page
            var fiveDay = currentDay.html("<h6>" + dateString1 + "</h6>");
            fiveDay.append($(iconPlaceholder));
            fiveDay.append($("<p>Temp: " + temp1 + "°F</p>"));
            fiveDay.append($("<p>Humidity: " + humidity1 + "%</p>"));
        };
    });
};

function localStorage() {
    var cities;
    if (localStorage.getItem("cities") === null) {
        cities = [];
    } else {
        cities = JSON.parse(localStorage.getItem("cities"));
    };
    cities.push(city);
    console.log(cities);
};

// Call functions

$("#search").on("click", function () {
    currentWeather();
    fiveDayForecast();
});