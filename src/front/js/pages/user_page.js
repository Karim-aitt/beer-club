import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Card } from "../component/card"

import "../../styles/home.css";

export const Userpage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home-width mx-auto py-3 bg-white">
      <p>USER PAGE</p>
    </div>
  );
};