import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/starsranking.css"
import config from "../config"

export const Stars = (props) => {
    const {store, actions} = useContext(Context)
    const [punctuation, setPunctuation] = useState(0);
    const [hover, setHover] = useState(0);
    const [beer_id, setBeer_id] = useState();
    const id_beer = props.beer_id_star
    // console.log(beer_id)
    const token = localStorage.getItem('token')

    
    useEffect(() => {
        if(punctuation == 0){
          ""
        } else {

          fetch(`${config.hostname}/api/vote`, {
              method: 'POST',
              body: JSON.stringify({beer_id, punctuation}),
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer " + token
              }
          })
          .then(res => {
              if(res.status == 200){
                  return "ok en el starsranking 31"
              }
          })
          .then(data => {data} )// {data} solo funciona cuando el usuario ya ha votado a una misma cerveza. {data} retorna "True"
        }
    }, [punctuation])
    
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            // Checked star icon is fa fa-star
            // Without check star icon is far fa-star
            <button
              type="button"
              key={index}
              className={index <= (hover || punctuation) ? "fa fa-star" : "far fa-star"}
              onClick={() => {
                setPunctuation(index)
                setBeer_id(id_beer)
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(punctuation)}
            >
              <span className=""></span>
            </button>
          );
        })}
      </div>
    );
};
