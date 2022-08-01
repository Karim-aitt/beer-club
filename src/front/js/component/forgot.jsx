import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import "../../styles/forgot.css";

import config from "../config";
import { Link } from "react-router-dom";

const Forgot = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("alert-set")

  const sendEmail = (email) => {
    fetch(`${config.hostname}/forgot`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };
  // useEffect(() => {
  //   sendEmail()
  //  }, []);
  return (
    <>
      <video className="video" loop autoPlay muted>
        <source
          src="https://res.cloudinary.com/dztgp8g6w/video/upload/v1658771702/Login_nx4jmw.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="d-flex flex-column position-absolute top-50 start-50 translate-middle">
        <div className="container bg-color forgot-div mux d-flex justify-content-center align-items-center rounded">
          <div className=" rounded">
            <span className="text-center">
              <h1 className="fec pe-4 m-0 h-color">BEER</h1>
              <h1 className="fec ps-4 m-0 mb-4">CLUB</h1>
            </span>

            <label>Your email:</label>
            <input
              placeholder="example@mail.com"
              className="form-control mb-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>

            <div className="d-flex">
            <button
              className="btn btn-warning text-white d-flex justify-content-center mb-4"
              onClick={() => {
                sendEmail(email);
                setEmail("");
                setAlert("")
              }}
            >
              Recover
            </button>
            <Link className="btn btn-dark b-h ms-auto" to="/" type="button">
              Home
            </Link>
            </div>
            

            <div className="d-flex">
              <p className="text-secondary mx-auto">© 2022 BEER CLUB</p>
              {/* <button className="d-flex btn btn-dark mb-4">Volver</button> */}
            </div>
          </div>
        </div>
        <div
          className={`mt-5 alert alert-success alert-dismissible fade show max-f-alert ${alert}`}
          role="alert"
        >
          <strong>We have send you an email with a new password</strong>
          <button
            type="button"
            className="btn-close ms-3"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlert("")}
          ></button>
        </div>
      </div>
    </>
  );
};

export { Forgot };
