import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";

import "../../styles/modals.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [allfill, setAllfill] = useState(false);

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              Login form
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
                className="m-2 p-1 inputStyle d-flex mx-auto flex-column "
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoFocus
                required={true}
              ></input>
              <input
                className="m-2 mt-3 p-1 inputStyle d-flex mx-auto flex-column"
                type="password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required={true}
              ></input>
            </form>
          </div>
          <div className="modal-footer">
          {allfill == true ? <p className="d-flex mx-auto text-danger">Debes de rellenar todos los campos</p> : ""}
            <button
              type="button"
              className="btn border border-2 border-success py-0 px-4 radius"
              onClick={() => {
                // ESTO ES EL SUBMIT que debe enviar los datos de login
                if (
                  pass == "" ||
                  email == ""
                ) {
                  setAllfill(true)
                
                } 
                // else if (pass) {
                //   alert("Your password doesn't match");
                // } 
                else {
                  setAllfill(false)
                  // actions.login(email, pass)
                  setEmail("");
                  setPass("");
                }
              }} 
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
