// import React from "react";
// import { Navbar, Nav, Image, NavDropdown, Provider } from "react-bootstrap";
// // import Provider from 'react-bootstrap/Provider'
// import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";

// const NavBar = () => {
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.loginUserReducer);
//   const { currentUser } = userState;
//   return (
//     <>
//       <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
//           <Navbar.Brand>
//             <Image
//               src="images/logo.png"
//               alt="logo"
//               style={{ height: "50px" }}
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="ms-auto">
//               {currentUser ? (
//                 <LinkContainer to="/">
//                   <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
//                     <LinkContainer to="/orders">
//                       <NavDropdown.Item>orders</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item
//                     //   onClick={() => {
//                     //     dispatch(logoutUser());
//                     //   }}
//                     >
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </LinkContainer>
//               ) : (
//                 <>
//                   {" "}
//                   <LinkContainer to="/login">
//                     <Nav.Link>Login</Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/register">
//                     <Nav.Link>Register</Nav.Link>
//                   </LinkContainer>{" "}
//                 </>
//               )}

//               <LinkContainer to="/cart">
//                 <Nav.Link>Cart </Nav.Link>
//               </LinkContainer>
//             </Nav>
//           </Navbar.Collapse>
        
//       </Navbar>
//     </>
//   );
// };

// export default NavBar;
