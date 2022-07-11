import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/banner.css";

export const Bodybar = () => {
  return (
    <div className="navbar-width text-white bodybar-color mx-auto d-flex align-items-center py-3 mt-0">
      <div className="">
        <h5 className="ms-5">
          Encuentra la mejor cerveza artesanal, solo aquí:
        </h5>
      </div>

      <form className="d-flex ms-auto me-5">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    </div>
  );
};
