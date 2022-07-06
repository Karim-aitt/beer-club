import React, { Component } from "react";
import { Link } from "react-router-dom";
import banner from "../../img/bannerWeb.png";
import "../../styles/banner.css";

export const Banner = () => {
  return (
    <div className="d-flex justify-content-center">
      {/* <h1 className="bannerWords">JOIN THE COMMUNITY</h1> */}
      <Link className="" to="#">
        <img
          className="bannerPosition"
          src={banner}
          alt="banner"
          width="1140"
          height="300"
        ></img>
      </Link>
    </div>
  );
};
