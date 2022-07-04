import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => (

	<div className="navbar-width mx-auto">

		<div>
			<h1 className="bg-dark text-white text-center mb-0 py-3">BEER CLUB</h1>
		</div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid mx-4 my-3 border-navbar-footer">
          <div className="navbar-nav d-flex justify-content-start my-2">
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

		<div className="navbar-nav d-flex justify-content-center my-2">
            <li className="nav-item mx-4">
              <Link className="nav-link text-white" aria-current="page" to="/">
			  <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </Link>
            </li>
		
		</div>

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

	<div>
		<p className="bg-dark text-white text-center py-3">© 2022 BEER CLUB</p>
	</div>

    </div>
);
