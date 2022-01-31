var searchHistory = [];
var apiUrl = 'https://api.openweathermap.org';
var apiKey = '5c19ae264ab26bc706f25f3b4635f591';


let submitEl = document.getElementById("searchBut");
let searchEl = document.getElementById("searchFld");

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

/* const date = dayjs()tz(timeone).format('M/D/YYYY'); */



function drawTodayCard (city, weather, time) {
    let date = dayjs().tz(time).format('M/D/YYYY');
    let curDate = document.getElementById("todayDate");
    let todayIcon = document.getElementById("todayIcon");
    let todayTemp = document.getElementById("todayTemp");
    let todayWind = document.getElementById("todayWind");
    let todayHum = document.getElementById("todayHum");
    let uv = document.getElementById("uv");
    let uvcolor = document.getElementById("uvcolor");
    let uvIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    todayCity.textContent = city;
    curDate.textContent = date;
    todayIcon.setAttribute("src", uvIcon);
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

    /* console.log(city);
    console.log(date);
    console.log(weather.temp);
    console.log(weather.wind_speed);
    console.log(weather.humidity);
    console.log(weather.uvi); */
};

function drawFiveDay(daily, time) {
  var startDt = dayjs().tz(time).add(1, 'day').startOf('day').unix();
  var endDt = dayjs().tz(time).add(6, 'day').startOf('day').unix();
  console.log(startDt);
  console.log(endDt);

}

function getCityInfo(cityData) {
    console.log(cityData);
    var lat = cityData.lat;
    var lon = cityData.lon;
    var city = cityData.name;
    /* console.log(lat);
    console.log(lon);
    console.log(city); */
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
      console.log(url); 
}        

function getLatLon(search) {
  var url = apiUrl + "/geo/1.0/direct?q="+ search + "&limit=5&appid=" + apiKey;
      fetch(url)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
            if (!data[0]) {
              alert('Location not found');
            } else {
              addHistory(search)
              getCityInfo(data[0]);
              return;
            }
          })
          .catch(function (err) {
               console.log('error: ' + err);
           });
           /* console.log(url); */
};   

function citySearch(e){
          
    if (!searchEl.value) {
      return;
    }
    e.preventDefault();      
    var search = searchEl.value.trim();
    getLatLon(search);
    searchEl.value = '';

    const content = document.getElementById("content");
    content.removeAttribute("class", "hidden");
};


// local storage functions
function addHistory(search) {
  // If there is no search term return the function
  if (searchHistory.indexOf(search) !== -1) {
    return;
  };
  searchHistory.push(search);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  searchHistoryButtons();
};

function historyButtons() {
  let historySec = document.getElementById("searchHistory");
  historySec.innerHTML = '';
  for (var i = searchHistory.length - 1; i >= searchHistory.length - 5; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute("class", "history");
    var space = document.createElement("br");

    // `data-search` allows access to city name when click handler is invoked
    //btn.setAttribute('data-search', searchHistory[i]);
    btn.textContent = searchHistory[i];
    historySec.append(btn);
    historySec.append(space);
  };
};

function createHistory() {
  var savedHistory = localStorage.getItem('searchHistory');
  if (savedHistory) {
    searchHistory = JSON.parse(savedHistory);
  };
  historyButtons();
};

submitEl.onclick = citySearch;
createHistory();
/* searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick); */