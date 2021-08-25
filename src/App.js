import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Dashboard from './components/admin/Dashboard';
import CreateService from './components/admin/CreateService';
import ServiceDetail from './components/GetPost/ServiceDetail';
import AllServices from './components/admin/AllServices';
import UpdatePost from './components/admin/UpdatePost';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { createContext } from 'react';
import PrivateRoute from './components/Login/PrivateRoute';
import Checkout from './components/order/Checkout';
import OrderSuccess from './components/order/OrderSuccess';
import OrderList from './components/order/OrderList';
import AllOrders from './components/admin/AllOrders';
import ProcessOrder from './components/admin/ProcessOrder';
import { useEffect } from 'react';

export const UserContext = createContext()


function App() {

  const [loggedIn, setLoggedIn] = useState({})

  useEffect(() => {
   
  }, [])

  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/service/update/:slug" component={UpdatePost} />
          <Route path="/allServices" component={AllServices} />
          <Route path="/post/:slug" component={ServiceDetail} />
          <Route path="/checkout/:dataId">
            <Checkout />
          </Route>
          <Route path="/create" component={CreateService} />
          <Route path="/allOrders" component={AllOrders} />
          <Route path="/update/process/:id" component={ProcessOrder} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/orderSuccess" component={OrderSuccess} />
          <Route path="/orders" component={OrderList} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
