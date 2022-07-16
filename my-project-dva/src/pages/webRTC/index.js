import React from 'react';
import Header from '../headaer';
import WebRTCBody from  '../webRTC/WebRTCBody';

const WebRTC = (props)=> {
  return (
    <div>
      <Header {...props}/>
      <WebRTCBody {...props}/>
    </div>
  );
}

export default WebRTC;
