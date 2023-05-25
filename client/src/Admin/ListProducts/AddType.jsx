import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { adminContext } from "../AdminContext";
import swal from "sweetalert";
import Modal from "react-modal";
import { customStyles } from "./SingleProduct";
import ButtonUpload from "../ButtonUpload";
import AddIcon from '@mui/icons-material/Add';
import './add.css'
import { useHistory } from "react-router-dom"

const AddType = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;
	const  navigate = useHistory()

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
function push(){
  navigate.push('/nav/ges');
}
  const { typeProducts, addProduct, addTypeProduct } = useContext(adminContext);
  // const fileInput = React.createRef();
  const [newProduct, setNewProduct] = useState({
    name: "",
    img: "",
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
    const data = new FormData();
    data.append("img", newProduct.img);
    data.append("name", newProduct.name);

    // const productAdd = {
    //   ...newProduct,
    // };
    console.log(newProduct);
    addTypeProduct(data);
    closeModal();
    swal(
      "Succès",
      `Type ajouté avec succès ${newProduct.name} `,
      "success"
    );
    window.location.reload(true)
    // window.location.reload(true)
    // axios
    //   .post("http://localhost:5000/api/product", newProduct)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // axios.post("http://localhost:3000/")
  };
  return (
    <>
    <div className="add" onClick={push}>
         gestion de famille
      </div>
     <div className="add" onClick={openModal}>
      <AddIcon  >
      </AddIcon>Ajout de Famille
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
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>catégories de produits</h2>
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

export default AddType;
