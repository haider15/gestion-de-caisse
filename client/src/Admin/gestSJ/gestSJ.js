import React, { useState } from 'react';

import { Container, Row, Col } from 'react-grid-system';
// import Popup from "reactjs-popup";

import DetailRevenue from "../Revenue/DetailOrder";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BiRestaurant } from "react-icons/bi";
import useMountTransition from "../Revenue/useMountTransition";
import { object } from 'joi';


export default function GestSJ() {
    // const [Staffs, setStaff] = React.useState(null);



    const [Orders, setOrder] = React.useState([]);
    const [name, setName] = useState(''); // State to store the entered name
    const [filteredData, setFilteredData] = useState([]);
    const namePriceSums = {};
    




    React.useEffect(() => {
        axios.get("http://localhost:5000/revenue/order").then((response) => {
            setOrder(response.data);
            console.log(response.data);
        });
    }, []);
    if (!Orders) return null;
    let result = [...Orders];
    // if(result[1]) console.log("arayy",result[1].id);
    ////////////////////////////
    // Assuming you have fetched the data from the database and stored it in the 'data' variable

    // Initialize an empty object to hold the name and price sums

    const data = Orders

   
    const filterDataByName = () => {
        const filtered = data.filter((entry) => entry.paidAt === name);
        setFilteredData(filtered);
    };
    

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    console.log("filtre ",filteredData);
    
    filteredData.forEach(item => {
        const { userName, totalPrice } = item;
        if (namePriceSums.hasOwnProperty(userName)) {
            namePriceSums[userName] += totalPrice;
        } else {
            namePriceSums[userName] = totalPrice;
        }
    });

    const keys = Object.keys(namePriceSums)

    console.log("namespace",keys)
    return (
        <>
            <div className="panel-content">
                <Container className="grid" fluid>
                    <Row>
                        <Col lg={9}>
                            {" "}
                            <BiRestaurant className="grid" /> <h2 className='text'> Recette de serveur par jour </h2>
                        </Col>
                        <Col lg={3}>
                            {" "}
                            {/* <SearchAccount /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>


                <input 
                    type="text"
                    value={name}
                    onChange={handleInputChange}    
                    placeholder="JJ/MM/YYYY "
                />
                <button onClick={filterDataByName}>Chercher</button>
            </div>


            <div className="tabaccount">
                <div>
                    <Container className="showlist" fluid>
                        <Row>
                        {/* <Col > <h2 className="columlist">id</h2></Col> */}
                            <Col > <h2 className="columlist">Serveur</h2></Col>

                           

                            
                            <Col > <h2 className="columlist">Prix Realiser </h2></Col>

                        </Row>
                    </Container>
                    <Container className="contentlist_Revenue" fluid>
                        {keys.map(key => (
                            <div key={key}>
                                <Row>

                                    <Col > <h2 className=""> {key} </h2></Col>

                                    <Col > <h2 className=""> {namePriceSums[key]} TND</h2></Col>


                                </Row>
                            </div>
                        ))}

                    </Container>
                    
                    
                                
                    <div className='container'>
                        <div className="Total">revenu total: {
                            filteredData.reduce((sum, i) => (
                                sum = (sum + i.totalPrice) - (i.isPaid ? i.totalPrice : 0)
                                ), 0).toLocaleString()
                        } TND</div>

                        <div className="Total2">Annulation: {
                            filteredData.reduce((sum, i) => (
                                sum +=i.isPaid ? i.totalPrice : 0
                            ), 0).toLocaleString()
                        } TND</div></div>
                    <div className="Total1"> a table: {
                        filteredData.reduce((sum, i) => (

                            sum += i.usingMethod == "a table" ? i.totalPrice : 0
                        ), 0).toLocaleString()
                    } TND</div>
                    <div className="Total3"> a emporter: {
                        filteredData.reduce((sum, i) => (

                            sum += i.usingMethod == "emporter" ? i.totalPrice : 0
                        ), 0).toLocaleString()
                    } TND</div>
                </div>
            </div >
        </>
    )
}