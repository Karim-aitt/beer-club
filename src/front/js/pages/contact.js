import React, { useContext, useEffect } from "react";
import "../../js/config.js"
import { Context } from "../store/appContext";
import { Bodybar } from "../component/bodybar.js"

export const Contact = () => {

    return(
        <div className="home-width mx-auto pb-3 bg-white">
            <Bodybar />
            <p className="text-center mt-4"> Contact con nosotros a través del siguiente formulario </p>
            <form action="mailto: karim.gonzalez.ait@gmail.com" method="post" enctype="text/pain" className="d-flex flex-column col-5 mx-auto">
                <input name="name" className="my-1 p-2" type="text" placeholder="Name" />
                <input name="email" className="my-1 p-2" type="email" placeholder="email" />
                <textarea
                name="textarea"
                className="my-1 p-2" 
                rows="4"
                cols="40"
                placeholder="Description" />
                <input type="submit" value="Send" className=" btn btn-success my-2 ms-auto"></input>
                
            </form>
        </div>
    )
}