import React, { useState } from "react";
import { Stars } from "./starsranking";

import "../../styles/card.css";
import Domus from "../../img/Domus.jpg";

export const Card = (props) => {
  return (
    <div className="card border border-3 border-warning card-width m-3">
      <div className="ribbon">
        <span className="ribbon2"> #{props.rank} </span>
      </div>
      <img src={Domus} className="card-img-top" alt="..." />
      <div className="card-body  text-center">
        <h5 className="card-title">{props.nombre}</h5>
        <p className="card-text"></p>
        
        <Stars />
      </div>
    </div>
  );
};
