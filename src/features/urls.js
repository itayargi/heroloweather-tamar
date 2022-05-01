const mainUrl = "https://dataservice.accuweather.com/";

export default {
  city: (apikey, city) =>
    mainUrl + `locations/v1/cities/search?apikey=${apikey}&q=${city}`,
    forecasts :(apikey, localkey)=> mainUrl + `forecasts/v1/daily/5day/${localkey}?apikey=${apikey}`,
    autocomplete:(apikey, text)=>mainUrl + `locations/v1/cities/autocomplete?apikey=${apikey}&q=${text}`,
};
