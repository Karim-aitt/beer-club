import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";

import { Navbar } from "../component/navbar";
import { Beerdetail } from "../component/Beer-detail.jsx";
import { CardCategoryMini } from "../component/Card-category-mini.jsx";

import "../../styles/home.css";
import banner from "../../img/bannerWeb2.png";
import config from "../config";

export const Messages = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <>
        <Navbar />
        <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
          <img className="img-fluid d-flex mx-auto" src={banner} />
        </div>
        <div className="d-flex flex-row justify-content-center px-0"></div>
        <div className="me-sm-3"></div>
        <div>
          {/* ZONA DE TITULO */}
          <h2 className="text-center my-3">Private Messages</h2>
          <hr className="w-50 mx-auto"></hr>
        </div>
        <div className="container d-flex justify-content-center">
          <div className="col-3 border border-3 text-center">Usuarios</div>
          <div className="col-6 border border-3 text-center">Mensajes</div>
        </div>
      </>
    </>
  );
};
