var apiKey = "&appid=09dc3595df08a6cbcf8463276de45c90";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history")
var currentConditionsEl = document.querySelector("#current-conditions");
var dayCardEl = document.querySelector("#card-wrapper");

var i = 1;
var city;
var citySearchCounter = 0;
// format for converting date from unix time
var format = {
    month: "2-digit",
    day: "numeric",
    year: "numeric"
};

// create submit handler for search button
var formSubmitHandler = function(event) {
    event.preventDefault();

    // create variable for city value
    var cityValue = cityInputEl.value.trim();
    console.log(cityValue);
    
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

    // reset current weather content
    currentConditionsEl.innerHTML = "";
    dayCardEl.innerHTML = "";
        
    saveCityInput(cityValue);

    // increment counter for past searches
    citySearchCounter++;
};

var getWeatherInfo = function() {
    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + city + "&exclude=minutely,alerts&units=imperial" + apiKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=40.84&lon=-111.91&exclude=hourly,minutely&units=imperial&appid=09dc3595df08a6cbcf8463276de45c90";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        // create variables to pull various current weather information from the api
        var location = document.createElement("h2");
        location.textContent = data.timezone + " (" + new Date((data.current.dt) * 1000).toLocaleString("en-us", format) + ") ";
        currentConditionsEl.appendChild(location);

        var icon = document.createElement("img");
            var weatherIcon = data.current.weather[0].icon;
            icon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            icon.setAttribute("style", "height: 100px; width: 100px;");
            currentConditionsEl.appendChild(icon);

            var temp = document.createElement("p");
                temp.innerHTML = "Temp: " + Math.round(data.current.temp) + " &degF";
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
                    } else if (data.current.uvi >= 3 && data.current.uvi <= 7) {
                        uviConditions.classList.add("moderate");
                    } else {
                        uviConditions.classList.add("severe");
                    };

        // create a loop for the five day forecast
        while (i < 6) {
            // create div cards to hold forecast info for each day
            var dayCard = document.createElement("div")
                dayCard.className = "day-cards";
                dayCardEl.appendChild(dayCard);
                // date for the specific forecast day
                var date = document.createElement("h3");
                    date.textContent = new Date((data.daily[i].dt) * 1000).toLocaleString("en-us", format);
                    date.setAttribute("style", "font-size: 24px;");
                    dayCard.appendChild(date);

                // icon for the five day forecast
                var icon = document.createElement("img");
                    var weatherIcon = data.daily[i].weather[0].icon;
                    icon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                    icon.setAttribute("style", "height: 100px; width: 100px");
                    dayCard.appendChild(icon);

                // forecast temperature
                var temp = document.createElement("p");
                    temp.innerHTML = "Temp: " + Math.round(data.daily[i].temp.day) + " &degF";
                    dayCard.appendChild(temp);

                // forecast wind
                var wind = document.createElement("p");
                    wind.textContent = "Wind: " + Math.round(data.daily[i].wind_speed) + " MPH";
                    dayCard.appendChild(wind);

                // forecast humidity
                var humidity = document.createElement("p");
                    humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
                    dayCard.appendChild(humidity);
            // increment forecast day
            i++;
        }});
    });
};

// convert city name to coordinates
var getCoordinates = function() {
    var cityValue = cityInputEl.value.trim();
    var geoApi = "https://nominatim.openstreetmap.org/search?city=" + cityValue + "&format=json";

    fetch(geoApi).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    });
};

var saveCityInput = function(cityValue) {
    var cityValue = cityInputEl.value.trim();

    cityValue.value = localStorage.getItem("city")
    // save city input into local storage
    localStorage.setItem("city", cityValue);

    // create a button element with recent searches
    var recentSearchesEl = document.createElement("button");
        recentSearchesEl.className = "search-history-btn btn";
        recentSearchesEl.type = "submit";
        recentSearchesEl.innerText = cityValue;

    // append the button to search history
    searchHistoryEl.appendChild(recentSearchesEl);
};

searchFormEl.addEventListener("submit", formSubmitHandler);