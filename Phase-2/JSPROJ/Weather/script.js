const apikey="c3482bfde08ed11b19baa381a65d0014";
const searchbox=document.querySelector(".inpsearch input")
const searchbtn=document.querySelector(".inpsearch button")
const url="https://api.openweathermap.org/data/2.5/weather?q=";
const centerimg=document.querySelector(".centerimg");
const error=document.querySelector(".error");
const weathercontainer=document.querySelector(".weathercontainer");
async function getWeather(city){
    const response=await fetch(url + city + `&appid=${apikey}`);
    var data=await response.json()
    //console.log(data)
    if(data.cod=="404"){
            error.style.display="block";
            weathercontainer.style.display="none";
            return;
        }
    error.style.display="none";
    weathercontainer.style.display="block"; 
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp-273.15)+"°C";
    document.querySelector(".temp").style.fontWeight=500;
    document.querySelector(".htext").innerHTML=data.main.humidity + "%";
    document.querySelector(".wtext").innerHTML=data.wind.speed + " km/h";

    if(data.weather[0].main=="Clouds"){
        centerimg.src="images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        centerimg.src="images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        centerimg.src="images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        centerimg.src="images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        centerimg.src="images/mist.png";
    }
}
searchbtn.addEventListener("click", () => {
    getWeather(searchbox.value);
});
getWeather("Bengaluru");