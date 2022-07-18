import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (

	<div className="footer-width mx-auto">
		<div className="navbar-nav d-flex justify-content-center my-2">
            
              <a className="nav-link text-white" aria-current="page" href="https://www.instagram.com">
                <i className="fab fa-instagram me-5 fs-3"></i>
              </a>
            
            
              <a className="nav-link text-white" aria-current="page" href="https://www.twitter.com">
                <i className="fab fa-twitter ms-5 fs-3"></i>
              </a>
            
		</div>

    </div>
);
