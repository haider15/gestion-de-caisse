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
import Login from './components/Login/login'
import Serveur from './Admin/serveur/serveur'
function App() {
  const [idType, setIdType] = useState(0)
  function ChangeForIdType(id) {
    setIdType(id)
  }
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <GlobalState>
              <ShowCart />
              <KingOfFilter x={ChangeForIdType} typeId={idType}/>
            </GlobalState>
          </Route>
          <Route path='/payment' component={Payment} />
          <Route path='/admin' component={Admin} />
          <Route path='/revenue' component={Revenue} />
          <Route path='/login' component={Login} />
          <Route path="/ser" component={Serveur} />
          
        </Switch>
      </Router>
    </>
  )
}

export default App
