import React from "react";
import logo from "./logo.png";
import "./App.css";
import WeatherForecast from "./Components/WeatherForecast";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <WeatherForecast />
          </p>
        </header>
      </div>
    );
  }
}

export default App;
