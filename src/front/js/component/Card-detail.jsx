import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Beerdetail } from "./Beer-detail.jsx";

import "../../styles/card-detail.css";
import "../../styles/beer-detail.css";
import fondo from "../../img/bannerWeb.png";

import config from "../config";

export const CardDetail = (props) => {
  //PROP FILLING
  const idcerveza = props.beer_id;
  const databeer = props.databeer;

  const { store, actions } = useContext(Context);

  const [lastComment, setLastComment] = useState({});
  const [id_user, setId_user] = useState();
  const [average, setAverage] = useState();

  const getLastComment = () => {
    fetch(`${config.hostname}/api/comment/beer/${props.beer_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.length == 0) {
          setLastComment({ comment: data[data.length - 1].comment });
          setId_user(data[data.length - 1].user_id);
        } else return "No hay comentarios";
      });
  };

  useEffect(() => {
    getLastComment();
    fetch(`${config.hostname}/api/vote/average/${props.beer_id}`)
      .then((res) => res.json())
      .then((data) => {
        setAverage(data);
      });
  }, []);

  let nameUser = "";
  function name(iduser) {
    store.users.map((elem) => {
      if (elem.id == iduser) {
        nameUser = elem.nickname;
      }
    });
  }

  return (
    <div className="card custom-style-detail mx-3 mt-5"> 
      <div className="card-header p-0">
        <img className="img-fluid img-card-banner" src={fondo}></img>
      </div>
      <div className="card-body m-0 p-0 back-color">
        <img className="beer-head-img" src={props.img}></img>
        <div className="div-prop bg-dark text-white d-flex py-3 shadow">
          <div className="col-5">
            <h5 className="card-title ms-3 capital">{props.name}</h5>
            <h5 className="card-title ms-3">{props.type}</h5>
          </div>

          {/* Aqui poner la media */}
          <div className="col-2 d-flex align-items-end ">
            <i className="fas fa-star d-flex pb-1 ms-auto me-1"></i>
            <span className="d-flex me-auto">{average}</span>
          </div>

          <div className="col-5 ms-auto">
            <h5 className="card-title d-flex justify-content-end me-3">
              {props.alcohol} Alc.
            </h5>
            <h5 className="card-title d-flex justify-content-end me-3 capital">
              {props.company}
            </h5>
          </div>
        </div>
        <p className="card-text mt-3 px-5">{props.descrip}</p>
        <hr className="w-75 mx-auto"></hr>

        <div className="bg-secondary text-white w-75 mx-auto comment-style px-2 shadow-lg mb-4">
          {/* Last comment view */}
          <h6>
            {name(id_user)}
            {nameUser}
          </h6>
          <p className="ps-2">{lastComment.comment}</p>
          <div className="d-flex">
            {/* Card comments in amplified view */}
            <Link
              to="#"
              className="mx-auto text-white"
              data-bs-toggle="modal"
              data-bs-target={`#beerdetail${props.beer_id}`}
              data-bs-whatever={props.beer_id}
            >
              Ver más comentarios
            </Link>
            <Beerdetail
              className="text-dark"
              CI={props.beer_id}
              databeer={props.databeer}
              id_cerveza={props.beer_id}
              onGetLastComment={getLastComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
