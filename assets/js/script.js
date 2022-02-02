/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                    5 Day Weather Forecast                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       By Dustin Smith                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                    adding in day.js plugins                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                              Section for assigning global variables                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



let submitEl = document.getElementById("searchBut");
let searchEl = document.getElementById("searchFld");
var searchHistoryButts = document.querySelector("#searchHistory");

var searchHistory = [];
var apiUrl = "https://api.openweathermap.org";
var apiKey = "5c19ae264ab26bc706f25f3b4635f591";



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                 Rendering weather info to the page                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



// Fills out information into the primary current day card
function drawTodayCard (city, weather, time) {
    let date = dayjs().tz(time).format("M/D/YYYY");
    let curDate = document.getElementById("todayDate");
    let todayIcon = document.getElementById("todayIcon");
    let todayTemp = document.getElementById("todayTemp");
    let todayWind = document.getElementById("todayWind");
    let todayHum = document.getElementById("todayHum");
    let uv = document.getElementById("uv");
    let uvcolor = document.getElementById("uvcolor");
    let weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    todayCity.textContent = city;
    curDate.textContent = date;
    todayIcon.setAttribute("src", weatherIcon);
    todayTemp.textContent = weather.temp;
    todayWind.textContent = weather.wind_speed;
    todayHum.textContent = weather.humidity;
    uv.textContent = weather.uvi;

    if (weather.uvi < 3){
      uvcolor.setAttribute("class", "uvcard green");
    } else if (weather.uvi < 6){
      uvcolor.setAttribute("class", "uvcard yellow");
    } else if (weather.uvi < 8){
      uvcolor.setAttribute("class", "uvcard orange");
    } else{
    uvcolor.setAttribute("class", "uvcard red");
    };

    //console.log(city);
    //console.log(date);
    //console.log(weather.temp);
    //console.log(weather.wind_speed);
    //console.log(weather.humidity);
    //console.log(weather.uvi);
};


// Fills information into the 5 day forcast cards
function drawFiveDay(daily, time) {
    const day1 = dayjs().tz(time).add(1, "day").startOf("day").unix();
    const day5 = dayjs().tz(time).add(6, "day").startOf("day").unix();

    //console.log(daily);

    for (var i = 0; i < daily.length; i++) {
        if (daily[i].dt >= day1 && daily[i].dt < day5) {
            var tStamp = daily[i].dt;
            let day = dayjs.unix(tStamp).tz(time).format("MMM D");
            let date = document.getElementById(`day${i}`); 
            let dayIcon = document.getElementById(`day${i}Icon`);
            let dayTemp = document.getElementById(`day${i}Temp`);
            let dayWind = document.getElementById(`day${i}Wind`);
            let dayHum = document.getElementById(`day${i}Hum`);
            
            let weatherIcon = `https://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;

            date.textContent = day;
            dayIcon.setAttribute("src", weatherIcon);
            dayTemp.textContent = daily[i].temp.max;
            dayWind.textContent = daily[i].wind_speed;
            dayHum.textContent = daily[i].humidity;

        };
    };
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Section for making API calls                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



// function to use the latitude collected from searching via city name in the getLatLong function and make the api call using those values
function getCityInfo(cityData) {
    //console.log(cityData);
    var lat = cityData.lat;
    var lon = cityData.lon;
    var city = cityData.name;
    
    var url = `${apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    
    fetch(url)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          drawTodayCard(city, data.current, data.timezone);
          drawFiveDay(data.daily, data.timezone);
        })
        .catch(function (err) {
          console.error(err);
        });
    // console.log(url); 
};


// function that makes an api call using the city name the user seraches for and passes along latitude and 
// longitude in order to make the api call for the weather
function getLatLon(search) {
    var url = apiUrl + "/geo/1.0/direct?q="+ search + "&limit=5&appid=" + apiKey;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (!data[0]) {
                  alert("Location not found");
                } else {
                  addHistory(search)
                  getCityInfo(data[0]);
                  return;
                }
            })
            .catch(function (err) {
                console.log("error: " + err);
            });
            //console.log(url);
            const content = document.getElementById("content");
            content.removeAttribute("class", "hidden");
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                       Section for fuctions that initiate the functionality                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



// Function starts when search button is clicked. takes value from the search field and 
//passes it along to both the function to get lat and long, and also to the functions for saving it to search history
function citySearch(e){
          
    if (!searchEl.value) {
        return;
    };
    e.preventDefault();      
    var search = searchEl.value.trim();
    getLatLon(search);
    searchEl.value = "enter city name...";

    
};

// function to begin the search for lat and lon values using search history buttons instead of the input field
function useSearchHistory(e) {
  if (!e.target.matches("button.history")) {
    return;
  };
  var btn = e.target;
  var search = btn.getAttribute("data-search");
  getLatLon(search);
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                       Section for fuctions that initiate the functionality                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



// function to add the recent search to the search history and then redraw the buttons to the page
function addHistory(search) {
    searchHistory.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    console.log(searchHistory);
    // call to redraw buttons to page after adding new search to search history
    historyButtons();
};


// function to draw search history buttons to the page
function historyButtons() {
    let historySec = document.getElementById("searchHistory");
    historySec.innerHTML = "";
    //
    for (var i = searchHistory.length - 1; i >= searchHistory.length - 5; i--) {
        if (i < 0){
          return;
        };

        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "history");
        var space = document.createElement("br");
        btn.setAttribute("data-search", searchHistory[i]);
        // console.log(searchHistory[i]);
        btn.textContent = searchHistory[i];
        historySec.append(btn);
        historySec.append(space);

    };
};


// function to pull the list of previous searches from loacal storage and then have buttons for them created on the page
function createHistory() {
    var savedHistory = localStorage.getItem("searchHistory");
    console.log(savedHistory);
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
    };
    // call to generate search history buttons
    historyButtons();
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                 Section for initial calls to set up page and await user input                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////



createHistory();
submitEl.onclick = citySearch;
searchHistoryButts.addEventListener("click", useSearchHistory);