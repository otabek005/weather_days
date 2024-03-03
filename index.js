"use strict";

// ---------------------------------------------------------------- Variable names ----------------------------------------------------------------
const darkmode = $("#dark-mode");
const darkbtn = $("#dark-btn");
const search = $("#search_city");
const key = "4758b00574eb4b40806154424240203"
const countrytime = $("#country-time");
const countryweather = $("#country-weather");
const day5ul = $("#day5ul");
const days = $("#days");
const section = $("#section");
const loader = $(".loader");





// ---------------------------------------------------------------- Functions ----------------------------------------------------------------
function darkmodeOpen(){
    if(darkstep == false){
        darkstep = true;
        darkbtn.style.cssText ="transition: all 0.2s linear; left: 65px";
    }else{
        darkstep = false;
        darkbtn.style.cssText ="transition: all 0.2s linear; left: 5px";
    }
}


function renderdata(data){
        section.style.cssText = "display: none;";
        loader.style.cssText = "display: block;";
        setTimeout(() => {
              loader.style.cssText = "display: none;";
              section.style.cssText = "display: block;";
        },1000)

        countrytime.innerHTML = ""
        let timecity = createElement('div', "timestyle", `
            <p>${data.location.name}</p>
            <h4>${data.location.localtime.split(" ")[1]}</h4>
            <p>${data.location.localtime.split(" ")[0]}</p>
        `)
        countrytime.appendChild(timecity);
        
        countryweather.innerHTML = "";
        let weather_1 = createElement('div', "weather-1", `
        <h2>${data.current.temp_c}°C</h2>
        <p>Feels like: <span>${data.current.feelslike_c}°C</span></p>
        <div>
            <img src="./images/sunrise-white 1.svg" alt="sunrise">
            <div>
                <p>Sunrise</p>
                <p>${data.forecast.forecastday[0].astro.sunrise}</p>
            </div>
        </div>
        <div>
            <img src="./images/sunset-white 1.svg" alt="sunrise">
            <div>
                <p>SunSet</p>
                <p>${data.forecast.forecastday[0].astro.sunset}</p>
            </div>
        </div>
        `);
        let weather_2 = createElement('div', "weather-2", `
            <img src="${data.current.condition.icon}" alt="sun">
            <p>${data.current.condition.text}</p>
        `);
        let weather_3 = createElement('div', "weather-3", `
                <div class="humidity">
                    <img src="./images/humidity 1.svg" alt="">
                    <p>${data.current.humidity}%</p>
                    <p>Humidity</p>
                 </div>
                 <div class="wind">
                    <img src="./images/wind 1.svg" alt="">
                    <p>${data.current.wind_kph}km/h</p>
                    <p>Wind Speed</p>
                </div>
                <div class="pressure">
                    <img src="./images/pressure-white 1.svg" alt="">
                    <p>${data.current.pressure_mb}hPa</p>
                    <p>Pressure</p>
                </div>
                    <div class="uv">
                    <img src="./images/uv-white 1.svg" alt="">
                    <p>${data.current.uv}</p>
                    <p>UV</p>
                 </div>
        `)

        countryweather.appendChild(weather_1)
        countryweather.appendChild(weather_2)
        countryweather.appendChild(weather_3)

        day5ul.innerHTML = "";
        for(let i = 0; i < 5; i++){
            let day5 = createElement('li', "", `
                <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="">
                <p>${data.forecast.forecastday[i].day.maxtemp_c}°C</p>
                <p>${data.forecast.forecastday[i].day.condition.text}</p>
            `)
            day5ul.appendChild(day5)
        }

        let timer = 8
        days.innerHTML = "";
           for(let i = 0; i < 5; i++){
                let day1 = createElement('div', "", `
                <p>${data.forecast.forecastday[0].hour[timer+3].time.split(" ")[1]}</p>
                <img src="${data.forecast.forecastday[0].hour[timer+3].condition.icon}" alt="img">
                <p>${data.forecast.forecastday[0].hour[timer+3].temp_c}°C</p>
                <img src="./images/navigation 1.svg" alt="img">
                <p>${data.forecast.forecastday[0].hour[timer+3].wind_kph}km/h</p>
        `)
        timer+=3
        days.appendChild(day1)

           }

}

async function get5daycity(value, key){
    if(value.length == 0){
        alert("Please enter a city")
    }else{
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&days=5&q=${value} `
        let response = await fetch(url);
        let data = await response.json();
        renderdata(data)
    }
}

// ---------------------------------------------------------------- Events ----------------------------------------------------------------
let darkstep = false;
darkmode.addEventListener("click", (e)  => {
    darkmodeOpen();
})

search.addEventListener("keyup", (e) => {
    if(e.keyCode == 13){
        e.preventDefault();
        get5daycity(e.target.value, key)
    }
})
