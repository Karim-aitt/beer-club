import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Register } from "./registerModal";
import { Login } from "./loginModal";
import { Navigate } from "react-router-dom";


import logo from "../../img/beerClubLogo.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  // store.myAuthFlag  Si esta flag esta en true (default false), se muestra el link My Account que al clickar te redirecciona a user page y se sustituye Signup por Bienvenido

  return (
    <div className="navbar-width mx-auto">
      <nav className="navbar navbar-expand-lg navbar-color">
        <div className="container-fluid mx-3">
          <div className="navbar-nav d-flex justify-content-start">
            <li className="nav-item mx-5">
              <Link
                className="nav-link text-white border border-danger py-0 px-4 radius"
                aria-current="page"
                to="#"
                type="button"
                data-bs-toggle={store.myAuthFlag == false ? "modal" : ""}
                data-bs-target={store.myAuthFlag == false ?"#registerModal" : ""}
                onClick={() => store.myAuthFlag == true ? actions.logout() : ""}
              >
                {store.myAuthFlag == false ? "Signup" : "Logout"}
              </Link>
            </li>
          </div>
          {/* Esto es el modal de registro de usuarios en forma de componente, hay que poner un ternario con una flag para hacerlo inactivo cuando esta logueado */}
          <Register />
          

          <div className="navbar-nav d-flex justify-content-end">
            <li className="nav-item mx-5 ">
              <Link
                className="nav-link text-white border border-danger py-0 px-4 radius"
                to={store.myAuthFlag == false ? "/#" : "/userpage"}
                data-bs-toggle={store.myAuthFlag == false ? "modal" : ""}
                data-bs-target={store.myAuthFlag == false ? "#loginModal" : ""}
              >
                {store.myAuthFlag == false ? "Login" : "My Account"}
              </Link>
            </li>
          </div>

          {/* Esto es el modal en forma de componente */}
          <Login />
          

        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-color">
        <div className="container-fluid mx-4">
          <div className="navbar-nav d-flex justify-content-start">
            <li className="nav-item mx-4">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item mx-5">
              <Link className="nav-link text-white" to="#">
                Categories
              </Link>
            </li>
          </div>

          <Link className="navbar-brand" to="#">
            <img
              className="navimg position-absolute top-0 start-50 translate-middle mt-5"
              src={logo}
              alt="logo"
              width="30"
              height="24"
            ></img>
          </Link>

          <div className="navbar-nav d-flex justify-content-end">
            <li className="nav-item mx-5">
              <Link className="nav-link text-white" to="/about">
                About Us
              </Link>
            </li>

            <li className="nav-item mx-4">
              <Link className="nav-link text-white" to="/contact">
                Contact
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};
