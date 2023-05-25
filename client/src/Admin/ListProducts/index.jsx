import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../AdminContext";
import Filter from "../Header/Filter";
import swal from "sweetalert";
/////////////////////////////////
// const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 pr-0 xl:mt-0 `;

import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

//////////////////////////////////
import "../index-hoangkui.css";
import AddModal from "./AddModal";
import AddType from "./AddType";
import SingleProduct from "./SingleProduct";
import SideNavBar from "../../components/sidebar/sidebar";
// import {  useSelector } from "react-redux";





// import { useHistory } from "react-router-dom";

import { useHistory } from "react-router-dom";

// const dispatch = useDispatch();
//   const userState = useSelector((state) => state.loginUserReducer);
//   const { currentUser } = userState;


const ListProducts = () => {

  const {
    products,
    getProducts,
    removeProduct,
    getTypeProducts,
    isLoading,
    typeProducts,
    removeTypeProduct,
  } = useContext(adminContext);
  useEffect(() => {
    getProducts();
    getTypeProducts();
  }, []);
  const [selectFilter, setSelectFilter] = useState(-1);
  // if (!isLoading) filter = <Filter />;
  const handleRemoveType = () => {
    swal({
      title: "Are you sure?",
      text: "Vous supprimerez tous les produits ci-dessous?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        products.map((product) => {
          if (product.catelory === typeProducts[selectFilter]._id) {
            removeProduct(product._id);
          }
        });
        removeTypeProduct(typeProducts[selectFilter]._id);
        setSelectFilter(-1);
        swal("Supprimer avec succès", {
          icon: "success",
        });
      }
    });
  };
  console.log("??????", typeProducts, isLoading, products);

  const navigate = useHistory()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate.push('/login')
    }
  }, []);
  return (
    <>
      <div className="grid"> <div className='iconManager'><h2>   La gestion des Produits </h2></div></div>

      {/* {filter} */}
      <div className="listProducts-heading">
        {/* <h3 className="listProducts-heading-title">Liste des produits:</h3> */}

        {false || (
          <div className="menu">
            <button
              onClick={() => setSelectFilter(-1)}
              className="button-filter-food"
              style={
                selectFilter === -1
                  ? { backgroundColor: " #ffffff", color: "#333" }
                  : {}
              }
            >
              tous
            </button>
            {typeProducts.map((typeProduct, index) => {
              if (index !== 0)
                return (
                  <button
                    key={index}
                    onClick={() => setSelectFilter(index)}
                    style={
                      selectFilter === index
                        ? { backgroundColor: "#ffffff", color: "#333" }
                        : {}
                    }
                    className="button-filter-food"
                  >
                    {typeProduct.name}
                  </button>
                );
            })}
          </div>
        )}

        <AddType />
        {selectFilter > -1 && (
          <button
            onClick={handleRemoveType}
            className="listProducts-heading-add-product"
          >
            Supprimer cette catégorie
          </button>
        )}
        <AddModal />
      </div>


      <div className="listProducts-content">
        <table className="listProducts-content-table">
          <tbody className="tbody-nth">

            <tr className="listProducts-content-row-heading-table">
              <th className="listProducts-content-row-heading">SKU</th>
              <th className="listProducts-content-row-heading">Produit</th>
              <th className="listProducts-content-row-heading">
                Famille
              </th>
              <th className="listProducts-content-row-heading">Quantité</th>
              <th className="listProducts-content-row-heading">Description</th>
              <th className="listProducts-content-row-heading">Prix</th>
              <th className="listProducts-content-row-heading"></th>
              <th className="listProducts-content-row-heading">

              </th>
            </tr>

            {products.map((product, index) => {
              if (selectFilter === -1) {
                return <SingleProduct product={product} index={index} />;
              } else if (product.catelory === typeProducts[selectFilter]._id)
                return <SingleProduct product={product} index={index} />;
            })}
          </tbody>
        </table>
      </div>

      <div className="modal-hoangkui-add modal-hoangkui">
        {/* <AddModal /> */}
      </div>
    </>
  );
};

export default ListProducts;
