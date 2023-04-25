import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './ContextProvider';
// import { updatedata } from './context/ContextProvider'




const Gestion = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    // const { udata, setUdata } = useContext(adddata);

    // const {updata, setUPdata} = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async () => {

        const res = await fetch("http://localhost:5000/api/serveur", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            // console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:5000/api/serveur/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");

            getdata();
        }

    }


    return (

        <>



            {/* <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div> */}
            <div className="tabaccount">
            <table class="table">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">id</th>
                        <th scope="col">firstName</th>
                        <th scope="col">cin</th>
                        <th scope="col">email</th>
                        <th scope="col">password</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        Object.entries(getuserdata).map((element, id) => {

                            return (
                                <>

                                    <tr>
                                        <th scope="row">{id + 1}</th>
                                        <td>{element[1].firstName}</td>
                                        <td>{element[1].cin}</td>
                                        <td>{element[1].email}</td>
                                        <td>{element[1].password}</td>
                                        <td className="d-flex justify-content-between">
                                            {/* <NavLink to={`view/${element[1]._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink> */}
                                            <NavLink to={`edit/${element[1]._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                            <button className="btn btn-danger" onClick={() => deleteuser(element[1]._id)}> delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
        {/* </div>
            </div> */}
        </>
    )
}

export default Gestion
