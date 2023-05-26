import React, {useState } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import axios from "axios";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, Title} from 'chart.js';
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const api = {
    key: "3baadbe2e75c8b5090e7f9fd605750a8",
    base: "https://api.openweathermap.org/data/2.5/",
}

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const[weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [suggestions, setSuggestions] = useState([]) //for autocomplete feature

    const handleInputChange = (e) => {
        setCity(e.target.value);
    }
    
    const handleChange = (newSuggestions) => {
        setSuggestions(newSuggestions);
      };
    

    const fetchWeatherData = async (city) => {
        setLoading(true)
        setError('')
        try {
            const response = await axios.get(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)

            setWeatherData(response.data)
        }
        catch (error) {
            setError('Error occurred while fetching weather data.');
        }
        finally {
            setLoading(false)
        }
        setCity('') //to get empty input after pressing enter
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        fetchWeatherData(suggestions)
    }

    //data visualisation start
    
    const labels = [weatherData?.name];
    const Charts = {
        labels, 
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [weatherData?.main.temp],
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Humidity (%)',
                data: [weatherData?.main.humidity],
                borderColor: 'rgb(53,162,235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Air Pressure (Pa)',
                data: [weatherData?.main.pressure/100],
                borderColor: 'rgb(50,205,50)',
                backgroundColor: 'rgba(50,205,50, 0.5)',
            },
            {
                label: 'Wind Speed (KPH)',
                data: [weatherData?.wind.speed*3.6],
                borderColor: 'rgb(255,215,0)',
                backgroundColor: 'rgba(255,215,0,0.5)',
            },
        ],
    }

    const Chartoptions = {
        indexAxis: 'x',
        scales: {
            y:{
                beginAtZero: true,
                color: 'white',
                ticks: {
                    color: 'white',
                },
            },
            x: {
                color: 'white',
                ticks: {
                    color: 'white',
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 3,
            },
        },
        responsive: true,
        plugins: {

            legend: {
                position: 'right', 
                labels: {
                    color: 'white',
                },
            },
            title: {
                display: true,
                text: 'Weather Data Visualisation',
                color: 'white',
            },
        },
    }

    return (
        <div className="max-w-700 h-700 m-auto px-4 py-0 relative top-5 flex flex-col justify-between">
            <div >
                <div className="flex justify-between">
                <h1 className="text-5xl font-bold py-4 mx-1">WeatherApp</h1>
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="h-24 w-24 fill-current text-yellow-400 "
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z"></path>
    </svg>
                </div>
            <form onSubmit={handleFormSubmit} className="text-center p-1" autoComplete="on">
                <PlacesAutocomplete
                value={suggestions}
                onChange={handleChange}
    >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
            <input
            {...getInputProps({
                placeholder: 'Enter city name or ZIP code',
                className: 'bg-gray-200 appearance-none border border-solid border-opacity-80 border-gray-200 rounded-[25px] bg-opacity-10 py-2 px-6 text-white leading-tight focus:outline-none placeholder:text-white focus:border-blue-500 text-base z-10',
            })}
            />
            <div className="text-black">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
                const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
                const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };

                return (
                <div
                    {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                    
                    })}
                >
                    <span>{suggestion.description}</span>
                </div>
                );
            })}
            </div>
        </div>
        )}
    </PlacesAutocomplete>
                <button type="submit" disabled={loading} className="shadow bg-transparent hover:bg-blue-400 hover:text-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded relative z-10">
                    {loading ? 'Loading...' : 'Get Weather'}
                </button>
            </form>
            {error && <p className="text-red-500 text-xl">{error}</p>}

            {weatherData && (
                <div className="flex flex-col max-w-700 h-700 m-auto px-4 py-0 relative justify-between top-[-65px]">
                    <div className="w-full my-4 mx-auto">
                    <p className="text-2xl font-semibold mt-1">{weatherData.name},{weatherData.sys.country}</p> 
                    <h1 className="text-8xl font-bold">{weatherData.main.temp}°C </h1>
                    </div>
            <div className="relative w-full h-auto text-center top-[5px]">
            <Bar data={Charts} options={Chartoptions} className="mx-auto relative w-2/5 h-1"/>

            </div>
                    <div className="relative right-[-90%] origin-top-left rotate-[-90deg] top-[-200px] w-full bg-white bg-opacity-20">
                    <p className="text-xl">{weatherData.weather[0].main}</p>
                    </div>

                    <div className="flex justify-evenly text-center w-full m-4 mx-auto p-4 rounded-lg bg-white bg-opacity-20 text-xl relative top-[-20px]">
                    <div>
                    <p className="font-semibold">{weatherData.main.feels_like}°C</p>
                    <p>Feels Like</p>
                    </div>
                    <div>
                    <p className="font-semibold ">{weatherData.main.humidity}%</p>
                    <p>Humidity</p>
                    </div>
                    <div>
                    <p className="font-semibold">{weatherData.main.pressure/100} Pa</p>
                    <p>Air Pressure</p>
                    </div>
                    <div>
                    <p className="font-semibold">{weatherData.wind.speed*3.6} KPH</p>
                    <p>Wind Speed</p>
                    </div>
                    </div>
                    
                    
                </div>
            )}
                </div>
        </div>
    )
}

export default WeatherApp;