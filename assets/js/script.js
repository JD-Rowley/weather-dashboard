var apiKey = "&appid=09dc3595df08a6cbcf8463276de45c90";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history")
var currentConditionsEl = document.querySelector("#current-conditions");
var dayCardEl = document.querySelector("#day-card");

// var city = "lat=" + cityLat + "&lon=" + cityLon;

var citySearchCounter = 0;

// create submit handler for search button
var formSubmitHandler = async function(event) {
    event.preventDefault();

    // create variable for city value
    var cityValue = cityInputEl.value.trim();
    console.log(cityValue);

    getCoordinates(cityValue);
    
    // pass city value into getWeatherInfo function
    if (cityValue) {
        displayWeatherInfo(cityValue);
        // clear out the search box
        cityInputEl.value = "";
    } else {
        // alert the user if there is no value for city
        alert("Please enter a city name");
        return;
    }

    // reset current weather content
    currentConditionsEl.innerHTML = "";

    // getWeatherInfo(cityValue);

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

var getWeatherInfo = function() {
    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + city + "&exclude=minutely,alerts&units=imperial" + apiKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=09dc3595df08a6cbcf8463276de45c90";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        // create variables to pull various current weather information from the api
        var location = document.createElement("h2");
        location.textContent = data.timezone + " " + data.current.dt + " ";
        currentConditionsEl.appendChild(location);

        var icon = document.createElement("img");
            var weatherIcon = data.current.weather[0].icon;
            icon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            icon.setAttribute("style", "height: 60px; width: 60px;");
            location.appendChild(icon);

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
                    uvi.appendChild(uviConditions);
                    if (data.current.uvi < 3) {
                        uviConditions.classList.add("favorable");
                    } else if (data.current.uvi >= 3 || data.current.uvi <= 7) {
                        uviConditions.classList.add("moderate");
                    } else {
                        uviConditions.classList.add("severe");
                    };

        // createFiveDayForecast(); 
        var date = document.createElement("h3");
            date.textContent = data.daily[0].dt;
            date.setAttribute("style", "font-size: 24px;");
            dayCardEl.appendChild(date);

        var icon = document.createElement("img");
            var weatherIcon = data.daily[0].weather[0].icon;
            icon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            icon.setAttribute("style", "height: 100px; width: 100px");
            dayCardEl.appendChild(icon);

        var temp = document.createElement("p");
            temp.textContent = "Temp: " + Math.round(data.daily[0].temp.day) + " F";
            dayCardEl.appendChild(temp);

        var wind = document.createElement("p");
            wind.textContent = "Wind: " + Math.round(data.daily[0].wind_speed) + " MPH";
            dayCardEl.appendChild(wind);

        var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + data.daily[0].humidity + "%";
            dayCardEl.appendChild(humidity);
        });
    });
};

getWeatherInfo();

var createFiveDayForecast = function() {
    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=09dc3595df08a6cbcf8463276de45c90";

    // // make a request to the url
    // fetch(apiUrl).then(function(response) {
    //     response.json().then(function(data) {
    //         console.log(data.daily[0]);

            // create for loop to iterate through daily array
            // for (var i = 0; i < data.daily[5]; i++) {
                // apply date, temp, wind, and humidity to "day-card" div
                // continue loop for five days
    //         }
    //     });
    // });
    // var date = document.createElement("h3");
    //         date.textContent = data.daily[0].dt;
    //         dayCardEl.appendChild(date);

    //     var icon = document.createElement("img");
    //         var weatherIcon = data.daily[0].weather[0].icon;
    //         icon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
    //         dayCardEl.appendChild(icon);

    //     var temp = document.createElement("p");
    //         temp.textContent = "Temp: " + Math.round(data.daily[0].temp.day) + " F";
    //         dayCardEl.appendChild(temp);

    //     var wind = document.createElement("p");
    //         wind.textContent = "Wind: " + Math.round(data.daily[0].wind_speed) + " MPH";
    //         dayCardEl.appendChild(wind);

    //     var humidity = document.createElement("p");
    //         humidity.textContent = "Humidity: " + data.daily[0].humidity + "%";
    //         dayCardEl.appendChild(humidity);
};

// async function Test(cityValue) {
//     var geoApi = "https://nominatim.openstreetmap.org/search?city=" + cityValue + "&format=json";

//     return await fetch(geoApi)
//         .then(function(response) {
//         return response.json()
//         .then(function(data) {
//             console.log(data);

//             var cityLat = data[0].lat;
//             var cityLon = data[0].lon;

//             return cityLon;
//             return "hi"

//             console.log(cityLat);
//             console.log(cityLon);
//         });
//     });
// }

// convert city name to coordinates
var getCoordinates = function(cityValue) {
    var geoApi = "https://nominatim.openstreetmap.org/search?city=" + cityValue + "&format=json";

    fetch(geoApi).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

            var cityLat = data[0].lat;
            var cityLon = data[0].lon;

            console.log(cityLat, cityLon);
            var city = "&lat=" + cityLat + "&lon=" + cityLon;
        })
    });
};



searchFormEl.addEventListener("submit", formSubmitHandler);