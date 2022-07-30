import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";

import "../../styles/createbeer_modal.css";
import config from "../config";

export const Createmessage = (props) => {
  const { store, actions } = useContext(Context);
  

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  let { id } = useParams();
  const otra_id = props.other_id

    console.log(">>>> otra_id", otra_id)
    console.log(">>> id", id)
  
    if(!id){
        id = otra_id
    }

    console.log(">>> id despues del if", id)
  const handleFetch = () => {
    const token = localStorage.getItem("token");

    // if(id == undefined){
    //     fetch(`${config.hostname}/api/mp`, {
    //         method: "POST",
    //         body: JSON.stringify({message, title, otra_id}),
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + token,
    //           },
    //     })
    //     .then(res => res.json())
    //     .then(data => data)
    //     .catch(error => console.log("error createMessage fetch", {error}))

    //   } 
    //   else {
    //     console.log(">>>>", id)
        fetch(`${config.hostname}/api/mp`, {
            method: "POST",
            body: JSON.stringify({message, title, id}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
        })
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log("error createMessage fetch", {error}))
    //   }

    }
    

  return (
    <>
      <div
        className="modal fade"
        id="messageModal"
        tabIndex="-1"
        aria-labelledby="messageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="messageModalLabel">
                Send a message to
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            <h2 className="text-dark me-auto ms-3">{props.user_name}</h2>
            <div className="mb-3">
              <form className="d-flex flex-column p-3">
                <input 
                type="text" 
                className="form-control mb-2"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                >

                </input>
                <textarea
                className="form-control mb-2"
                placeholder="Your message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                >

                </textarea>
              </form>
            </div>
            <div className="modal-footer">
              <button 
              type="button" 
              className="btn btn-dark"
              onClick={() => handleFetch()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
