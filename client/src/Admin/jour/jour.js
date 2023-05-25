import React, { useState } from 'react';
import './indexg.css'
import { Container, Row, Col } from 'react-grid-system';
// import Popup from "reactjs-popup";

import DetailRevenue from "../Revenue/DetailOrder";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BiRestaurant } from "react-icons/bi";
import useMountTransition from "../Revenue/useMountTransition";
import { object } from 'joi';


export default function Jour() {
    // const [Staffs, setStaff] = React.useState(null);



    const [Orders, setOrder] = React.useState([]);
    const [name, setName] = useState(''); // State to store the entered name
    const [filteredData, setFilteredData] = useState([]);





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
    


    return (
        <>
            <div className="panel-content">
                <Container className="grid" fluid>
                    <Row>
                        <Col lg={9}>
                            {" "}
                            <BiRestaurant className="grid" /> <h2 className='text'>  La gestion des recette </h2>
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
                    placeholder="00/00/0000"
                />
                <button onClick={filterDataByName}>Filter</button>
            </div>


            <div className="tabaccount">
                <div>
                    <Container className="showlist" fluid>
                        <Row>
                            <Col > <h2 className="columlist">Commandeur</h2></Col>

                            <Col > <h2 className="columlist">Total Realiser</h2></Col>

                            <Col > <h2 className="columlist">Total Realiser</h2></Col>

                        </Row>
                    </Container>
                    <Container className="contentlist_Revenue" fluid>
                    {filteredData.length > 0 ? (
                                filteredData.map((entry) => (
                        <Row key={entry.id}>

                            
                                   
                                        <Col > <h2 className="columlist">{entry.userName}</h2></Col>
                                        <Col > <h2 className="columlist">{entry.totalPrice}</h2></Col>
                                        <Col > <h2 className="columlist">{entry.usingMethod}</h2></Col>

                                    
                              





                        </Row>
                        
                        ))
                        ) : (
                            <p>No data found</p>
                        )}
                    </Container>
                    
                                
                    <div className="Total1"> Total: {
                        filteredData.reduce((sum, i) => (

                            sum += i.totalPrice 
                        ), 0).toLocaleString()
                    } TND</div>
                    
                </div>
            </div >
        </>
    )
}