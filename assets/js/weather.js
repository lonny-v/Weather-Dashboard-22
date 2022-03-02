var searchBtn = document.getElementById('searchBtn');
var displayDate= document.getElementById('displayDate');
var temp = document.getElementById('temp');
var windSpeed = document.getElementById('windSpeed');
var humidity = document.getElementById('humidity');
var uvIndex = document.getElementById('uvIndex');

var cities = [];

searchBtn.addEventListener('click', function(e){
    e.preventDefault()
    var inputValue = document.getElementById('inputValue').value;
fetch ('https://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&units=imperial&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e')
        .then(response => response.json())
        .then(data => {
            var date = moment().format("MMMM Do YYYY, h:mm a");
            displayDate.innerText= inputValue + " " + "(" + date + ")";
            img.setAttribute("src", `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`);;
            var tempValue = data['main']['temp'] + " degrees";
            temp.innerText = "Temp: " + tempValue;
            windSpeed.innerText = "Wind: " + data['wind']['speed']  + " MPH";
            humidity.innerText = "Humidity: " + data['main']['humidity'] + "%";
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            displayUvIndex(lat, lon);
        })
    });


    function displayUvIndex (lat, lon) {
        fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e")
        .then(response => response.json())
        .then(data => {
            uvIndex.innerText = 'UV Index: ' + data['current']['uvi'];
            
        }).
        catch(err => alert('Error' + err))
    
    }