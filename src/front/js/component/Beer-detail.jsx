import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/starsranking.css";
import "../../styles/beer-detail.css";

import { Stars } from "./starsranking";

import config from "../config";

export const Beerdetail = (props) => {
  const { store, actions } = useContext(Context);
  // ---------------- Comment system ----------------- \\
  const [comment, setComment] = useState("")
  const [flagComment, setFlagComment] = useState()

  const commentFetch = (commentValue, id_cerveza) => {
    if(commentValue != "" && commentValue != undefined && commentValue != null){
      const tok = localStorage.getItem("token")
      let comment = commentValue;
      let beer_id = props.id_cerveza;
      
      // ---- TRIGGER SEGUNDARIO DEL FETCH dataComment l50 ---- \\
      if(flagComment == !0){
        setFlagComment(!1)
      } else {setFlagComment(!0)}

      fetch(`${config.hostname}/api/comment`, {
        method: 'POST',
        body: JSON.stringify({comment, beer_id}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + tok
        }
      })
      .then(res => {
              if(res.status == 200 || res.status == 201){
                return "Todo ok"

              } else {
                
                return "Problema en respuesta fetch comment beer-detail";
              } 
            })
      .then(data => data) // No esta en uso
      .catch(error => console.log({error}))
        }
  }
  // ------------ Visualize Comments system ----------------- \\
const [dataComment, setDataComment] = useState([])


useEffect(() => {

fetch(`${config.hostname}/api/comment`)
.then(res => {
  if(res.status == 200){
    return res.json()
  }
})
.then(data => {
  setDataComment(data)
})
.catch(error => console.log({error}))
}, []) // Como renderizar los comentarios nuevamente añadidos sin tener que cerrar y abrir el modal ??

// function getName() {
//   dataComment.map((elem, i) => {
                
//     if(elem.beer_id == props.id_cerveza){

//       const getUserName = async (id) => {
//         const res = await fetch(`${config.hostname}/api/users/${id}`)
//         const data = await res.json()
//         setUsername(data)
//         console.log("esto es username inside", username)
//       }
//       getUserName(elem.user_id)
//   }

//   })
// }

// ---------------- Get user name ----------------- \\
const [username, setUsername] = useState("")
const [id_user, setId_user] = useState("")

// function getNamename(id) {
//   store.users.map(elem => {
//     if(elem.id == id){
//       setUsername(elem.nickname)
//     }
//   })
// }


  // ---------------- Voting system ----------------- \\
  const [beer, setBeer] = useState({});
  const [vote, setVote] = useState({});

  useEffect(() => {
    setBeer(props.databeer);
  }, [beer]);

  useEffect(() => {
    if (store.userDataVotes.length > 0) {
      store.userDataVotes.map((elem, i) => {
        
        if (elem.beer_id == props.id_cerveza) {
          setVote(elem);
          
        }
      });
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
        <div className="modal-dialog">
          <div className="modal-content body-w">
            <div className="modal-header d-flex flex-column">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <h5 className="modal-title" id={`beerdetailLabel${props.CI}`}>
                {beer.name}
              </h5>
              <div className="d-flex mt-2 fw-bold">
                <p className="mx-1 px-1">{beer.alcohol} ALC</p>
                <p className="border-p mx-2 px-3">{beer.source}</p>
                <p className="mx-2 px-3">{beer.company}</p>
              </div>
              {/* AQUI PONER LA MEDIA DE VOTOS */}
              <div className="d-flex">
                <i className="fa fa-star mx-1 d-flex align-items-center"></i>
                <p className="mb-0 pb-0">5</p>
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

                  dataComment.length >0 ?
                  dataComment.map((elem, i) => {
                    
                    if(elem.beer_id == props.id_cerveza){
                          let nameUser = ""
                          function name(iduser){
                            store.users.map(elem => {
                              if(elem.id == iduser){
                                nameUser = elem.nickname
                              }
                            })
                          }
                      return (
                          <div key={i} className="d-flex">
                            <p className="fw-bold mx-2">{name(elem.user_id)}{nameUser}</p>
                            <p className="">{elem.comment}</p>
                        </div>
                      
                      )
                    } 
                    else {""}
                  })
                  
                  : <p>There aren't comments yet</p>
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
                  className="p-2 input-detail rounded"
                  placeholder="Post your comment..."
                  onChange={(e) => {
                    setComment(e.target.value)
                    
                  }}
                  value={comment}
                ></input>
                <input
                type="button"
                className={comment == "" ? "btn btn-dark btn-sm mx-2 align-bottom disabled" : "btn btn-dark btn-sm mx-2 align-bottom"}
                value="Submit"
                onClick={() => {
                  if(comment == ""){
                      return "Debes de escribir algo en tu comentario"
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
