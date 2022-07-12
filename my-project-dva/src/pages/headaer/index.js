import style from './index.css'
import {useState} from "react";
import tuichu from './img/a-26wode3.svg';
import gerenzhongxin from './img/a-30shouye2.svg';

const Index =()=> {
    const [showPopOfMy,setShowPopOfMy] = useState(false);
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
                <li className={style.toMy} onClick={toMy} title='我的主页'></li>
            </ul>
            {showPopOfMy ? renderPopOfMy() :null}
        </div>
    );
}

export default Index;
