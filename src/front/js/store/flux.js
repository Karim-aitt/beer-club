import config from "../../js/config.js"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			myAuthFlag: false,
			token: "",
			nombre: "",
			userExist: false,
			emailExist: false,
			loginEmailPassMatch: false,
			categories: [],
			beers: [],
			userVotes: false,
			userDataVotes: [],
		
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			firstLoadToken: () => {
				const tok = localStorage.getItem('token')
				if(tok){
					setStore({token: tok})
					setStore({userVotes: true})
				}
			},

			saveUserDataVotes: (data) => {
				setStore({userDataVotes: data})
			},
			//EL SIGNUP retorna un token en forma de token con los datos del usuario nickname, email y pass dentro.
			signup: (nickname, name, surnames, email, password,) => {
				fetch(`${config.hostname}/api/signup`, {
					method: 'POST',
					body: JSON.stringify({nickname, name, surnames, email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if(res.status == 200 || res.status == 201){
						setStore({myAuthFlag: true})
						setStore({nombre: res.nickname})
						setStore({userExist: false})
						// setStore({auth: true})
					} 
					else if(res.status == 402){
						setStore({emailExist: true})
						setStore({userExist: false})
					
					}else if(res.status == 403){
						setStore({userExist: true})
						setStore({emailExist: false})
					}
					else if(res.status == 400 || res.status == 500){
						alert("Error raro del back")
					}
					return res.json
				})
				.then(data => {
					localStorage.setItem("token", data)
					setStore({token: data})
				})
				.catch((error) => {
					alert("Error en el fetch - flux 60 saltó")
				})
			},

			login: (email, password) => {
				fetch(`${config.hostname}/api/login`, {
					method: 'POST',
					body: JSON.stringify({email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if (res.status == 200 || res.status == 201){
						setStore({myAuthFlag: true})
						setStore({nombre: res.nickname})
						setStore({loginEmailPassMatch: false})
						

					} else {
						setStore({loginEmailPassMatch: true}) // Para validar en form loginModal linea: 56
						return "Usuario o clave incorrectas"
					}
					return res.json()
				})
				.then(data => {
					localStorage.setItem("token", data)
					setStore({token: data})
					setStore({userVotes: true})
					
					
					const modal = document.getElementById("loginModal")
					const m = bootstrap.Modal.getInstance(modal)
					m.hide()
					
					
				})
			},

			getCategories: async () => {
				const res = await fetch(`${config.hostname}/api/category`, {
					method: 'GET'
				})

				const data = await res.json();
				await setStore({categories: data})
			},

			createbeer: (image, name, smell, category, source, alcohol, company, description) => {
				let tokenRequired = localStorage.getItem("token")

				fetch(`${config.hostname}/api/beers`, {
					method: 'POST',
					body: JSON.stringify({image, name, smell, category, source, alcohol, company, description}),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + tokenRequired
					}
				})
				.then(res => {
					if(res.status == 200 || res.status == 201){
						const modal = document.getElementById("createbeerModal")
						const m = bootstrap.Modal.getInstance(modal)
						m.hide()
					} else (alert("Error en backend"))
				})

			},

			logout: () => {
				localStorage.removeItem('token')
				setStore({myAuthFlag: false})
			},

			getBeers: async () => {
				const res = await fetch(`${config.hostname}/api/beers`, {
					method: 'GET'
				})

				const data = await res.json();
				await setStore({beers: data})
			},

			

			setmyAuthFlag: (value) => {
				setStore({myAuthFlag: value})
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
			}
		}
	};
};

export default getState;
