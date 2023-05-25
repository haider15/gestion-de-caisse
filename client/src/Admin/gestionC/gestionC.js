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


export default function Typeproduit() {
    // const [Staffs, setStaff] = React.useState(null);
   


    const [Orders, setOrder] = React.useState([]);

   

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
    const namePriceSums = {};
    const data = Orders
   
    
    const filterDataByName = (paidAt) => {
        return data.filter((entry) => entry.paidAt === paidAt);
      };
    
      // Get all entries with the same name
      const filteredData = filterDataByName("25/05/2023");
      console.log("data please",filteredData)
    // Iterate over the data and calculate the price sums
    data.forEach(item => {
        const { userName, totalPrice } = item;
        if (namePriceSums.hasOwnProperty(userName)) {
            namePriceSums[userName] += totalPrice;
        } else {
            namePriceSums[userName] = totalPrice;
        }
    });

    // Output the name and corresponding price sums
    for (const userName in namePriceSums) {
        if (namePriceSums.hasOwnProperty(userName)) {
            //    console.log(namePriceSums)
        }
    }


 
    const keys = Object.keys(namePriceSums)




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



            <div className="tabaccount">
                <div>
                    <Container className="showlist" fluid>
                        <Row>
                            <Col > <h2 className="columlist">Commandeur</h2></Col>

                            <Col > <h2 className="columlist">Total Realiser</h2></Col>
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
                    <div className="">
                        <div>

                        </div>

                    </div>
                    <div className='container'>
                        <div className="Total">revenu total: {
                            Orders.reduce((sum, i) => (
                                sum = (sum + i.totalPrice) - (i.isPaid ? i.totalPrice : 0)
                                ), 0).toLocaleString()
                        } TND</div>

                        <div className="Total2">Annulation: {
                            Orders.reduce((sum, i) => (
                                sum +=i.isPaid ? i.totalPrice : 0
                            ), 0).toLocaleString()
                        } TND</div></div>
                    <div className="Total1"> a table: {
                        Orders.reduce((sum, i) => (

                            sum += i.usingMethod == "a table" ? i.totalPrice : 0
                        ), 0).toLocaleString()
                    } TND</div>
                    <div className="Total3"> a emporter: {
                        Orders.reduce((sum, i) => (

                            sum += i.usingMethod == "emporter" ? i.totalPrice : 0
                        ), 0).toLocaleString()
                    } TND</div>
                </div>
            </div >
        </>
    )
}