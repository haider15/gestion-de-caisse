import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import MethodModal from "./Modal/Modal";
import { Link, useLocation, useHistory } from "react-router-dom";
import Cartreview from "./CartReview/Cartreview";
import axios from "axios";
import "./index.css";
import {useParams} from 'react-router-dom';
const Payment = () => {
  const [ModalOpened, setModalOpened] = useState(true);
  const [usingMethod, setusingMethod] = useState(null);

  const [state, setState] = useState(1);
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [nameerror, setnameerror] = useState(false);
  const [tableerror, settableerror] = useState(false);
  const [addresserror, setaddresserror] = useState(false);
  const [numbererror, setnumbererror] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { cartcontext } = location.state;

  let total = 0;
  let quantity=0;
  // eslint-disable-next-line array-callback-return
  cartcontext.map((cartItem, index) => {
    total = total + cartItem.price * cartItem.quantity;
    quantity=total/cartItem.price
  });
  
  

  let ordername = name;
  let orderusingMethod = usingMethod;
  let ListItems = [];
  cartcontext.forEach(function (a) {
    if (!this[a.name]) {
      this[a.name] = {
        name: a.name,
        quantity: a.quantity,
        price: a.price,
        img: a.img,
      };
      ListItems.push(this[a.name]);
    }
  }, Object.create(null));
  const setMethod = (value) => {
    setusingMethod(value);
    setModalOpened(false);
  };
  const handlenameChange = (event) => {
    if (!event.target.value) {
      setnameerror(true);
    } else {
      setnameerror(false);
      setName(event.target.value);
    }
  };
  const handletableChange = (event) => {
    if (!event.target.value) {
      settableerror(true);
    } else {
      settableerror(false);
      setTable(event.target.value);
    }
  };
  const handleaddressChange = (event) => {
    if (!event.target.value) {
      setaddresserror(true);
    } else {
      setaddresserror(false);
      setAddress(event.target.value);
    }
  };
  const handlenumberChange = (event) => {
    if (!event.target.value) {
      setnumbererror(true);
    } else {
      setnumbererror(false);
      setNumber(event.target.value);
    }
  };

  const updateState = () => {
    if (usingMethod === "Directly") {
      if (name === "" || table === "" || table === "Select the table") {
        if (name === "") setnameerror(true);
        if (table === "") settableerror(true);
        if (table === "Select the table") settableerror(true);
      } else {
        setState(state + 1);
      }
    } else if (usingMethod === "Online") {
      if (name === "" || address === "" || number === "") {
        if (name === "") setnameerror(true);
        if (address === "") setaddresserror(true);
        if (number === "") setnumbererror(true);
      } else {
        setState(state + 1);
      }
    }
  };
  const backState = () => {
    setState(state - 1);
  };
  const { id } = useParams();




  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      // userName: ordername,
      // usingMethod: orderusingMethod,
      // totalPrice: total,
      OrderItems: ListItems,
      // quantity: quantity
    };
    console.log("vcc", data);
    // console.log(quantity)
    try {
      await axios
        .post(`http://localhost:5000/api/orders/`, {
          userName: ordername,
          usingMethod: orderusingMethod,
          totalPrice: total,
          OrderItems: ListItems,
          // quantity:quantity,
        })
          // .post(`http://localhost:5000/api/produit/:prouductid`, {
          //     OrderItems: ListItems, 
          // })
        .then((res) => {
          // history.push("/");
          console.log("resultat",res.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
////////////////////

// const handleSubmit14 = async (event) => {
//     event.preventDefault();
   

  
//     const data = {
//       quantity: quantity
//     };
//     console.log("vcc", data);
//     console.log(quantity)
//     try {
//       await axios
        
//         .post(`http://localhost:5000/api/product/`+id, {
//           quantity: quantity,
//         })
//         .then((res) => {
//           // history.push("/");
//           console.log(res.data);
//         })
//         .catch((error) => console.log(error));
//     } catch (error) {
//       console.log(error);
//     }
//   };
  //////////////////
  return (
    <div>
      {ModalOpened ? (
        <MethodModal isOpened={ModalOpened} onChooseMethod={setMethod} />
      ) : usingMethod === "Directly" && state === 1 ? (
        <Form className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Chèque de paiement</h3>
              <p>Remplissez les données ci-dessous.</p>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  onChange={handlenameChange}
                  type="text"
                  placeholder="table A"
                  value={name}
                />
                {nameerror ? (
                  <div className="invalid-feedback">
                   ce champ ne peut pas être vide
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Nombre de tables</Form.Label>
                <Form.Control
                  as="select"
                  value={table}
                  onChange={handletableChange}
                >
                  <option>Sélectionnez le table</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                </Form.Control>
                {tableerror ? (
                  <div className="invalid-feedback">
                   ce champ ne peut pas être vide
                  </div>
                ) : null}
              </Form.Group>
              <div className="buttons-list">
                <Link to="/">
                  <Button className="secondary">Retour à la boutique</Button>
                </Link>
                <Button className="primary" onClick={updateState}>
                Suivant
                </Button>
              </div>
            </div>
          </div>
        </Form>
      ) : usingMethod === "Online" && state === 1 ? (
        <Form className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Chèque de paiement</h3>
              <p>Remplissez les données ci-dessous.</p>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  onChange={handlenameChange}
                  type="text"
                  placeholder="table A"
                  value={name}
                />
                {nameerror ? (
                  <div className="invalid-feedback">
                    ce champ ne peut pas être vide
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  onChange={handleaddressChange}
                  type="text"
                  placeholder="165 Baker Street"
                  value={address}
                />
                {addresserror ? (
                  <div className="invalid-feedback">
                  ce champ ne peut pas être vide
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea2">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control
                  onChange={handlenumberChange}
                  type="text"
                  placeholder="0123456789"
                  value={number}
                />
                {numbererror ? (
                  <div className="invalid-feedback">
                    ce champ ne peut pas être vide
                  </div>
                ) : null}
              </Form.Group>
              <div className="buttons-list">
                <Link to="/">
                  <Button className="secondary">Retour à la boutique</Button>
                </Link>
                <Button className="primary" onClick={updateState}>
                Suivant
                </Button>
              </div>
            </div>
          </div>
        </Form>
      ) : state === 2 ? (
        <Form className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Vérifiez votre panier</h3>
              <p>Vérifiez tous les produits ci-dessous.</p>
              <ul className="payment-cart-list">
                {cartcontext.map((cartItem, index) => {
                  return (
                    <Cartreview
                      className="payment-cart-item"
                      item={cartItem}
                      index={index}
                    />
                  );
                })}
              </ul>
              <div className="payment-total-price">
              Prix ​​total: {total} .000 D
              </div>
              <div className="buttons-list">
                <Button className="secondary" onClick={backState}>
                 Retour
                </Button>
                <Button className="primary" onClick={updateState}>
                Suivant
                </Button>
              </div>
            </div>
          </div>
        </Form>
      ) : state === 3 ? (
        <Form className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Vérifiez votre commande</h3>
              <p>Vérifiez toutes les informations que vous avez remplies .</p>
              {usingMethod === "Directly" ? (
                <div>
                  <div className="payment-review">
                    <strong>Nom du client:</strong>
                    <span>{name}</span>
                  </div>
                  <div className="payment-review">
                    <strong>Numéro de table:</strong>
                    <span>{table}</span>
                  </div>
                  <div className="payment-review">
                    <strong>Les commandes:</strong>
                    <ul className="payment-cart-list">
                      {cartcontext.map((cartItem, index) => {
                        return (
                          <Cartreview
                            className="payment-cart-item"
                            item={cartItem}
                            index={index}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : usingMethod === "Online" ? (
                <div>
                  <div className="payment-review">
                    <strong>Nom du client:</strong>
                    <span>{name}</span>
                  </div>
                  <div className="payment-review">
                    <strong>Adresse:</strong>
                    <span>{address}</span>
                  </div>
                  <div className="payment-review">
                    <strong>Numéro de téléphone:</strong>
                    <span>{number}</span>
                  </div>
                  <div className="payment-review">
                    <strong>les commandes:</strong>
                    <ul className="payment-cart-list">
                      {cartcontext.map((cartItem, index) => {
                        return (
                          <Cartreview
                            className="payment-cart-item"
                            item={cartItem}
                            index={index}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : null}
              <div className="payment-total-price">
              Prix ​​total: {total} .000 D
              </div>
              <div className="buttons-list">
                <Button className="secondary" onClick={backState}>
                  Retour
                </Button>
                <Button className="primary" onClick={handleSubmit}>
                  passer
                </Button>
              </div>
            </div>
          </div>
        </Form>
      ) : null}
    </div>
  );
};

export default Payment;
