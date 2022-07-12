import React, { useContext, useEffect } from "react";
import "../../js/config.js"
import { Context } from "../store/appContext";
import { Bodybar } from "../component/bodybar.js"

export const Contact = () => {

    return(
        <div className="home-width mx-auto pb-3 bg-white">
            <Bodybar />
            <p className="text-center mt-4"> Contact con nosotros a través del siguiente formulario </p>
            <form className="d-flex flex-column col-5 mx-auto">
                <input className="my-1" type="text" placeholder="Name"></input>
                <input className="my-1" type="email" placeholder="email"></input>
                <textarea 
                rows="4"
                cols="40"
                placeholder="Description"></textarea>
                <button className="btn btn-success my-2 ms-auto">Submit</button>
            </form>
        </div>
    )
}