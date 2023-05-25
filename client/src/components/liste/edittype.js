import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from '../gestion/ContextProvider'
import ButtonUpload from '../../Admin/ButtonUpload';

const Edittype = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

    const [inpval, setINP] = useState({
        name: "",
        img: "",
       
       
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

        const res = await fetch(`http://localhost:5000/api/liste/${id}`, {
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

        const {name,img} = inpval;


        const res2 = await fetch(`http://localhost:5000/api/liste/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,img
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/nav/type")
            // setUPdata(data2);   
        
        }

    }

    return (
        <div className="container">
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="imgHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">img</label>
                        <input type="img" value={inpval.img} onChange={setdata} name="img" class="form-control" id="exampleInputPassword1" />
                       
                    </div>
                    <ButtonUpload
                 
                    text="Choisissez une photo"
                  src={inpval.img}
                  onChange={setdata} 
                  name="img"
                />
                   
                

                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edittype;