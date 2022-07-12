import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/modals.css";

export const CreateBeer = () => {
  const { store, actions } = useContext(Context);

  //inputs formularios
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [category, setCategory] = useState("ale");
  const [source, setSource] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [aroma, setAroma] = useState("");
  const [autor, setAutor] = useState("");
  const [descrip, setDescrip] = useState("");

  //flags
  const [allfill, setAllfill] = useState(false); //flag de "rellenar todos los campos"
  const [allDone, setAllDone] = useState(false); //flag Registro completado

  //subir Imagen
  const formData = new FormData()  //para manejar las imagenes subidas
  
  return (
    <div
      className="modal fade"
      id="createbeerModal"
      tabIndex="-1"
      aria-labelledby="createbeerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark" id="createbeerModalLabel">
              Beer register form
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="">
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Beer Name"
                onChange={(e) => setNombre(e.target.value)}
                autoFocus={true}
                value={nombre}
                required
              ></input>
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Smell"
                onChange={(e) => setAroma(e.target.value)}
                autoFocus={true}
                value={aroma}
                required
              ></input>
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Alcohol"
                onChange={(e) => setAlcohol(e.target.value)}
                value={alcohol}
                required="required"
              ></input>
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Owner / Company"
                onChange={(e) => setAutor(e.target.value)}
                value={autor}
                required="required"
              ></input>
              <select
                className="m-2 p-1"
                id="selectCategory"
                name="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {store.categories.length >0 ? store.categories.map((elem, i) => {
                  return (
                    <option key={i} value={elem.id}>{elem.name}</option>
                  )
                })
                : 
                  <option>
                    Loading...
                  </option>
                }
              </select>
              <input
                className="ms-2 p-1"
                type="text"
                placeholder="Source"
                onChange={(e) => setSource(e.target.value)}
                value={source}
              ></input>
              <textarea
                className="m-2 p-1 inputStyle"
                rows="4"
                cols="40"
                placeholder="Description"
                onChange={(e) => setDescrip(e.target.value)}
                value={descrip}
              ></textarea>
              {/* <input
                className="m-2 p-1"
                type="file"
                placeholder="Select a file:"
                onChange={(e) => {
                    setImagen(e.target.files)
                    // formData.append('img', imagen)
                }
                }
                id="imgBeer"
              ></input> */}
              <input
              className="m-2 p-1"
              type="text"
              placeholder="url de tu imagen"
              onChange={(e) => setImagen(e.target.value)}
              value={imagen}
              >
              </input>
            </form>
          </div>
          <div className="modal-footer">
            <div className="modal-footer">
              {/* VALIDACIONES DE INPUTS */}

              {allfill == true ? (
                <p className="me-auto text-danger">Must fill all fields</p>
              ) : (
                ""
              )}

              {allDone == true ? (
                <p className="d-flex flex-column me-auto text-success">
                  Register completed
                </p>
              ) : (
                ""
              )}

              <button
                type="button"
                className="btn border border-2 border-success py-0 px-4 radius"
                onClick={() => {
                  // ESTO ES EL SUBMIT que debe enviar los datos de registro
                  if (
                    imagen == "" ||
                    nombre == "" ||
                    aroma == "" ||
                    source == "" ||
                    category == "" ||
                    alcohol == "" ||
                    autor == "" ||
                    descrip == ""
                  ) {
                    setAllfill(true);
                  }
                  console.log(imagen)
                  // token = localStorage.getItem('token') //intento conseguir datos del token
                  

                  actions.createbeer(
                    imagen,
                    nombre,
                    aroma,
                    category,
                    source,
                    alcohol,
                    autor,
                    descrip
                  ); //Envio al fetch de flux

                  // Reset de variables para que los inputs aparezcan vacios de nuevo

                  store.myAuthFlag = true;
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
