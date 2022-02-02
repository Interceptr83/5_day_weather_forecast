# 06 Server-Side APIs: Weather Dashboard
![screenshot](https://user-images.githubusercontent.com/90010873/152104981-6ca1d7e8-8f8d-40d1-9e83-0e3befc6277d.jpg)

Deployed Link: https://interceptr83.github.io/5_day_weather_forecast/

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history - DONE
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index - DONE
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe - DONE
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity - DONE
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city - DONE
```
## credited libraries
openweathermap.org, 
bootstrap, 
iconify, 
dayjs
