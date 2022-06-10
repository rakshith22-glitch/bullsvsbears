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
            Options
          </NavLink>
          <NavLink to="/crypto" activeStyle>
            Crypto
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Navbar;
