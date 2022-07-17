import React from 'react';
import Header from '../headaer';
import FaceRecognitionBody from  './faceRecognitionBody';

const faceRecognition = (props)=> {
  return (
    <div>
      <Header {...props}/>
      <FaceRecognitionBody {...props}/>
    </div>
  );
}

export default faceRecognition;
