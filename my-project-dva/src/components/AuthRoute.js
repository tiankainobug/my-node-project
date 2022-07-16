import {connect} from "dva";
import React, {useEffect} from 'react';
import {Route} from "dva/router";
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
    token? <Route path={props.path} component={props.component} />: null

  )
}
export default connect(({login})=>({login}))(AuthRoute)
