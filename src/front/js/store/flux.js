import config from "../../js/config.js";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // myAuthFlag: false,
      token: null,
      nombre: "",
      nickname: "",
      userExist: false,
      emailExist: false,
      loginEmailPassMatch: false,
      categories: [],
      beerscategory: [],
      beers: [],
      users: [],
      user_id: 0,
      userVotes: false,
      userDataVotes: [],
      userpage_id: 1,

      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      //Esta funcion es para loguearte directamente si tienes un token en el navegador valido
      validate: () => {
        const tok = localStorage.getItem("token");

        if (tok != "" || tok != null) {
          fetch(`${config.hostname}/api/validation`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tok,
            },
          })
            .then((res) => {
              if (res.status == 200 || res.status == 201) {
                setStore({ token: tok });
                setStore({ userVotes: true });
                return res.json();
              } else {
                setStore({ token: null });
                return "Token no valido o expirado flux 50";
              }
            })
            .then((data) => {
              setStore({ user_id: data });
            })
            .catch((error) => {
              console.log(error);
              setStore({ token: null });
            });
        }
      },
      getUserpageId: (id) => {
        setStore({userpage_id: id})
      },
      getNickname: (id) => {
        fetch(`${config.hostname}/api/nickname/${id}`)
        .then(res => {return res.json()})
        .then(data => {setStore({nickname: data})})
        .catch(error => console.log("error en gitNickname", error))
        
      },

      // Consigue las categorias existentes en la DB al entrar en la web
      getCategories: async () => {
        const res = await fetch(`${config.hostname}/api/category`, {
          method: "GET",
        });

        const data = await res.json();
        await setStore({ categories: data });
      },

      //Esto se hace al cargar la página y recoge todas las beers de la DB y las almacena en global
      getBeers: async () => {
        const res = await fetch(`${config.hostname}/api/beers`, {
          method: "GET",
        });

        const data = await res.json();
        await setStore({ beers: data });
      },

      // Esto es usado en sincronizacion con el fetch utilizado en ___ para almacenar los votos de un usuario.
      saveUserDataVotes: (data) => {
        setStore({ userDataVotes: data });
      },

      getUsers: () => {
        fetch(`${config.hostname}/api/users`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => setStore({ users: data }))
          .catch((error) => {
            error;
          });
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ myAuthFlag: false });
      },

      setmyAuthFlag: (value) => {
        setStore({ myAuthFlag: value });
      },

      getVotes: () => {
        const token = localStorage.getItem("token");

        fetch(`${config.hostname}/api/vote`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            if (res.status == 200) {
              return res.json();
            }
          })
          .then((data) => {
            setStore({ userDataVotes: data });
          });
      },

      //EL SIGNUP retorna un token en forma de token con los datos del usuario nickname, email y pass dentro.
      signup: (nickname, name, surnames, email, password) => {
        fetch(`${config.hostname}/api/signup`, {
          method: "POST",
          body: JSON.stringify({ nickname, name, surnames, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              setStore({ userExist: false });
              setStore({ emailExist: false });
            } else if (res.status == 402) {
              setStore({ emailExist: true });
              setStore({ userExist: false });
            } else if (res.status == 403) {
              setStore({ userExist: true });
              setStore({ emailExist: false });
            }
            return res.json();
          })
          .then((data) => {
            if (
              data == "Ya existe este email" ||
              data == "Ya existe este nickname"
            ) {
              setStore({ token: null });
              alert(data);
            } else {
              localStorage.setItem("token", data);
              setStore({ token: data });
              setStore({ userVotes: true });
            }
          })
          .catch((error) => {
            alert("Error en el fetch - flux 162 saltó");
            setStore({ token: null });
            localStorage.removeItem("token");
            console.log(error, { error });
          });
      },

      login: (email, password) => {
        fetch(`${config.hostname}/api/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              setStore({ myAuthFlag: true });
              setStore({ loginEmailPassMatch: false });
            } else {
              setStore({ loginEmailPassMatch: true });
              return "Usuario o clave incorrectas";
            }
            return res.json();
          })
          .then((data) => {
            localStorage.setItem("token", data);
            setStore({ token: data });
            setStore({ userVotes: true }); //flagVotes
            getActions.getVotes();
          })
          .catch((error) => {
            error;
          });
      },

      // createbeer: (image, name, smell, category, source, alcohol, company, description) => {
      // 	let tokenRequired = localStorage.getItem("token")
      // 	console.log("esto es IMAGE", image)

      // 	fetch(`${config.hostname}/api/beers`, {
      // 		method: 'POST',
      // 		body: JSON.stringify({image, name, smell, category, source, alcohol, company, description}),
      // 		headers: {
      // 			'Content-Type': 'application/json',
      // 			'Authorization': "Bearer " + tokenRequired
      // 		}
      // 	})
      // 	.then(res => {
      // 		if(res.status == 200 || res.status == 201){
      // 			const modal = document.getElementById("createbeerModal")
      // 			const m = bootstrap.Modal.getInstance(modal)
      // 			m.hide()
      // 		} else (alert("Error en backend"))
      // 	})

      // },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
