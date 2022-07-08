import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/starsranking.css"

export const Stars = () => {
    const {store, actions} = useContext(Context)
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    // useEffect((user_id, cerveza_id, rating) => {
			
    //     fetch("", {
    //         method: 'POST',
    //         body: JSON.stringify({user_id, cerveza_id, rating}),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => {
    //         if(res.status == 200){
                
    //         }
    //     })
    //     .then(data => {data})
			
    // }, [rating])
    
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
              className={index <= (hover || rating) ? "fa fa-star" : "far fa-star"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className=""></span>
            </button>
          );
        })}
      </div>
    );
};
