import React from "react";

const Forecats = () => {
  const key = "SYEovD1kaWeb8Hc2vW7TwppUkrrS5sMl";

  //et Weather information
  const getWeather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  };

  //Get city information
  const getCity = async (city) => {
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  };

  getCity("tel-aviv")
    .then((data) => {
      return getWeather(data.Key);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  return <div></div>;
};

export default Forecats;
