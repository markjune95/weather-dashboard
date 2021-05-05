var cityNameEl = $('#city-name')
var currentWeatherEl = $('#current-weather-card')
var forecastWeatherEl = $('#forecast-weather-card')
var weatherCardEl = $('#weather-card')
var inputFormEl = $('.input-form')


var formSubmitHandler = function(event){
    event.preventDefault();
    
    var city = $.trim(cityNameEl.val());
    if(city){
        
        getCurrentWeather(city)
        
    }
    else{
        alert("Please enter a city's name")
    }
        
}

function getCurrentWeather(city){
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=826b4b7604f424dc0251a61dd3c403f9`;
    
    
    fetch(currentWeatherUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                
                    getForestWeather(data.coord.lat, data.coord.lon)
                    displayCurrentWeather(data)  
                   
                })

            }
            else{
                alert(`Error: ${response.statusText}`)
            }  
        })
        .catch(function(error){
            alert('Unable to find the city')
        })
}

function getForestWeather(lat,lon){
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=a2b4c3401daabb98bf05eae4890ac57c`
    fetch(forecastWeatherUrl)
        .then(function(response){
            response.json().then(function(data){
            displayForecastWeather(data)
            
            
        })
    })


}



function displayCurrentWeather(weatherData){
    currentWeatherEl.text('')

    var unixTime  = weatherData.dt
    var date = moment.unix(unixTime).format("MM/DD/YYYY")


    var city = `${weatherData.name}`
    var cityEl = $('<h3>')
    cityEl.addClass('fw-bolder mb-4')
    cityEl.text(`${city} (${date})`);
    var text = $('<h3>')
    text.addClass('text-light fw-bold font-monospace')
    text.text('Now')

    var iconEl = $('<img>')
    iconEl.attr('src',`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
    iconEl.addClass('current-img')
    
    var tempEl = $('<p>')
    tempEl.addClass('fw-bold mb-1')
    tempEl.text(`Temp: ${weatherData.main.temp} \xB0F`)
  
    var windEl = $('<p>')
    windEl.addClass('fw-bold mb-1')
    windEl.text(`Wind Speed: ${weatherData.wind.speed} MPH`)

    var humidityEl = $('<p>')
    humidityEl.addClass('fw-bold mb-1')
    humidityEl.text(`Humidity: ${weatherData.main.humidity}%`)

    var uvEl = $('<p>')
    uvEl.addClass('fw-bold mb-1')
    uvEl.text(`Cloudiness: ${weatherData.clouds.all}% (${weatherData.weather[0].description})`)
    
    
    currentWeatherEl.append(cityEl, text, iconEl, tempEl, windEl, humidityEl, uvEl)
    
    
}


function displayForecastWeather(forecastData){
    forecastWeatherEl.text('')
    for(var i = 1; i < 6 ; i++ ){

        var div = $('<div>')
        div.addClass('m-2 p-2 mb-1 col-2.2 forecast')

        var unixTime  = forecastData.daily[i].dt
        var date = moment.unix(unixTime).format("MM/DD/YYYY")

        var day = $('<p>')
        day.text(date)


        var iconEl = $('<img>')
        iconEl.attr('src',`http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png`)


        var tempEl = $('<p>')
        tempEl.addClass('mb-1')
        tempEl.text(`Temp: ${forecastData.daily[i].temp.day} \xB0F`)

        var windEl = $('<p>')
        windEl.addClass('mb-1')
        windEl.text(`Wind Speed: ${forecastData.daily[i].wind_speed} MPH`)

        var humidityEl = $('<p>')
        humidityEl.addClass('mb-1')
        humidityEl.text(`Humidity: ${forecastData.daily[i].humidity}%`)

        var uvEl = $('<p>')
        uvEl.addClass('mb-1')
        uvEl.text(`UV Index: ${forecastData.daily[i].uvi}%`)

        div.append(day, iconEl, tempEl, windEl, humidityEl, uvEl)
        forecastWeatherEl.append(div)
        
        
    }
    
}


inputFormEl.on('click', formSubmitHandler)