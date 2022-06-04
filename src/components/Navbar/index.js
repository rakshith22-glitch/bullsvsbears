import React, { Component } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "./bullsbears.jpg";

const Navbar = () => {
  return (
    <div>
      <Nav
        style={{ fontFamily: "Arial, Helvetica, sans-serif", width: "100%" }}
      >
        <Bars />
        <NavMenu>
          <NavLink to="/" activeStyle>
            <img style={{ width: "150px" }} src={logo} />
          </NavLink>
          <NavLink to="/table" activeStyle>
            Table
          </NavLink>
          <NavLink to="/PieChartData" activeStyle>
            PieChartData
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Navbar;
