import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Weather.css'
import 'bootstrap/dist/css/bootstrap.css';
import { WiBarometer, WiHumidity, WiThermometer, WiStrongWind, WiSunset, WiSunrise } from "react-icons/wi";
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import broken_clouds_icon from "../assets/broken_clouds.png"
import scattered_clouds_icon from "../assets/scattered_clouds.png"
import shower_rain_icon from "../assets/shower_rain.png"
import storm_icon from "../assets/storm.png"
import haze_icon from "../assets/haze.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"

const Weather = () => {
  const [city, setCity] = useState("Islamabad"); 
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState("false");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon, 
    "03d" : scattered_clouds_icon,
    "03n" : scattered_clouds_icon,
    "04d" : broken_clouds_icon,
    "04n" : broken_clouds_icon,
    "09d" : shower_rain_icon,
    "09n" : shower_rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "11d" : storm_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
    "50d" : haze_icon
  }

  const search = async (city) => {
    if(city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = 
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=15020a0157711c5f590d10069b4322a6`
      ;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); //You can see all the weather data in console log
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity : data.main.humidity,
        feels_like : data.main.feels_like, 
        description: data.weather[0].description,
        windSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp_min),
        location : data.name,
        pressure : data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: icon
      })
    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    search(city);
  }, []);

    const handleInputChange = (e) => {
      e.preventDefault();
      setCity(e.target.value);
  };


  return (
    <div className='weather-app'>
      <div className='search-bar'>
          <input 
            ref={inputRef}
            className='input-field'
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button className='search-button' alt="" onClick={()=>{search(inputRef.current.value)}}>🔍︎</button>
      </div>
        <>
          <h2>{city} Weather Forecast</h2>
          <div className='info-grid'>
            <div className='temp card'>
              {/* <div className='weather-icon'><WiDaySunny size="150px"/></div> */}
              <img className="wicon" src={weatherData.icon} alt=""/>
              <div className='temp-data'>{weatherData.temperature}°C </div>
              <div className='description'>{weatherData.description}</div>
            </div>          
            <div className="grid text-center">
              <div className='row-card'>
                <div className="g-col-6 card">
                  <WiThermometer/>
                  <p>Feels like : {weatherData.feels_like}°C</p>            
                </div>
                <div className="g-col-6 card">
                  <WiHumidity/>
                  <p>Humidity : {weatherData.humidity}%</p>            
                </div>
              </div>
              <div className='row-card'>
                <div className="g-col-6 card">
                  <WiBarometer />
                  <p>Pressure: {weatherData.pressure}</p>    
                </div>
                <div className="g-col-6 card">
                  <WiStrongWind/>
                  <p>Wind Speed : {weatherData.windSpeed}m/s</p>  
                </div>
              </div>
              <div className='row-card'>
                <div className="g-col-6 card">
                  <WiSunrise/>
                  <p>Sunrise : {new Date(weatherData.sunrise*1000).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                                  })}</p>            
                </div>
                <div className="g-col-6 card">
                  <WiSunset/>
                  <p>Sunset : {new Date(weatherData.sunset*1000).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                                  })}</p>                        
                </div>
              </div>
            </div>            
          </div>
        </>
    </div>
  );
};

export default Weather;