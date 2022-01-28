var searchHistory = [];
var apiUrl = 'https://api.openweathermap.org';
var apiKey = '5c19ae264ab26bc706f25f3b4635f591';


let submitEl = document.getElementById("searchBut");
let searchEl = document.getElementById("searchFld");

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

/* const date = dayjs()tz(timeone).format('M/D/YYYY'); */



           

function getLatLon(search){
var url = `${apiUrl}/geo/1.0/direct?q${search}&limit=5&appid=${apiKey}`;
fetch(apiUrl)
    .then(function (res) {
      console.log(res.json());;
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });

          
};     

function citySearch(){
          
    if (!searchEl.value) {
      return;
    }
          
    var search = searchEl.value.trim();
    getLatLon(search);
    searchEl.value = '';

    const content = document.getElementById("content");
    content.removeAttribute("class", "hidden");
};


submitEl.onclick = citySearch;
/* createHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);  */