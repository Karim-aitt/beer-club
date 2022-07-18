import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/starsranking.css"
import "../../styles/beer-detail.css";

import { Stars } from "./starsranking";

export const Beerdetail = (props) => {
  const { store, actions } = useContext(Context);
  const [beer, setBeer] = useState({})
  
  useEffect(() => {
    setBeer(props.databeer)
  }, [beer]) 

  return (
    <>
      <div
      className="modal fade"
      id={`beerdetail${props.CI}`}
      tabIndex="-1"
      aria-labelledby={`beerdetailLabel${props.CI}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content body-w">
          <div className="modal-header d-flex flex-column">
          <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h5 className="modal-title" id={`beerdetailLabel${props.CI}`}>
                {beer.name}
              </h5>
              <div className="d-flex mt-2 fw-bold">
              <p className="mx-1 px-1">{beer.alcohol} ALC</p>
              <p className="border-p mx-2 px-3">{beer.source}</p>
              <p className="mx-2 px-3">{beer.company}</p>
              </div>
              {/* AQUI PONER LA MEDIA DE VOTOS */}
              <div className="d-flex">
                <i className="fa fa-star mx-1 d-flex align-items-center"></i>
                <p className="mb-0 pb-0">5</p>
              </div>
              
            
          </div>
          <div className="modal-body d-flex">
            <img className="modal-image" src={beer.image}></img>

          <div className="">
            <div className="description py-3 mb-2">
            {beer.description}
            </div>

            <div className="my-3">
              Commentarios
            </div>
            
            
            
          </div>
           
            
          </div>
          <div className="modal-footer d-flex justify-content-around">
          <div className="mt-3 mb-1">
              <Stars 
              punctuation={props.punctuation}
              value={0}
              beer_id_star={props.beer_id_card}
              />
            </div>
            {/* HACER COMENTARIOS */}
          <input type="text" className="p-2 input-detail rounded" placeholder="Post your comment"></input>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};
