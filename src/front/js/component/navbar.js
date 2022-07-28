import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";

import { Createbeer } from "./Createbeer.jsx";

import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex ">
      <div className="container-fluid d-flex justify-content-center">
      
      {/* BOTONES dE HOME Y CATEGORIAS */}
      <Link to="/" onClick="" className="fas fa-home custom-buttom me-xs-1 me-3 navbar-link"></Link>
      <Link to="/categories" onClick="" className="fas fa-beer custom-buttom me-xs-1 me-3 navbar-link"></Link>
      

        <a className="navbar-brand logo-hover d-flex fw-bold" href="/home">
          Beer Club
        </a>
        
        {/* BOTONES dE AÑADIR Y PERFIL */}
        <Link 
        to="#"
        aria-current="page"
        type="button" 
        className="far fa-plus-square custom-buttom me-5 ms-0 ps-0 navbar-link"
        data-bs-toggle="modal"
        data-bs-target="#createbeerModal"
        />
        <Createbeer />

        <div className="navbar-nav dropdown drop-size">
		
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
			{/* ICONO DE PERFIL DE USUARIO */}
      <i className="fas fa-user-circle user-icon-size"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-start"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to={`/userpage/${store.user_id}`} onClick={() => {
                actions.getUserpageId(store.user_id)
              }}>
                Personal Page
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/settings/">
              Settings
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/"
              onClick={() => {
                actions.logout()
                
              }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
