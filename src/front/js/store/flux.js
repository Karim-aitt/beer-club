const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			token: "",
			nombre: null,
		
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
			signup: (nickname, name, surname, email, pass,) => {
				fetch("", {
					method: 'POST',
					body: JSON.stringify({nickname, name, surname, email, pass}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if(res.status == 200){
						setStore({auth: true})
						setStore({nombre: nickname})
					} 
					else {
						return "Algo fue mal en el back del signup"
					}
					return res.json
				})
				.then(data => {
					localStorage.setItem("token", data)
					setStore({token: data})
				})
			},

			login: (email, pass) => {
				fetch("", {
					method: 'POST', // POR QUE ES POST?
					body: JSON.stringify({email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if (res.status == 200){
						setStore({auth: true})
						
					} else {
						alert("Usuario o clave incorrectas")
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
