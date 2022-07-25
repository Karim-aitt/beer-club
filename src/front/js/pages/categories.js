import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { CardCategoryMini } from "../component/Card-category-mini.jsx";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import "../../styles/home.css";
import "../../styles/categories.css";
import banner from "../../img/bannerWeb2.png"

export const Categories = () => {
    const { store, actions } = useContext(Context);


  useEffect(() => {
    actions.getBeers()
    actions.getCategories()
    actions.validate()
  }, [])

    return (
        <>
		{store.token != null ? 
        <>
        <Navbar />
        <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
				<img className="img-fluid d-flex mx-auto" src={banner} />
			</div>
      <div>
                {/* ZONA DE CATEGORIA Y EXPLICACION CATEGORIA */}
                <h2 className="text-center my-3">Categories</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>
        <div className="container w-75 d-flex div-category-mini justify-content-center">
         {store.categories.length >0 ? store.categories.map((elem, i) => {
            return (
            <Link key={i} to={`/categories/${elem.id}`} className="mx-2 p-2 text-decoration-none text-dark">
                <CardCategoryMini className="" image={elem.image} nombre={elem.name} />
            </Link>
            )   
            })
            : <p className="text-center px-2 pt-2">No hay cervezas</p>
            }
        </div>
        {/* <CardCategoryMini /> */}
        <Footer />
        </>

        : <Navigate to="/" />}
       </>
    )
}