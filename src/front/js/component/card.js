import React, { useState } from "react";

import "../../styles/card.css";
import Domus from "../../img/Domus.jpg"

export const Card = () => {
  return (
    <div className="card border border-3 border-warning card-width m-3">
        <div class="ribbon">
        <span class="ribbon2"> #1</span>
        </div>
      <img src={Domus} className="card-img-top" alt="..." />
      <div className="card-body  text-center">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};
