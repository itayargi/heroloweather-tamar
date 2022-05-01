import React from "react";
import { useState, useEffect } from "react";

const ApiFetch = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=SYEovD1kaWeb8Hc2vW7TwppUkrrS5sMl&q=tel-aviv"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error", error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <></>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      /* here we map over the element and display each item as a card  */
      <div className='wrapper'>
        <ul className='card-grid'>
          {items.map((item) => (
            <li>
              <article className='card' key={item.callingCodes}>
                <div className='card-image'>
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className='card-content'>
                  <h2 className='card-name'>{item.name}</h2>
                  <ol className='card-list'>
                    <li>
                      population: <span>{item.population}</span>
                    </li>
                    <li>
                      Region: <span>{item.region}</span>
                    </li>
                    <li>
                      Capital: <span>{item.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ApiFetch;
