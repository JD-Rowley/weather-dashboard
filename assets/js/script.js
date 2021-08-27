var apiKey = "&appid=09dc3595df08a6cbcf8463276de45c90";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history")
var currentConditionsEl = document.querySelector("#current-conditions");
var dayCardEl = document.querySelector("#card-wrapper");

var city = cityInputEl.value.trim();

var citySearchCounter = 0;

var getWeatherInfo = function() {
    // format the one call api url
    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + city + "&exclude=minutely,alerts&units=imperial" + apiKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=09dc3595df08a6cbcf8463276de45c90";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

            // create variables to pull various  current weather information from the api
            var location = document.createElement("h2");
                location.textContent = data.timezone + data.current.weather[0].icon;
                currentConditionsEl.appendChild(location);
            
            var temp = document.createElement("p");
                temp.textContent = "Temp: " + Math.round(data.current.temp) + " F";
                currentConditionsEl.appendChild(temp);

            var wind = document.createElement("p");
                wind.textContent = "Wind: " + Math.round(data.current.wind_speed) + " MPH";
                currentConditionsEl.appendChild(wind);

            var humidity = document.createElement("p");
                humidity.textContent = "Humidity: " + data.current.humidity + "%";
                currentConditionsEl.appendChild(humidity);

            var uvi = document.createElement("p");
                uvi.textContent = "UV Index: " + data.current.uvi;
                currentConditionsEl.appendChild(uvi);
        });
    });
};

getWeatherInfo();

var createFiveDayForecast = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=09dc3595df08a6cbcf8463276de45c90";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data.daily[0]);

            // create for loop to iterate through daily array
            for (var i = 0; i < data.daily[5]; i++) {
                // create a div with a class of "day-cards" and apply date, temp, wind, and humidity
                var date = 
                // continue loop for five days
            }
        });
    });
};

createFiveDayForecast();

// create submit handler for search button
var formSubmitHandler = function(event) {
    event.preventDefault();

    // create variable for city value
    var cityValue = cityInputEl.value.trim();

    console.log(cityValue);

    // // convert city name to coordinates
    // var getCoordinates = function() {
    //     var geoApi = "https://nominatim.openstreetmap.org/search?city=" + cityValue + "&format=json";

    //     fetch(geoApi).then(function(response) {
    //         response.json().then(function(data) {
    //             console.log(data);

    //         });
    //     });
    // };

    // getCoordinates(cityValue);
    
    // pass city value into getWeatherInfo function
    if (cityValue) {
        getWeatherInfo(cityValue);
        // clear out the search box
        cityInputEl.value = "";
    } else {
        // alert the user if there is no value for city
        alert("Please enter a city name");
        return;
    }

    var saveCityInput = function() {
        // save city input into local storage
        localStorage.setItem("city", cityValue);

        // create a button element with recent searches
        var recentSearchesEl = document.createElement("button");
        recentSearchesEl.className = "search-history-btn btn";
        recentSearchesEl.type = "submit";
        recentSearchesEl.innerText = cityValue;

        // append the button to search history
        searchHistoryEl.appendChild(recentSearchesEl);

        // increment counter for past searches
        citySearchCounter++;

        if(citySearchCounter === 8) {

        };
    };
    
    saveCityInput();
};

searchFormEl.addEventListener("submit", formSubmitHandler);