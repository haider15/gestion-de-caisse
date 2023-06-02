
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
// Be sure to include styles at some point, probably during your bootstraping
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonPinIcon from '@mui/icons-material/PersonPin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
// const firstName = JSON.parse(localStorage.getItem("firstName"));

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
    const iconStyle = {
      color: 'grid', // Set the desired color here
    };

    return (


      <SideNav expanded={this.state.isVisible}>

        {/* <SideNav.Toggle
        // onClick={() => {
        //   this.setState({ isVisible: !this.state.isVisible });
        // }}
        /> */}

        {/* <SideNav.PersonPinIcon  /> */}

        <br></br> <br></br><br></br>
        <SideNav.Nav defaultSelected="admin">

          <div className="coleur">
            <NavItem className="profil">

              <FontAwesomeIcon icon={faUser} size="3x" style={iconStyle} />

            </NavItem>
            <br></br>
            <NavItem className="profil">

              <NavText >Admin</NavText>
            </NavItem>
          </div> <br></br>

          <br></br>
          <div className="nav-item-container">
            <NavItem eventKey="admin">
              <NavIcon>
                <i className="  " style={{ fontSize: "1.75em" }} />

              </NavIcon>

              <NavText ><Link to="/nav/admin" >Produits</Link></NavText>

            </NavItem>

            <NavItem eventKey="placed orders5" >
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText> <Link to="/nav/type" >  Les Familles </Link> </NavText>

            </NavItem></div> <br></br>
          <div className="nav-item-container"><NavItem eventKey="placed orders">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText ><Link to="/nav/revenu" >Les Commandes</Link></NavText>

          </NavItem>

            <NavItem eventKey="placed orders4">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText> <Link to="/nav/gesc" > Recette par Serveur </Link> </NavText>

            </NavItem>
            </div>
            <br></br>
            <div className="nav-item-container">
            <NavItem eventKey="placed orders6" >
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText> <Link to="/nav/jour" >Recette par Jour</Link> </NavText>

            </NavItem>

            <NavItem eventKey="placed orders6" >
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText> <Link to="/nav/serj" >Recette Serveur par Jour</Link> </NavText>

            </NavItem>
          </div> <br></br>

          <div className="nav-item-container">
            <NavItem eventKey="placed orders3">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText> <Link to="/nav/ges" > Gestion par serveur </Link> </NavText>

            </NavItem>
            <NavItem eventKey="placed orders2">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText> <Link to="/nav/ajout" > Ajout serveur </Link> </NavText>

            </NavItem>

          </div>








        </SideNav.Nav>

      </SideNav>

    );
  }
}

export default SideNavBar;