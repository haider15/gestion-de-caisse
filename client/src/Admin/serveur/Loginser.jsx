import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom"
import Payment from "../../components/Payment/Payment";
const Loginser = (props) => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const  navigate = useHistory()
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	
	// const email=props;
	 const  email1=data.email
	 
	//  const blog=props.email1
	
	// // console.log("blog",blog)
	// const keys = Object.keys(email1)
	// console.log(keys)
	// ///////////////////
	// {keys.map(key => (
	// 	<div key={key}>
	// 		console.log({key})
	// 		<li>{email1[key]}</li>
	// 		</div>
                        // ))}
	///////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/serveur/login";
			console.log(data)
			const {data: res } = await axios.post(url, data);
			console.log(data);
			const firstName=res.user.firstName
			console.log(firstName)
			localStorage.setItem("firstName",JSON.stringify(firstName) );
			localStorage.setItem("token",JSON.stringify(res.data) );
			navigate.push('/');
		
		} catch (error) {
			if (
				
				error.response.status >= 404
				
			) {
				setError(" email invalidé ");
			}
			if (
				error.response &&
				
				error.response.status <= 400
			) {
				setError("mot  passe invalidé ");
			}
		}
	};
	// <Payment email1={props.email1} />

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Authentification</h1>
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
							placeholder="Mot Passe"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Connecter
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>admin :</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Changer
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Loginser;
