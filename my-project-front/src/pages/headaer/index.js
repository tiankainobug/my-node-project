import './index.css'
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
            <ul className='popOfMy'>
                <li className='popItem'><a href="http://www.tiankaii.cn"><img src={gerenzhongxin} alt=""/>我的主页</a></li>
                <li className='popItem'><a href="/"><img src={tuichu} alt=""/>退出</a></li>
            </ul>
        )
    }

    return (
        <div className='header'>
            <ul>
                <li className='toHome'>首页</li>
                <li className='toMy' onClick={toMy} title='我的主页'></li>
            </ul>
            {showPopOfMy ? renderPopOfMy() :null}
        </div>

    );
}

export default Index;
