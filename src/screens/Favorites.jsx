import React from "react";
import WeatherCard from "../components/WeatherCard";
import {
  selectFovorite,
  selectShowCelsius,
  updateHomeScreenData,
} from "../features/counter/counterSlice";
import "../style/favorites.css";
import { Link } from "react-router-dom";
import screenNames from "../utils/screenNames";
import { useDispatch, useSelector } from "react-redux";

const Favorites = () => {
  const dispatch = useDispatch();

  const favoriteList = useSelector(selectFovorite);
  const showCelsiusFlag = useSelector(selectShowCelsius);

  const onFavoriteCardPress = (card) => {
    dispatch(updateHomeScreenData(card));
  };

  const renderFavoritesCards = (favoriteArr = []) => {
    if (!favoriteArr.length) return <div>List is empty</div>;

    return favoriteArr?.map((card, index) => {
      const degree = showCelsiusFlag
        ? card.degree.degreeCel
        : card.degree.degreeFer;

      const params = {
        link: {
          to: screenNames.home,
          key: index,
        },
        cardDiv: {
          onClick: () => onFavoriteCardPress(card),
          className: "favorite-card",
        },
        weatherParams: {
          description: card.description,
          title: card.title,
          degree: degree,
        },
      };
      return (
        <Link {...params.link}>
          <div {...params.cardDiv}>
            <WeatherCard {...params.weatherParams} />
          </div>
        </Link>
      );
    });
  };
  return (
    <div className='container-favorites'>
      {renderFavoritesCards(favoriteList)}
    </div>
  );
};

export default Favorites;
