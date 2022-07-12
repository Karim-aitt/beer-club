import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (

	<div className="footer-width mx-auto">

		<div>
			<h1 className="navbar-color text-white text-center mb-0 py-3">BEER CLUB</h1>
		</div>

      <nav className="navbar navbar-expand-lg navbar-color">
        <div className="container-fluid mx-4 my-3 border-navbar-footer">
          <div className="navbar-nav d-flex justify-content-start my-2">
            <li className="nav-item mx-4">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item mx-5">
              <Link className="nav-link text-white" to="/categories">
                Categories
              </Link>
            </li>
          </div>

		<div className="navbar-nav d-flex justify-content-center my-2">
            <li className="nav-item mx-4">
              <a className="nav-link text-white" aria-current="page" href="https://www.instagram.com">
                <i className="fab fa-instagram me-5 fs-3"></i>
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-white" aria-current="page" href="https://www.twitter.com">
                <i className="fab fa-twitter ms-5 fs-3"></i>
              </a>
            </li>
		</div>

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

	<div>
		<p className="navbar-color text-white text-center py-3">© 2022 BEER CLUB</p>
	</div>

    </div>
);
