import { useEffect, useState } from "react";
import { Switch, useHistory } from "react-router";

import axios from "axios";

import { useToast } from "@chakra-ui/toast";

import Loading from "./services/auth/components/Loading";
import Login from "./services/auth/components/Login";
import Signup from "./services/auth/components/Signup";
import Confirm from "./services/auth/components/Confirm";
import RequestResetPassword from "./services/auth/components/RequestResetPassword";
import ResetPassword from "./services/auth/components/ResetPassword";
import UpdatePassword from "./services/auth/components/UpdatePassword";

import Users from "./services/users/components/Users";
import Photos from "./services/photos/components/Photos";
import Properties from "./services/properties/components/Properties";
import Categories from "./services/categories/components/Categories";
import Settings from "./services/settings/components/Settings";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import * as DAOAuth from "./services/auth/dao";
import * as Storage from "./services/auth/utils/storage";

function App() {
  const history = useHistory();
  const toast = useToast();

  const [loading, setLoading] = useState();
  const [toastSetup, setToastSetup] = useState();
  const [token, setToken] = useState(Storage.getToken());
  const [user, setUser] = useState();

  const login = (token, user) => {
    setLoading(true);
    Storage.setToken(token);
    setToken(Storage.getToken());
    setUser(user);
    history.push({ pathname: "/" });
  };

  const logout = () => {
    setLoading(true);
    setUser(undefined);
    Storage.removeToken();
    setToken(Storage.getToken());
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.defaults.headers.common["Authorization"] = `${process.env.REACT_APP_TOKEN_PRE} ${token}`;

      const verify = async () => {
        const res = await DAOAuth.verify();

        if (res.message === "success") {
          setLoading(false);
          setUser(res.user);
        } else if (res.message === "error") {
          logout();
        } else {
          setToastSetup({ title: "Se ha producido un error inesperado", status: "error", duration: 5000 });
        }
      };

      verify();
    }
  }, [token]);

  useEffect(() => {
    if (!toastSetup) {
      return;
    }

    const { title, status, duration } = toastSetup;

    toast({
      title,
      status,
      duration,
      position: "top",
      isClosable: true,
    });

    setToastSetup();
  }, [toastSetup, toast]);

  if (loading && token) {
    return <Loading />;
  }

  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={Settings}
        token={token}
        user={user}
        logout={logout}
        setToastSetup={setToastSetup}
      />

      <PrivateRoute
        path="/users"
        component={Users}
        token={token}
        user={user}
        logout={logout}
        setToastSetup={setToastSetup}
      />

      <PrivateRoute
        path="/photos"
        component={Photos}
        token={token}
        user={user}
        logout={logout}
        setToastSetup={setToastSetup}
      />

      <PrivateRoute
        path="/categories"
        component={Categories}
        token={token}
        user={user}
        logout={logout}
        setToastSetup={setToastSetup}
      />

      <PrivateRoute
        path="/properties"
        component={Properties}
        token={token}
        user={user}
        logout={logout}
        setToastSetup={setToastSetup}
      />

      <PrivateRoute
        path="/password"
        component={UpdatePassword}
        token={token}
        user={user}
        logout={logout}
        setToastSetup={setToastSetup}
      />

      <PublicRoute path="/login" component={Login} login={login} setToastSetup={setToastSetup} />

      <PublicRoute path="/signup" component={Signup} setToastSetup={setToastSetup} />

      <PublicRoute path="/confirm/:id" component={Confirm} />

      <PublicRoute path="/request-reset-password" component={RequestResetPassword} setToastSetup={setToastSetup} />

      <PublicRoute path="/reset-password" component={ResetPassword} login={login} setToastSetup={setToastSetup} />
    </Switch>
  );
}

export default App;
