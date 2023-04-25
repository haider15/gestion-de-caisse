// import Menu from './components/Menu'
// import ShowCard from './components/ShowCard';
import './index.css'
import ShowCart from './components/ShowCart'
import GlobalState from './components/GlobalState'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react'
// import Filter from './components/Header/Filter'
// import TypeProducts from './components/TypeProducts'
// import ShowInforLine from './components/ShowInforLine'
import Payment from './components/Payment/Payment'
import Admin from './Admin'
import Revenue from './Admin/Revenue/Revenue'
import KingOfFilter from './components/Header/KingOfFilter'
import Serveur from './Admin/serveur/Loginser'
import Login from './components/Login/login'

import ajoutserveur from './Admin/serveur/ajoutserveur'
import Loginser from './Admin/serveur/Loginser'
import sidebar from './components/sidebar/sidebar'
import SideNavBar from './components/sidebar/sidebar'
import Ajoutserveur from './Admin/serveur/ajoutserveur'
import Gestion from './components/gestion/gestion'
import Edit from './components/gestion/Edit'
import PrivateRoute from './components/privateRoute/PrivateRoute'


function App() {
  const [idType, setIdType] = useState(0)
  function ChangeForIdType(id) {
    setIdType(id)
  }

  return (

    <>
      <Router>
        {/* <NavBar /> */}
        <Switch>
       
          <Route exact path='/'>
            
            <GlobalState>
              <ShowCart />
              <KingOfFilter x={ChangeForIdType} typeId={idType} />
            </GlobalState>
            
          </Route>


          <Route path='/payment' component={Payment} />
          <Route path='/login' component={Login} />
          <Route path="/loginser" component={Loginser} />
          {/* <Route path="/ges" component={Gestion} /> */}
          <Route path="/edit/:id" component={Edit} />
          {/* <Route path='/revenue' component={Revenue} />
          <Route path="/ajout" component={ajoutserveur} /> */}
          {/* <Route path="/ser" component={Serveur} /> */}

          {/* <Route path="/side" component={sidebar}/> */}

          {/* <Route path='/Reg' component={Registration} /> */}

          <Route path="/nav">
            <SideNavBar></SideNavBar>
            <Switch>
              <Route path="/nav/revenu" > <Revenue /></Route>
              <Route path='/nav/admin'>
                <Admin />
              </Route>
              <Route path='/nav/ajout'>
                <Ajoutserveur />
              </Route>
              <Route path='/nav/ges'>
                <Gestion />
              </Route>
              
            </Switch>

          </Route>
        </Switch>
      </Router>

    </>
  )
}

export default App
