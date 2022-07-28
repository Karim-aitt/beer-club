import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";

import { Navbar } from "../component/navbar";
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

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [smell, setSmell] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescrip] = useState("");
  const [category, setCategory] = useState("1");
  const [image, setImage] = useState();

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

  //POPOVER
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

  return (
    <>
      {/* {store.token != null ? */}
      <>
        <Navbar />
        <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
          <img className="img-fluid d-flex mx-auto" src={banner} />
        </div>
        <div className="d-flex flex-row justify-content-center px-0"></div>
        <div className="me-sm-3"></div>
        <div>
          {/* ZONA DE TITULO */}
          <h2 className="text-center my-3">Update your Beer</h2>
          <hr className="w-50 mx-auto mb-4"></hr>
        </div>
        <div className="container w-75 d-flex div-category-mini justify-content-center">
          <form
            id="updateForm"
            target="dummyframe"
            method="post"
            action={`https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/beers/update/${beer_id}`}
            encType="multipart/form-data"
            className="p-3 border rounded"
          >
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
          </form>

          <div
            className={`mt-3 w-75 alert alert-success alert-dismissible fade show ${alert}`}
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
        </div>

        {/* ------------------------------------------  DELETE BEER ----------------------------------------
-------------------------------------------------------------------- --------------------------------*/}

        <div>
          {/* ZONA DE TITULO */}
          <h2 className="text-center mt-5 mb-3">Delete your Beer</h2>
          <hr className="w-50 mx-auto mb-4"></hr>
        </div>

        <div className="container w-50 d-flex flex-column div-category-mini justify-content-center my-4">
          <div
            class="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <p className="mx-auto p-0 m-0">
              Caution, if you delete a beer it is not recuperable.
            </p>
          </div>
          <form className="p-3 border rounded" target="dummyframe">
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
          </form>
          <div
            className={`mt-3 alert alert-success alert-dismissible fade show ${alert_delete}`}
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
        </div>

        <iframe name="dummyframe" id="dummyframe"></iframe>
      </>
      {/* :
        <Navigate to="/" />} */}
    </>
  );
};

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
