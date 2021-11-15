import React, {useState, useEffect} from 'react';
import axios from "axios";

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        let url = "http://api.weatherstack.com/current" +
            "?access_key=" + api_key +
            "&query=" + country.capital;
        axios.get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    const weatherContent = () => {
        if (weather.length !== 0) {
            return <div>
                <p>temperature: {weather.current.temperature} Celcius</p>
                <img src={weather.current.weather_icons[0]} alt="weather icon"/>
                <p><b>wind: </b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
            </div>
        }
    }

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            {weatherContent()}
        </div>
    )
}

export default Weather
