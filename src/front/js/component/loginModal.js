import React from "react";
import "../../styles/modals.css";

export const Login = () => {
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
                className="m-2 p-1 inputStyle"
                type="text"
                placeholder="Email"
                autoFocus
                required
              ></input>
              <input
                className="m-2 p-1 inputStyle"
                type="password"
                placeholder="Password"
                required
              ></input>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn border border-2 border-success py-0 px-4 radius"
            //   onClick={""} // ESTO ES EL SUBMIT que debe enviar los datos de registro
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
