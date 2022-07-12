import React, {useEffect, useContext, useState} from "react";
import { Context } from "./store/appContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import config from "./config.js"

import { Home } from "./pages/home";
import { Userpage } from "./pages/user_page";
import { About } from "./pages/aboutsUs";
import { Contact } from "./pages/contact";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Banner } from "./component/banner";
import { Bodybar } from "./component/bodybar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token")
    
        if(token){
          fetch(`${config.hostname}/api/validation`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
            }
          })
          .then(res => res.json())
          .then(data => {
            actions.setmyAuthFlag(true)
            setLoading(false)
          })
          .catch((e) => {
            console.log(e)
          })
          
        }
    
      },[])

      if(loading){
        return (
            <div className="spinner-border text-danger m-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
      }

    return (
        <div className="backgroundColor">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Banner />
                    {/* <Bodybar /> */}
                    
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Userpage />} path="/userpage" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
