import React from "react";
import "../style/currentLocation.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorite,
  selectCity,
  selectFovorite,
  selectShowCelsius,
  selectWeatherDays,
} from "../features/counter/counterSlice";
import WeatherCard from "./WeatherCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CurrentLocation = (props) => {
  const dispatch = useDispatch();
  const cityObj = useSelector(selectCity);
  const weatherObj = useSelector(selectWeatherDays);
  const showCelsiusFlag = useSelector(selectShowCelsius);
  const degree = showCelsiusFlag
    ? weatherObj.days?.[0]?.degreeCel
    : weatherObj.days?.[0]?.degreeFer;
  const description = weatherObj?.description;
  const favoriteArr = useSelector(selectFovorite);

  const renderFiveDaysCards = (days = []) => {
    return days?.map((day, index) => {
      return (
        <div key={index} className='weather-card'>
          <WeatherCard
            degree={showCelsiusFlag ? day.degreeCel : day.degreeFer}
            title={day.title}
          />
        </div>
      );
    });
  };
  const isOnList = (localKey) => {
    const allLocalKeys = favoriteArr.map((data) => data.id);
    return allLocalKeys.indexOf(localKey) > -1;
  };
  const onAddToFavoritePress = () => {
    const cityLocalKey = cityObj.localKey;
    const isCityOnFavoriteList = isOnList(cityLocalKey);
    if (isCityOnFavoriteList) {
      toast("you already choose this city");
    } else {
      let favoriteObj = {
        cityData: cityObj,
        weatherDays: weatherObj,
      };
      dispatch(addToFavorite(favoriteObj));
    }
  };
  return (
    <div className='conatainer-location-card'>
      <div className='header-location'>
        <div className='container-left'>
          <div className='left'>
            <p>{cityObj?.title}</p>
            {degree && <p>{degree}</p>}
          </div>
        </div>
        <div className='container-right'>
          <div className='right'>
            <button onClick={onAddToFavoritePress} className='add-to-favorites'>
              Add to favorites
            </button>
          </div>
        </div>
      </div>
      <div className='container-description'>
        <div className='description'>{description}</div>
      </div>
      <div className='weather-days'>
        {renderFiveDaysCards(weatherObj?.days)}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CurrentLocation;
