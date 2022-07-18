import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/card-category-mini.css";

import { Link } from "react-router-dom";

export const CardCategoryMini = (props) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="">
            <img src={props.image} alt="CategoryMiniImage" className="img-category-mini mx-auto"/>
            <p className="col-12 mt-2 text-center fw-bold category-name-position">{props.nombre}</p>
        </div>
    )
}

// {store.categories.length >0 ? store.categories.map((elem, i) => {
//     return (
//          <div>
//              <img src={elem.image} alt="CategoryMiniImage" className=""/>
//                <p className="">{elem.name}</p>
//         </div>
//     )
    
// })
// : <p className="text-center px-2 pt-2">No hay cervezas</p>
// }



// {store.categories.length >0 ? store.categories.map((elem, i) => {
//     return (
//         <CardCategoryMini key={i} image={elem.image} nombre={elem.name} />
        
//     )
    
// })
// : <p className="text-center px-2 pt-2">No hay cervezas</p>
// }