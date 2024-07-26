const cityInput=document.getElementById('#city-input');
const APIKey = '5cf9d0cffd4e753203b4eab9872350cf';
//document.getElementById('#search-btn').addEventListener('click', fetchWeather)
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');


const weatherURL='https://openweathermap.org/api'

 
    function displayWeather (data) {
        const weatherContainer=document.getElementById('#weather-container');
        weatherContainer.innerhtml=`
         <h>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °F</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} MPH</p>`;
    }

    
    function getCurrentWeather(lat, lon){
        fetch (`https://api.openweathermap.org/data/2.5/weather?lat=lat=${lat}&lon=${lon}&appid=${APIKey}`)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(JSON.stringify(data));
    })
}
    
    function forecastWeather(lat, lon){
        fetch (`api.openweathermap.org/data/2.5/forecast?lat=lat=${lat}&lon=${lon}&appid=${APIKey}`)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(JSON.stringify(data));
    })
}

    function fetchGeo(city){
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(JSON.stringify(data));
            getCurrentWeather(data[0].lat, data[0].lon);
            forecastWeather(data[0].lat, data[0].lon)
        })
    }
//search button click
$('#search-btn').on('click', function (e) {
    e.preventDefault();
    const city = $('#city-input').val().trim();
    if (city) {
        saveToSearchHistory(city);
        fetchGeo(city);
        $('#city-input').val('');
    }
});

// let searchHistory=localStorage.getItem('searchHistory')
//saving history to local storage--json parse and json.stringify to turn object to string
function saveToSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderSearchHistory();
    }
}
// if (!searchHistory.incldues(city)){

function renderSearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyContainer = $('#history');
    historyContainer.empty();
    searchHistory.forEach(city => {
        let btn = $('<button>').text(city).addClass('btn btn-secondary m-1');
        btn.attr('data-city', city);
        btn.on('click', function () {
            fetchGeo(city);
        });
        historyContainer.append(btn);
    });
}

// Initial rendering of search history on page load
$(document).ready(function () {
    renderSearchHistory();
});

    searchHistory.push(city);
        localStorage.setItem('searchHistory,', JSON.stringify(searchHistory)); //stringify the object so it is readable
        for(var i=0; i<searchHistory.length;i++){
            let btn = $("<button>");
            btn.text(searchHistory[i]);
            btn.setAttribute("data-city", searchHistory[i]);
            btn.onclick(function(){
                let c = this.getAttribute('data-city');
                console.log(c + searchHistory.length); //console.log(JSON.parse(JSON.stringify(c)))
                fetchGeo(c)
            })
            $("#history").append(btn);
        }
    
