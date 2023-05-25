
import React, { useState, useEffect, useContext } from 'react'
import CreateIcon from '@mui/icons-material/Create';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { deldata } from '../gestion/ContextProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonUpload from '../../Admin/ButtonUpload';
import './liste.css';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AddType from '../../Admin/ListProducts/AddType';

function Liste() {
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    // const { udata, setUdata } = useContext(adddata);

    // const {updata, setUPdata} = useContext(updatedata);

    // const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async () => {

        const res = await fetch("http://localhost:5000/api/liste/", {
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
    function addtype() {
        <AddType />
      }
    

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

       

       
        swal({
            title: "Etes-vous sûr?",
            text: "Tous les produits liées seront aussi supprimer",
            icon: "warning",
            buttons: ["annule ","supprimer"],
            dangerMode: true,
          }).then((will) => {
            if ( will) {
                const res2 =  fetch(`http://localhost:5000/api/liste/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
           
            
              window.location.reload(false);
        } 
          });
        

    }
    

    return (
        <>



            {/* <div className="mt-5">
        <div className="container">
            <div className="add_btn mt-2 mb-2">
                <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
            </div> */}
            {/* <div className="panel-content"> */}
            <div className='grid'>
                <div className='iconManager'><h2>   La gestion Les Familles de Produit  </h2></div> </div>
                <Link to="ajoutf"> ajout </Link>
            <div className="listProducts-content">
                <table className="listProducts-content-table">
                    <thead className="tbody-nth">
                        <tr className="listProducts-content-row-heading-table">
                            <th scope="col" className="listProducts-content-row-heading">id</th>
                            <th scope="col" className="listProducts-content-row-heading">Nom de La Famille</th>
                            <th scope="col" className="listProducts-content-row-heading">Image</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Object.entries(getuserdata).map((element, id) => {
                                if(id!=0){
                                return (
                                    <>

                                        <tr>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element[1].name}</td>
                                           <td> <img src={element[1].img} alt="" className="listProducts-content-row-item-img" /></td>


                                            <td className="d-flex justify-content-between">
                                                {/* <NavLink to={`view/${element[1]._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink> */}
                                                <NavLink to={`edite/${element[1]._id}`}>  <button className="edit"><CreateIcon color='red' /></button></NavLink>
                                                <button className="btn btn-danger" onClick={() => deleteuser(element[1]._id)}> <DeleteIcon className='delete' /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                                 }
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
export default Liste
