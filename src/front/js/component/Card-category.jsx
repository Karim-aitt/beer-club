import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/card-category.css";
import { Link } from "react-router-dom";

export const CardCategory = (props) => {
    const { store, actions } = useContext(Context);
    //GENERAR 1 div plantilla POR CATEGORIA

  return (
    <div className="category-item">
        {/* PLANTILLA

        <div className="div-size m-2 p-2 fw-bold category-size">
            <Link to={props.category_link} className="link-style">{props.category_name}</Link>
        </div>

        */}
        {store.categories.length >0 ? store.categories.map((elem, i) => {
                  return (
                    // <div key={i} className="div-size m-2 p-2 fw-bold category-size text-center">
                        <Link key={i} to={`/categories/${elem.id}`} className="d-flex flex-column div-size m-2 p-2 fw-bold category-size link-style">{elem.name}</Link>
                    // </div>
                  )
                })
                : 
                <div className="spinner-border text-dark m-auto" role="status">
                <span className="sr-only">Loading...</span>
                </div>
                }
    </div>
  );
};