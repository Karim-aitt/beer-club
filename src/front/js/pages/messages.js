import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";

import { Navbar } from "../component/navbar";
import { Createmessage } from "../component/CreateMessage.jsx";

import "../../styles/home.css";
import banner from "../../img/bannerWeb2.png";
import config from "../config";

export const Messages = () => {
  const { store, actions } = useContext(Context);

  const [arrayMessages, setArrayMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      "https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/mp",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArrayMessages(data);
      })
      .catch((error) => console.log("error en messages.js fetch", { error }));
  }, []);

  const handleDelete = (id) => {
    const tok = localStorage.getItem("token");

    fetch(
      "https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/mp",
      {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tok,
        },
      }
    ).catch((error) => console.log("error en delete message.js", { error }));
  };

  return (
    <>
      <>
        <Navbar />
        <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
          <img className="img-fluid d-flex mx-auto" src={banner} />
        </div>
        <div className="d-flex flex-row justify-content-center px-0"></div>
        <div className="me-sm-3"></div>
        <div>
          {/* ZONA DE TITULO */}

          <h2 className="text-center my-3">Private Messages</h2>
          <hr className="w-50 mx-auto"></hr>
        </div>
        <div className="toast-container d-flex flex-wrap cont-wid mx-auto">
          {arrayMessages.length > 0 ? (
            arrayMessages.map((elem, i) => {
              let nick = "";
              function nombre(id) {
                store.users.map((elem) => {
                  if (elem.id == id) {
                    nick = elem.nickname;
                  }
                });
              }
              nombre(elem.sender_id);

              return (
                <div
                  key={i}
                  className="toast fade show m-4"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-bs-autohide="false"
                >
                  <div className="toast-header">
                    <i className="fas fa-user rounded me-2"></i>
                    <span className="me-1">From: </span>
                    <strong className="me-auto">
                      <Link
                        className="link-style-yellow"
                        to={`/userpage/${elem.sender_id}`}
                      >
                        {nick}
                      </Link>
                    </strong>
                    <small>Delete</small>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                      onClick={() => handleDelete(elem.id)}
                    ></button>
                  </div>
                  <div className="toast-body">
                    <h5 className="">
                      {elem.title_message.slice(0, 1).toUpperCase() +
                        elem.title_message
                          .slice(1, elem.title_message.length)
                          .toLowerCase()}
                    </h5>
                    <h6>{elem.message}</h6>
                  </div>
                  <div className="d-flex justify-content-end m-2">
                    <button
                      className="btn btn-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#messageModal"
                    >
                      Reply
                    </button>
                    <Createmessage user_name={nick} other_id={elem.sender_id}/>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No messages</p>
          )}
        </div>
      </>
    </>
  );
};

// <div
//                 key={i}
//                 className="container d-flex justify-content-center my-2"
//               >
//                 <div className="col-3 border border-3 text-center">
//                   {elem.sender_nickname}
//                 </div>
//                 <div className="col-6 border border-3 text-center">
//                   <h4>{elem.title_message}</h4>
//                   <p>{elem.message}</p>
//                 </div>
//               </div>
