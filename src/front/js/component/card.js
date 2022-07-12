import React, { useState } from "react";
import { Stars } from "./starsranking";

import "../../styles/card.css";
import Domus from "../../img/Domus.jpg";

export const Card = (props) => {
  const ribbonFlag = props.ribbon;

  return (
    <div className="card border border-3 border-warning card-width m-3">
      {ribbonFlag == false ? <div className="ribbon">
        <span className="ribbon2"> #{props.rank} </span>
      </div> : ""}
      <img src={props.img} className="card-img-top img-fluid img-card mx-auto" alt="..." />
      <div className="card-body  text-center">
        <h5 className="card-title">{props.nombre}</h5>
        <p className="card-text"></p>
        
        <Stars />
      </div>
    </div>
  );
};
