import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";

import { CardCategory } from "../component/Card-category.jsx";
import { CardDetail } from "../component/Card-detail.jsx";
import { EventCard } from "../component/Card-events.jsx";
import { CreateEvent } from "../component/CreateEvent.jsx";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";


import "../../styles/home.css";
import banner from "../../img/bannerWeb2.png";

import config from "../config";

export const Home = () => {
  const { store, actions } = useContext(Context);

  //Search term
  const [searchTerm, setSearchTerm] = useState("");
  //API results
  const [results, setResults] = useState([]);
  //Searching status (pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  //Refresco de cervezas y categorias
  useEffect(() => {
    actions.getBeers();
    actions.getCategories();
    actions.getUsers();
    actions.validate();
    actions.getVotes();
  }, []);

  // Effect for API call in Search "Engine"
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      {store.token != null ? (
        <>
          <Navbar />
          <div className="container-fluid mx-0 px-0 banner-container shadow-lg">
            <img className="img-fluid d-flex mx-auto" src={banner} />
          </div>
          <div className="d-flex flex-row justify-content-center px-0">
            <div className="me-sm-3 py-2 custom-container">
              {/* AQUI SE GENERAN TODAS LAS CARDS PRINCIPALES Y LA CARD RESULTANTE DE LA BUSQUEDA*/}
              {/* CARD RESULTANTE DE LA BUSQUEDA */}
              {results.length > 0 ? (
                results.map((result, i) => {
                  let cat_name1 = "";

                  const getNameCategory = (id) => {
                    for (let i = 0; i < store.categories.length; i++) {
                      if (store.categories[i].id == id) {
                        cat_name1 = store.categories[i].name;
                      }
                    }
                  };
                  getNameCategory(result.category_id);

                  return (
                    <div key={i} className="bounce-in-top rounded">
                      <CardDetail
                        databeer={result}
                        beer_id={result.id}
                        name={result.name}
                        type={cat_name1}
                        alcohol={result.alcohol}
                        company={result.company}
                        img={result.image}
                        descrip={result.description}
                      />
                    </div>
                  );
                })
              ) : (
                // TODAS LAS CARDS
                <div className="d-flex flex-wrap justify-content-center">
                  {store.beers.length > 0 ? (
                    store.beers.map((elem, i) => {
                      let cat_name2 = "";

                      const getNameCategory = (id) => {
                        for (let i = 0; i < store.categories.length; i++) {
                          if (store.categories[i].id == id) {
                            cat_name2 = store.categories[i].name;
                          }
                        }
                      };
                      getNameCategory(elem.category_id);

                      return (
                        <CardDetail
                          databeer={elem}
                          key={i}
                          beer_id={elem.id}
                          name={elem.name}
                          type={cat_name2}
                          alcohol={elem.alcohol}
                          company={elem.company}
                          img={elem.image}
                          descrip={elem.description}
                        />
                      );
                    })
                  ) : (
                    <div
                      className="spinner-border text-danger m-auto"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="d-none d-md-block mt-5 ">
              <div className="sticky-top py-2">
                {/* ESTO ES EL DIV DONDE SE GENERAN TODAS LAS CARDS DE CATEGORIAS */}
                <form
                  className="mb-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control me-2 border-dark text-dark "
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>

                <div className="d-none d-md-block mes me-auto borde back-color">
                  <div className="mes-header fw-bold text-center bg-dark">
                    <p className="py-2 px-2 text-white">Categories</p>
                  </div>
                  <CardCategory />
                </div>

                {/* EVENTOS */}

                <div className="d-none d-md-block mes me-auto borde back-color my-3">
                  <div className="mes-header fw-bold text-center bg-dark">
                    <p className="py-2 px-2 text-white">Events</p>
                  </div>
                  {/* BOTON DE CREAR UN EVENTO */}
                  
                  {/* LISTA DE EVENTOS */}
                  <EventCard />
                </div>

                <div className="d-flex justify-content-evenly m-2">
                  <a
                    className="fab fa-instagram fs-3 decor-link"
                    aria-current="page"
                    href="https://www.instagram.com"
                  />
                  <a
                    className="fab fa-twitter fs-3 decor-link"
                    aria-current="page"
                    href="https://www.twitter.com"
                  />
                </div>
                <p className="text-secondary text-center">© 2022 BEER CLUB</p>
              </div>
              <button
                    to="#"
                    aria-current="page"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#createEventModal"
                    className="btn btn-success d-flex text-center mx-auto my-2"
                  >
                    Add Event
                  </button>
                  <CreateEvent />
            </div>
            
          </div>
          
          {/* COLOCAR DEBAJO DE CATEGORIAS */}
          <Footer />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

// ---------------------------------------------------------------------------------
// API search function

function searchCharacters(search) {
  return (
    fetch(`${config.hostname}/api/beers/${search}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => r)
      // r.data.results

      .catch((error) => {
        console.error(error);
        return [];
      })
  );
}

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
