import React, { useContext, useEffect } from "react";
import "../../js/config.js"
import { Context } from "../store/appContext";
import { Bodybar } from "../component/bodybar.js"
import { Underseccion } from "../component/under-seccion.js";

import { Card } from "../component/card"

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  
  return (
    <div className="home-width mx-auto pb-3 bg-white">
      <Bodybar />
      <div className="container d-flex justify-content-center">
        <Card rank="2" ribbon={false}/>
        <Card rank="1" ribbon={false}/>
        <Card rank="3" ribbon={false}/>
      </div>
      <div className="d-flex mx-5 scrollmenu-x border mb-3">
        {store.beers.length > 0 ? store.beers.map((elem, i) => {
          return(
            <Card key={i} nombre={elem.name} img={elem.image} ribbon={true} beer_id_card={elem.id}/>
          )
        }): <></>}
      </div>
      <Underseccion />
      
    </div>
  );
};
