import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Card } from "../component/card"
import { CardExpanded } from "../component/card-expanded.js";
import { CreateBeer } from "../component/createbeerModal";

import "../../styles/home.css";

export const Userpage = () => {
  const { store, actions } = useContext(Context);
  const nombre = "Username"

  return (
    <>
      <div className="navbar-width text-white bodybar-color mx-auto d-flex align-items-center py-3 mt-0">
        {store.myAuthFlag == true ? 
        <button 
        className="btn btn-warning mx-auto"
        aria-current="page"
        data-bs-toggle="modal"
        data-bs-target="#createbeerModal"
        >
          ADD A NEW BEER
        </button>
        : ""}
        <CreateBeer />
      </div>
      <div className="home-width mx-auto py-3 bg-white">
        <h4 className="text-center">Cervezas de {nombre}</h4>
        <div className="container mt-3 mx-auto w-75 pb-3">
            <div className="d-flex scrollmenu-x p-3">
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            <CardExpanded name={"Domus"} rating={"4.3"} type={"Trigo"} totalvotes={"47"} comments={"23"}/>
            </div>
        </div>
      </div>
    </> 
  );
    
    
};