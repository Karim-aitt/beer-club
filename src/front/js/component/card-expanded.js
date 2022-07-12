import React from "react";
import "../../styles/cardExpanded.css";
import Domus from "../../img/Domus.jpg"

export const CardExpanded = (props) => {
  return (
    <div className="card custom-style-expanded mx-2">
      <div className="card-header color-bg">
        <h5 className="card-title text-center">{props.name}</h5>
      </div>
      <div className="card-body">
        <div className="row">

          <div className="d-flex mx-0 px-0 col-6">
            <img
              className="custom-img pe-5"
              src={Domus}
            ></img>
          </div>
          

          <div className="col-6 text-center fs-5 fw-bold my-auto">
            <p className="card-text">
              <i className="fas fa-star me-2 text-warning"></i>
              {props.rating}
            </p>
            <p><i className="fas fa-hand-point-up me-2 text-warning"></i>{props.totalvotes}</p>
            
            <p><i className="fas fa-comment-dots me-2 text-warning"></i>{props.comments}</p>
            <p>{props.type}</p>
          </div>

        </div>
      </div>
    </div>
  );
};
