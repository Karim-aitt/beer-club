import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import config from "../config";

export const EventModal = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div
        className="modal fade"
        id={`eventModal${props.id_event}`}
        tabIndex="-1"
        aria-labelledby="eventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title" id="eventModalLabel">
                {props.event_name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-header">
                <img
                className="img-fluid"
                src={props.image}></img>
            </div>
            <div className="modal-body">
                <p>{props.place}</p>
                <p>{props.date}</p>
                <p>{props.time}</p>
                <p>{props.description}</p>
                </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger">
                Dismiss
              </button>
              <button type="button" className="btn btn-dark">
                Assist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
