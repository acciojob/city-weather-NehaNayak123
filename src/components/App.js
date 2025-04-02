import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import axios from "axios";
import "regenerator-runtime/runtime";
const App = () => {
  const [query, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const apiKey = "86f1c2dff7e908d7ee7762ac40981af6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;

  const fetchApi = async () => {
    try {
      const response = await axios.get(url);
       console.log(response.data);
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching data: ", error);
      // setError("Error fetching data. Please try again.");
      setWeather({});
    }
  };

  useEffect(() => {
    fetchApi();
    console.log("called fetchAPI");
   // return () => console.log("cleanup");
  }, [query]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const display = () => {
    setCity(input);
    setInput("");
  };

  return (
    <div className="main" id="main">
      <div className="search">
        <input type="text" value={input} onChange={handleChange} />
        <button onClick={display}>Search</button>
      </div>
      <div className="weather">
        {error && <h2>{error}</h2>}
        {!error && weather.main && (
          <>
            <h1>{query}</h1>
            <h2>{weather.main.temp}°F</h2>
            <h3>{weather.weather[0].description}</h3>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="cloud image"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
