import React from 'react';
import Header from '../headaer';
import WebRTCBody from  './WebRTCBody';

const WebRTC = (props)=> {
  return (
    <div>
      <Header {...props}/>
      <WebRTCBody {...props}/>
    </div>
  );
}

export default WebRTC;
