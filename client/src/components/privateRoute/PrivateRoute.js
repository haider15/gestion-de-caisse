import React from 'react'
import { useHistory } from 'react-router-dom';
import { useLocalState } from './useLocalState';
const   PrivateRoute =({children})=>{
const[jwt,setJwt]=useLocalState("","jwt");
const  navigate = useHistory()
return jwt ? children :<navigate to="/login" />


};
 
export default  PrivateRoute;
