import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";

import { Navbar } from "../component/navbar";
import { Beerdetail } from "../component/Beer-detail.jsx";
import { CardCategoryMini } from "../component/Card-category-mini.jsx";

import "../../styles/home.css";
import banner from "../../img/bannerWeb2.png"
import config from "../config";

export const Userpage = () => {
  const { store, actions } = useContext(Context);
  const [userBeers, setUserBeers] = useState([])

  const getUserBeers = () => {
    const token = localStorage.getItem("token")
    fetch(`${config.hostname}/beers/user/${store.user_id}`)
    .then(res => res.json())
    .then(data => setUserBeers(data))
  }
  useEffect(() => {
    fetch(`${config.hostname}/api/beers/user/${store.user_id}`)
    .then(res => {return res.json()})
    .then(data => setUserBeers(data))
    .catch(error => console.log({error}))
  }, [])

  return (
    <>
      {/* {store.token != null ? */}
      <>
        <Navbar />
        <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
				<img className="img-fluid d-flex mx-auto" src={banner} />
			  </div>
			  <div className="d-flex flex-row justify-content-center px-0"></div>
			  <div className="me-sm-3"></div>
        <div>
                {/* ZONA DE CATEGORIA Y EXPLICACION CATEGORIA */}
                <h2 className="text-center my-3">Cervezas creadas por el usuario</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>

        <div className="container w-75 d-flex div-category-mini justify-content-center">
                {/* MAPEO DE BEERS */}
                {userBeers.length >0 ? userBeers.map((elem, i) => {
                    
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
      {/* : "" */}
       {/* <Navigate to="/" /> */}
       {/* } */}
    </> 
  );
    
    
};