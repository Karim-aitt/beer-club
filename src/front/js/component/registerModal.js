import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";

import "../../styles/modals.css";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [nickname, setNickname] = useState("");




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
                required
              ></input>
              <input
                className="m-2 p-1 inputStyle"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required="required"
              ></input>
              <input
                className="m-2 p-1 inputStyle"
                type="password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                required="required"
              ></input>
              <input
                className="m-2 p-1 inputStyle"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPass(e.target.value)}
                required="required"
              ></input>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn border border-2 border-success py-0 px-4 radius"
              onClick={() => {if (pass == "" || confirmPass == "" || nickname == "" || email == ""){
                alert("You must fill all fields")
              } else if(pass != confirmPass){
                alert("Your password doesn't match")
            } else {
                alert("todo bien")// actions.signup(nickname, email, pass)
            }
            }} // ESTO ES EL SUBMIT que debe enviar los datos de registro
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
