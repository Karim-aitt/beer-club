import React from "react";
import { Link } from "react-router-dom";

import { Register } from "./registerModal";
import { Login } from "./loginModal";
import { Navigate } from "react-router-dom";


import logo from "../../img/beerClubLogo.png";
import "../../styles/navbar.css";

export const Navbar = () => {

  const myAuthFlag = true;  //Si esta flag esta en true, se muestra el link My Account que al clickar te redirecciona a user page

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
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Signup
              </Link>
            </li>
          </div>
          {/* Esto es el modal de registro de usuarios en forma de componente, hay que poner un ternario con una flag para hacerlo inactivo cuando esta logueado */}
          <Register />
          

          <div className="navbar-nav d-flex justify-content-end">
            <li className="nav-item mx-5 ">
              <Link
                className="nav-link text-white border border-danger py-0 px-4 radius"
                to={myAuthFlag == false ? "/#" : "/userpage"}
                data-bs-toggle={myAuthFlag == false ? "modal" : ""}
                data-bs-target={myAuthFlag == false ?"#loginModal" : ""}
              >
                {myAuthFlag == false ? "Login" : "My Account"}
              </Link>
            </li>
          </div>

          {myAuthFlag == false ? <Login /> : ""}
          {/* Esto es el modal en forma de componente */}

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
              <Link className="nav-link text-white" to="#">
                About Us
              </Link>
            </li>

            <li className="nav-item mx-4">
              <Link className="nav-link text-white" to="#">
                Contact
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};
