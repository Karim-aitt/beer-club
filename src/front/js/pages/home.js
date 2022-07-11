import React, { useContext, useEffect } from "react";
import "../../js/config.js"
import { Context } from "../store/appContext";
import { Bodybar } from "../component/bodybar.js"

import { Card } from "../component/card"

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home-width mx-auto pb-3 bg-white">
      <Bodybar />
      <Card rank="1"/>
    </div>
  );
};
