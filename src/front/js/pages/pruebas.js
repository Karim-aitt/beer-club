return (
    <>
      {store.token == null ? (
        <div className="container mt-3 ">
          <div className="">
            <img src={banner} />
          </div>

          <div className="border border-3 border-secondary rounded w-25 ms-auto pos_login container-width">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active text-dark m-2 border border-secondary"
                  id="pills-login-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-login"
                  type="button"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                >
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link text-dark m-2 border border-secondary"
                  id="pills-register-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-register"
                  type="button"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
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
                <div className="text-center mb-3">
                  <form className="d-flex flex-column p-3 text-center">
                    <input
                      type="text"
                      id="login"
                      className="m-2 p-1"
                      name="login"
                      placeholder="Login"
                      required
                      autoFocus
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <input
                      type="password"
                      id="password"
                      className="m-2 p-1"
                      name="login"
                      placeholder="Password"
                      required
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                    />
                    <input
                      type="submit"
                      className="btn btn-dark m-2"
                      value="Log In"
                      onClick={() => {
                        actions.login(email, pass)
                      }
                      }
                    />
                  </form>

                  {store.loginEmailPassMatch == true ? (
                    <p className="d-flex mx-auto text-danger">
                      Email or password is wrong
                    </p>
                  ) : (
                    ""
                  )}

                  {/* HAY QUE HACER ESTA FUNCIONALIDAD */}
                  <Link className="" to="">
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
                <div className="text-center mb-3">
                  <form className="d-flex flex-column p-3">
                    <input
                      className="m-2 p-1 inputStyle"
                      type="text"
                      placeholder="Nickname"
                      onChange={(e) => setNickname(e.target.value)}
                      autoFocus={true}
                      value={nickname}
                      required
                    ></input>
                    <input
                      className="m-2 p-1 inputStyle"
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    ></input>
                    <input
                      className="m-2 p-1 inputStyle"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus={true}
                      value={username}
                      required
                    ></input>
                    <input
                      className="m-2 p-1 inputStyle"
                      type="text"
                      placeholder="Surname"
                      onChange={(e) => setSurname(e.target.value)}
                      value={surname}
                      required
                    ></input>
                    <input
                      className="m-2 p-1 inputStyle"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                      required
                    ></input>
                    <input
                      className="m-2 p-1 inputStyle"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPass(e.target.value)}
                      value={confirmPass}
                      required
                    ></input>

                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-dark m-2"
                      onClick={() => {
                        // ESTO ES EL SUBMIT que debe enviar los datos de registro
                        if (pass != confirmPass) {
                          if (allfill == true) {
                            setAllfill(false);
                            setPassMatch(true);
                          }
                          setPassMatch(true);
                        } else if (pass.length < 8 && pass != "") {
                          return "Pass must have 8 characters at least";
                        } else if (!email.match(validRegexEmail)) {
                          //flag del email
                          setEmailValidation(true);
                        } else {
                          setAllfill(false);
                          setPassMatch(false);
                          setAllDone(true);

                          // actions.signup(nickname, username, surname, email, pass) //Envio al fetch de flux
                          actions.signup(nickname, username, surname, email, pass)
                          // Reset de variables para que los inputs aparezcan vacios de nuevo
                          //   setNickname("");
                          //   setEmail("");
                          //   setPass("");
                          //   setConfirmPass("");
                          //   setUsername("")
                          //   setSurname("")

                          // Reset de la flag EmailValidation
                          setEmailValidation(false);
                          //   actions.setMyAuthFlag(true)  //comprobar si esto funciona
                        }
                      }}
                    />
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

                    {allDone == true ? (
                      <p className="d-flex flex-column me-auto text-success">
                        Register completed
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
      )
    : (
        <Navigate to="/home" />
      )}
    </>
  );

// ESTO FUNCIONA
  return (
    <div className="navbar-width mx-auto">
      <nav className="navbar navbar-expand-lg navbar-color">
        <div className="container-fluid mx-3">
          <div className="navbar-nav d-flex justify-content-start">
            <li className="nav-item mx-5">
              <Link
                className="nav-link border border-danger py-0 px-4 radius text-dark"
                aria-current="page"
                to="#"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Login
              </Link>
            </li>
          </div>
        </div>  
    </nav>
    <LoginModal />
    </div>
        
)

};