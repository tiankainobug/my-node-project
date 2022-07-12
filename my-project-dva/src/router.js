import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './pages/login';
import Home from "./pages/home";
import AuthRoute from "./components/AuthRoute";

function RouterConfig({ history,token }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <AuthRoute path="/home" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig
