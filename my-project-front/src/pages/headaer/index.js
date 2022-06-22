import './index.css'

const Index =()=> {
    // 我的头像的点击事件
    const toMy = ()=> {
        console.log('tomyyyy')
    }

    return (
        <div className='header'>
            <ul>
                <li className='toHome'>首页</li>
                <li className='toMy' onClick={toMy} title='我的主页'></li>
            </ul>
        </div>

    );
}

export default Index;
