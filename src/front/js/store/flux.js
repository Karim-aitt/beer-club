const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			token: "",
			nombre: null,
			userExist: false,
			emailExist: false,
			loginEmailPassMatch: false,
		
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
			//EL SIGNUP retorna un token en forma de token con los datos del usuario nickname, email y pass dentro.
			signup: (nickname, name, surnames, email, password,) => {
				fetch("https://3001-4geeksacade-reactflaskh-v55n8uemtu2.ws-eu52.gitpod.io/api/signup", {
					method: 'POST',
					body: JSON.stringify({nickname, name, surnames, email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if(res.status == 200 || res.status == 201){
						setStore({auth: true})
						setStore({nombre: nickname})
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
					return res.json
				})
				.then(data => {
					// localStorage.setItem("token", data)
					// setStore({token: data})
				})
				.catch((error) => {
					if(error == "Ya existe ese email"){
						alert("Ya existe este email")
					} else {alert("Ya existe ese Nickname")}
				})
			},

			login: (email, password) => {
				fetch("", {
					method: 'POST', // POR QUE ES POST?
					body: JSON.stringify({email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if (res.status == 200 || res.status == 201){
						// setStore({auth: true})
						setStore({nombre: nickname})
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
				})
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
