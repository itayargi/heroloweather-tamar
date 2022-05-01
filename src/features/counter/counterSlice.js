import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { daysOfWeek } from "../../utils/data";
import {
  getFiveDaysForecasts,
  getCityData,
  getAutocompleteCities,
} from "./counterAPI";

export const STATE_STATUS = {
  EMPTY: "empty",
  PENDING: "pending",
  SUCCESS: "success",
};
const initialState = {
  status: STATE_STATUS.EMPTY,
  showCelsius: true,
  cityData: null,
  favorite: [],
  weatherDays: {},
  searchData: [],
  localeKey: "",
};

export const getCityAsync = createAsyncThunk(
  "counter/getCityData",
  async (city) => {
    const response = await getCityData(city);
    return response.data;
  }
);

export const getForecastsAsync = createAsyncThunk(
  "counter/getFiveDaysForecasts",
  async (localKey) => {
    const response = await getFiveDaysForecasts(localKey);
    return response.data;
  }
);

export const getAutocompleteAsync = createAsyncThunk(
  "counter/getAutocompleteCities",
  async (text) => {
    const response = await getAutocompleteCities(text);
    return response.data;
  }
);
export const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    saveCity: (state, cityResponseFromServer) => {
      let cityFromServer = cityResponseFromServer.payload.payload[0];
      let newCityData = {
        title: cityFromServer.LocalizedName,
        localKey: cityFromServer.Key,
      };
      state.cityData = newCityData;
      state.localeKey = cityFromServer.Key;
    },
    saveFiveDaysData: (state, response) => {
      const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
      let fiveDaysArray = response.payload.payload.DailyForecasts;
      let newDays = fiveDaysArray.map((day) => {
        let dayData = day.Temperature.Maximum;
        let degreeFerPerDay = dayData.Value + dayData.Unit;
        let degreeCelPerDay =
          Math.floor(fahrenheitToCelsius(dayData.Value)) + "°C";
        let weatherDay = new Date(day.Date).getDay();
        let title = daysOfWeek[weatherDay];
        return {
          ...day,
          degreeFer: degreeFerPerDay,
          degreeCel: degreeCelPerDay,
          title,
        };
      });

      let description =
        response.payload.payload.DailyForecasts[0].Day.IconPhrase;
      const resDegreeData =
        response.payload.payload.DailyForecasts[0].Temperature;
      const degree = resDegreeData.Maximum.Value + resDegreeData.Maximum.Unit;
      const fiveDaysData = {
        days: newDays,
        description: description,
        degree,
      };
      state.weatherDays = fiveDaysData;
    },
    addToFavorite: (state, data) => {
      const favoriteObj = data.payload;
      let favoriteDataObj = {
        ...favoriteObj,
        id: favoriteObj.cityData.localKey,
        title: favoriteObj.cityData.title,
        degree: {
          degreeCel: favoriteObj.weatherDays.days?.[0]?.degreeCel,
          degreeFer: favoriteObj.weatherDays.days?.[0]?.degreeFer,
        },
        description: favoriteObj.weatherDays.days?.[0]?.Day.IconPhrase,
      };
      state.favorite.push(favoriteDataObj);
    },
    toggleShowCelsius: (state) => {
      state.showCelsius = !state.showCelsius;
    },
    updateHomeScreenData: (state, data) => {
      const payloadData = data.payload;
      state.cityData = payloadData.cityData;
      state.weatherDays = payloadData.weatherDays;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCityAsync.pending, (state) => {
        state.status = STATE_STATUS.PENDING;
      })
      .addCase(getCityAsync.fulfilled, (state, action) => {
        state.status = STATE_STATUS.SUCCESS;
      })
      .addCase(getForecastsAsync.pending, (state, action) => {
        state.status = STATE_STATUS.PENDING;
      })
      .addCase(getForecastsAsync.fulfilled, (state, action) => {
        state.status = STATE_STATUS.SUCCESS;
      });
  },
});

export const {
  saveCity,
  saveFiveDaysData,
  addToFavorite,
  toggleShowCelsius,
  updateHomeScreenData,
} = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCity = (state) => state.counter.cityData;
export const selectWeatherDays = (state) => state.counter.weatherDays;
export const selectFovorite = (state) => state.counter.favorite;
export const selectStatus = (state) => state.counter.status;
export const selectShowCelsius = (state) => state.counter.showCelsius;

export default counterSlice.reducer;
