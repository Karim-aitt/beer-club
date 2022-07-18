import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../config";

import { CardCategoryMini } from "../component/Card-category-mini.jsx";
import { Beerdetail } from "../component/Beer-detail.jsx";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import "../../styles/home.css";
import "../../styles/categories.css";
import banner from "../../img/bannerWeb2.png"

export const CategoryDetail = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); //object
    
    const beersArray = []
    let catName = ""

    const getCategoryBeers = (id) =>{
        for(let i=0; i < store.beers.length; i++){
            if(store.beers[i].category_id == id) {
                beersArray.push(store.beers[i])
            }
        }
    }
    getCategoryBeers(id)

    const nameCategory = (id) => {
        store.categories.map((elem, i) => {
            if(elem.id == id){
                catName = elem.name
            }
        })
    }
    nameCategory(id)

    return (
        <>
            <>
            <Navbar />
            <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
				<img className="img-fluid d-flex mx-auto" src={banner} />
			</div>
            <div>
                {/* ZONA DE CATEGORIA Y EXPLICACION CATEGORIA */}
                <h2 className="text-center my-3">Category {catName}</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>
            <div className="container w-75 d-flex div-category-mini justify-content-center">
                {/* MAPEO DE BEERS */}
                {beersArray.length >0 ? beersArray.map((elem, i) => {
                    
                    return(
                        
                        <div key={i}>
                            <Beerdetail CI={i} id_cerveza={elem.id} databeer={elem} elemindex={i} image={elem.image} nombre={elem.name}/>
                            <Link to="#" type="button" data-bs-toggle="modal" data-bs-target={`#beerdetail${i}`} data-bs-whatever={i} className="text-decoration-none text-dark">
                                <CardCategoryMini image={elem.image} nombre={elem.name} />
                            </Link>
                        </div>
                        
                        )
                })
                : <p className="text-center mx-2">There aren't beers in this category</p>
                }
                
            </div>
            </>
        </>
        
    )
}