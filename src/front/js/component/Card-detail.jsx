import React, {useState, useEffect, useContext} from "react";

import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Beerdetail } from "./Beer-detail.jsx";

import "../../styles/card-detail.css";
import "../../styles/beer-detail.css";
import fondo from "../../img/bannerWeb.png";



import config from "../config";

export const CardDetail = (props) => {

  //PROP FILLING
  const idcerveza = props.beer_id
  const databeer = props.databeer

  const { store, actions } = useContext(Context);

  const [lastComment, setLastComment] = useState({})
  const [id_user, setId_user] = useState()
 
  useEffect(() => {
    fetch(`${config.hostname}/api/comment/beer/${props.beer_id}`)
    .then(res => res.json())
    .then(data => {
      if(data != undefined){
      setLastComment({comment: data[data.length-1].comment})
      setId_user(data[data.length-1].user_id)
    }})
  }, [])

let nameUser = ""
  function name(iduser){
    store.users.map(elem => {
      if(elem.id == iduser){
        nameUser = elem.nickname
      }
    })
  }
  
  return (
    <div className="card custom-style-detail mx-auto mt-5">
      <div className="card-header p-0">
        <img className="img-fluid img-card-banner" src={fondo}></img>
      </div>
      <div className="card-body m-0 p-0 back-color">
      <img className="beer-head-img" src={props.img}></img>
        <div className="div-prop bg-dark text-white d-flex py-3 shadow">
            <div className="col-5">
            <h5 className="card-title ms-3">{props.name}</h5>
            <h5 className="card-title ms-3">{props.type}</h5>
            </div>

            <div className="col-2 d-flex align-items-end ">
            <i className="fas fa-star d-flex justify-content-center"></i>

            </div>

            <div className="col-5 ms-auto">
            <h5 className="card-title d-flex justify-content-end me-3">{props.alcohol} Alc.</h5>
            <h5 className="card-title d-flex justify-content-end me-3">{props.company}</h5>
            </div>
        </div>
            <p className="card-text mt-3 px-5">
                {props.descrip}
            </p>
            <hr className="w-75 mx-auto"></hr>
            
            {/* PLANTILLA

              <div className="bg-secondary text-white w-75 mx-auto comment-style px-2 shadow-lg">
                <h6>{props.user_name_comment}</h6>
                <p className="">{props.user_comment}
                </p>
                <div className="d-flex">
                <span className="fw-bold">{props.date}</span><a className="ms-auto text-white">Ver más comentarios</a>
            </div>

            */}
            <div className="bg-secondary text-white w-75 mx-auto comment-style px-2 shadow-lg">
              {/* AQUI HAY QUE SACAR EL ULTIMO COMENTARIO HECHO EN ESTA CERVEZA DE LA TABLA COMMENTS*/}
                <h6>{name(id_user)}{nameUser}</h6>
                <p className="">{lastComment.comment}
                </p>
                <div className="d-flex">
                

                {/* CUANDO SE LE DA CLICK A MÁS COMENTARIOS SE DEBERÍA ABRIR UNA NUEVA VISTA AMPLIADA (MODAL) DE LA CERVEZA
                    DONDE SE MUESTREN TODOS LOS COMENTARIOS EN SCROLL SI SON MUCHOS
                */}

                <Link to="#" className="mx-auto text-white" data-bs-toggle="modal" data-bs-target={`#beerdetail${props.beer_id}`} data-bs-whatever={props.beer_id}>Ver más comentarios</Link>
                <Beerdetail className="text-dark" CI={props.beer_id} databeer={props.databeer} id_cerveza={props.beer_id}/>
                </div>  
            </div>

            <form className="d-flex my-4">
            <input className="mx-auto p-2 input-detail rounded" type="text" placeholder="Comentar..."></input>
            </form>
      </div>
    </div>
  );
};
