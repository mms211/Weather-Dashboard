$("#search").on("click", function currentWeather() {
    console.log("you clicked me!");
    var city = $("#city").val();
    console.log(city);

    // AJAX call for current weather 
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=456a54d6b9485de0873f0e16f7e15315";

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var longitude = response.coord.lon;
        console.log(longitude);
        var latitude = response.coord.lat;
        console.log(latitude);
        var cityName = response.name;
        localStorage.setItem(cityName, cityName);
        localStorage.getItem(cityName)
        var date = response.dt;
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
            var uvIndex = response.value;
            console.log(uvIndex);
        });

        $("#current-city").html(cityName + " (" + dateString + ")");

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