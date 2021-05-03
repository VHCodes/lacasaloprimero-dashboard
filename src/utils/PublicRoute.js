import React from "react";
import { Route } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={(props) => <Component {...props} {...rest} />} />;
}

export default PublicRoute;
