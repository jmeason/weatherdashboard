const cityInput=document.getElementById('#city-input');
const APIKey = '5cf9d0cffd4e753203b4eab9872350cf';
//document.getElementById('#search-btn').addEventListener('click', fetchWeather)

const weatherURL='https://openweathermap.org/forecast5'



    function displayWeather (data) {
        const weatherContainer=document.getElementById('#weather-container');
        weatherContainer.innerhtml='';
    }

    function getCurrentWeather(lat, lon){
        fetch (`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${APIKey}`)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(JSON.stringify(data));
    })
}
    
    function forecastWeather(lat, lon){
        fetch (`api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${APIKey}`)
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

    $('#search-btn').on('click', function(e){
        e.preventDefault();
        const city=$('#city-input').val();
        if (city){
            saveToSearchHistory(city);
            fetchGeo(city);
            $('#city-input').val('');  }   
         })

// let searchHistory=localStorage.getItem('searchHistory')

function saveToSearchHistory(city){
    let searchHistory=JSON.parse(localStorage.getItem('searchHistory'))|| [];
    
//if (!searchHistory.incldues(city)){
    searchHistory.push(city);
        localStorage.setItem('searchHistory,', JSON.stringify(searchHistory)); //stringify the object so it is readable
        for(var i=0; i<searchHistory.length;i++){
            let btn = $("<button>");
            btn.text(searchHistory[i]);
            btn.setAttribute('data-city', searchHistory[i]);
            btn.onclick(function(){
                let c = this.getAttribute('data-city');
                console.log(c);
                fetchGeo(c)
            })
            $("#history").append(btn);
        }
//}
}