import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import AuthM from './authM';

const API_URL='http://localhost:300   '

class Logout extends React.Component {
  	componentWillMount() {
        AuthM.deauthenticateUser();
        localStorage.removeItem('username');
  		  axios.get(`${API_URL}/logout`)
	   }

  	render() {
      console.log('getToken',AuthM.getToken())
  		return (
        <Redirect push to='/' />
  		);
  	}
}

export default Logout;