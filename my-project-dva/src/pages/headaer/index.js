import style from './index.css'
import {useEffect, useState} from "react";
import tuichu from './img/a-26wode3.svg';
import gerenzhongxin from './img/a-30shouye2.svg';
import request from "../../utils/request";
import {connect} from "dva";
import {message} from "antd";

const Index = props => {
    const [showPopOfMy,setShowPopOfMy] = useState(false);
    const [username,setUsername] = useState('')
    const { history } = props
    useEffect(()=>{
      request('https://tiankaii.cn/apis/user/getUserName').then((res)=>{
        if (res && res.code && res.code === '401'){
          message.warning('登录失效，请重新登录！')
          history.push('/login')
        }else {
          setUsername(res.username)
        }
      })
    },[])

    // 我的头像的点击事件
    const toMy = ()=> {
        setShowPopOfMy(!showPopOfMy)
    }
    const renderPopOfMy = ()=> {
        return (
            <ul className={style.popOfMy}>
                <li className={style.popItem}><a href="https://tiankaii.cn/zhuye"><img src={gerenzhongxin} alt=""/>我的主页</a></li>
                <li className={style.popItem}><a href="https://tiankaii.cn/wangpan"><img src={gerenzhongxin} alt=""/>我的网盘</a></li>
                <li className={style.popItem}><a href="/"><img src={tuichu} alt=""/>退出登录</a></li>
            </ul>
        )
    }

    return (
        <div className={style.header}>
            <ul>
                <li className={style.toHome}>首页</li>
                <li className={style.toMy} onClick={toMy} title={username}></li>
            </ul>
            {showPopOfMy ? renderPopOfMy() :null}
        </div>
    );
}

export default connect()(Index);
