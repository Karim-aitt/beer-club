import React from "react";
import "../../styles/card-detail.css";
import fondo from "../../img/bannerWeb.png";
import { Link } from "react-router-dom";


export const CardDetail = (props) => {
  
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
                <h6>Pedro</h6>
                <p className="">Me encanta esta cerveza es super tasty y el creador es muy buena gente.
                Me encanta esta cerveza es super tasty y el creador es muy buena gente.
                Me encanta esta cerveza es super tasty y el creador es muy buena gente.
                </p>
                <div className="d-flex">
                <span className="fw-bold">13/07/2022</span>

                {/* CUANDO SE LE DA CLICK A MÁS COMENTARIOS SE DEBERÍA ABRIR UNA NUEVA VISTA AMPLIADA (MODAL) DE LA CERVEZA
                    DONDE SE MUESTREN TODOS LOS COMENTARIOS EN SCROLL SI SON MUCHOS
                */}

                <Link to="#" className="ms-auto text-white">Ver más comentarios</Link>
            </div>
                
            </div>
            <form className="d-flex my-4">
            <input className="mx-auto p-2 input-detail rounded" type="text" placeholder="Comentar..."></input>
            </form>
      </div>
    </div>
  );
};
