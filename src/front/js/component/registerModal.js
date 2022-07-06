import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

import "../../styles/modals.css";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");


  //FLAGS
  const [allfill, setAllfill] = useState(false);  //flag de "rellenar todos los campos"
  const [passMatch, setPassMatch] = useState(false); //flag de "la password no coincide"

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registerModalLabel">
              Register form
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-2">
            <form className="text-center">
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
                required="required"
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
                required="required"
              ></input>
              <input
                className="m-2 p-1 inputStyle"
                type="password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required="required"
              ></input>
              <input
                className="m-2 p-1 inputStyle"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
                required="required"
              ></input>
            </form>
          </div>
          <div className="modal-footer">
          {allfill == true ? <p className="d-flex mx-auto text-danger">Debes de rellenar todos los campos</p> : ""}
          {passMatch == true ? <p className="d-flex mx-auto text-danger">Passwords doesn't match</p> : ""}
            <button
              type="button"
              className="btn border border-2 border-success py-0 px-4 radius"
              onClick={() => {
                // ESTO ES EL SUBMIT que debe enviar los datos de registro
                if (
                  pass == "" ||
                  confirmPass == "" ||
                  nickname == "" ||
                  email == ""
                ) {
                  setAllfill(true)
                 
                } else if (pass != confirmPass) {
                  if(allfill == true){
                    setAllfill(false)
                    setPassMatch(true)
                  }
                  setPassMatch(true)
                  
                } else {
                  setAllfill(false)
                  setPassMatch(false)
                  
                  // actions.signup(nickname, email, pass)
                  setNickname("");
                  setEmail("");
                  setPass("");
                  setConfirmPass("");
                }
              }} 
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
