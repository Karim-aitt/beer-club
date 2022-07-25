import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/starsranking.css";
import "../../styles/beer-detail.css";

import { Stars } from "./starsranking";

import config from "../config";

export const Beerdetail = (props) => {
  const { store, actions } = useContext(Context);
  // ---------------- Comment system ----------------- \\
  const [comment, setComment] = useState("");
  const [flagComment, setFlagComment] = useState();
  const [dataComment, setDataComment] = useState([]);

  const getComments = () => {
    fetch(`${config.hostname}/api/comment`)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        setDataComment(data);
      })
      .catch((error) => console.log({ error }));
  };

  const commentFetch = (commentValue) => {
    if (commentValue) {
      const tok = localStorage.getItem("token");
      let comment = commentValue;
      let beer_id = props.id_cerveza;

      // ---- TRIGGER SEGUNDARIO DEL FETCH dataComment ---- \\
      if (flagComment == !0) {
        setFlagComment(!1);
      } else {
        setFlagComment(!0);
      }

      fetch(`${config.hostname}/api/comment`, {
        method: "POST",
        body: JSON.stringify({ comment, beer_id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tok,
        },
      })
        .then((res) => {
          console.log({ res });
          if (res.status == 201) {
            return res.json();
          } else {
            return "Problema en respuesta fetch comment beer-detail";
          }
        })
        .then((data) => {
          console.log("esto es datacomment", { data });
          getComments();
          props.onGetLastComment();
          return data;
        }) // No esta en uso
        .catch((error) => console.log({ error }));
    }
  };
  // ------------ Visualize Comments system ----------------- \\

  useEffect(() => {
    getComments();
  }, []);

  // ---------------- Get user name ----------------- \\
  const [username, setUsername] = useState("");
  const [id_user, setId_user] = useState("");

  // ---------------- Voting system ----------------- \\
  const [beer, setBeer] = useState({});
  const [vote, setVote] = useState({});
  const [average, setAverage] = useState();

  useEffect(() => {
    setBeer(props.databeer);
  }, [beer]);

  useEffect(() => {
    fetch(`${config.hostname}/api/vote/average/${props.id_cerveza}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("esto es data", data);
        setAverage(data);
      });
  }, [vote]); //esto hace que se carguen los votos al principio?

  useEffect(() => {
    if (store.userDataVotes?.length > 0) {
      store.userDataVotes.map((elem, i) => {
        if (elem.beer_id == props.id_cerveza) {
          setVote(elem);
        }
      });
    } else {
      ("");
    }
  }, [store.userDataVotes]);
  // ---------------- ------------ ----------------- \\

  return (
    <>
      <div
        className="modal fade"
        id={`beerdetail${props.CI}`}
        tabIndex="-1"
        aria-labelledby={`beerdetailLabel${props.CI}`}
        aria-hidden="true"
      >
        <div className="modal-dialog text-dark">
          <div className="modal-content body-w">
            <div className="modal-header d-flex flex-column text-dark">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <h5
                className="modal-title capital"
                id={`beerdetailLabel${props.CI}`}
              >
                {beer.name}
                {props.name}
              </h5>
              <div className="d-flex mt-2 fw-bold">
                <p className="mx-1 px-1">{beer.alcohol} ALC</p>
                <p className="border-p mx-2 px-3 capital">{beer.source}</p>
                <p className="mx-2 px-3 capital">{beer.company}</p>
              </div>
              {/* AQUI PONER LA MEDIA DE VOTOS */}
              <div className="col-2 d-flex align-items-end ">
                <i className="fas fa-star d-flex pb-1 ms-auto me-1"></i>
                <span className="d-flex me-auto">{average}</span>
              </div>
            </div>
            <div className="modal-body d-flex">
              <div className="col-5">
                <img className="modal-image" src={beer.image}></img>
              </div>

              <div className="col-7">
                <div className="description py-3 mb-2">{beer.description}</div>

                <div className="my-3 div-comments-body scrollhidden">
                  {
                    //Esto tiene que cambiarse a que dataComment solo tenga comentarios de la cerveza
                    //en cuestion, o ninguno. Hacer el fetch con la id de la cerveza y filtrar en el back
                    //por id de la cerveza y retornar esos comentarios.

                    dataComment.length > 0 ? (
                      dataComment.map((elem, i) => {
                        if (elem.beer_id == props.id_cerveza) {
                          let nameUser = "";
                          function name(iduser) {
                            store.users.map((elem) => {
                              if (elem.id == iduser) {
                                nameUser = elem.nickname;
                              }
                            });
                          }
                          return (
                            <div key={i} className="d-flex">
                              <p className="fw-bold mx-2">
                                {name(elem.user_id)}
                                {nameUser}
                              </p>
                              <p className="">{elem.comment}</p>
                            </div>
                          );
                        } else {
                          ("");
                        }
                      })
                    ) : (
                      <p>There aren't comments yet</p>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <div className="mt-3 mb-1">
                <Stars
                  punctuation={vote.punctuation}
                  value={0}
                  beer_id_star={props.id_cerveza}
                />
              </div>
              {/* HACER COMENTARIOS */}
              <form>
                <input
                  type="text"
                  className="p-2 pb-0 input-comment rounded"
                  placeholder="Post your comment..."
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                ></input>
                <input
                  type="button"
                  className={
                    comment == ""
                      ? "btn btn-sm mx-2 align-bottom disabled"
                      : "btn btn-dark btn-sm mx-2 align-bottom"
                  }
                  value="Submit"
                  onClick={() => {
                    if (comment == "") {
                      return "Debes de escribir algo en tu comentario";
                    } else {
                      commentFetch(comment);
                      // setDataComment(...dataComment, comment)
                      setComment("");
                    }
                  }}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
