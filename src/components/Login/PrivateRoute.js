import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './../../App';

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedIn, setLoggedIn] = useContext(UserContext)
    return (
        <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('user') || loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;