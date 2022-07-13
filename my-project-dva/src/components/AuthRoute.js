import {connect} from "dva";
import React, {useEffect} from 'react';
import {Route,Redirect} from "dva/router";
import Home from "../pages/home";
import {message} from "antd";

const AuthRoute = ({login}) => {
  const {
    token
  } = login
  useEffect(()=>{
    if (!token){
      message.warning('请先登录！')
    }
  },[token])
  return (
    !token ?
    <Redirect from='/home' to='/login' exact />:
    <Route path='/home' component={Home} />
  )
}
export default connect(({login})=>({login}))(AuthRoute)
