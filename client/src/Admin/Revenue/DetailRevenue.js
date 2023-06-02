import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import Popup from "reactjs-popup";
import { FiXCircle } from 'react-icons/fi';
import { FcOk } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DetailOrder from './DetailOrder';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
const contentStyle = {
    height: "70%",
    width: "50%",
  };
export default function DetailRevenue(props) {
    const ConfirmOrder = (order => {   
        const getData = async (order) => {  
            console.log(order._id)
            await axios.post("http://localhost:5000/revenue/confirm", {idd: order._id}).then((response) => {
                // setproduct(response.data)
                console.log(response.data);
            });
        }  
       getData(order);
    })
    const refreshPage = () => {
        window.location.reload(false);
    }
    const navigate = useHistory()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate.push('/login')
    }
  }, []);
    return (

            <Popup
                trigger={
                    <Container fluid>
                    <Row className="elementlist">
                    {/* <Col > <h2 className="element">{props.order._id}</h2></Col> */}
                        <Col > <h2 className="element">{props.order.userName}</h2></Col>
                       
                        <Col > <h2 className="element">{props.order.usingMethod}</h2></Col>
                        <Col > <h2 className="element">{props.order.totalPrice.toLocaleString()}.000 TND</h2></Col>
                        <Col > <h2 className="element">{props.order.paidAt}</h2></Col>

                        <Col > <h2 className="element">
                            {props.order.isPaid ?<AiOutlineCloseCircle size={20} color="red"/>  :<FcOk  className="iconRevenue" size={20} color="green"/> }</h2>
                        </Col>

                    </Row>
                    </Container>
                }
                modal
                contentStyle = {contentStyle}
                >
                {close => (
                    <div className="modal">
                        <div className="header">
                        Compte: {props.order.userName }
                        </div>
                        <a className="close" onClick={close} href><FiXCircle size={20}/></a>
                        <div className="content">
                            <div className="OrderPopUp">
                                <i onClick={refreshPage}>
                                    <i onClick={close}>
                                        {!props.order.isPaid && <button 
                                            className="buttonConfirm" 
                                            onClick={() => ConfirmOrder(props.order)}
                                            >
                                           annuler
                                        </button>}
                                    </i>
                                </i>
                                <DetailOrder order={props.order}/>
                            </div>
                        </div>
                    </div>
                )}
            </Popup> 
    )
}


