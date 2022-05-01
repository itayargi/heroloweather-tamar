import React, { useState } from "react";
import logo from "../logo3-removebg.png";
import "../style/header.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowCelsius,
  toggleShowCelsius,
} from "../features/counter/counterSlice";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import screenNames from "../utils/screenNames";

const Header = () => {
  const dispatch = useDispatch();
  const showCelsiusFlag = useSelector(selectShowCelsius);

  const toggleSwitcher = () => {
    return dispatch(toggleShowCelsius());
  };

  return (
    <div className='navbar-container'>
      <div className='logo-container'>
        <Link to={screenNames.home}>
          <img
            src={logo}
            width='100'
            height='90'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
        </Link>
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={showCelsiusFlag}
              onChange={toggleSwitcher}
              name='checkedB'
              color='primary'
            />
          }
          label='Show Celsius'
        />
      </div>
      <div></div>
      <div className='buttons-container'>
        <Link to={screenNames.home}>
          <button type='button' className='home'>
            Home
          </button>
        </Link>
        <Link to={screenNames.favorite}>
          <button type='button' className='favirites'>
            Favirites
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
