import React, { useState } from "react";
import "../style/searchButton.css";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { getAutocompleteAsync } from "../features/counter/counterSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@material-ui/core";

const SearchButton = ({ placeholder, updateHomeScreenDataWithCity }) => {
  const dispatch = useDispatch();
  const [citiesResults, setCitiesResults] = useState([]);

  const fetchAutocompleteResults = async (text) => {
    if (text?.length > 1) {
      return dispatch(getAutocompleteAsync(text));
    }
    return null;
  };
  const refractureResultCityData = (cityArray) => {
    return cityArray?.map((city) => city.LocalizedName);
  };
  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    const searchResultsObj = await fetchAutocompleteResults(searchWord);
    const cityResultsArray = refractureResultCityData(
      searchResultsObj?.payload
    );
    cityResultsArray && setCitiesResults(cityResultsArray);
  };

  const handleOnCityPress = (event) => {
    const text = event.target.outerText;
    text && updateHomeScreenDataWithCity(text);
  };
  const autocompleteParams = {
    placeholder: placeholder,
    onChange: handleOnCityPress,
    popupIcon: <SearchIcon />,
    onInputChange: handleFilter,
    disablePortal: true,
    id: "combo-box-demo",
    options: citiesResults,
    sx: { width: 400 },
    renderInput: (params) => <TextField {...params} label={placeholder} />,
  };

  return (
    <div className='container-search'>
      <Autocomplete {...autocompleteParams} />
    </div>
  );
};

export default SearchButton;
