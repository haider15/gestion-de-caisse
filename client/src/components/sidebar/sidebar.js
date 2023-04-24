
import { useHistory } from "react-router-dom";
import React,{ useEffect } from "react";
// Be sure to include styles at some point, probably during your bootstraping

import SideNav, {

  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import './sidebar.css';  
import {  Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// const navigate =useHistory()
// function logout() {
//   localStorage.clear();
//   navigate.push('/login');
// }

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }
  
  
 
  
  render() {
    // useEffect(()=>{
    //   if(!localStorage.getItem('token')){
    //     navigate.push('/login')
    //   }
    // },[]);
   
    return (
     
      <SideNav expanded={this.state.isVisible}>
        
        <SideNav.Toggle
          // onClick={() => {
          //   this.setState({ isVisible: !this.state.isVisible });
          // }}
        />  
       
        <SideNav.Nav defaultSelected="admin">
         <NavItem eventKey="admin">
            <NavIcon>
              <i className="  " style={{ fontSize: "1.75em" }} />
            </NavIcon>
          
            <NavText ><Link to="/nav/admin" >admin</Link></NavText>
            
          </NavItem>    
          <NavItem eventKey="placed orders">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText ><Link to="/nav/revenu" >revenue</Link></NavText>
            
          </NavItem>
          <NavItem eventKey="placed orders1">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText><Link to="/nav/ajout" > gestion serveur </Link> </NavText>
           
          </NavItem>


          <NavItem eventKey="placed orders1">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText   > <Button > logout </Button>  </NavText>
           
          </NavItem>
        </SideNav.Nav>
      </SideNav>
     
    );
  }
}

export default SideNavBar;