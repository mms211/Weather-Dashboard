// 
var thunderstorm = $("<i class=fas fa-bolt></i>");
//var drizzle = <i class="fas fa-cloud-rain"></i>;
//var rain = <i class="fas fa-cloud-showers-heavy"></i>;
//var snow = <i class="far fa-snowflake"></i>;
//var mist = <i class="fas fa-smog"></i>;
//var smoke = ;
//var haze = ;
//var dust = ;
//var fog = ;
//var sand = ;
//var ash = ;
//var squall = ;
//var tornado = <i class="fas fa-wind"></i>;
//var clear = <i class="far fa-sun"></i>;
//var clouds = <i class="fas fa-cloud"></i>;

$("#search").on("click", function currentWeather() {
    var city = $("#city").val();

    // AJAX call for current weather 
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=456a54d6b9485de0873f0e16f7e15315";

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var todaysWeather = "";
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        var cityName = response.name;
        var date = response.dt;
        var weather = response.weather[0].main;
        console.log(weather);
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var dateString = moment.unix(date).format("MM/DD/YYYY");

        // AJAX call for 5 day forcast
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=456a54d6b9485de0873f0e16f7e15315&lat=" + latitude + "&lon=" + longitude;
    
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            uvIndex = response.value;
            console.log(uvIndex);
            todaysWeather.append($("<p>UV Index: " + uvIndex + "</p>"));
        });

        todaysWeather = $("#current-city").html("<h2>" + cityName + " (" + dateString + ")</h2><br>");
        todaysWeather.append($("<p>Temperature: " + temp + "F</p>"));
        todaysWeather.append($("<p>Humidity: " + humidity + "%</p>"));
        todaysWeather.append($("<p>Wind Speed: " + windSpeed + " MPH</p>"));
    });

});


$("#search").on("click", function fiveDayForcast() {
    var city = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=456a54d6b9485de0873f0e16f7e15315";
    
    // AJAX call for 5 day forcast
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


    });

});


$("#search").on("click", function uvIndex() {



});