import {connect} from "dva";
import React from 'react';
import {Route,Redirect} from "dva/router";
import Home from "../pages/home";

const AuthRoute = ({login}) => {
  const {
    token
  } = login
  return (
    !token ?
    <Redirect from='/home' to='/login' exact />:
    <Route path='/home' component={Home} />
  )
}
export default connect(({login})=>({login}))(AuthRoute)
