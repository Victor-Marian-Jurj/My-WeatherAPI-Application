const key = "4baed30338954ef4a86194105222612";
//DOM
const doc = document;
const app = doc.querySelector('.weather-app');
const temp = doc.querySelector('.temp');
const dateOutput = doc.querySelector('.date');
const timeOutput = doc.querySelector('.time');
const conditionOutput = doc.querySelector('.condition');
const nameOutput = doc.querySelector('.name');
const icon = doc.querySelector('.icon');
const cloudOutput = doc.querySelector('.cloud');
const humidityOutput = doc.querySelector('.humidity');
const windOutput = doc.querySelector('.wind');
const form = doc.getElementById('locationInput');
const search = doc.querySelector('.search');
const btn = doc.querySelector('.submit');
const cities = doc.querySelectorAll('.city');

let cityInput = 'Bucharest';
console.log(cities);
cities.forEach((city) => {
    city.addEventListener('click',(e)=>{
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    console.log("cities");
    if(search.value.length == 0){
        alert('Please type a city name');
    } else{
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity ="0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day,month,year){
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Satuday'
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData(){
    let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${cityInput}`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.current);
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;
        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11); 
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        icon.src = "./icons/" + iconId;
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
        let timeOfDay = "day";
        const code = data.current.condition.code;

        if(!data.current.is_day){
            timeOfDay = "night";
        }

        if(code == 1000){
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

            btn.style.background = "#e5ba92";

            if(timeOfDay == "night"){
                btn.style.background = "#181e27";
            }
        } else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ){
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";

            if(timeOfDay == "night"){
                btn.style.background = "#181e27";
            }
        } else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ){
            app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if(timeOfDay == "night"){
                btn.style.background = "#325c80";
            }
        } else{
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if(timeOfDay == "night"){
                btn.style.background = "#1b1b1b";
            }
        }
        app.style.opacity = "1";
    })
    .catch((e) => {
        alert('City not found, please try again');
        console.log(e);
        app.style.opacity = "1";
    });
}
fetchWeatherData();
app.style.opacity = "1";