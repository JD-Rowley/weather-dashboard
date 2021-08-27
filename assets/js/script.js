var apiKey = "&appid=09dc3595df08a6cbcf8463276de45c90";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history")

var city = cityInputEl.value.trim();

var citySearchCounter = 0;

var getWeatherInfo = function() {
    // format the one call api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + city + "&exclude=minutely,alerts&units=imperial" + apiKey;

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getWeatherInfo();

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