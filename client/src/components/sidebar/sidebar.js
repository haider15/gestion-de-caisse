
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
// Be sure to include styles at some point, probably during your bootstraping
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonPinIcon from '@mui/icons-material/PersonPin'

import SideNav, {

  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import './sidebar.css';
import { Link } from "react-router-dom";
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

        {/* <SideNav.PersonPinIcon  /> */}


        <SideNav.Nav defaultSelected="admin">

        <NavItem eventKey="placed orders1" className="profil">
            
                        

          </NavItem>
          <NavItem eventKey="admin">
            <NavIcon>
              <i className="  " style={{ fontSize: "1.75em" }} />
              
            </NavIcon>

            <NavText ><Link to="/nav/admin" >Produits</Link></NavText>

          </NavItem>
          <NavItem eventKey="placed orders">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText ><Link to="/nav/revenu" >Commandes</Link></NavText>

          </NavItem>
          <NavItem eventKey="placed orders2">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText> <Link to="/nav/ajout" > ajout serveur </Link> </NavText>

          </NavItem>

          <NavItem eventKey="placed orders3">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText> <Link to="/nav/ges" > gestion serveur </Link> </NavText>

          </NavItem>
          <NavItem eventKey="placed orders4">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText> <Link to="/nav/gesc" > recette </Link> </NavText>

          </NavItem>


          <NavItem eventKey="placed orders5" >
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText> <Link to="/nav/type" > La gestion Les Familles </Link> </NavText>

          </NavItem>

          <NavItem eventKey="placed orders6" >
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText> <Link to="/nav/jour" >Jour </Link> </NavText>

          </NavItem>
          {/* <NavItem eventKey="placed orders3">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText   >   <LogoutIcon className="fas fa-shopping-cart1"></LogoutIcon> logout </NavText>

          </NavItem> */}
        </SideNav.Nav>
      </SideNav>

    );
  }
}

export default SideNavBar;