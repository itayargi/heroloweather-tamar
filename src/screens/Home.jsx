import React, { useEffect, useState } from "react";
import SearchButton from "../components/SearchButton";
import CurrentLocation from "../components/CurrentLocation";
import {
  getCityAsync,
  getForecastsAsync,
  saveCity,
  saveFiveDaysData,
  selectStatus,
  STATE_STATUS,
} from "../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import "../style/home.css";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
let renderFlag = true;

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const loader_status = useSelector(selectStatus);
  const [theme, setTheme] = useState("light");

  const LightTheme = {
    pageBackground: "white",
    titleColor: "#dc658b",
    tagLineColor: "black",
  };

  const DarkTheme = {
    pageBackground: "#282c36",
    titleColor: "lightpink",
    tagLineColor: "lavender",
  };

  const themes = {
    light: LightTheme,
    dark: DarkTheme,
  };

  const fetchCityData = async (city) => {
    return dispatch(getCityAsync(city));
  };
  const fetchForecastData = async (localKey) => {
    return dispatch(getForecastsAsync(localKey));
  };

  const updateHomeScreenDataWithCity = async (city) => {
    try {
      const response = await fetchCityData(city);
      const localKey = response.payload[0].Key;
      dispatch(saveCity(response));
      const forecastsResponse = await fetchForecastData(localKey);
      dispatch(saveFiveDaysData(forecastsResponse));
    } catch (e) {
      toast("We have issues with the server");
      console.log("erro updateHomeScreenDataWithCity");
    }
  };

  const searchParams = {
    placeholder: "Enter city",
    updateHomeScreenDataWithCity,
  };
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("lat", lat);
        console.log("lng", lng);
      });
      /* geolocation is available */
    } else {
      console.log("no geolocation");

      /* geolocation IS NOT available */
    }
  };
  useEffect(() => {
    if (renderFlag) {
      renderFlag = false;
      getUserLocation();
      updateHomeScreenDataWithCity("tel aviv");
    }
  }, []);

  useEffect(() => {
    if (loader_status === STATE_STATUS.PENDING) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loader_status]);
  return (
    <div className='container-home-page'>
      {isLoading && (
        <div className='loader'>
          <TailSpin ariaLabel='loading-indicator' />
        </div>
      )}
      <div className='container-search-button'>
        <SearchButton {...searchParams} />
      </div>
      <CurrentLocation />
      <ToastContainer />
    </div>
  );
};

export default Home;
