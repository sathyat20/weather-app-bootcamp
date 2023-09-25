import axios from "axios";
import React from "react";

export default class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityInputValue: "",
      temperature: "",
      weather: "",
      city: "",
      isSubmitted: false,
      img: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${
          this.state.cityInputValue
        }&limit=1&appid=${`069803e76b8b496e15350e8cd930e92d`}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          // `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${
          //   cityGeoData.lat
          // }&lon=${
          //   cityGeoData.lon
          // }&appid=${`069803e76b8b496e15350e8cd930e92d`}&units=metric`
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            cityGeoData.lat
          }&lon=${
            cityGeoData.lon
          }&appid=${`069803e76b8b496e15350e8cd930e92d`}&units=metric`
        )
      )
      .then((response) => {
        console.log(response)
        const { data: weatherData } = response;
        console.log(weatherData);
        this.setState({
          isSubmitted: true,
          city: weatherData.name,
          temperature: weatherData.main.temp,
          weather: `${weatherData.weather[0].main}, ${weatherData.weather[0].description}`,
          img: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        });
        console.log(weatherData.weather[0].description);
      });
  };

  onChange = (event) => {
    this.setState({ 
      cityInputValue: event.target.value,
     });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.cityInputValue}
              onChange={this.onChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.isSubmitted ? (
          <div>
            <img src={this.state.img} alt="" />
            <p>Current City: {this.state.city}</p>
            <p>Current Temperature: {this.state.temperature}°C</p>
            <p>Current Weather: {this.state.weather}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
