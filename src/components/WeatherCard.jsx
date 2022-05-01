import React from "react";
import "../style/weatherCard.css";

export default function WeatherCard(props) {
  const { title , degree, description} = props;
  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{degree}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
