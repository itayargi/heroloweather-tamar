import urls from "../urls";

const apikey = "boEG6HPhCrwgQvtZ9RspSdAgZHb9gKk4";

const fetchApi = async (url, text) => {
  let params = {
    method:"GET"
  };
  console.log("fetch to:", text);
  console.log("fetch url", url);
  return await fetch(url, params);
};

export const getCityData = async (city) => {
  return new Promise((resolve) => {
    fetchApi(urls.city(apikey, city), "getCityData")
      .then((res) => res.json())
      .then((resJson) => {
        console.log("city res:", resJson);
        resolve({ data: resJson });
      })
      .catch((error) => {
        console.log("error getCityData", error);
        resolve({ data: null });
      });
  });
};

export const getFiveDaysForecasts = async (localKey) => {
  return new Promise((resolve) => {
    fetchApi(urls.forecasts(apikey, localKey), "getFiveDaysForecasts")
      .then((res) => res.json())
      .then((resJson) => {
        console.log("getFiveDaysForecasts res:", resJson);

        resolve({ data: resJson });
      })
      .catch((error) => {
        console.log("error getFiveDaysForecasts", error);
        resolve({ data: null });
      });
  });
};

export const getAutocompleteCities = async (text) => {
  return new Promise((resolve) => {
    fetchApi(urls.autocomplete(apikey, text),"getAutocompleteCities")
      .then((res) => res.json())
      .then((resJson) => {
        resolve({ data: resJson });
      })
      .catch((error) => {
        console.log("error getAutocompleteCities", error);
        resolve({ data: null });
      });
  });
};
