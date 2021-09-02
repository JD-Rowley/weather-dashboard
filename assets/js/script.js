var apiKey = "&appid=09dc3595df08a6cbcf8463276de45c90";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history");
var clearAllEl = document.querySelector("#clear-all-btn");
var currentConditionsEl = document.querySelector("#current-conditions");
var dayCardEl = document.querySelector("#card-wrapper");

var citiesArr = [];

// format for converting date from unix time
var format = {
    month: "2-digit",
    day: "numeric",
    year: "numeric"
};

function getWeatherInfo(cityValue) {
    // reset current weather content
    currentConditionsEl.innerHTML = "";
    dayCardEl.innerHTML = "";

    // variable to call geocode api
    var geoApi = "https://nominatim.openstreetmap.org/search?city=" + cityValue + "&format=json";
    console.log(geoApi);
    fetch(geoApi).then(function(response) {
        response.json().then(function(data) {
            console.log(data[0]);

            if (!data[0]) {
                alert("Please enter a valid city name!");
                return;
            }

            // locate longitude and latitued within geocode
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;

            // format lat and lon to fit within weather api
            var city = "lat=" + cityLat + "&lon=" + cityLon;
            var cityStr = data[0].display_name;
                var citySpl = cityStr.split(",");
                var cityName = citySpl.splice(0, 1);
        
        // variable to call weather api
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + city + "&exclude=minutely,alerts&units=imperial" + apiKey;
            
        // make a request to the url
        fetch(apiUrl).then(function(response) {
            response.json().then(function(data) {
                console.log(data);

            // create variables to pull various current weather information from the api
            var location = document.createElement("h2");
            location.textContent = cityName + " (" + new Date((data.current.dt) * 1000).toLocaleString("en-us", format) + ") ";
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
            var i = 1;
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
        saveCityInput(cityName);
    })});
};

var enterCity = function(event) {
    event.preventDefault();

    // create variable for city value
    var cityValue = cityInputEl.value.trim();
    console.log(cityValue);

    if (cityValue) {
        // clear the textbox
        cityInputEl.value = "";
    } else {
        // alert the user if there is no value for city
        alert("Please enter a city name");
        return;
    }

    getWeatherInfo(cityValue);
};

var saveCityInput = function(cityName) {
    // save city into local storage
    citiesArr.push(cityName);
    localStorage.setItem("city", JSON.stringify(citiesArr));

        // create a button elements with recent searches
        var recentSearchesEl = document.createElement("button");
            recentSearchesEl.id = "saved-city-btn";
            recentSearchesEl.className = "search-history-btn btn";
            recentSearchesEl.type = "click";
            recentSearchesEl.setAttribute("value", cityName);
            recentSearchesEl.innerText = cityName;

        // append the button to search history
        searchHistoryEl.insertBefore(recentSearchesEl, searchHistoryEl.firstChild);
        clearAllEl.classList.remove("hide");
};

var loadCityInput = function() {
    // load cities from local storage
    var savedCities = localStorage.getItem("city");
    if (!savedCities) {
        return false;
    }

    // parse cities and create buttons for them
    savedCities = JSON.parse(savedCities);
        for (var i = 0; i < savedCities.length; i++) {
            var recentSearchesEl = document.createElement("button");
                recentSearchesEl.id = "saved-city-btn";
                recentSearchesEl.className = "search-history-btn btn";
                recentSearchesEl.type = "click";
                recentSearchesEl.setAttribute("value", savedCities[i]);
                recentSearchesEl.innerText = savedCities[i];
            
            // append buttons to search history element
            searchHistoryEl.insertBefore(recentSearchesEl, searchHistoryEl.firstChild);
            clearAllEl.classList.remove("hide");
        }
};

// clear the local storage via button
var clearStorage = function() {
    localStorage.clear();
    while (searchHistoryEl.firstChild) {
        searchHistoryEl.removeChild(searchHistoryEl.firstChild);
    }
    window.location.reload();
    clearAllEl.classList.add("hide");
};

var pastSearch = function(event) {
    var pastCity = event.target.getAttribute("value");

    event.target.remove();

    getWeatherInfo(pastCity);
}

searchFormEl.addEventListener("submit", enterCity);
clearAllEl.addEventListener("click", clearStorage);
searchHistoryEl.addEventListener("click", pastSearch);

loadCityInput();