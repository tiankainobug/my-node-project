import {connect} from "dva";
import React, {useEffect} from 'react';
import {Route} from "dva/router";
import Home from "../pages/home";
import {message} from "antd";

const AuthRoute = (props) => {
  const {history,login} = props
  const {
    token
  } = login
  useEffect(()=>{
    if (!token){
      message.warning('请先登录！')
      history.push('/login')
    }
  },[])
  return (
    token? <Route path='/home' component={Home} />: null

  )
}
export default connect(({login})=>({login}))(AuthRoute)
