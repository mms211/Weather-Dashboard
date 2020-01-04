$("#search").on("click", function () {
    console.log("you clicked me!");
    var city = $("#city").val();
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=456a54d6b9485de0873f0e16f7e15315";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
    });
});