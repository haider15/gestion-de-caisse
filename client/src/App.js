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
import Navbar from './components/navbar/navbar'
import ajoutserveur from './Admin/serveur/ajoutserveur'
import Loginser from './Admin/serveur/Loginser'

// import NavBar from './components/navbar/navbar'
// import Registration from './components/Login/Registration'
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
            </GlobalState>          </Route>
          <Route path='/payment' component={Payment} />
          <Route path='/admin' component={Admin} />
          <Route path='/revenue' component={Revenue} />
          <Route path='/login' component={Login} />
          {/* <Route path="/ser" component={Serveur} /> */}
          <Route path="/ajout" component={ajoutserveur} />
          <Route path="/nav" component={Navbar}/> 
          <Route path="/loginser" component={Loginser}/> 
          {/* <Route path='/Reg' component={Registration} /> */}
        </Switch>
      </Router>
    </>
  )
}

export default App
