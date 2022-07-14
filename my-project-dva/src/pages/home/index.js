import React from 'react';
import Header from '../headaer';
import Body from  '../body';

const Home = (props)=> {
    return (
        <div>
            <Header {...props}/>
            <Body {...props}/>
        </div>
    );
}

export default Home;
