import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './ContextProvider'
import styles from "./styles.module.css";


const Edit = (props) => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

    const [inpval, setINP] = useState({
        firstName: "",
        cin: "",
        email: "",
        password: "",
    
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        // console.log(e.target)
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }   


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:5000/api/serveur/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log("ma data",data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {firstName,cin,password,email} = inpval;


        const res2 = await fetch(`http://localhost:5000/api/serveur/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                firstName,cin,password,email
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/nav/ges")
            // setUPdata(data2);   
        
        }

    }

    return (
        <div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={updateuser}>
						<h1>Modification Serveur</h1>
						<input
							type="text"
							placeholder="nom et prenom"
							name="firstName"
							onChange={setdata}
							value={inpval.firstName}
							require 
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="cin"
							name="cin"
							onChange={setdata}
							value={inpval.cin}
							required
							className={styles.input}
						/>

<input
							type="email"
							placeholder="email"
							name="email"
							onChange={setdata}
							value={inpval.email}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="mot passe"
							name="password"
							onChange={setdata}
							value={inpval.password}
							required
							className={styles.input}
						/>
                            {/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Modification
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

export default Edit;