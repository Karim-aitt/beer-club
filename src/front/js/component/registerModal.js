import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

import "../../styles/modals.css";

export const Register = () => {
  const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const [emailValidation, setEmailValidation] = useState(false);

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  
  //inputs de los formularios
  const [confirmPass, setConfirmPass] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
 
  //FLAGS
  const [allfill, setAllfill] = useState(false);  //flag de "rellenar todos los campos"
  const [passMatch, setPassMatch] = useState(false); //flag de "la password no coincide"
  const [allDone, setAllDone] = useState(false)  //flag Registro completado

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
            {/* VALIDACIONES DE INPUTS */}

          {allfill == true ? <p className="me-auto text-danger">Must fill all fields</p> : ""}
          {passMatch == true ? <p className="d-flex flex-column me-auto text-danger">Passwords doesn't match</p> : ""}
          {pass.length < 8 && pass != "" ? <p className="me-auto text-danger">Passwords must have 8 characters at least</p> : ""}
          {emailValidation == true ? <p className="d-flex flex-column me-auto text-danger">Email has to be in email format</p> : ""}

          {store.userExist == true ? <p className="d-flex flex-column me-auto text-danger">Nickname already in use</p> : ""}
          {store.emailExist == true ? <p className="d-flex flex-column me-auto text-danger">Email already in use</p> : ""}

          {allDone == true ? <p className="d-flex flex-column me-auto text-success">Register completed</p> : ""}
          
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
                } 

                else if (pass.length < 8 && pass != ""){
                  return "Pass must have 8 characters at least"
                } 
                else if (!email.match(validRegexEmail)){
                  setEmailValidation(true)
                }
                
                else {
                  setAllfill(false)
                  setPassMatch(false)
                  setAllDone(true)
                  
                  actions.signup(nickname, username, surname, email, pass) //Envio al fetch de flux

                  // Reset de variables para que los inputs aparezcan vacios de nuevo
                  setNickname("");
                  setEmail("");
                  setPass("");
                  setConfirmPass("");
                  setUsername("")
                  setSurname("")

                  // Reset del EmailValidation
                  setEmailValidation(false)
                  store.myAuthFlag = true;
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
