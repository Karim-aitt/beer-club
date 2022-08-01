import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Beerdetail } from "../component/Beer-detail.jsx";
import { CardCategoryMini } from "../component/Card-category-mini.jsx";

import "../../styles/home.css";
import "../../styles/settings.css";

import banner from "../../img/bannerWeb2.png";
import config from "../config";

export const Settings = () => {
  const { store, actions } = useContext(Context);
  const [userBeers, setUserBeers] = useState([]);
  const [beer_id, setBeer_id] = useState();
  const [beer_delete_id, setBeer_delete_id] = useState();

  //Beer update variables

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [smell, setSmell] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescrip] = useState("");
  const [category, setCategory] = useState("1");
  const [image, setImage] = useState();

  // Profile update variables

  const [website, setWebsite] = useState("");
  const [user_description, setUser_Description] = useState("");
  const [user_image, setUser_Image] = useState();

  //Para las alertas al hacer submit
  const [alert, setAlert] = useState("alert-set");
  const [alert_delete, setAlert_delete] = useState("alert-set");

  // Esto es para cargar las cervezas del usuario
  useEffect(() => {
    fetch(`${config.hostname}/api/beers/user/${store.userpage_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setUserBeers(data))
      .catch((error) => console.log({ error }));
  }, [store.beers]);

  // Esto es para que funcione el tooltip
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // --------------------------------------

  //Para que funcione un popover
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // const form = document.getElementById("updateForm")
  // const formData = new FormData();
  // const updateFetch = () => {
  //     // const formData = new FormData(form);
  //     // console.log(formData)
  //     formData.append("file", image)
  //     formData.append("name", name)
  //     formData.append("category", category)
  //     formData.append("smell", smell)
  //     formData.append("source", source)
  //     formData.append("alcohol", alcohol)
  //     formData.append("company", company)
  //     formData.append("description", description)

  //     fetch('https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/beers/update/${beer_id}', method)

  // }

  // const [data, setData] = useState({});

  // const handleChange = (event) => {
  //   setData({ ...data, [event.target.name]: event.target.value });
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("email", data.email);
  //   formData.append("file", data.file);

  //   let response = await fetch('URL', {
  //     method: 'PUT',
  //     body: formData,
  //     headers: {
  //       'Content-Type': 'multipart/form-data;'
  //     }
  //   })
  // };

  return (
    <>
      {store.token != null ? (
      <>
        <Navbar />
        <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
          <img className="img-fluid d-flex mx-auto" src={banner} />
        </div>

        {/* AQUI FORM PRUEBA
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleChange} />
            <input type="text" name="email" onChange={handleChange} />
            <input type="file" name="fichero" onChange={handleChange} />
            <button>Registrar</button>
          </form>
        </div> */}
        <div>
          {/* ZONA DE TITULO */}
          <h2 className="text-center my-3">Profile Settings</h2>
          <hr className="w-50 mx-auto mb-4"></hr>
        </div>
        <div className="container w-75 d-flex div-category-mini justify-content-center">
          <form
            target="dummyframe"
            method="post"
            action={`https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/profile/update`}
            encType="multipart/form-data"
            className="p-3 border rounded"
          >
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon3">
                www.website.com
              </span>
              <input
                className="form-control"
                aria-describedby="basic-addon3"
                name="website"
                type="text"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
                required
              ></input>
            </div>

            <div className="input-group my-3">
              <span className="input-group-text">Description</span>
              <textarea
                className="form-control"
                aria-label="Description"
                name="user_description"
                onChange={(e) => setUser_Description(e.target.value)} //setUser_Description
                value={user_description} //user_description
                required
              ></textarea>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupFile01">
                Profile image
              </label>
              <input
                type="file"
                name="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={(e) => setUser_Image(e.target.files[0])}
                required
              />
            </div>
            <input type="hidden" name="user_id" value={store.user_id}></input>

            <div className="text-center mt-4">
              <input
                type="submit"
                className="btn btn-dark px-5"
                value="Submit"
              ></input>
            </div>
          </form>
        </div>

        {/* ----------------------------- UPDATE BEER ----------------------------------------
  ---------------------------------------------------------------------------------*/}
        <div>
          {/* ZONA DE TITULO */}
          <h2 className="text-center my-3">Update or Delete your Beer</h2>
          <hr className="w-50 mx-auto mb-4"></hr>
        </div>

        <div className="container w-75 d-flex flex-row div-category-mini justify-content-center">
          <form
            id="updateForm"
            target="dummyframe"
            method="post"
            action={`https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/beers/update/${beer_id}`}
            encType="multipart/form-data"
            className="p-3 border rounded me-4"
          >
            <label className="text-center fw-bold">YOU MUST FILL ALL FIELDS</label>
            <input type="hidden" name="_method" value="put" />
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setBeer_id(e.target.value)}
            >
              <option value="0">Select your beer</option>
              {userBeers.length > 0 ? (
                userBeers.map((elem, i) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })
              ) : (
                <option>Loading...</option>
              )}
            </select>

            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon3">
                Beer name
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon3"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon3">
                Smell
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon3"
                name="smell"
                onChange={(e) => setSmell(e.target.value)}
                value={smell}
                required
              />
            </div>
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon3">
                Alcohol
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon3"
                name="alcohol"
                onChange={(e) => setAlcohol(e.target.value)}
                value={alcohol}
                required
              />
              <span className="input-group-text">ALC</span>
            </div>
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon3">
                Source / Origen
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon3"
                name="source"
                onChange={(e) => setSource(e.target.value)}
                value={source}
                required
              />
            </div>
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon3">
                Owner / Company
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon3"
                name="company"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                required
              />
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>Select category</option>
              {store.categories.length > 0 ? (
                store.categories.map((elem, i) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })
              ) : (
                <option>Loading...</option>
              )}
            </select>
            <div className="input-group my-3">
              <span className="input-group-text">Description</span>
              <textarea
                className="form-control"
                aria-label="Description"
                name="description"
                onChange={(e) => setDescrip(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupFile01">
                Beer image
              </label>
              <input
                type="file"
                name="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className="text-center mt-4">
              <input
                type="submit"
                className="btn btn-dark px-5"
                value="Submit"
                onClick={() => setAlert("")}
              ></input>
            </div>
            <div
              className={`mt-5 w-75 mx-auto alert alert-success alert-dismissible fade show ${alert}`}
              role="alert"
            >
              <strong>Beer updated!</strong>
              <button
                type="button"
                className="btn-close ms-3"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlert("alert-set")}
              ></button>
            </div>
          </form>

          {/* ----------------------   DELETE YOUR BEER ------------------------ */}

          <form
            className="p-3 border rounded max hex text-center ms-4"
            target="dummyframe"
          >
            <div
              className="alert alert-danger d-flex max align-items-center"
              role="alert"
            >
              <i className="fas fa-exclamation-triangle"></i>
              <p className="mx-auto p-0 m-0">
                <strong>CAUTION</strong>, if you delete a beer it is not
                recuperable.
              </p>
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setBeer_delete_id(e.target.value)}
              required
            >
              <option defaultValue={"Select your Beer"}>
                Select your beer
              </option>
              {userBeers.length > 0 ? (
                userBeers.map((elem, i) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })
              ) : (
                <option>There aren't beers</option>
              )}
            </select>
            <div className="text-center mt-4">
              <input
                className="btn btn-danger px-5"
                type="button"
                value="Delete"
                onClick={() => {
                  deleteFetch(beer_delete_id);
                  setAlert_delete("");
                }}
              ></input>
            </div>
            <div
              className={`mt-5 alert alert-success alert-dismissible fade show ${alert_delete}`}
              role="alert"
            >
              <strong>Beer deleted!</strong>
              <button
                type="button"
                className="btn-close ms-3"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlert_delete("alert-set")}
              ></button>
            </div>
          </form>
        </div>

        <iframe name="dummyframe" id="dummyframe"></iframe>
        <Footer></Footer>
      </>
       ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

// Esto es el Fetch que se hace al borrar una cerveza
const deleteFetch = (beer_delete_id) => {
  const tok = localStorage.getItem("token");
  if (beer_delete_id) {
    fetch(
      `https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/beers/${beer_delete_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tok,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data;
      })
      .catch((error) => console.log({ error }));
  }
};
