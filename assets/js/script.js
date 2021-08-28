var apiKey = "&appid=09dc3595df08a6cbcf8463276de45c90";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history")
var currentConditionsEl = document.querySelector("#current-conditions");
var dayCardEl = document.querySelector("#day-card");

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
                location.textContent = data.timezone + " " + data.current.dt + " " + data.current.weather[0].icon;
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
                uvi.textContent = "UV Index: ";
                currentConditionsEl.appendChild(uvi);
                var uviConditions = document.createElement("span");
                    uviConditions.textContent = data.current.uvi;
                    uviConditions.className = "favorable";
                    uvi.appendChild(uviConditions);
                    if (uviConditions.value < 3) {
                        uviConditions.addClass(".favorable");
                    } else if (uviConditions.value >= 3 || uviConditions.value <= 7) {
                        uviConditions.addClass(".moderate");
                    } else {
                        uviConditions.addClass(".severe");
                    };

            createFiveDayForecast();
        });
    });
};

getWeatherInfo();

var createFiveDayForecast = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=09dc3595df08a6cbcf8463276de45c90";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data.daily[0].dt);

            // create for loop to iterate through daily array
            for (var i = 0; i < data.daily[5]; i++) {
                // apply date, temp, wind, and humidity to "day-card" div
                var dayCardDate = document.createElement("h3");
                    dayCardDate.textContent = data.daily[i].dt;
                    dayCardEl.appendChild(dayCardDate);
                    console.log(data.daily[i].dt);

                
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