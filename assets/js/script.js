var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#input-city");

var getWeatherInfo = function() {
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={09dc3595df08a6cbcf8463276de45c90}");
        console.log(response);
};

getWeatherInfo();

// // create submit handler for search button
// var formSubmitHandler = function(event) {
//     event.preventDefault();

//     var cityValue = cityInputEl.value.trim();

//     if (cityValue) {
//         cityInputEl.value = "";
//     } else {
//         alert("Please enter a city name");
//     }
// };

// searchFormEl.addEventListener("click", formSubmitHandler);