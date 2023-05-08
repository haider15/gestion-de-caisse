import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { adminContext } from "../AdminContext";
import swal from "sweetalert";
import Modal from "react-modal";
import { customStyles } from "./SingleProduct";
import ButtonUpload from "../ButtonUpload";
import { useHistory } from "react-router-dom"
import CIcon from '@coreui/icons-react';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import './add.css'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
const AddModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;
  const navigate = useHistory()

  ///////////////////////////////////////



  ///////////////////////////////////////
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#333";
  }
  function closeModal() {
    setIsOpen(false);
  }

  function logout() {
    localStorage.clear();
    navigate.push('/login');
  }



  ///////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //////////////////
  const { typeProducts, addProduct } = useContext(adminContext);
  // const fileInput = React.createRef();
  const [newProduct, setNewProduct] = useState({
    name: "",
    catelory: "",
    price: 0,
    description: "",
    img: "",
    count: 0,
  });
  const { name, catelory, price, description, img, count } = newProduct;
  const onChangeInputProduct = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeAva = (e) => {
    // console.log(fileInput.current.files[0].name);
    setNewProduct({
      ...newProduct,
      img: e.target.files[0],
    });
  };
  // console.log(newProduct);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      newProduct.img === "" ||
      newProduct.name === "" ||
      newProduct.catelory === "" ||
      newProduct.description === "" ||
      newProduct.price === 0 ||
      newProduct.count === 0
    ) {
      swal(
        "Remplissez-le correctement",
        "Vous devez remplir les informations complètement ou correctement",
        "warning"
      );

      return;
    }

    const data = new FormData();
    data.append("img", newProduct.img);
    data.append("name", newProduct.name);
    data.append("catelory", newProduct.catelory);
    data.append("price", newProduct.price);
    data.append("description", newProduct.description);
    data.append("count", newProduct.count);

    // const productAdd = {
    //   ...newProduct,
    // };
    console.log(newProduct);
    addProduct(data);
    closeModal();
    swal(
      "success",
      "le plat est ajouter",
      "success"
    );
    window.location.reload(true)
    // axios
    //   .post("http://localhost:5000/api/product", newProduct)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // axios.post("http://localhost:3000/")
  };
  return (
    <><div className="add" onClick={openModal}>
      <AddIcon />ajout des plat </div>

      <div className="add2">

        <PersonPinIcon></PersonPinIcon>
        {/* <text>dem!</text> */}
      </div>
      <div className="add1">
        <CircleNotificationsIcon></CircleNotificationsIcon>

      </div>

      <div  className="point">
        <IconButton 

          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{

          }}
        >

          <MenuItem onClick={handleClose}>

            <PersonPinIcon></PersonPinIcon>


          </MenuItem>
          <MenuItem onClick={handleClose}>


            <LogoutIcon onClick={logout}> </LogoutIcon>

          </MenuItem>

        </Menu>
      </div>
      <Modal
        // style={{ width: 600 }}
        // className="Modal"
        // overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>ajout des plat</h2>
        <button className="modal-close" onClick={closeModal}>
          x
        </button>
        <form className="content-center" onSubmit={handleSubmitForm}>
          <div className="input-container-wrap">
            <div className="input-container-both">
              <div className="input-container input-container-img">
                <ButtonUpload
                  text="Choisissez une photo"
                  src={img}
                  setProductUpdate={setNewProduct}
                  productUpdate={newProduct}
                />
              </div>
            </div>
            <div className="input-container-both">
              <div className="input-container">
                <label htmlFor="" className="input-label">
                  Nom
                </label>
                <input
                  className="input-box"
                  onChange={onChangeInputProduct}
                  type="text"
                  name="name"
                  value={name}
                  id=""
                />
              </div>
              <div className="input-container">
                <label htmlFor="" className="input-label">
                  Categorie
                </label>
                <select
                  required
                  className="input-box"
                  name="catelory"
                  value={catelory}
                  onChange={onChangeInputProduct}
                >
                  <option value="" selected disabled hidden>
                    Choisissez ici
                  </option>
                  {typeProducts.map((typeProduct, index) => {
                    if (index !== 0)
                      return (
                        <option value={typeProduct._id}>
                          {typeProduct.name}
                        </option>
                      );
                  })}
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="" className="input-label">
                  Prix ​​(DT)
                </label>
                <input
                  className="input-box"
                  onChange={onChangeInputProduct}
                  type="text"
                  name="price"
                  value={price}
                  id=""
                />
              </div>
              <div className="input-container">
                <label htmlFor="" className="input-label">
                  Quantité
                </label>
                <input
                  className="input-box"
                  onChange={onChangeInputProduct}
                  type="text"
                  name="count"
                  value={count}
                  id=""
                />
              </div>
              <div className="input-container">
                <label htmlFor="" className="input-label">
                  description
                </label>
                <textarea
                  type="text"
                  name="description"
                  className="input-box input-box-textarea"
                  value={description}
                  onChange={onChangeInputProduct}
                  id=""
                />
              </div>
            </div>
          </div>
          <input
            className="input-box input-box-submit"
            type="submit"
            value="ajouter"
          />
          {/* <button>the modal</button> */}
        </form>
      </Modal>
    </>
  );
};

export default AddModal;
