
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom"
import { useState ,useEffect} from "react";

const Ajoutserveur = () => {
	const [data, setData] = useState({ firstName: "", lastName: "", email:"",password:"" });
	const [error, setError] = useState("");
	const  navigate = useHistory()
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/serveur/";
			console.log(data)
			const {data: res } = await axios.post(url, data);
			console.log(data);
			localStorage.setItem("token", res.data);
			navigate.push('/nav/ges');
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	
	useEffect(() => {
	  if (!localStorage.getItem('token')) {
		navigate.push('/loginser')
	  }
	}, []);

	// function nbr(){
	// 	String  ch="0123456789"
	// 	for (let i = 0; i<ch.length; i++){
	// 		if(data.cin[1]!=ch){
	// 			alert("errrrrrrrrrrror")
	// 		}
	// 	  }
	// }
	return (
		

		
		<div className={styles.login_container}>
			
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Creer un nouveau serveur </h1>
						<input
							type="text"
							placeholder="nom et prenom"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							require 
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="cin"
							name="cin"
							onChange={handleChange}
							value={data.cin}
							required
							className={styles.input}
						/>

<input
							type="email"
							placeholder="email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="mot passe"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Ajouter Serveur
						</button>
					</form>
				</div>
				<div className={styles.right}>
					
					{/* <Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link> */}
				</div>
			</div>
		</div>
	);
};

export default Ajoutserveur;
