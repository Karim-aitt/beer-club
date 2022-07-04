import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/oktober.png";

export const Navbar = () => {
  return (
    <div className="navbar-width mx-auto">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid mx-3">
          <div className="navbar-nav d-flex justify-content-start">
            <li className="nav-item mx-5">
              <Link
                className="nav-link text-white border border-danger py-0 px-4 radius"
                aria-current="page"
                to="/"
              >
                Signup
              </Link>
            </li>
          </div>

          <div className="navbar-nav d-flex justify-content-end">
            <li className="nav-item mx-5 ">
              <Link
                className="nav-link text-white border border-danger py-0 px-4 radius"
                aria-current="page"
                to="/"
              >
                My Account
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
      		<img className="navimg position-absolute top-0 start-50 translate-middle mt-5" src={logo} alt="logo" width="30" height="24"></img>
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
