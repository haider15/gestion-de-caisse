    // import React from 'react'
    // import { Link } from 'react-router-dom'

    // import './login.css'
  
    //   const [email, setEmail] = useState("");
    //   const [password, setPassword] = useState("");
    //   const dispatch = useDispatch();
    
    //   useEffect(() => {
    //     if (localStorage.getItem("currentUser")) {
    //       window.location.href = "/";
    //     }
    //   }, []);
    //   const loginHandler = () => {
    //     const user = { email, password };
    //     dispatch(loginUser(user));
    //   };
    // export default function login() {

        
    //     return (
    //         <div className="login">
    //             <h2>Sign in to us</h2>
    //             <form action="/admin">
    //                 <p>
    //                     <label>Username or email address</label><br/>
    //                     <input type="text" name="first_name"   onChange={(e) => setEmail(e.target.value)} required />
    //                 </p>
    //                 <p>
    //                     <label>Password</label>
    //                     <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
    //                     <br/>
    //                     <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
    //                 </p>
    //                 <p>
    //                     <button id="sub_btn" type="submit" onClick={loginHandler}>Login</button>
    //                 </p>
    //             </form>
    //             <footer>
    //                 <p>First time? <Link to="/register">Create an account</Link>.</p>
    //                 <p><Link to="/">Back to Homepage</Link>.</p>
    //             </footer>
    //         </div>
    //     )
    // }
    // /////////////////////////////////////////////////////////////////////////////////////


    // // import React from 'react'
    // // import axios from 'axios'
    // // import {Redirect} from 'react-router-dom'
    // // import AuthM from './authM';

    // // import { Alert, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
    // // const API_URL='http://localhost:3000'

    // // export default class Login extends React.Component {
    // //     constructor(props) {
    // //         super(props);


    // //         const storedMessage = localStorage.getItem('successMessage');
    // //         let successMessage = '';

    // //         if (storedMessage) {
    // //             successMessage = storedMessage;
    // //             localStorage.removeItem('successMessage');
    // //         }

    // //         this.state = {
    // //             errors: {},
    // //             successMessage,
    // //             user: {
    // //                 username: '',
    // //                 password: ''
    // //             },

    // //             userData: {}
    // //         }
    // //     }

    // //     handleChange = (event) => {
    // //         const field = event.target.id;
    // //         const user = this.state.user;
    // //         user[field] = event.target.value;

    // //         this.setState({
    // //             user: user
    // //         })
    // //     }

    // //     handleSubmit = (event) => {
    // //             event.preventDefault();

    // //         const username = encodeURIComponent(this.state.user.username);
    // //         const password = encodeURIComponent(this.state.user.password);
    // //         const formData = `username=${username}&password=${password}`;

    // //         axios({
    // //             method: 'post',
    // //             url: `${API_URL}/login`,
    // //             data: formData
    // //         })
    // //             .then( (response) => {
    // //                 if (response.status === 200) {
    // //                     localStorage.setItem('successMessage', response.data.message);
    // //                     localStorage.setItem('username',response.data.userData.username)
    // //                     AuthM.authenticateUser(response.data.token);
    // //                     this.setState({
    // //                         errors: {},
    // //                         userData: response.data.userData
    // //                     });

    // //                 }
    // //             })
    // //             .catch( (error) => {
    // //                 console.log('error login',error.response)
    // //                 const errors = error.response.data.errors ? error.response.data.errors : {};
    // //                 errors.summary = error.response.data.message;
    // //                 this.setState({ errors });
    // //             })

    // //     }

    // //     render() {

    // //         if (AuthM.isUserAuthenticated()) {
    // //                 return (
    // //             <Redirect to={{
    // //                 pathname: "/",
    // //                 state: {referrer: this.state.userData}
    // //                 }} />
    // //                 );
    // //             }



    // //         var message = "";
    // //         var usernameError = "";
    // //         var passwordError = "";

    // //         if (this.state.successMessage) {
    // //                 message = <Alert bsStyle="success">{this.state.successMessage}</Alert>;
    // //             }

    // //             if (this.state.errors.login) {
    // //                 message = <Alert bsStyle="danger">{this.state.errors.login}</Alert>;
    // //             }

    // //             if (this.state.errors.username) {
    // //                 usernameError = <Alert >{this.state.errors.username}</Alert>;
    // //             }

    // //             if (this.state.errors.password) {
    // //                 passwordError = <Alert >{this.state.errors.password}</Alert>;
    // //             }

    // //         return (

    // //             <form onSubmit={this.handleSubmit} className="form login-form">
    // //                 <h3>Login</h3>
    // //                 {message}
    // //                 <div className="reg-wrapper">
    // //                     <div className='control-labels'>

    // //                     <p>Username</p>
    // //                         <p>Password</p>
    // //                     </div>
    // //                     <div className='form-groups'>
    // //                         <FormGroup className="formgroup" controlId="username">
    // //                             <FormControl type="text" value={this.state.user.username} onChange={this.handleChange} />
    // //                         </FormGroup>
    // //                         <FormGroup className="formgroup" controlId="password">
    // //                             <FormControl type="password" value={this.state.user.password} onChange={this.handleChange} />
    // //                         </FormGroup>
    // //                     </div>
    // //                     <div className='reg-errors'>
    // //                         <p>{usernameError}</p>
    // //                         <p>{passwordError}</p>
    // //                     </div>
    // //                 </div>
    // //                 <Button className="form-button" type="submit">Submit</Button>
    // //             </form>
    // //         )
    // //     }
    // // }



    import React, { Component, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status != "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "/admin";
        
        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p> */}
        </form>
      </div>
    </div>
  );
}
