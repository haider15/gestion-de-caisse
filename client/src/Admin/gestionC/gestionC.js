import React, { useState } from 'react';
import './index.css'
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
    const renderSwitch = (search, current) => {
        switch (search) {
            case 2:
                return result.filter(data => data.usingMethod.includes(current)).map(order => (
                    <DetailRevenue order={order} />
                ))
            case 3:
                return result.filter(data => data.totalPrice > (current)).map(order => (
                    <DetailRevenue order={order} />
                ))
            default:
                return result.filter(data => data.userName.includes(current)).map(order => (
                    <DetailRevenue order={order} />
                ))
        }
    }
    const choices = [
        {
            id: 1,
            name: "Commandeur"
        },
        {
            id: 2,
            name: "Former"
        },
        {
            id: 3,
            name: "Prix ​​unitaire"
        }
    ]

    const [Orders, setOrder] = React.useState([]);

    const [show, setshow] = useState(false);
    const [current, setCurrent] = React.useState("");
    const [checked, setChecked] = React.useState(-1);
    const hasTransitionedIn = useMountTransition(show, 1000);
    // const getdata = async () => {

    //     const res = await fetch(`http://localhost:5000/api/revenu/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });

    //     const data = await res.json();
    //     console.log("ma data",data);
    // }

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
                            <h2><BiRestaurant className="iconManager" />   La gestion des Recette </h2>
                        </Col>
                        <Col lg={3}>
                            {" "}
                            {/* <SearchAccount /> */}
                        </Col>
                    </Row>
                </Container>
            </div>

            {(hasTransitionedIn || show) && <div className="tableChoice">
                {choices.map(choice => (
                    <i className={`choice ${hasTransitionedIn && "in"} ${show && "visible"}`} key={choice.id}>
                        <input
                            type="radio"
                            onChange={() => setChecked(choice.id)}
                            checked={choice.id === checked}
                        />
                        {choice.name}
                    </i>
                ))}
            </div>}
            <form className="searchAccount" action="/" method="get">
                {(hasTransitionedIn || show) && <input
                    className={`formSearch ${hasTransitionedIn && "in"} ${show && "visible"}`}
                    value={current}
                    type="text"
                    id="header-search"
                    onChange={e => setCurrent(e.target.value)}
                    name="seachAccount"
                />}
                {<div className="searchButton" onClick={() => setshow(!show)}><FaSearch size={25} className="searchIcon" /></div>}
                {/* {show && <button className="searchButton" onClick={() => setshow(true)}><FaSearch size={25} className="searchIcon" /></button>} */}
            </form>
            <div className="tabaccount">
                <div>
                    <Container className="showlist" fluid>
                        <Row>
                            <Col > <h2 className="columlist">Commandeur</h2></Col>

                            <Col > <h2 className="columlist">caisse</h2></Col>
                        </Row>
                    </Container>
                    <Container className="contentlist_Revenue" fluid>
                    {keys.map(key => (
                                <div key={key}>
                        <Row>
                        
                                    
                              
                            <Col > <h2 className=""> {key} </h2></Col>

                            <Col > <h2 className=""> {namePriceSums[key]}</h2></Col>
                           
                            
                        </Row>
                        </div>
                        ))}

                    </Container>
                    <div className="">
                        <div>
                          
                        </div>
                    
                </div>
                <div className="Total">revenu total: {
                        Orders.reduce((sum, i) => (
                            sum = (sum + i.totalPrice) - (i.isPaid ? i.totalPrice : 0)
                        ), 0).toLocaleString()
                    }.0 D</div>

               

            </div>
        </div >
        </>
    )
}