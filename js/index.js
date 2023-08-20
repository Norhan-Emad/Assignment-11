let home = document.getElementById("home");
let textWeather = document.getElementById("text-current");
let textWeather1 = document.getElementById("text1");
let textWeather2 = document.getElementById("text2");
let dateCurrent = document.getElementById("dateCurrent");
let dateOne = document.getElementById("dateOne");
let dateTwo = document.getElementById("dateTwo");
let tempCurrent = document.getElementById("tempCurrent");
let temp1 = document.getElementById("temp1");
let temp2 = document.getElementById("temp2");
let minTemp1 = document.getElementById("minTemp1");
let minTemp2 = document.getElementById("minTemp2");
let iconCurrent = document.getElementById("iconCurrent");
let iconOne = document.getElementById("iconOne");
let iconTwo = document.getElementById("iconTwo");
let currentCity = document.querySelectorAll(".currentCity , .City1 , .City2");
let searchInput = document.getElementById("search");

async function getBackground(){
    let https = await fetch(`https://api.teleport.org/api/urban_areas/slug:${searchProduct()}/images/`);
    let data = await https.json();
    let url = data.photos[0].image.mobile;
    home.style.background=`linear-gradient(to right , #00000065 , #00000065) , url(${url}) center/cover no-repeat`;
    console.log(data);
}


async function getCurrentWeather(){

    //var 
    let currentDay = document.getElementById("currentDay");
    let dayOne = document.getElementById("dayOne");
    let dayTwo= document.getElementById("dayTwo");

    //fetch
    let https = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a35d74031fae4b30b29215502231808&q=${searchProduct()}&days=7`);
    let data = await https.json();
    let loCity = data.location.region;
    let loCountry = data.location.country;
    //current 
    let text = data.current.condition.text;
    let icon = data.current.condition.icon;
    let date = data.current.last_updated;
    let tempC = data.current.temp_c;
    let tempF = data.current.temp_f ;
    let current = new Date(date);
    let day = current.toLocaleDateString("en-us" ,{weekday:"long"} );

    //--------------html---------
    textWeather.innerHTML = text;
    dateCurrent.innerHTML = date;
    tempCurrent.innerHTML= tempC;
    currentCity[0].innerHTML = loCity;
    iconCurrent.setAttribute("src" , `https:${icon}`) ;
    currentDay.innerHTML = day ;
    //day 1
    let text1= data.forecast.forecastday[1].day.condition.text;
    let icon1 = data.forecast.forecastday[1].day.condition.icon;
    let date1 = data.forecast.forecastday[1].date;
    let maxTempC = data.forecast.forecastday[1].day.maxtemp_c;
    let minTempC = data.forecast.forecastday[1].day.mintemp_c ;
    let current1 = new Date(date1);
    let day1 = current1.toLocaleDateString("en-us" ,{weekday:"long"} );

    //--------------html---------
    textWeather1.innerHTML = text1;
    dateOne.innerHTML = date1;
    temp1.innerHTML= maxTempC;
    minTemp1.innerHTML= minTempC;
    currentCity[1].innerHTML = loCity;
    iconOne.setAttribute("src" , `https:${icon1}`) ;
    dayOne.innerHTML =day1;

    //day2
    let text2= data.forecast.forecastday[2].day.condition.text;
    let icon2 = data.forecast.forecastday[2].day.condition.icon;
    let date2 = data.forecast.forecastday[2].date;
    let maxTempC2 = data.forecast.forecastday[2].day.maxtemp_c;
    let minTempC2 = data.forecast.forecastday[2].day.mintemp_c ;
    let current2 = new Date(date2);
    let day2 = current2.toLocaleDateString("en-us" ,{weekday:"long"} );

    //--------------html---------
    textWeather2.innerHTML = text2;
    dateTwo.innerHTML = date2;
    temp2.innerHTML= maxTempC2;
    minTemp2.innerHTML= minTempC2;
    currentCity[2].innerHTML = loCity;
    iconTwo.setAttribute("src" , `https:${icon2}`) ;
    dayTwo.innerHTML =day2;
}


function searchProduct(){
    let searchWord = searchInput.value;
    return searchWord;
}
searchInput.addEventListener("input",async function(){
    await getCurrentWeather();
    await getBackground();
    searchProduct();
    
})

