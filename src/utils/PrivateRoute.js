import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, token: Token, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (Token ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: "/login" }} />)}
    />
  );
}

export default PrivateRoute;
