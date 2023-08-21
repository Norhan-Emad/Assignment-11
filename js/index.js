let home = document.getElementById("home");
let searchInput = document.getElementById("search");
//current day 
let textWeather = document.getElementById("text-current");
let dateCurrent = document.getElementById("dateCurrent");
let tempCurrent = document.getElementById("tempCurrent");
let iconCurrent = document.getElementById("iconCurrent");
let currentCity = document.querySelectorAll(".currentCity , .City1 , .City2");
let currentDay = document.getElementById("currentDay");
//day 1

let textWeather1 = document.getElementById("text1");
let dateOne = document.getElementById("dateOne");
let temp1 = document.getElementById("temp1");
let minTemp1 = document.getElementById("minTemp1");
let iconOne = document.getElementById("iconOne");
let dayOne = document.getElementById("dayOne");
//day 2
let textWeather2 = document.getElementById("text2");
let dateTwo = document.getElementById("dateTwo");
let temp2 = document.getElementById("temp2");
let iconTwo = document.getElementById("iconTwo");
let dayTwo= document.getElementById("dayTwo");

//background image

async function getBackground(location){
    let https = await fetch(`https://api.teleport.org/api/urban_areas/slug:${location}/images/`);
    let data = await https.json();
    let url = data.photos[0].image.mobile;
    home.style.background=`linear-gradient(to right , #00000065 , #00000065) , url(${url}) center/cover no-repeat`;
    console.log(data);
}


// weather

async function getWeather(location){
    let https = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a35d74031fae4b30b29215502231808&q=${location}&days=3`);
    let weather = await https.json();
    console.log(weather)
    return weather ;
}

//current weather

function currentWeather(data){

    let date = data.current.last_updated;
    let current = new Date(date);
    let day = current.toLocaleDateString("en-us" ,{weekday:"long"} );

    //--------------html---------
    textWeather.innerHTML = data.current.condition.text;
    dateCurrent.innerHTML = data.current.last_updated;
    tempCurrent.innerHTML= data.current.temp_c;
    currentCity[0].innerHTML = data.location.region;
    iconCurrent.setAttribute("src" , `https:${data.current.condition.icon}`) ;
    currentDay.innerHTML = day ;
}


//day 1
function dayOneWeather(data){
    let date1 = data.forecast.forecastday[1].date;
    let current1 = new Date(date1);
    let day1 = current1.toLocaleDateString("en-us" ,{weekday:"long"} );

    //--------------html---------
    textWeather1.innerHTML = data.forecast.forecastday[1].day.condition.text;;
    dateOne.innerHTML = data.forecast.forecastday[1].date;
    temp1.innerHTML= data.forecast.forecastday[1].day.maxtemp_c;
    minTemp1.innerHTML= data.forecast.forecastday[1].day.mintemp_c;
    currentCity[1].innerHTML = data.location.region;
    iconOne.setAttribute("src" , `https:${data.forecast.forecastday[1].day.condition.icon}`) ;
    dayOne.innerHTML =day1;
}

//day 2

function dayTwoWeather(data){

    let date2 = data.forecast.forecastday[2].date;
    let current2 = new Date(date2);
    let day2 = current2.toLocaleDateString("en-us" ,{weekday:"long"} );

    //--------------html---------
    textWeather2.innerHTML = data.forecast.forecastday[2].day.condition.text;
    dateTwo.innerHTML = data.forecast.forecastday[2].date;
    temp2.innerHTML= data.forecast.forecastday[2].day.maxtemp_c;
    minTemp2.innerHTML= data.forecast.forecastday[2].day.mintemp_c;
    currentCity[2].innerHTML = data.location.region;
    iconTwo.setAttribute("src" , `https:${data.forecast.forecastday[2].day.condition.icon}`) ;
    dayTwo.innerHTML =day2;
}

// call functions
async function calls(cityName="cairo"){
    let background = await getBackground(cityName);
    let weatherData = await getWeather(cityName);
        currentWeather(weatherData);
        dayOneWeather(weatherData);
        dayTwoWeather(weatherData);
}
calls()

//search
searchInput.addEventListener("input",async function(){
    let searchWord = searchInput.value.toLowerCase();
    calls(searchWord)
})
