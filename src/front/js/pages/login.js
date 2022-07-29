import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import config from "../config";

import "../../styles/login.css";

export const Login = (props) => {
  /* #--------------------------------#
   #-----------VARIABLES------------#
   #--------------------------------# */

  const validRegexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [emailValidation, setEmailValidation] = useState(false);

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //inputs de los formularios
  const [confirmPass, setConfirmPass] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [active, setActive] = useState("active");
  const [noActive, setNoActive] = useState("");
  const [sele, setSele] = useState("true");
  const [lese, setLese] = useState("false");
  let selected = true;

  //FLAGS
  const [passMatch, setPassMatch] = useState(false); //flag de "la password no coincide"

  return (
    <>
      {store.token == null ? ( //Aqui hay que hacer que se haga la validacion de flux
        <>
          <video className="video" loop autoPlay muted>
            <source
              src="https://res.cloudinary.com/dztgp8g6w/video/upload/v1658771702/Login_nx4jmw.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="container d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
            <div className="col-5 bg-color d-flex justify-content-center align-items-center rounded">
            <div className="">
              <span className="text-center">
                <h1 className="fec pe-4 m-0 h-color">BEER</h1>
                <h1 className="fec ps-4 m-0 mb-4">CLUB</h1>
              </span>
              <div className="d-flex align-items-center justify-content-center">
              <i className="fas fa-search px-3 pb-1 fs-4"></i><h5 className="fs-5">Explore new beers.</h5>
              </div>
              <div className="d-flex align-items-center justify-content-center">
              <i className="far fa-comment px-3 pb-1 fs-4 text-dark"></i><h5 className="fs-5">Comment, rate, contact.</h5>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-5">
              <i className="fas fa-beer px-3 pb-1 fs-4"></i><h5 className="fs-5">Join the club.</h5>
              </div>
              
            </div>
            </div>
            <div className="col-5">
              <div className="rounded mx-auto pos_login container-form-width bg-color p-2">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item " role="presentation">
                    <button
                      className={`nav-link btn-lg ${active} text-dark m-2 border border-secondary`}
                      id="pills-login-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-login"
                      type="button"
                      role="tab"
                      aria-controls="pills-login"
                      aria-selected={`${sele}`}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link btn-lg ${noActive} text-dark m-2 border border-secondary`}
                      id="pills-register-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-register"
                      type="button"
                      role="tab"
                      aria-controls="pills-register"
                      aria-selected={`${lese}`}
                    >
                      Register
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="pills-login-tab"
                  >
                    <div className="mb-3">
                      <form className="d-flex flex-column p-3">
                        <div className="">
                          <input
                            className="form-control"
                            id="loginEmailInput"
                            aria-describedby="emailHelp"
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          ></input>
                          <div id="emailHelp" className="form-text">
                            <p className="ms-2 text-dark">
                              We'll never share your email with anyone else.
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <input
                            className="form-control"
                            id="loginPassInput"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                          ></input>
                        </div>
                        <input
                          type="submit" //esto estaba en submit
                          className="btn btn-dark"
                          value="Log In"
                          onClick={() => {
                            if (pass == "" || email == "") {
                              return "";
                            } else {
                              actions.login(email, pass);
                              setEmail("");
                              setPass("");
                            }
                          }}
                        ></input>
                      </form>

                      {store.loginEmailPassMatch == true ? (
                        <p className="d-flex mx-auto text-danger">
                          Email or password is wrong
                        </p>
                      ) : (
                        ""
                      )}

                      {/* HAY QUE HACER ESTA FUNCIONALIDAD */}
                      <Link
                        className="d-flex justify-content-center link-style-yellow"
                        to=""
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-register"
                    role="tabpanel"
                    aria-labelledby="pills-register-tab"
                  >
                    <div className="mb-1">
                      <form className="d-flex flex-column p-3">
                        <div className="mb-1">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nickname"
                            onChange={(e) => setNickname(e.target.value)}
                            value={nickname}
                            aria-describedby="nicknameHelp"
                            required
                          ></input>
                          <div id="nicknameHelp" className="form-text">
                            <p className="ms-2">
                              The name who everyone will see
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <input
                            className="form-control"
                            id="registerEmailInput"
                            aria-describedby="registerEmailHelp"
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          ></input>
                          <div id="registerEmailHelp" className="form-text">
                            <p className="ms-2">
                              We'll never share your email with anyone else.
                            </p>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus={true}
                            value={username}
                            required
                          ></input>
                        </div>
                        <div className="mb-1">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Surname"
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
                            required
                          ></input>
                        </div>
                        <hr></hr>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            id="registerPassInput"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                          ></input>
                        </div>
                        <div className="mb-4">
                          <input
                            className="form-control"
                            id="registerPassInput"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPass(e.target.value)}
                            value={confirmPass}
                            required
                          ></input>
                        </div>
                        {/* TODO: QUE CUANDO SE PINCHE EL BOTON REGISTER SE TRASLADE AL LOGIN PILL */}
                        <input
                          type="button"
                          value="Register"
                          className="btn btn-dark m-2"
                          onClick={() => {
                            // ESTO ES EL SUBMIT que debe enviar los datos de registro
                            if (pass != confirmPass) {
                              setPassMatch(true);
                            } else if (pass.length < 8 && pass != "") {
                              return "Pass must have 8 characters at least";
                            } else if (!email.match(validRegexEmail)) {
                              //flag del email
                              setEmailValidation(true);
                            } else {
                              setPassMatch(false);
                              setEmailValidation(false); // Reset de la flag EmailValidation

                              selected = false;
                              setActive("");
                              setNoActive("active");
                              setSele("true");
                              setLese("false");
                              // actions.signup(
                              //   nickname,
                              //   username,
                              //   surname,
                              //   email,
                              //   pass
                              // );
                            }
                          }}
                        ></input>
                      </form>

                      <div className="">
                        {/* VALIDACIONES DE INPUTS */}

                        {passMatch == true ? (
                          <p className="d-flex flex-column me-auto text-danger">
                            Passwords doesn't match
                          </p>
                        ) : (
                          ""
                        )}
                        {pass.length < 8 && pass != "" ? (
                          <p className="me-auto text-danger">
                            Passwords must have 8 characters at least
                          </p>
                        ) : (
                          ""
                        )}
                        {emailValidation == true ? (
                          <p className="d-flex flex-column me-auto text-danger">
                            Email has to be in email format
                          </p>
                        ) : (
                          ""
                        )}

                        {store.userExist == true ? (
                          <p className="d-flex flex-column me-auto text-danger">
                            Nickname already in use
                          </p>
                        ) : (
                          ""
                        )}
                        {store.emailExist == true ? (
                          <p className="d-flex flex-column me-auto text-danger">
                            Email already in use
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};
