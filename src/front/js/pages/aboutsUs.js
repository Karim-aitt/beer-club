import React, { useContext, useEffect } from "react";
import "../../js/config.js"
import { Context } from "../store/appContext";
import { Bodybar } from "../component/bodybar.js"

export const About = () => {

    return(
        <div className="home-width mx-auto pb-3 bg-white">
            <Bodybar />
            <p className="text-center mt-4"> Somos Karim y Javier, y este es nuestro proyecto final del Bootcamp de 4Geeks </p>
        </div>
    )
}