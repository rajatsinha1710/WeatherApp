
# Weather App

This is a Weather App. You can check weather condittions of that particular city.

## Deployment

To deploy this project run

```bash
  npm run build
  npm install -g serve
  serve -s build
```



## Documentation

[Documentation](https://legacy.reactjs.org/docs/getting-started.html)


## Demo

Click here to get the live demo of the project....

https://drive.google.com/file/d/1rCbILm1cBpP5u2HyG6BHfTwXsKDV6wTt/view?usp=sharing
## API Reference

#### Get all items

```http
  GET https://api.openweathermap.org/data/2.5/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api.base` | `string` | **Required**. Your API key |

#### Get item

```http
  GET ${api.base}weather?q=${city}&units=metric&APPID=${api.key}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api.key`      | `string` | **Required**. Id of item to fetch |



## Appendix

For the Above Project I have used Openweathermap api to fetch weather data.
Bar from Chart.Js is used to represent the data in visual format.
For the autocomplete feature I have use Geo-location API from Google Cloud. 


## Authors

- [@rajatsinha1710](https://www.github.com/rajatsinha1710)


## Screenshots

![App Screenshot](http:/Users/Dell/Downloads/Weather-App.jpg?raw=true "Weather-app")


## Run Locally

Clone the project

```bash
  git clone https://github.com/rajatsinha1710/WeatherApp.git
```

Go to the project directory

```bash
  cd weather-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Installation

Install weather-app with npm

```bash
  npm install weather-app
  cd weather-app
```
    
## Tech Stack

**Client:** React, Redux, TailwindCSS, ChartJS

**API:** OpenWeathermap, Google Cloud

**Deployment:** Netlify

