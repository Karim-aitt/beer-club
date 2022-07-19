import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/starsranking.css";
import config from "../config";

export const Stars = (props) => {
  const { store, actions } = useContext(Context);
  const [punctuation, setPunctuation] = useState(0);
  const [hover, setHover] = useState(0);
  const id_beer = props.beer_id_star;

  const token = localStorage.getItem("token");

  const onVote = (value) => {
    console.log({ value });
    fetch(`${config.hostname}/api/vote`, {
      method: "POST",
      body: JSON.stringify({
        beer_id: props.beer_id_star,
        punctuation: value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          return "ok en el starsranking 30";
        }
      })
      .then((data) => {
        data;
        
      });
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          // Checked star icon is fa fa-star
          // Without check star icon is far fa-star
          <button
            type="button"
            key={index}
            className={
              index <= (hover || props.punctuation)
                ? "fa fa-star"
                : "far fa-star"
            }
            onClick={() => {
              if (!props.punctuation) {
                onVote(index);
                setPunctuation(index)
                setHover(punctuation)
              }
              // props.punctuation <= 0 && onVote(index)
            }}
            onMouseEnter={() => {
              // console.log("onMouseEnter: ", props.punctuation);
              if (!props.punctuation && punctuation <= 0) {
                setHover(index);
              }
              // props.punctuation <= 0 && setHover(index)
            }}
            onMouseLeave={() => {
              // console.log("onMouseLeave: ", props.punctuation);
              if (!props.punctuation) {
                setHover(punctuation);
              }
              // props.punctuation <= 0 && setHover(punctuation)
            }}
          >
            <span className=""></span>
          </button>
        );
      })}
    </div>
  );
};
