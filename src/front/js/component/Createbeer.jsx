import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/createbeer_modal.css";
import config from "../config";

export const Createbeer = () => {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token")

  //inputs formularios
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState();
  const [category, setCategory] = useState("1");
  const [source, setSource] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [aroma, setAroma] = useState("");
  const [autor, setAutor] = useState("");
  const [descrip, setDescrip] = useState("");

  //flags
  const [allfill, setAllfill] = useState(false); //flag de "rellenar todos los campos"
  const [allDone, setAllDone] = useState(false); //flag Registro completado

  //subir Imagen
   //para manejar las imagenes subidas
  

// const handleSend = (event) => {
//   event.preventDefault()
//   const token = localStorage.getItem("token")

//   const formData = new FormData();
//   formData.append("file", imagen)
//   formData.append("name", nombre)
//   formData.append("category", category)
//   formData.append("source", source)
//   formData.append("alcohol", alcohol)
//   formData.append("smell", aroma)
//   formData.append("company", autor)
//   formData.append("description", descrip)

//   console.log("esto es formData",formData, {formData})
//   fetch(`${config.hostname}/api/beers`, {
//     method: "POST",
//     body: JSON.stringify({formData}),
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'Authorization': "Bearer " + token
//     } 
//   })
//   .then(res => res.json())
//   .then(data => data)
//   .catch(error => {console.log("esto es error",error, {error})})
// }

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
          <div className="modal-header bg-dark rounded">
            <h5 className="modal-title text-white" id="createbeerModalLabel">
              Beer register form
            </h5>
            <button
              type="button"
              className="btn-close white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body color-back">
{/* FORM */}
{/* Para prevenir el redireción del submit, establecí como target 
un iframe vacío dentro del propio modal que se cierra automaticamente cuando 
se hace click por lo que no se ve la respuesta */}
            <form target="dummyframe" className="" method="POST" action="https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/beers" encType="multipart/form-data">
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Beer Name"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                required
                name="name"
              ></input>
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Smell"
                onChange={(e) => setAroma(e.target.value)}
                value={aroma}
                required
                name="smell"
              ></input>
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Alcohol"
                onChange={(e) => setAlcohol(e.target.value)}
                value={alcohol}
                required
                name="alcohol"
              ></input>
              <input
                className="m-2 p-1"
                type="text"
                placeholder="Owner / Company"
                onChange={(e) => setAutor(e.target.value)}
                value={autor}
                required
                name="company"
              ></input>
              <input
                className="ms-2 p-1"
                type="text"
                placeholder="Source"
                onChange={(e) => setSource(e.target.value)}
                value={source}
                name="source"
                required
              ></input>

              <select
                className="m-2 p-1"
                id="selectCategory"
                name="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                
              >
                {store.categories.length > 0 ? (
                  store.categories.map((elem, i) => {
                    return (
                      <option key={i} value={elem.id}>
                        {elem.name}
                      </option>
                    );
                  })
                ) : (
                  <option>Loading...</option>
                )}
              </select>

              <textarea
                className="m-2 p-1 inputStyle"
                rows="4"
                cols="40"
                placeholder="Description"
                onChange={(e) => setDescrip(e.target.value)}
                value={descrip}
                name="description"
              ></textarea>
        
              <input
                className="m-2 p-1"
                type="file"
                // placeholder="url de tu imagen"
                name="file"
                onChange={(e) => setImagen(e.target.files[0])}
                // value={imagen}
                required
              ></input>
              <input 
              type="hidden"
              name="user_id"
              value={store.user_id} />
              <input
                type="submit"
                className="btn btn-dark"
                value="Submit"
                onClick={() => {
                  const modal = document.getElementById("createbeerModal")
						      const m = bootstrap.Modal.getInstance(modal)
						      m.hide()
                }}
              />
              
            </form>
            <iframe name="dummyframe" id="dummyframe"></iframe>
          </div>

          <div className="modal-footer color-back">
            <div className="modal-footer">
              {/* VALIDACIONES DE INPUTS

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
                className="btn btn-dark"
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
                  console.log(imagen);
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

                  //   store.myAuthFlag = true;
                }}
              >
                Submit
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
