import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import config from "../config";

export const EventModal = (props) => {
  const { store, actions } = useContext(Context);

  const handleYes = () => {
    const token = localStorage.getItem("token")
    const event_id = props.id_event;
    console.log("event id", event_id)
    fetch(`${config.hostname}/api/usereventyes`, {
      method: 'POST',
      body: JSON.stringify({event_id}),
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      }
    })
    .catch(error => console.log("error handleYes event modal", {error}))
  }
  
  const handleNo = () => {
    const token = localStorage.getItem("token")
    const event_id = props.id_event;
    fetch(`${config.hostname}/api/usereventno`, {
      method: 'POST',
      body: JSON.stringify({event_id}),
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      }
    })
    .catch(error => console.log("error handleYes event modal", {error}))
  }

  return (
    
      <div
        className="modal fade"
        id={`eventModal${props.id_event}`}
        tabIndex="-1"
        aria-labelledby={`eventModal${props.id_event}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title" id={`eventModal${props.id_event}`}>
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
                <p>People who assist:</p>
                </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleNo}>
                Dismiss
              </button>
              <button type="button" className="btn btn-dark" onClick={handleYes}>
                Assist
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};
