import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import config from "../config";

export const CreateEvent = (props) => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    // Selecciona el form del html
    const form = document.getElementById("form-create-event");
    // crea un formData a partir de los valores del form al hacer submit
    // a traves de las etiquetas name=""
    const formData = new FormData(form);
    
    console.log("esto es file", formData.get("file"));

    fetch(`${config.hostname}/api/event`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((dataRes) => console.log(dataRes))
      .catch((error) => console.log("error en createevent post", { error }));
  };

  return (
    <>
      <div
        className="modal fade"
        id={`createEventModal`}
        tabIndex="-1"
        aria-labelledby="createEventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="createEventModalLabel">
                Create Event form
              </h5>
              <button
                type="button"
                className="text-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                x
              </button>
            </div>

            <div className="modal-body">
              <div>
                <form
                  id="form-create-event"
                  onSubmit={handleSubmit}
                  className="p-3 border rounded"
                >
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon3">
                      Event Name
                    </span>
                    <input
                      className="form-control"
                      aria-describedby="basic-addon3"
                      name="event_name"
                      type="text"
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon3">
                      Event Place
                    </span>
                    <input
                      className="form-control"
                      aria-describedby="basic-addon3"
                      name="event_place"
                      type="text"
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon3">
                      Event Date
                    </span>
                    <input
                      className="form-control"
                      aria-describedby="basic-addon3"
                      name="event_date"
                      type="text"
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon3">
                      Event Time
                    </span>
                    <input
                      className="form-control"
                      aria-describedby="basic-addon3"
                      name="event_time"
                      type="text"
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="input-group my-3">
                    <span className="input-group-text">Event Description</span>
                    <textarea
                      className="form-control"
                      aria-label="Description"
                      name="event_description"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="input-group mb-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupFile01"
                    >
                      Event image
                    </label>
                    <input
                      type="file"
                      name="file"
                      className="form-control"
                      id="inputGroupFile01"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};
