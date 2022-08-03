import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/card-events.css";
import { Link } from "react-router-dom";
import config from "../config";

import { EventModal } from "./event-modal.jsx";

export const EventCard = (props) => {
  const { store, actions } = useContext(Context);
  //GENERAR 1 div plantilla POR CATEGORIA
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetch(`${config.hostname}/api/event`)
      .then((res) => res.json())
      .then((data) => setAllEvents(data))
      .catch((error) =>
        console.log("error en el get events card-event", { error })
      );
  }, []);

  return (
    <div className="category-item">
      {allEvents.length > 0 ? (
        allEvents.map((elem, i) => {
          return (
            <div key={i}>
              <Link
            
                to="#"
                data-bs-toggle="modal"
                data-bs-target={`#eventModal${elem.id_event}`}
                data-bs-whatever={elem.id_event}
                className="d-flex flex-column div-size m-2 
                    p-2 fw-bold category-size link-style"
              >
                {elem.event_name}
              </Link>
              <EventModal
                event_name={elem.event_name}
                image={elem.event_image}
                place={elem.event_place}
                date={elem.event_date}
                time={elem.event_time}
                description={elem.event_description}
              />
            </div>
          );
        })
      ) : (
        <div className="spinner-border text-dark m-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};
