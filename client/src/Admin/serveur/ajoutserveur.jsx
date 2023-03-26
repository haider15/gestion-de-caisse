
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom"
import { useState } from "react";

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
			const url = "http://localhost:5000/api/users/register";
			console.log(data)
			const {data: res } = await axios.post(url, data);
			console.log(data);
			localStorage.setItem("token", res.data);
			navigate.push('/login');
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

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="text"
							placeholder="firstName"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="lastName"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
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
							placeholder="password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Ajoutserveur;
